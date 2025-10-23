import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";



export async function POST(req: NextRequest) {
    try {
        const data = await req.json();

        // On récupère les informations importantes envoyées par Airtel
        const transactionStatus = data.data?.transaction?.status;
        const orderId = data.data?.transaction?.id;

        if (!transactionStatus || !orderId) {
            return NextResponse.json({ error: "Données de webhook invalides" }, { status: 400 });
        }

        // Mettre à jour le statut de notre paiement dans la base de données
        await prisma.payment.updateMany({
            where: { orderId: orderId },
            data: { status: transactionStatus },
        });

        // Si le paiement a réussi ("TS"), on met à jour le statut de la commande
        if (transactionStatus === "TS") { // "TS" signifie Transaction Success chez Airtel
            await prisma.order.update({
                where: { id: orderId },
                data: { status: "PAID" },
            });
        }

        return NextResponse.json({ message: "Webhook traité avec succès" });
    } catch (error) {
        console.error("Erreur Webhook Airtel:", error);
        return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 });
    }
}