"use client";

import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchOrders, OrderWithUser } from '@/redux/features/ordersSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Package, Truck, CheckCircle, XCircle } from 'lucide-react';

// Helper pour le style des badges de statut
const getStatusBadge = (status: string) => {
    switch (status) {
        case 'PENDING': return 'bg-yellow-100 text-yellow-800';
        case 'PAID': return 'bg-blue-100 text-blue-800';
        case 'SHIPPED': return 'bg-indigo-100 text-indigo-800';
        case 'DELIVERED': return 'bg-green-100 text-green-800';
        case 'CANCELLED': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
    }
};

export default function OrdersAdminPage() {
    const [selectedOrder, setSelectedOrder] = useState<OrderWithUser | null>(null);

    const dispatch = useAppDispatch();
    const { orders, status } = useAppSelector((state) => state.orders);

    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);

    const handleCloseDetails = () => setSelectedOrder(null);

    const isListLoading = status === 'loading';

    return (
        <>
            <div>
                <h1 className="text-3xl font-bold">Gestion des Commandes</h1>
                <p className="mt-2 text-gray-600">Consultez et mettez à jour les commandes de vos clients.</p>
            </div>

            <div className="mt-8 bg-white rounded-xl shadow-md border overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th className="px-6 py-3">Commande ID</th>
                            <th className="px-6 py-3">Client</th>
                            <th className="px-6 py-3">Date</th>
                            <th className="px-6 py-3">Statut</th>
                            <th className="px-6 py-3 text-right">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isListLoading ? (
                            <tr><td colSpan={5} className="text-center p-8">Chargement...</td></tr>
                        ) : (
                            orders.map((order) => (
                                <tr key={order.id} onClick={() => setSelectedOrder(order)} className="border-b hover:bg-gray-50 cursor-pointer">
                                    <td className="px-6 py-4 font-mono text-xs text-gray-600">#{order.id.slice(-8)}</td>
                                    <td className="px-6 py-4 font-medium text-gray-900">{order.user.name || 'N/A'}</td>
                                    <td className="px-6 py-4 text-gray-600">{new Date(order.createdAt).toLocaleDateString('fr-FR')}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right font-semibold">{order.total.toFixed(2)} €</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Panneau de détails de la commande */}
            <AnimatePresence>
                {selectedOrder && (
                    <motion.div className="fixed inset-0 bg-black/60 z-30" onClick={handleCloseDetails}>
                        <motion.div
                            initial={{ x: '100%' }} animate={{ x: '0%' }} exit={{ x: '100%' }}
                            onClick={e => e.stopPropagation()}
                            className="fixed top-0 right-0 h-full w-full max-w-lg bg-gray-100 shadow-2xl flex flex-col z-40"
                        >
                            <div className="flex-shrink-0 p-6 flex items-center justify-between border-b bg-white">
                                <div>
                                    <h2 className="text-xl font-semibold">Commande #{selectedOrder.id.slice(-8)}</h2>
                                    <p className="text-sm text-gray-500">par {selectedOrder.user.name}</p>
                                </div>
                                <button onClick={handleCloseDetails} className="p-1 rounded-full hover:bg-gray-200"><X size={24} /></button>
                            </div>

                            <div className="flex-grow p-6 overflow-y-auto space-y-6">
                                {/* TODO: Afficher les détails des produits de la commande */}
                                <div className="bg-white p-4 rounded-lg border">
                                    <h3 className="font-semibold mb-2">Produits</h3>
                                    <p className="text-sm text-gray-500">Détails des produits à implémenter.</p>
                                </div>
                                <div className="bg-white p-4 rounded-lg border">
                                    <h3 className="font-semibold mb-2">Statut de la Commande</h3>
                                    {/* TODO: Créer un formulaire pour mettre à jour le statut */}
                                    <select defaultValue={selectedOrder.status} className="w-full mt-1 rounded-md border-gray-300">
                                        <option>PENDING</option>
                                        <option>PAID</option>
                                        <option>SHIPPED</option>
                                        <option>DELIVERED</option>
                                        <option>CANCELLED</option>
                                    </select>
                                    <button className="mt-2 w-full bg-[#FBBF24] text-[#111827] font-bold py-2 rounded-md">Mettre à jour</button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}