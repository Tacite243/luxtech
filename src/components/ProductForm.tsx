"use client";

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Product } from '@prisma/client';
import { Loader2 } from 'lucide-react';
import { useEffect } from 'react';



const productSchema = z.object({
    name: z.string().min(3, "Le nom est requis."),
    description: z.string().min(10, "La description est requise."),
    price: z.string().min(1, "Le prix est requis.").refine(val => !isNaN(parseFloat(val)), { message: "Le prix doit être un nombre." }),
    stock: z.string().min(1, "Le stock est requis.").refine(val => /^\d+$/.test(val), { message: "Le stock doit être un nombre entier." }),
    category: z.string().min(1, "La catégorie est requise."),
    images: z.string().url("Veuillez entrer une URL d'image valide."),
});

// Le type du formulaire est maintenant simple et direct
type ProductFormValues = z.infer<typeof productSchema>;

// Le type de sortie pour la prop onSubmit
export type ProductOutputValues = {
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    images: string[];
};

interface ProductFormProps {
    product?: Product | null;
    onSubmit: (data: ProductOutputValues) => void;
    onClose: () => void;
    isLoading: boolean;
}

const FormField = ({ id, label, register, error, ...props }: any) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
        <input id={id} {...register(id)} {...props} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FBBF24] focus:ring-[#FBBF24] transition" />
        {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
    </div>
);

export default function ProductForm({ product, onSubmit, onClose, isLoading }: ProductFormProps) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<ProductFormValues>({
        resolver: zodResolver(productSchema),
    });

    useEffect(() => {
        if (product) {
            reset({
                name: product.name,
                description: product.description,
                price: product.price.toString(),
                stock: product.stock.toString(),
                category: product.category,
                images: product.images[0] || '',
            });
        } else {
            reset({ name: '', description: '', price: '', stock: '', category: '', images: '' });
        }
    }, [product, reset]);

    const onFormSubmit: SubmitHandler<ProductFormValues> = (data) => {

        const transformedData: ProductOutputValues = {
            name: data.name,
            description: data.description,
            price: parseFloat(data.price),
            stock: parseInt(data.stock, 10),
            category: data.category,
            images: [data.images],
        };

        onSubmit(transformedData);
    };

    return (
        <form onSubmit={handleSubmit(onFormSubmit)} className="h-full flex flex-col">
            <div className="flex-grow p-6 space-y-6 overflow-y-auto">
                <FormField id="name" label="Nom du Produit" register={register} error={errors.name} />
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea id="description" {...register('description')} rows={4} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FBBF24] focus:ring-[#FBBF24] transition" />
                    {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
                </div>
                <div className="grid grid-cols-2 gap-6">
                    <FormField id="price" label="Prix ($)" type="text" inputMode="decimal" register={register} error={errors.price} />
                    <FormField id="stock" label="Stock" type="text" inputMode="numeric" register={register} error={errors.stock} />
                </div>
                <FormField id="category" label="Catégorie" register={register} error={errors.category} />
                <FormField id="images" label="URL de l'Image" register={register} error={errors.images} />
            </div>

            <div className="flex-shrink-0 px-6 py-4 border-t border-gray-200 flex justify-end gap-4">
                <button type="button" onClick={onClose} className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
                    Annuler
                </button>
                <button type="submit" disabled={isLoading} className="inline-flex justify-center rounded-md border border-transparent bg-[#FBBF24] py-2 px-4 text-sm font-bold text-[#111827] shadow-sm hover:bg-[#F59E0B] disabled:opacity-50">
                    {isLoading ? <Loader2 className="animate-spin" /> : (product ? 'Mettre à jour' : 'Créer le Produit')}
                </button>
            </div>
        </form>
    );
}
