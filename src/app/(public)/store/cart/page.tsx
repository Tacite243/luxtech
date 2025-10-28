"use client";

import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { updateQuantity, removeFromCart, CartItem } from "@/redux/features/cartSlice";
import Image from "next/image";
import Link from "next/link";
import { ImageIcon, Minus, Plus, ShoppingCart } from "lucide-react";
import CheckoutForm from "@/components/CheckoutForm";
import HearoInterrior from "@/components/heroInterior";
import { useState, useEffect } from "react";




export default function CartPage() {
    const dispatch = useAppDispatch();
    const { items: cartItems } = useAppSelector((state) => state.cart);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        // Cet effet ne s'exécute que côté client, après le premier rendu.
        setIsClient(true);
    }, []);

    const handleQuantityChange = (productId: string, newQuantity: number) => {
        if (newQuantity < 0) return;
        dispatch(updateQuantity({ productId, quantity: newQuantity }));
    };

    const handleRemove = (productId: string) => {
        dispatch(removeFromCart(productId));
    };

    const subtotal = cartItems.reduce((total, item) => {
        // On vérifie que le prix est un nombre avant de l'ajouter
        const price = item.price ?? 0;
        return total + price * item.quantity;
    }, 0);

    return (
        // --- 1. Intégration de la structure de page standard ---
        <>
            <HearoInterrior
                title="Votre Panier"
                breadcrumbs={[
                    { name: "Accueil", href: "/" },
                    { name: "Boutique", href: "/store" },
                    { name: "Panier" }
                ]}
            />

            <main className="bg-gray-100 py-16 md:py-24">
                <div className="container mx-auto px-6">
                    {!isClient || cartItems.length === 0 ? (
                        <div className="text-center py-16 bg-white rounded-lg shadow-sm border">
                            <ShoppingCart size={64} className="mx-auto text-gray-300 mb-4" />
                            <h2 className="text-2xl font-bold text-gray-800">Votre panier est vide</h2>
                            <p className="text-gray-500 mt-2 mb-6">Parcourez notre boutique pour trouver les produits dont vous avez besoin.</p>
                            <Link href="/store" className="inline-block bg-[#FBBF24] text-[#111827] font-bold py-3 px-6 rounded-lg hover:bg-[#F59E0B] transition-colors">
                                Retour à la boutique
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
                            {/* --- 2. Amélioration du design de la liste d'articles --- */}
                            <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md border border-gray-200 space-y-6">
                                <h2 className="text-2xl font-semibold text-gray-800 border-b pb-4">Articles du Panier ({cartItems.length})</h2>
                                {cartItems.map((item: CartItem) => {
                                    const imageUrl = item.images && item.images.length > 0 ? item.images[0] : null;
                                    return (
                                        <div key={item.id} className="flex items-center gap-4 border-b pb-6 last:border-b-0 last:pb-0">
                                            <div className="relative w-24 h-24 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                                                {imageUrl ? (
                                                    <Image src={imageUrl} alt={item.name} fill className="object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center"><ImageIcon className="w-8 h-8 text-gray-300" /></div>
                                                )}
                                            </div>
                                            <div className="flex-grow">
                                                <h3 className="font-semibold text-lg text-gray-800">{item.name}</h3>
                                                <p className="text-sm text-gray-500">{item.category}</p>
                                                <p className="text-md font-bold text-[#111827] mt-1">{item.price.toFixed(2)} $</p>
                                            </div>
                                            <div className="flex flex-col items-end gap-2">
                                                {/* Contrôles de quantité améliorés */}
                                                <div className="flex items-center border rounded-md">
                                                    <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)} className="p-2 hover:bg-gray-100 disabled:opacity-50" disabled={item.quantity <= 1}>
                                                        <Minus size={16} />
                                                    </button>
                                                    <span className="px-3 font-medium">{item.quantity}</span>
                                                    <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)} className="p-2 hover:bg-gray-100">
                                                        <Plus size={16} />
                                                    </button>
                                                </div>
                                                <button onClick={() => handleRemove(item.id)} className="text-xs text-red-500 hover:text-red-700 hover:underline">
                                                    Retirer
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Résumé et paiement */}
                            <div className="lg:col-span-1">
                                <div className="sticky top-24">
                                    <div className="bg-white p-6 rounded-xl shadow-md border mb-6">
                                        <h2 className="text-xl font-semibold mb-4">Résumé</h2>
                                        <div className="space-y-3 text-gray-600">
                                            <div className="flex justify-between"><span>Sous-total</span><span>{subtotal.toFixed(2)} $</span></div>
                                            <div className="flex justify-between"><span>Livraison</span><span>Calculée à l&apos;étape suivante</span></div>
                                        </div>
                                        <div className="flex justify-between mt-4 border-t pt-4">
                                            <span className="text-lg font-bold text-[#111827]">Total</span>
                                            <span className="text-lg font-bold text-[#111827]">{subtotal.toFixed(2)} $</span>
                                        </div>
                                    </div>
                                    <CheckoutForm cartItems={cartItems.map(item => ({ productId: item.id, quantity: item.quantity }))} />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </>
    );
}
