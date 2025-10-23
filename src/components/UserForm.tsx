"use client";

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User, Role } from '@prisma/client';
import { Loader2 } from 'lucide-react';
import { useEffect } from 'react';
import { UserFormData } from '@/redux/features/usersSlice';



const userFormSchema = z.object({
    // Ajouter un champ caché pour savoir si on est en mode édition
    isEditing: z.boolean(),
    name: z.string().min(3, "Le nom est requis."),
    email: z.string().email("L'email est invalide."),
    password: z.string().optional(),
    role: z.nativeEnum(Role),
}).superRefine((data, ctx) => {
    // Logique de validation conditionnelle pour le mot de passe
    if (!data.isEditing && (!data.password || data.password.length < 6)) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Le mot de passe doit faire au moins 6 caractères.",
            path: ['password'],
        });
    }
    if (data.isEditing && data.password && data.password.length > 0 && data.password.length < 6) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Le nouveau mot de passe doit faire au moins 6 caractères.",
            path: ['password'],
        });
    }
});

// Le type du formulaire est maintenant unique
type UserFormValues = z.infer<typeof userFormSchema>;

interface UserFormProps {
    user?: Omit<User, 'password'> | null;
    onSubmit: (data: UserFormData) => void;
    onClose: () => void;
    isLoading: boolean;
}

export default function UserForm({ user, onSubmit, onClose, isLoading }: UserFormProps) {
    const isEditing = !!user;
    
    const { register, handleSubmit, reset, formState: { errors } } = useForm<UserFormValues>({
        resolver: zodResolver(userFormSchema),
        // Toujours inclure `isEditing` dans les valeurs par défaut
        defaultValues: { isEditing }
    });

    useEffect(() => {
        if (user) {
            reset({
                isEditing: true,
                name: user.name || '',
                email: user.email,
                role: user.role,
                password: '',
            });
        } else {
            reset({ isEditing: false, name: '', email: '', password: '', role: 'USER' });
        }
    }, [user, reset]);
    
    const onFormSubmit: SubmitHandler<UserFormValues> = (data) => {
        // On retire le champ `isEditing` avant d'envoyer les données
        const { isEditing, ...formData } = data;

        // Ne pas envoyer un mot de passe vide ou non défini
        if (!formData.password) {
            delete formData.password;
        }

        onSubmit(formData as UserFormData);
    };

    return (
        <form onSubmit={handleSubmit(onFormSubmit)} className="h-full flex flex-col bg-white">
            <div className="flex-grow p-6 space-y-6 overflow-y-auto">
                {/* Champ caché pour le mode édition */}
                <input type="hidden" {...register('isEditing')} />

                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nom</label>
                    <input id="name" {...register('name')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-[#FBBF24]" />
                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input id="email" type="email" {...register('email')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-[#FBBF24]" />
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mot de passe</label>
                    <input id="password" type="password" {...register('password')} placeholder={isEditing ? "Laisser vide pour ne pas changer" : ""} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-[#FBBF24]" />
                    {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
                </div>
                <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700">Rôle</label>
                    <select id="role" {...register('role')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-[#FBBF24]">
                        {Object.values(Role).map(role => (
                            <option key={role} value={role}>{role}</option>
                        ))}
                    </select>
                    {errors.role && <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>}
                </div>
            </div>
            <div className="flex-shrink-0 px-6 py-4 border-t bg-gray-50 flex justify-end gap-4">
                <button type="button" onClick={onClose} className="rounded-md border bg-white py-2 px-4 text-sm font-medium">Annuler</button>
                <button type="submit" disabled={isLoading} className="inline-flex justify-center rounded-md bg-[#FBBF24] py-2 px-4 text-sm font-bold text-[#111827] shadow-sm disabled:opacity-50">
                    {isLoading ? <Loader2 className="animate-spin" /> : (isEditing ? 'Mettre à jour' : 'Créer')}
                </button>
            </div>
        </form>
    );
}
