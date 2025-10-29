import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';




const resend = new Resend(process.env.RESEND_API_KEY);
const toEmail = process.env.TO_EMAIL;

// Schéma de validation pour la demande de devis
const quoteSchema = z.object({
  name: z.string().min(2, "Le nom est requis."),
  email: z.string().email("L'adresse email est invalide."),
  phone: z.string().optional(),
  message: z.string().min(10, "Veuillez décrire votre projet (min. 10 caractères)."),
});

export async function POST(request: Request) {
  try {
    if (!toEmail) {
      throw new Error("L'adresse email du destinataire n'est pas configurée.");
    }

    const body = await request.json();
    const validation = quoteSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ errors: validation.error.flatten().fieldErrors }, { status: 400 });
    }

    const { name, email, phone, message } = validation.data;

    // --- Enregistrer dans la base de données ---
    const newQuote = await prisma.quote.create({
      data: {
        name,
        email,
        phone,
        message,
      }
    });

    // Envoyer l'email de notification
    const { error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: toEmail,
      subject: `Nouvelle Demande de Devis de ${name} (#${newQuote.id.slice(-6)})`, // Ajouter un ID pour référence
      replyTo: email,
      html: `
        <h2>Demande de Devis (ID: ${newQuote.id})</h2>
        <p><strong>Nom :</strong> ${name}</p>
        <p><strong>Email :</strong> ${email}</p>
        ${phone ? `<p><strong>Téléphone :</strong> ${phone}</p>` : ''}
        <hr>
        <h3>Description du projet :</h3>
        <p>${message.replace(/\n/g, "<br>")}</p>
        <br>
        <p><i>Cette demande a été enregistrée dans le back-office.</i></p>
      `,
    });

    if (error) {
      return NextResponse.json({ error: "Erreur lors de l'envoi de l'e-mail" }, { status: 500 });
    }

    return NextResponse.json({ message: 'Demande envoyée avec succès !' }, { status: 201 });

      } catch (error) {
          return NextResponse.json({ error: 'Une erreur est survenue.' }, { status: 500 });
        }
}

// Ajouter une route GET pour le back-office ---
export async function GET() {
  try {
    const quotes = await prisma.quote.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(quotes);
  } catch (error) {
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
  }
}