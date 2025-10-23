import { NextResponse } from 'next/server';
import { updateUser, deleteUser, getUserById } from '@/services/auth.service';
import { z } from 'zod';
import { Role } from '@prisma/client';

// Schéma pour la mise à jour par un admin
const adminUpdateUserSchema = z.object({
    name: z.string().min(3).optional(),
    email: z.string().email().optional(),
    role: z.nativeEnum(Role).optional(),
});

interface RouteContext {
    params: { id: string };
}

// GET: Récupérer un utilisateur spécifique
export async function GET(request: Request, { params }: RouteContext) {
    // ... (similaire à la route /api/products/[id])
}

// PUT: Mettre à jour un utilisateur (rôle, nom, etc.)
export async function PUT(request: Request, { params }: RouteContext) {
    try {
        const { id } = params;
        const body = await request.json();
        const validation = adminUpdateUserSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json({ error: validation.error.flatten().fieldErrors }, { status: 400 });
        }

        const updatedUser = await updateUser(id, validation.data);
        return NextResponse.json(updatedUser);
    } catch (_error) {
        return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
    }
}

// DELETE: Supprimer un utilisateur
export async function DELETE(request: Request, { params }: RouteContext) {
    try {
        const { id } = params;
        await deleteUser(id);
        return new NextResponse(null, { status: 204 });
    } catch (_error) {
        return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
    }
}