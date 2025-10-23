import { Prisma, User, Role } from '@prisma/client';
import bcrypt from 'bcrypt';
import { prisma } from '@/lib/prisma';



// Type pour les données de retour (sans le mot de passe)
export type SafeUser = Omit<User, 'password'>;

// Interface étendue pour inclure un rôle optionnel
interface RegisterUserInput extends Prisma.UserCreateInput {
    role?: Role;
}

// Service pour l'inscription d'un nouvel utilisateur
export const registerUser = async (input: RegisterUserInput): Promise<SafeUser> => {
    const existingUser = await prisma.user.findUnique({
        where: { email: input.email },
    });

    if (existingUser) {
        throw new Error('Un utilisateur avec cet email existe déjà.');
    }

    if (!input.password) {
        throw new Error('Le mot de passe est requis pour l\'inscription.');
    }

    const hashedPassword = await bcrypt.hash(input.password, 12);

    const user = await prisma.user.create({
        data: {
            name: input.name,
            email: input.email,
            password: hashedPassword,
            // Si un rôle est fourni (par un admin), on l'utilise. Sinon, la valeur par défaut 'USER' du schéma s'applique.
            role: input.role || Role.USER,
        },
    });

    const { password, ...safeUser } = user;
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

// Service pour lister tous les utilisateurs
export const getAllUsers = async (): Promise<SafeUser[]> => {
    const users = await prisma.user.findMany({
        orderBy: { createdAt: 'desc' },
    });
    // Retirer le mot de passe de chaque utilisateur
    return users.map(({ password, ...safeUser }) => safeUser);
};
