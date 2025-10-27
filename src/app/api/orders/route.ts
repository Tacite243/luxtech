import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { initiateAirtelPayment } from '@/services/airtel.service';
import axios from 'axios';



// Le schéma de validation qui attend le panier et les infos de paiement
const createOrderSchema = z.object({
  paymentMethod: z.enum(['AIRTEL_MONEY', 'PHYSICAL', 'WHATSAPP']),
  items: z.array(z.object({
    productId: z.string().cuid(),
    quantity: z.number().int().min(1),
  })).min(1),
  // Le numéro de téléphone est optionnel, mais requis si paymentMethod est AIRTEL_MONEY
  customerPhone: z.string().optional(),
});

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const validation = createOrderSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ error: validation.error.flatten().fieldErrors }, { status: 400 });
    }

    const { paymentMethod, items, customerPhone } = validation.data;

    // --- PARTIE SÉCURITÉ : VÉRIFICATION DES PRIX ET DES STOCKS ---
    const productIds = items.map(item => item.productId);
    const dbProducts = await prisma.product.findMany({ where: { id: { in: productIds } } });

    let total = 0;
    for (const item of items) {
      const product = dbProducts.find(p => p.id === item.productId);
      if (!product) {
        return NextResponse.json({ error: `Produit introuvable.` }, { status: 404 });
      }
      if (product.stock < item.quantity) {
        return NextResponse.json({ error: `Stock insuffisant pour ${product.name}` }, { status: 400 });
      }
      total += product.price * item.quantity;
    }

    // --- PARTIE INTÉGRITÉ : TRANSACTION PRISMA ---
    const newOrder = await prisma.$transaction(async (tx) => {
      const order = await tx.order.create({
        data: { userId: session.user.id, total, paymentMethod, status: 'PENDING' },
      });

      await tx.orderItem.createMany({
        data: items.map(item => ({
          orderId: order.id,
          productId: item.productId,
          quantity: item.quantity,
          price: dbProducts.find(p => p.id === item.productId)!.price,
        })),
      });

      for (const item of items) {
        await tx.product.update({
          where: { id: item.productId },
          data: { stock: { decrement: item.quantity } },
        });
      }
      return order;
    });

    // --- PARTIE PAIEMENT ---
    if (paymentMethod === 'AIRTEL_MONEY') {
      if (!customerPhone) {
        return NextResponse.json({ error: 'Numéro de téléphone requis.' }, { status: 400 });
      }

      try {
        // On appelle l'API Airtel
        const paymentResponse = await initiateAirtelPayment(total, customerPhone, newOrder.id);

        // On enregistre le paiement en attente
        await prisma.payment.create({
          data: {
            orderId: newOrder.id,
            amount: total,
            status: 'pending', // Le statut initial est "pending"
            method: 'AIRTEL_MONEY',
            transactionId: paymentResponse.data?.transaction?.id, // ID de transaction d'Airtel
          }
        });

        // On renvoie la commande et les infos de paiement au frontend
        return NextResponse.json({ order: newOrder, paymentInfo: paymentResponse }, { status: 201 });

      } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
          console.error("Erreur API Airtel:", error.response?.data || error.message);
        }
        // Même si le paiement échoue, la commande a été créée. L'utilisateur pourra réessayer.
        return NextResponse.json({
          order: newOrder,
          paymentError: "Le service de paiement est momentanément indisponible."
        }, { status: 201 });
      }
    }

    // Si le paiement est physique ou via WhatsApp, on retourne juste la commande.
    return NextResponse.json({ order: newOrder }, { status: 201 });

  } catch (_error) {
    // console.error("Erreur création commande:", error);
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
  }
}