"use client";

import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';

const replySchema = z.object({
    subject: z.string().min(3, "Le sujet est requis."),
    message: z.string().min(10, "Le message est requis."),
});

type ReplyFormValues = z.infer<typeof replySchema>;

interface ReplyFormProps {
    originalSubject?: string;
    onSubmit: (data: ReplyFormValues) => void;
    onClose: () => void;
    isLoading: boolean;
}

export default function ReplyForm({ originalSubject, onSubmit, onClose, isLoading }: ReplyFormProps) {
    const { register, handleSubmit, formState: { errors } } = useForm<ReplyFormValues>({
        resolver: zodResolver(replySchema),
        defaultValues: {
            subject: `Re: Demande de devis`, // Sujet par défaut
        }
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
            <div>
                <label htmlFor="subject" className="block text-sm font-medium">Sujet</label>
                <input id="subject" {...register('subject')} className="mt-1 block w-full rounded-md border-gray-300" />
                {errors.subject && <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>}
            </div>
            <div>
                <label htmlFor="message" className="block text-sm font-medium">Message</label>
                <textarea id="message" {...register('message')} rows={8} className="mt-1 block w-full rounded-md border-gray-300" />
                {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>}
            </div>
            <div className="flex justify-end gap-4 pt-4">
                <button type="button" onClick={onClose}>Annuler</button>
                <button type="submit" disabled={isLoading} className="bg-[#FBBF24] text-[#111827] font-bold py-2 px-4 rounded-md">
                    {isLoading ? <Loader2 className="animate-spin" /> : 'Envoyer la Réponse'}
                </button>
            </div>
        </form>
    );
}