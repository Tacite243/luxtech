import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

// Initialiser Resend avec la clé API depuis les variables d'environnement
const resend = new Resend(process.env.RESEND_API_KEY);
const toEmail = process.env.TO_EMAIL;

// Définir un schéma de validation avec Zod
const contactFormSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères."),
  email: z.string().email("L'adresse email est invalide."),
  subject: z.string().min(3, "Le sujet doit contenir au moins 3 caractères."),
  message: z.string().min(10, "Le message doit contenir au moins 10 caractères."),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Valider les données du formulaire avec Zod
    const validatedFields = contactFormSchema.safeParse(body);

    // Si la validation échoue, renvoyer les erreurs
    if (!validatedFields.success) {
      return NextResponse.json(
        { errors: validatedFields.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = validatedFields.data;

    if (!toEmail) {
        throw new Error("L'adresse email du destinataire n'est pas configurée.");
    }
    
    // Envoyer l'e-mail avec Resend
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev', // Adresse d'envoi par défaut de Resend (ne pas changer en mode test)
      to: toEmail, // Votre email, récupéré depuis .env.local
      subject: `Nouveau message de ${name} : ${subject}`,
    //   reply_to: email, // Permet de répondre directement à l'expéditeur
      html: `
        <p><strong>De :</strong> ${name} (${email})</p>
        <p><strong>Sujet :</strong> ${subject}</p>
        <hr>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    });

    if (error) {
      console.error("Erreur d'envoi Resend:", error);
      return NextResponse.json({ error: "Erreur lors de l'envoi de l'e-mail" }, { status: 500 });
    }

    return NextResponse.json({ message: 'Email envoyé avec succès !', data }, { status: 200 });

  } catch (error) {
    console.error("Erreur interne du serveur:", error);
    return NextResponse.json({ error: 'Une erreur est survenue.' }, { status: 500 });
  }
}