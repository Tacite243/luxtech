import { NextResponse } from 'next/server';
import { registerSchema } from '@/lib/validators/auth.validator';
import { registerUser, getAllUsers } from '@/services/auth.service';
import { z } from 'zod';
import { Role } from '@prisma/client';



// Schéma pour la création d'un utilisateur par un admin (avec un champ `role`)
const adminCreateUserSchema = registerSchema.extend({
    role: z.nativeEnum(Role).optional(),
});

// GET: Lister tous les utilisateurs (protégé par middleware)
export async function GET() {
    try {
        const users = await getAllUsers();
        return NextResponse.json(users);
    } catch (_error) {
        return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
    }
}

// POST: Créer un nouvel utilisateur (admin ou user) par un superadmin
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const validation = adminCreateUserSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json({ error: validation.error.flatten().fieldErrors }, { status: 400 });
        }

        // On passe les données validées, y compris le rôle, au service
        const newUser = await registerUser(validation.data);

        return NextResponse.json(newUser, { status: 201 });
    } catch (error: unknown) {
        if (error instanceof Error && error.message.includes('existe déjà')) {
            return NextResponse.json({ error: error.message }, { status: 409 });
        }
        return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
    }
}