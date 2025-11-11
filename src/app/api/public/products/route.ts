import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Utiliser l'instance partagée

// GET: Récupérer tous les produits (route publique, aucune protection nécessaire)
export async function GET() {
    try {
        const products = await prisma.product.findMany({
            orderBy: { createdAt: 'desc' } // Optionnel : trier par date de création
        });
        return NextResponse.json(products);
    } catch (_error) {
        return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
    }
}