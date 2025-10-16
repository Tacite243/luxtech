import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { z } from 'zod';

const prisma = new PrismaClient();

const createOrderSchema = z.object({
  paymentMethod: z.enum(['AIRTEL_MONEY', 'PHYSICAL', 'WHATSAPP']),
  items: z.array(z.object({
    productId: z.string().cuid(),
    quantity: z.number().int().min(1),
  })).min(1),
});

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  // Le middleware a déjà vérifié que l'utilisateur est connecté
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const validation = createOrderSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ error: validation.error.flatten().fieldErrors }, { status: 400 });
    }

    const { paymentMethod, items } = validation.data;

    // ... Logique complexe ici :
    // 1. Vérifier le stock des produits
    // 2. Calculer le total
    // 3. Créer la commande et les OrderItems dans une transaction Prisma
    // 4. Si paiement en ligne, appeler l'API Airtel Money
    // 5. Retourner la commande créée

    // Ceci est une version simplifiée
    const newOrder = { id: '123', status: 'PENDING' }; // Remplacez par la vraie logique

    return NextResponse.json(newOrder, { status: 201 });

  } catch (error) {
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
  }
}