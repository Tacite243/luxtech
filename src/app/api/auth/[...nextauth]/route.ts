import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google'; // 1. Importer Google Provider
import AppleProvider from 'next-auth/providers/apple';   // 2. Importer Apple Provider
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import bcrypt from 'bcrypt';
import { prisma } from '@/lib/prisma';



export const authOptions: NextAuthOptions = {
  // Le PrismaAdapter est la clé ! Il gérera automatiquement la création
  // des utilisateurs qui se connectent via Google ou Apple.
  adapter: PrismaAdapter(prisma),
  providers: [
    // --- FOURNISSEUR GOOGLE ---
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),

    // --- FOURNISSEUR APPLE ---
    AppleProvider({
      clientId: process.env.APPLE_CLIENT_ID as string,
      clientSecret: process.env.APPLE_CLIENT_SECRET as string,
    }),

    // --- VOTRE FOURNISSEUR CREDENTIALS EXISTANT ---
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error('Email et mot de passe requis');
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        // IMPORTANT : Si un utilisateur s'est inscrit avec Google/Apple, il n'aura pas de mot de passe.
        // Il ne doit pas pouvoir se connecter avec un mot de passe.
        if (!user || !user.password) {
          throw new Error("Cet utilisateur n'a pas de mot de passe.Essayez de vous connecter avec Google ou Apple.");
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

        if (!isPasswordValid) {
          throw new Error('Mot de passe incorrect');
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      }
    })
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      // Le `user` n'est disponible qu'à la première connexion.
      // On persiste l'ID et le rôle dans le token.
      if (user) {
        token.id = user.id;
        token.role = user.role; // Le rôle sera 'USER' par défaut grâce au schéma Prisma
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };