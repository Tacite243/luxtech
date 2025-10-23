"use client";

import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { updateQuantity, removeFromCart, CartItem } from "@/redux/features/cartSlice";
import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import CheckoutForm from "@/components/CheckoutForm";



export default function CartPage() {
    const dispatch = useAppDispatch();
    const { items: cartItems } = useAppSelector((state) => state.cart);

    const handleQuantityChange = (productId: string, quantity: number) => {
        dispatch(updateQuantity({ productId, quantity }));
    };

    const handleRemove = (productId: string) => {
        dispatch(removeFromCart(productId));
    };

    const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <main className="container mx-auto py-24 px-6">
            <h1 className="text-3xl font-bold mb-8">Votre Panier</h1>

            {cartItems.length === 0 ? (
                <div className="text-center py-16">
                    <p className="text-xl text-gray-600">Votre panier est vide.</p>
                    <Link href="/store" className="mt-4 inline-block text-lg text-[#FBBF24] hover:underline">
                        Continuer vos achats
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Liste des articles */}
                    <div className="lg:col-span-2 space-y-6">
                        {cartItems.map((item: CartItem) => (
                            <div key={item.id} className="flex items-center bg-white p-4 rounded-lg shadow-sm border">
                                <Image src={item.images[0]} alt={item.name} width={80} height={80} className="rounded-md object-cover" />
                                <div className="flex-grow ml-4">
                                    <h3 className="font-semibold">{item.name}</h3>
                                    <p className="text-sm text-gray-500">{item.price.toFixed(2)} €</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <input
                                        type="number"
                                        min="1"
                                        value={item.quantity}
                                        onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                                        className="w-16 text-center border rounded-md"
                                    />
                                    <button onClick={() => handleRemove(item.id)} className="text-red-500 hover:text-red-700">
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Résumé et paiement */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24">
                            <div className="bg-white p-6 rounded-lg shadow-md border mb-6">
                                <h2 className="text-xl font-semibold mb-4">Résumé de la commande</h2>
                                <div className="flex justify-between">
                                    <span>Sous-total</span>
                                    <span className="font-bold">{subtotal.toFixed(2)} €</span>
                                </div>
                                {/* ... (frais de port, taxes, etc.) ... */}
                                <div className="flex justify-between mt-4 border-t pt-4">
                                    <span className="text-lg font-bold">Total</span>
                                    <span className="text-lg font-bold">{subtotal.toFixed(2)} €</span>
                                </div>
                            </div>
                            <CheckoutForm cartItems={cartItems.map(item => ({ productId: item.id, quantity: item.quantity }))} />
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}