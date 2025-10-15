import { NextResponse } from 'next/server';
import { registerSchema } from '@/lib/validators/auth.validator';
import { registerUser } from '@/services/auth.service';



export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Validation des données entrantes
        const validation = registerSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json({ error: validation.error.flatten().fieldErrors }, { status: 400 });
        }

        // Appel du service pour la logique métier
        const newUser = await registerUser(validation.data);

        // Envoi de la réponse
        return NextResponse.json(newUser, { status: 201 });

    } catch (error: any) {
        // Gérer les erreurs spécifiques du service (ex: email déjà utilisé)
        if (error.message === 'Un utilisateur avec cet email existe déjà.') {
            return NextResponse.json({ error: error.message }, { status: 409 }); // 409 Conflict
        }

        // Gérer les autres erreurs
        console.error('Erreur d\'inscription:', error);
        return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
    }
}