"use client";

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { createOrder, CreateOrderPayload } from '@/redux/features/ordersSlice';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Loader2, CreditCard, Store, MessageCircle } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';




// Le panier (cart) sera passé en props à ce composant
type CartItem = {
    productId: string;
    quantity: number;
};

interface CheckoutFormProps {
    cartItems: CartItem[];
}

// Schéma de validation pour le formulaire
const checkoutSchema = z.object({
    paymentMethod: z.enum(['AIRTEL_MONEY', 'PHYSICAL', 'WHATSAPP']),
    customerPhone: z.string().optional(),
}).refine(data => {
    return data.paymentMethod !== 'AIRTEL_MONEY' || (data.customerPhone && data.customerPhone.length > 5);
}, {
    message: "Le numéro de téléphone est requis pour Airtel Money.",
    path: ["customerPhone"],
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export default function CheckoutForm({ cartItems }: CheckoutFormProps) {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { status: orderStatus } = useAppSelector((state) => state.orders);

    const { register, handleSubmit, watch, formState: { errors } } = useForm<CheckoutFormValues>({
        resolver: zodResolver(checkoutSchema),
        defaultValues: {
            paymentMethod: 'AIRTEL_MONEY', // Méthode par défaut
        }
    });

    const selectedPaymentMethod = watch('paymentMethod');
    const isLoading = orderStatus === 'loading';

    const onSubmit: SubmitHandler<CheckoutFormValues> = async (data) => {
        const orderPayload: CreateOrderPayload = {
            ...data,
            items: cartItems,
        };

        await toast.promise(dispatch(createOrder(orderPayload)).unwrap(), {
            loading: 'Création de votre commande...',
            success: (result) => {
                // Rediriger vers une page de confirmation avec l'ID de la commande
                router.push(`/order-confirmation/${result.order.id}`);
                return 'Commande créée avec succès !';
            },
            error: (err) => err || 'Une erreur est survenue.',
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-lg shadow-md border space-y-6">
            <div>
                <h3 className="text-lg font-semibold mb-4">Choisissez votre méthode de paiement</h3>
                <div className="space-y-3">
                    {/* Option Airtel Money */}
                    <label className="flex items-center p-4 border rounded-lg cursor-pointer has-[:checked]:bg-yellow-50 has-[:checked]:border-yellow-400">
                        <input type="radio" value="AIRTEL_MONEY" {...register('paymentMethod')} className="mr-4" />
                        <CreditCard className="mr-3 text-red-600" />
                        <span className="font-medium">Payer avec Airtel Money</span>
                    </label>
                    {/* Autres options */}
                    <label className="flex items-center p-4 border rounded-lg cursor-pointer has-[:checked]:bg-gray-50 has-[:checked]:border-gray-400">
                        <input type="radio" value="PHYSICAL" {...register('paymentMethod')} className="mr-4" />
                        <Store className="mr-3 text-gray-600" />
                        <span className="font-medium">Paiement en agence / à la livraison</span>
                    </label>
                    <label className="flex items-center p-4 border rounded-lg cursor-pointer has-[:checked]:bg-green-50 has-[:checked]:border-green-400">
                        <input type="radio" value="WHATSAPP" {...register('paymentMethod')} className="mr-4" />
                        <MessageCircle className="mr-3 text-green-600" />
                        <span className="font-medium">Finaliser sur WhatsApp</span>
                    </label>
                </div>
            </div>

            {/* Champ de numéro de téléphone conditionnel */}
            <AnimatePresence>
                {selectedPaymentMethod === 'AIRTEL_MONEY' && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                        <div>
                            <label htmlFor="customerPhone" className="block text-sm font-medium text-gray-700 mb-1">Numéro de téléphone Airtel</label>
                            <input id="customerPhone" {...register('customerPhone')} type="tel" placeholder="Ex: 09..." className="w-full px-4 py-2 bg-gray-50 border rounded-lg" />
                            {errors.customerPhone && <p className="mt-1 text-sm text-red-600">{errors.customerPhone.message}</p>}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <button type="submit" disabled={isLoading || cartItems.length === 0} className="w-full flex justify-center py-3 px-4 rounded-lg shadow-md text-[#111827] font-bold bg-[#FBBF24] hover:bg-[#F59E0B] disabled:opacity-60">
                {isLoading ? <Loader2 className="animate-spin" /> : 'Confirmer et Commander'}
            </button>
        </form>
    );
}