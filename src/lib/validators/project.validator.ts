import { z } from 'zod';

export const projectSchema = z.object({
    title: z.string().min(3, "Le titre est requis."),
    category: z.string().min(3, "La catégorie est requise."),
    mainImage: z.string().url("L'URL de l'image principale est invalide."),
    galleryImages: z.array(z.string().url("Chaque image de la galerie doit avoir une URL valide.")).min(1, "Au moins une image de galerie est requise."),
    client: z.string().min(2, "Le nom du client est requis."),
    // On valide d'abord que c'est une chaîne non vide, PUIS on la transforme en date.
    // On valide simplement que c'est une chaîne non vide, puis on la transforme en date.
    // Le message de .min(1) s'appliquera si le champ est manquant ou vide.
    projectDate: z.string().min(1, "La date du projet est requise.").pipe(z.coerce.date()),
    projectUrl: z.string().url("L'URL du projet est invalide.").optional().or(z.literal('')),
    description: z.string().min(10, "La description est requise."),

    // Champs optionnels pour le témoignage
    testimonialQuote: z.string().optional(),
    testimonialAuthor: z.string().optional(),
    testimonialRole: z.string().optional(),
});

// Pour la mise à jour, tous les champs sont optionnels
export const updateProjectSchema = projectSchema.partial();