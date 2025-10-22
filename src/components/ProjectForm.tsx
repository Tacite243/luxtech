"use client";

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Project } from '@prisma/client';
import { Loader2 } from 'lucide-react';
import { useEffect } from 'react';

// --- CORRECTION 1 : Un seul schéma de validation, SANS transformation ---
// Ce schéma représente les données brutes du formulaire (des chaînes).
const projectFormSchema = z.object({
    title: z.string().min(3, "Le titre est requis."),
    category: z.string().min(3, "La catégorie est requise."),
    mainImage: z.string().url("L'URL de l'image principale est invalide."),
    galleryImages: z.string(), // On valide juste que c'est une chaîne pour l'instant
    client: z.string().min(2, "Le nom du client est requis."),
    projectDate: z.string().min(1, "La date du projet est requise."),
    projectUrl: z.string().url("L'URL doit être valide.").optional().or(z.literal('')),
    description: z.string().min(10, "La description est requise."),
    testimonialQuote: z.string().optional(),
    testimonialAuthor: z.string().optional(),
    testimonialRole: z.string().optional(),
});

// Le type du formulaire est maintenant simple
type ProjectFormValues = z.infer<typeof projectFormSchema>;

// Le type de sortie pour la prop onSubmit
export type ProjectOutputValues = {
    title: string;
    category: string;
    mainImage: string;
    galleryImages: string[];
    client: string;
    projectDate: Date;
    description: string;
    projectUrl?: string;
    testimonialQuote?: string;
    testimonialAuthor?: string;
    testimonialRole?: string;
};

interface ProjectFormProps {
    project?: Project | null;
    onSubmit: (data: ProjectOutputValues) => void;
    onClose: () => void;
    isLoading: boolean;
}

export default function ProjectForm({ project, onSubmit, onClose, isLoading }: ProjectFormProps) {
    // --- CORRECTION 2 : useForm utilise le schéma simple ---
    const { register, handleSubmit, reset, formState: { errors } } = useForm<ProjectFormValues>({
        resolver: zodResolver(projectFormSchema),
    });

    useEffect(() => {
        if (project) {
            // On prépare les données pour le formulaire
            const formValues = {
                // On garde les valeurs existantes
                ...project,
                // On transforme explicitement les valeurs qui posent problème
                projectDate: new Date(project.projectDate).toISOString().split('T')[0],
                galleryImages: project.galleryImages.join(', '),
                // On transforme les `null` en chaînes vides ou en `undefined`
                // Une chaîne vide est souvent plus simple pour les champs de formulaire
                projectUrl: project.projectUrl || '',
                testimonialQuote: project.testimonialQuote || '',
                testimonialAuthor: project.testimonialAuthor || '',
                testimonialRole: project.testimonialRole || '',
            };
            reset(formValues);
        } else {
            // Pour un nouveau projet, on s'assure que tout est bien une chaîne vide
            reset({
                title: '',
                category: '',
                mainImage: '',
                galleryImages: '',
                client: '',
                projectDate: '',
                description: '',
                projectUrl: '',
                testimonialQuote: '',
                testimonialAuthor: '',
                testimonialRole: '',
            });
        }
    }, [project, reset]);

    // --- CORRECTION 3 : La transformation se fait manuellement ici ---
    const onFormSubmit: SubmitHandler<ProjectFormValues> = (data) => {
        // `data` contient les valeurs validées (des chaînes).
        // On les transforme maintenant dans le format attendu par l'API.
        const transformedData: ProjectOutputValues = {
            ...data,
            projectDate: new Date(data.projectDate),
            galleryImages: data.galleryImages.split(',').map(s => s.trim()).filter(s => s),
        };

        onSubmit(transformedData);
    };

    return (
        <form onSubmit={handleSubmit(onFormSubmit)} className="h-full flex flex-col bg-white">
            <div className="flex-grow p-6 space-y-6 overflow-y-auto">
                {/* Champs du formulaire */}
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Titre du Projet</label>
                    <input id="title" {...register('title')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-[#FBBF24]" />
                    {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Catégorie</label>
                        <input id="category" {...register('category')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-[#FBBF24]" />
                        {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="projectDate" className="block text-sm font-medium text-gray-700">Date du Projet</label>
                        <input id="projectDate" {...register('projectDate')} type="date" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-[#FBBF24]" />
                        {errors.projectDate && <p className="mt-1 text-sm text-red-600">{errors.projectDate.message}</p>}
                    </div>
                </div>

                <div>
                    <label htmlFor="client" className="block text-sm font-medium text-gray-700">Client</label>
                    <input id="client" {...register('client')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-[#FBBF24]" />
                    {errors.client && <p className="mt-1 text-sm text-red-600">{errors.client.message}</p>}
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea id="description" {...register('description')} rows={5} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-[#FBBF24]" />
                    {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
                </div>

                <div>
                    <label htmlFor="mainImage" className="block text-sm font-medium text-gray-700">Image Principale (URL)</label>
                    <input id="mainImage" {...register('mainImage')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-[#FBBF24]" />
                    {errors.mainImage && <p className="mt-1 text-sm text-red-600">{errors.mainImage.message}</p>}
                </div>

                <div>
                    <label htmlFor="galleryImages" className="block text-sm font-medium text-gray-700">Images de la Galerie (URLs séparées par des virgules)</label>
                    <textarea id="galleryImages" {...register('galleryImages')} rows={3} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-[#FBBF24]" />
                    {errors.galleryImages && <p className="mt-1 text-sm text-red-600">{errors.galleryImages.message}</p>}
                </div>

                <h3 className="text-lg font-medium text-gray-900 border-t pt-4">Témoignage (Optionnel)</h3>

                <div>
                    <label htmlFor="testimonialAuthor" className="block text-sm font-medium text-gray-700">Auteur du Témoignage</label>
                    <input id="testimonialAuthor" {...register('testimonialAuthor')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-[#FBBF24]" />
                </div>

                <div>
                    <label htmlFor="testimonialQuote" className="block text-sm font-medium text-gray-700">Citation</label>
                    <textarea id="testimonialQuote" {...register('testimonialQuote')} rows={3} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-[#FBBF24]" />
                </div>
            </div>

            <div className="flex-shrink-0 px-6 py-4 border-t bg-gray-50 flex justify-end gap-4">
                <button type="button" onClick={onClose} className="rounded-md border bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
                    Annuler
                </button>
                <button type="submit" disabled={isLoading} className="inline-flex justify-center rounded-md border border-transparent bg-[#FBBF24] py-2 px-4 text-sm font-bold text-[#111827] shadow-sm hover:bg-[#F59E0B] disabled:opacity-50">
                    {isLoading ? <Loader2 className="animate-spin" /> : (project ? 'Mettre à jour' : 'Créer le Projet')}
                </button>
            </div>
        </form>
    );
}