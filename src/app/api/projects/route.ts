import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { projectSchema } from '@/lib/validators/project.validator';

// GET: Récupérer tous les projets (route publique)
export async function GET() {
    try {
        const projects = await prisma.project.findMany({
            orderBy: { projectDate: 'desc' }, // Trier par date, du plus récent au plus ancien
        });
        return NextResponse.json(projects);
    } catch (error) {
        return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
    }
}

// POST: Créer un nouveau projet (protégé par middleware)
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const validation = projectSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json({ error: validation.error.flatten().fieldErrors }, { status: 400 });
        }

        const newProject = await prisma.project.create({ data: validation.data });
        return NextResponse.json(newProject, { status: 201 });
    } catch (error) {
        console.error("Erreur lors de la création du projet:", error);
        return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
    }
}
