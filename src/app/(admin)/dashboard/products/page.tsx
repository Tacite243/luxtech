"use client";

import { useEffect, useState } from 'react';
import { Product } from '@prisma/client';
import toast from 'react-hot-toast';
import { Plus, Edit, Trash2, X } from 'lucide-react';
import ProductForm, { ProductOutputValues } from '@/components/ProductForm';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct
} from '@/redux/features/productsSlice';




export default function ProductsPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const dispatch = useAppDispatch();
    // L'erreur ici est résolue en corrigeant store.ts
    const { products, status: listStatus } = useAppSelector((state) => state.products);
    const { isLoading: isActionLoading } = useAppSelector((state) => state.ui);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const handleOpenModal = (product: Product | null = null) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => setIsModalOpen(false);

    const handleSubmit = async (data: ProductOutputValues) => {
        // --- CORRECTION : Ne pas utiliser de variable intermédiaire pour l'action ---
        if (selectedProduct) {
            // Cas de la mise à jour
            await toast.promise(
                dispatch(updateProduct({ id: selectedProduct.id, data })).unwrap(),
                {
                    loading: 'Mise à jour...',
                    success: () => {
                        dispatch(fetchProducts());
                        handleCloseModal();
                        return 'Produit mis à jour !';
                    },
                    error: (err) => err || 'Erreur lors de la mise à jour.',
                }
            );
        } else {
            // Cas de la création
            await toast.promise(
                dispatch(createProduct(data)).unwrap(),
                {
                    loading: 'Création...',
                    success: () => {
                        dispatch(fetchProducts());
                        handleCloseModal();
                        return 'Produit créé !';
                    },
                    error: (err) => err || 'Erreur lors de la création.',
                }
            );
        }
    };

    const handleDelete = async (productId: string) => {
        if (!window.confirm("Êtes-vous sûr ?")) return;
        await toast.promise(dispatch(deleteProduct(productId)).unwrap(), {
            loading: 'Suppression...',
            success: 'Produit supprimé !',
            error: (err) => err || 'Erreur lors de la suppression.',
        });
    }

    const isListLoading = listStatus === 'loading';

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-[#111827]">Gestion des Produits</h1>
                <button
                    onClick={() => handleOpenModal()}
                    className="inline-flex items-center gap-2 rounded-md bg-[#FBBF24] py-2 px-4 text-sm font-bold text-[#111827] shadow-sm hover:bg-[#F59E0B]"
                >
                    <Plus size={18} />
                    Ajouter un Produit
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">Produit</th>
                            <th scope="col" className="px-6 py-3">Catégorie</th>
                            <th scope="col" className="px-6 py-3">Prix</th>
                            <th scope="col" className="px-6 py-3">Stock</th>
                            <th scope="col" className="px-6 py-3"><span className="sr-only">Actions</span></th>
                        </tr>
                    </thead>
                    <tbody>
                        {isListLoading ? (
                            <tr><td colSpan={5} className="text-center p-8">Chargement de la liste...</td></tr>
                        ) : (
                            // --- CORRECTION : Typer explicitement le paramètre `product` ---
                            products.map((product: Product) => (
                                <tr key={product.id} className="bg-white border-b hover:bg-gray-50">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{product.name}</th>
                                    <td className="px-6 py-4">{product.category}</td>
                                    <td className="px-6 py-4">{product.price} €</td>
                                    <td className="px-6 py-4">{product.stock}</td>
                                    <td className="px-6 py-4 text-right flex gap-4 justify-end">
                                        <button onClick={() => handleOpenModal(product)} className="font-medium text-blue-600 hover:underline"><Edit size={18} /></button>
                                        <button onClick={() => handleDelete(product.id)} className="font-medium text-red-600 hover:underline"><Trash2 size={18} /></button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <AnimatePresence>
                {isModalOpen && (
                    <motion.div /* ... */ >
                        <motion.div /* ... */ >
                            {/* ... */}
                            <ProductForm
                                product={selectedProduct}
                                onSubmit={handleSubmit}
                                onClose={handleCloseModal}
                                isLoading={isActionLoading}
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
