import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

// Schéma de validation pour la mise à jour
const updateStatSchema = z.object({
    icon: z.string().min(1).optional(),
    label: z.string().min(3).optional(),
    target: z.number().int().optional(),
    order: z.number().int().optional(),
});



// PUT: Mettre à jour une statistique

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        const body = await request.json();
        const validation = updateStatSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json({ error: validation.error.flatten().fieldErrors }, { status: 400 });
        }

        const updatedStat = await prisma.stat.update({
            where: { id },
            data: validation.data,
        });
        return NextResponse.json(updatedStat);
    } catch (_error) {
        return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
    }
}

// DELETE: Supprimer une statistique

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        await prisma.stat.delete({ where: { id } });
        return new NextResponse(null, { status: 204 });
    } catch (_error) {
        return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
    }
}