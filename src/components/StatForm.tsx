"use client";

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Stat } from '@prisma/client';
import { Loader2, Smile, FolderKanban, Headset, Users, Award, ClipboardList, HelpCircle } from 'lucide-react';
import { useEffect } from 'react';



const iconNames = ["Smile", "FolderKanban", "Headset", "Users", "Award", "ClipboardList"] as const;

// Créer l'iconMap à partir de la liste de noms
const iconMap: { [key in typeof iconNames[number]]: React.ElementType } = {
    Smile,
    FolderKanban,
    Headset,
    Users,
    Award,
    ClipboardList,
};


const statFormSchema = z.object({
    icon: z.enum(iconNames),
    label: z.string().min(3, "Le label doit contenir au moins 3 caractères."),
    target: z.string().min(1, "La cible est requise.").refine(val => /^\d+$/.test(val), { message: "La cible doit être un nombre entier." }),
    order: z.string().refine(val => val === '' || /^\d+$/.test(val), { message: "L'ordre doit être un nombre entier." }).optional(),
});

type StatFormValues = z.infer<typeof statFormSchema>;

export type StatOutputValues = {
    icon: typeof iconNames[number];
    label: string;
    target: number;
    order: number;
};

interface StatFormProps {
    stat?: Stat | null;
    onSubmit: (data: StatOutputValues) => void;
    onClose: () => void;
    isLoading: boolean;
}

export default function StatForm({ stat, onSubmit, onClose, isLoading }: StatFormProps) {
    const { register, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm<StatFormValues>({
        resolver: zodResolver(statFormSchema),
    });

    const selectedIcon = watch('icon');

    useEffect(() => {
        if (stat) {
            reset({
                icon: stat.icon as typeof iconNames[number],
                label: stat.label,
                target: stat.target.toString(),
                order: stat.order?.toString() || '0',
            });
        } else {
            reset({ icon: 'Smile', label: '', target: '', order: '0' });
        }
    }, [stat, reset]);

    const onFormSubmit: SubmitHandler<StatFormValues> = (data) => {
        const transformedData: StatOutputValues = {
            icon: data.icon,
            label: data.label,
            target: parseInt(data.target, 10),
            order: data.order && data.order !== '' ? parseInt(data.order, 10) : 0,
        };
        onSubmit(transformedData);
    };

    return (
        <form onSubmit={handleSubmit(onFormSubmit)} className="h-full flex flex-col bg-white">
            <div className="flex-grow p-6 space-y-6 overflow-y-auto">

                {/* Champ Icône Visuel */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Icône</label>
                    <input type="hidden" {...register('icon')} />
                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                        {iconNames.map(iconName => {
                            const IconComponent = iconMap[iconName] || HelpCircle;
                            const isSelected = selectedIcon === iconName;

                            return (
                                <button
                                    key={iconName}
                                    type="button"
                                    onClick={() => setValue('icon', iconName, { shouldValidate: true })}
                                    className={`flex items-center justify-center p-3 rounded-lg border-2 transition-all duration-200 ease-in-out transform hover:scale-105 ${isSelected
                                            ? 'border-[#FBBF24] bg-yellow-50 ring-2 ring-offset-1 ring-[#FBBF24]'
                                            : 'border-gray-200 bg-white hover:border-gray-400'
                                        }`}
                                    aria-label={`Sélectionner l'icône ${iconName}`}
                                >
                                    <IconComponent className="w-6 h-6 text-gray-700" />
                                </button>
                            );
                        })}
                    </div>
                    {errors.icon && <p className="mt-2 text-sm text-red-600">{errors.icon.message}</p>}
                </div>

                <div>
                    <label htmlFor="label" className="block text-sm font-medium text-gray-700">Label</label>
                    <input id="label" {...register('label')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FBBF24] focus:ring-1 focus:ring-[#FBBF24] transition" />
                    {errors.label && <p className="mt-1 text-sm text-red-600">{errors.label.message}</p>}
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="target" className="block text-sm font-medium text-gray-700">Cible (Nombre)</label>
                        <input id="target" {...register('target')} type="text" inputMode="numeric" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FBBF24] focus:ring-1 focus:ring-[#FBBF24] transition" />
                        {errors.target && <p className="mt-1 text-sm text-red-600">{errors.target.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="order" className="block text-sm font-medium text-gray-700">Ordre d'affichage</label>
                        <input id="order" {...register('order')} type="text" inputMode="numeric" placeholder="0" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FBBF24] focus:ring-1 focus:ring-[#FBBF24] transition" />
                        {errors.order && <p className="mt-1 text-sm text-red-600">{errors.order.message}</p>}
                    </div>
                </div>
            </div>

            {/* Pied de page du formulaire */}
            <div className="flex-shrink-0 px-6 py-4 border-t border-gray-200 flex justify-end gap-4 bg-gray-50 rounded-b-xl">
                <button type="button" onClick={onClose} className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400">
                    Annuler
                </button>
                <button type="submit" disabled={isLoading} className="inline-flex justify-center rounded-md border border-transparent bg-[#FBBF24] py-2 px-4 text-sm font-bold text-[#111827] shadow-sm hover:bg-[#F59E0B] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FBBF24] disabled:opacity-50">
                    {isLoading ? <Loader2 className="animate-spin" /> : (stat ? 'Mettre à jour' : 'Créer la Statistique')}
                </button>
            </div>
        </form>
    );
}