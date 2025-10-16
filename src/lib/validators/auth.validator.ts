import { z } from 'zod';



export const registerSchema = z.object({
    name: z.string().min(3, "Le nom doit contenir au moins 3 caractères."),
    email: z.string().email("L'adresse email est invalide."),
    password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères."),
});

export const updateUserSchema = z.object({
    name: z.string().min(3, "Le nom doit contenir au moins 3 caractères.").optional(),
    email: z.string().email("L'adresse email est invalide.").optional(),
}).refine(data => Object.keys(data).length > 0, {
    message: "Au moins un champ doit être fourni pour la mise à jour.",
});