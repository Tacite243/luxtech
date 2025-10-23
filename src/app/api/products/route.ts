import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
// import { getServerSession } from 'next-auth';

const prisma = new PrismaClient();

// Schéma de validation pour la création d'un produit
const createProductSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(10),
  price: z.number().positive(),
  stock: z.number().int().min(0),
  images: z.array(z.string().url()),
  category: z.string().min(1),
});

// GET: Récupérer tous les produits (route publique)
export async function GET() {
  try {
    const products = await prisma.product.findMany();
    return NextResponse.json(products);
  } catch (_error) {
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
  }
}

// POST: Créer un nouveau produit (protégé par middleware)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = createProductSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const newProduct = await prisma.product.create({
      data: validation.data,
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (_error) {
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
  }
}