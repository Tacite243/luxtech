"use client";

import { useEffect, useState } from 'react';
import { Product } from '@prisma/client';
import axiosInstance from '@/lib/axiosInstance';
import toast from 'react-hot-toast';
import { Plus, Edit, Trash2, X } from 'lucide-react';
import ProductForm, { ProductOutputValues } from '@/components/ProductForm';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [isListLoading, setIsListLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const fetchProducts = async () => {
    setIsListLoading(true);
    try {
      const response = await axiosInstance.get('/products');
      setProducts(response.data);
    } catch (error) {
      toast.error("Erreur lors du chargement des produits.");
    } finally {
      setIsListLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleOpenModal = (product: Product | null = null) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const handleSubmit = async (data: ProductOutputValues) => {
    setIsFormLoading(true);
    const promise = selectedProduct
      ? axiosInstance.put(`/products/${selectedProduct.id}`, data)
      : axiosInstance.post('/products', data);

    toast.promise(promise, {
      loading: 'Enregistrement...',
      success: () => {
        fetchProducts();
        handleCloseModal();
        return `Produit ${selectedProduct ? 'mis à jour' : 'créé'} !`;
      },
      error: `Erreur lors de la ${selectedProduct ? 'mise à jour' : 'création'}.`,
    }).finally(() => setIsFormLoading(false));
  };
  
  const handleDelete = async (productId: string) => {
    if (!window.confirm("Êtes-vous sûr ?")) return;
    toast.promise(axiosInstance.delete(`/products/${productId}`), {
      loading: 'Suppression...',
      success: () => { fetchProducts(); return 'Produit supprimé !'; },
      error: 'Erreur lors de la suppression.',
    });
  }

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
                <tr><td colSpan={5} className="text-center p-8">Chargement...</td></tr>
            ) : products.map(product => (
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
            ))}
          </tbody>
        </table>
      </div>

      {/* --- MODAL (DRAWER) POUR LE FORMULAIRE --- */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-30"
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: '0%' }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              onClick={e => e.stopPropagation()}
              className="fixed top-0 right-0 h-full w-full max-w-lg bg-white shadow-2xl flex flex-col z-40"
            >
              <div className="flex-shrink-0 px-6 py-4 flex items-center justify-between border-b">
                <h2 className="text-xl font-semibold text-gray-900">
                  {selectedProduct ? 'Modifier le Produit' : 'Nouveau Produit'}
                </h2>
                <button onClick={handleCloseModal} className="p-1 rounded-full hover:bg-gray-200">
                  <X size={24} />
                </button>
              </div>
              <ProductForm 
                product={selectedProduct} 
                onSubmit={handleSubmit} 
                onClose={handleCloseModal} 
                isLoading={isFormLoading} 
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}