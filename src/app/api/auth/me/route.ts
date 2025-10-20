import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../[...nextauth]/route';
import { getUserById, updateUser, deleteUser } from '@/services/auth.service';
import { updateUserSchema } from '@/lib/validators/auth.validator';



// Middleware implicite : le middleware global dans `src/middleware.ts` 
// devrait déjà protéger cette route pour s'assurer que l'utilisateur est connecté.

// GET: Récupérer le profil de l'utilisateur connecté
export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
        }

        const user = await getUserById(session.user.id);
        if (!user) {
            return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 });
        }

        return NextResponse.json(user);

    } catch (_error) {
        return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
    }
}

// PUT: Mettre à jour le profil de l'utilisateur connecté
export async function PUT(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
        }

        const body = await request.json();
        const validation = updateUserSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json({ error: validation.error.flatten().fieldErrors }, { status: 400 });
        }

        const updatedUser = await updateUser(session.user.id, validation.data);

        return NextResponse.json(updatedUser);

    } catch (error) {
        return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
    }
}

// DELETE: Supprimer le compte de l'utilisateur connecté
export async function DELETE() {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
        }

        await deleteUser(session.user.id);

        return NextResponse.json({ message: 'Compte supprimé avec succès' }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
    }
}
