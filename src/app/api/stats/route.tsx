import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';



// Schéma de validation pour la création
const createStatSchema = z.object({
    icon: z.string().min(1, "L'icône est requise."),
    label: z.string().min(3, "Le label est requis."),
    target: z.number().int("La cible doit être un nombre entier."),
    order: z.number().int().optional(),
});

// GET: Récupérer toutes les statistiques (route publique)
export async function GET() {
    try {
        const stats = await prisma.stat.findMany({
            orderBy: { order: 'asc' }, // Ordonner par le champ 'order'
        });
        return NextResponse.json(stats);
    } catch (_error) {
        return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
    }
}

// POST: Créer une nouvelle statistique (protégé par middleware)
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const validation = createStatSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json({ error: validation.error.flatten().fieldErrors }, { status: 400 });
        }

        const newStat = await prisma.stat.create({ data: validation.data });
        return NextResponse.json(newStat, { status: 201 });
    } catch (_error) {
        return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
    }
}