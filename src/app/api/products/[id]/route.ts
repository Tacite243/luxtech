import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

// Schéma de validation pour la mise à jour (tous les champs sont optionnels)
const updateProductSchema = z.object({
    name: z.string().min(3).optional(),
    description: z.string().min(10).optional(),
    price: z.number().positive().optional(),
    stock: z.number().int().min(0).optional(),
    images: z.array(z.string().url()).optional(),
    category: z.string().min(1).optional(),
});

interface Params {
    params: { id: string };
}

// GET: Récupérer un produit spécifique
export async function GET(request: Request, { params }: Params) {
    try {
        const product = await prisma.product.findUnique({ where: { id: params.id } });
        if (!product) {
            return NextResponse.json({ error: 'Produit non trouvé' }, { status: 404 });
        }
        return NextResponse.json(product);
    } catch (error) {
        return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
    }
}

// PUT: Mettre à jour un produit
export async function PUT(request: Request, { params }: Params) {
    try {
        const body = await request.json();
        const validation = updateProductSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json({ error: validation.error.flatten().fieldErrors }, { status: 400 });
        }

        const updatedProduct = await prisma.product.update({
            where: { id: params.id },
            data: validation.data,
        });

        return NextResponse.json(updatedProduct);
    } catch (error) {
        return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
    }
}

// DELETE: Supprimer un produit
export async function DELETE(request: Request, { params }: Params) {
    try {
        await prisma.product.delete({ where: { id: params.id } });
        return new NextResponse(null, { status: 204 }); // 204 No Content
    } catch (error) {
        return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
    }
}