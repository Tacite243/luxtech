import { DefaultSession, DefaultUser } from "next-auth";
import type { DefaultJWT } from "next-auth/jwt"


// Étendre le type User de base
declare module "next-auth" {
    interface User extends DefaultUser {
        role: string;
    }

    // Étendre le type Session pour inclure nos propriétés personnalisées
    interface Session {
        user: {
            id: string;
            role: string;
        } & DefaultSession["user"]; // Conserve les propriétés par défaut (name, email, image)
    }
}

// Étendre le type JWT
declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        id: string;
        role: string;
    }
}