import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { updateProjectSchema } from '@/lib/validators/project.validator';

interface RouteContext {
    params: { id: string };
}

// GET: Récupérer un projet spécifique
export async function GET(request: Request, { params }: RouteContext) {
    try {
        const { id } = params;
        const project = await prisma.project.findUnique({ where: { id } });

        if (!project) {
            return NextResponse.json({ error: 'Projet non trouvé' }, { status: 404 });
        }
        return NextResponse.json(project);
    } catch (error) {
        return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
    }
}

// PUT: Mettre à jour un projet
export async function PUT(request: Request, { params }: RouteContext) {
    try {
        const { id } = params;
        const body = await request.json();
        const validation = updateProjectSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json({ error: validation.error.flatten().fieldErrors }, { status: 400 });
        }

        const updatedProject = await prisma.project.update({
            where: { id },
            data: validation.data,
        });
        return NextResponse.json(updatedProject);
    } catch (error) {
        return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
    }
}

// DELETE: Supprimer un projet
export async function DELETE(request: Request, { params }: RouteContext) {
    try {
        const { id } = params;
        await prisma.project.delete({ where: { id } });
        return new NextResponse(null, { status: 204 });
    } catch (error) {
        return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
    }
}