import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { Resend } from 'resend';
import { Prisma } from '@prisma/client';

const resend = new Resend(process.env.RESEND_API_KEY);

// Schéma pour la mise à jour (marquer comme lu)
const updateQuoteSchema = z.object({
    isRead: z.boolean(),
});

// Schéma pour la réponse
const replyQuoteSchema = z.object({
    subject: z.string().min(3, "Le sujet est requis."),
    message: z.string().min(10, "Le message est requis."),
});

// ==================================
// PUT: Mettre à jour le statut (ex: isRead)
// ==================================
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } } // Utiliser la signature directe
) {
    try {
        const { id } = params;
        const body = await request.json();
        const validation = updateQuoteSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json({ error: validation.error.flatten().fieldErrors }, { status: 400 });
        }

        const updatedQuote = await prisma.quote.update({
            where: { id },
            data: { isRead: validation.data.isRead },
        });

        return NextResponse.json(updatedQuote);
    } catch (error: unknown) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            return NextResponse.json({ error: 'Demande de devis non trouvée' }, { status: 404 });
        }
        return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
    }
}

// ==================================
// DELETE: Supprimer une demande de devis
// ==================================
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params;
        await prisma.quote.delete({ where: { id } });
        return new NextResponse(null, { status: 204 });
    } catch (error: unknown) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            return NextResponse.json({ error: 'Demande de devis non trouvée' }, { status: 404 });
        }
        return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
    }
}

// ==================================
// POST: Répondre à une demande de devis
// ==================================
export async function POST(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params;

        const quote = await prisma.quote.findUnique({ where: { id } });
        if (!quote) {
            return NextResponse.json({ error: "Demande de devis introuvable." }, { status: 404 });
        }

        const body = await request.json();
        const validation = replyQuoteSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json({ error: validation.error.flatten().fieldErrors }, { status: 400 });
        }

        const { subject, message } = validation.data;

        const { data, error } = await resend.emails.send({
            from: `LuxTech Services <${process.env.TO_EMAIL}>`,
            to: quote.email,
            subject: `Re: ${subject}`,
            html: `
                <p>Bonjour ${quote.name},</p>
                <p>Merci pour votre demande de devis. Voici notre réponse :</p>
                <div style="border-left: 2px solid #ccc; padding-left: 1em; margin: 1em 0;">
                    ${message.replace(/\n/g, "<br>")}
                </div>
                <p>Cordialement,<br>L'équipe LuxTech Services</p>
                <hr>
                <p style="color: #666; font-size: 0.9em;">
                    <i>Votre message original :<br>"${quote.message}"</i>
                </p>
            `,
        });

        if (error) {
            console.error("Erreur Resend [POST /api/quote/[id]]:", error);
            return NextResponse.json({ error: "Erreur lors de l'envoi de l'e-mail de réponse." }, { status: 500 });
        }

        await prisma.quote.update({
            where: { id },
            data: { isRead: true },
        });

        return NextResponse.json({ message: 'Réponse envoyée avec succès !' });

    } catch (error) {
        console.error("Erreur [POST /api/quote/[id]]:", error);
        return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
    }
}