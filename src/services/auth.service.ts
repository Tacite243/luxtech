import { Prisma, User } from '@prisma/client';
import bcrypt from 'bcrypt';
import { prisma } from '@/lib/prisma';



// Type pour les données de retour (sans le mot de passe)
export type SafeUser = Omit<User, 'password'>;


// Service pour l'inscription d'un nouvel utilisateur
export const registerUser = async (input: Prisma.UserCreateInput): Promise<SafeUser> => {
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await prisma.user.findUnique({
        where: { email: input.email },
    });

    if (!input.password) {
        throw new Error("Le mot de passe est requis pour l'inscription.");
    }

    if (existingUser) {
        throw new Error('Un utilisateur avec cet email existe déjà.');
    }

    // Hasher le mot de passe avant de le sauvegarder
    const hashedPassword = await bcrypt.hash(input.password, 12);

    // Créer l'utilisateur dans la base de données
    const user = await prisma.user.create({
        data: {
            ...input,
            password: hashedPassword,
            // Le rôle par défaut est 'USER' (défini dans le schéma Prisma)
        },
    });

    // Renvoyer l'utilisateur sans le mot de passe
    const { password: _password, ...safeUser } = user;
    return safeUser;
};

// Service pour récupérer un utilisateur par son ID
export const getUserById = async (userId: string): Promise<SafeUser | null> => {
    const user = await prisma.user.findUnique({
        where: { id: userId },
    });

    if (!user) {
        return null;
    }

    const { password: _password, ...safeUser } = user;
    return safeUser;
};

// Service pour mettre à jour un utilisateur
export const updateUser = async (userId: string, data: Prisma.UserUpdateInput): Promise<SafeUser> => {
    const user = await prisma.user.update({
        where: { id: userId },
        data,
    });

    const { password: _password, ...safeUser } = user;
    return safeUser;
};

// Service pour supprimer un utilisateur
export const deleteUser = async (userId: string): Promise<void> => {
    await prisma.user.delete({
        where: { id: userId },
    });
};