import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { Resend } from 'resend';



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

interface RouteContext {
    params: { id: string };
}

// ==================================
// PUT: Mettre à jour le statut (ex: isRead)
// ==================================
export async function PUT(request: NextRequest, { params }: RouteContext) {
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
    } catch (error) {
        return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
    }
}

// ==================================
// DELETE: Supprimer une demande de devis
// ==================================
export async function DELETE(request: NextRequest, { params }: RouteContext) {
    try {
        const { id } = params;
        await prisma.quote.delete({ where: { id } });
        return new NextResponse(null, { status: 204 });
    } catch (error) {
        return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
    }
}

// ==================================
// POST: Répondre à une demande de devis
// ==================================
export async function POST(request: NextRequest, { params }: RouteContext) {
    try {
        const { id } = params;

        // 1. Récupérer les informations du devis original
        const quote = await prisma.quote.findUnique({
            where: { id },
        });

        if (!quote) {
            return NextResponse.json({ error: "Demande de devis introuvable." }, { status: 404 });
        }

        // 2. Valider le corps de la réponse
        const body = await request.json();
        const validation = replyQuoteSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json({ error: validation.error.flatten().fieldErrors }, { status: 400 });
        }

        const { subject, message } = validation.data;

        // 3. Envoyer l'email de réponse au client
        const { data, error } = await resend.emails.send({
            from: `LuxTech Services <${process.env.TO_EMAIL}>`, // Utiliser votre email configuré
            to: quote.email, // Envoyer à l'email du client qui a fait la demande
            subject: `Re: ${subject}`, // Ajouter "Re:" pour indiquer une réponse
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
            return NextResponse.json({ error: "Erreur lors de l'envoi de l'e-mail de réponse." }, { status: 500 });
        }

        // 4. Marquer le devis comme lu/traité après avoir répondu
        await prisma.quote.update({
            where: { id },
            data: { isRead: true },
        });

        return NextResponse.json({ message: 'Réponse envoyée avec succès !' });

    } catch (error) {
        return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
    }
}