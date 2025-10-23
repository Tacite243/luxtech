"use client";

import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
    fetchUsers,
    createUser,
    updateUser,
    deleteUser,
    type SafeUser,
    type UserFormData
} from '@/redux/features/usersSlice';
import { Plus, Edit, Trash2, X } from 'lucide-react';
import UserForm from '@/components/UserForm';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';



export default function UsersAdminPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<SafeUser | null>(null);

    const dispatch = useAppDispatch();
    const { users, status } = useAppSelector((state) => state.users);
    const { isLoading: isActionLoading } = useAppSelector((state) => state.ui);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const handleOpenModal = (user: SafeUser | null = null) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => setIsModalOpen(false);

    const handleSubmit = async (data: UserFormData) => {
        if (selectedUser) {
            // Cas de la mise à jour
            await toast.promise(
                dispatch(updateUser({ id: selectedUser.id, data })).unwrap(),
                {
                    loading: 'Mise à jour...',
                    success: 'Utilisateur mis à jour avec succès !',
                    error: (err) => err || 'Erreur lors de la mise à jour.',
                }
            );
        } else {
            // Cas de la création
            await toast.promise(
                dispatch(createUser(data)).unwrap(),
                {
                    loading: 'Création...',
                    success: 'Utilisateur créé avec succès !',
                    error: (err) => err || 'Erreur lors de la création.',
                }
            );
        }
        handleCloseModal();
    };

    const handleDelete = async (userId: string) => {
        if (!window.confirm("Êtes-vous sûr ?")) return;
        await toast.promise(dispatch(deleteUser(userId)).unwrap(), {
            loading: 'Suppression...',
            success: 'Utilisateur supprimé !',
            error: (err) => err || 'Erreur lors de la suppression.',
        });
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Gestion des Utilisateurs</h1>
                <button onClick={() => handleOpenModal()} className="inline-flex items-center gap-2 rounded-md bg-[#FBBF24] py-2 px-4 text-sm font-bold text-[#111827] shadow-sm hover:bg-[#F59E0B]">
                    <Plus size={18} />
                    Ajouter un Utilisateur
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-md border overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="bg-gray-50">
                            <th className="px-6 py-3 text-left">Nom</th>
                            <th className="px-6 py-3 text-left">Email</th>
                            <th className="px-6 py-3 text-left">Rôle</th>
                            <th className="px-6 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {status === 'loading' ? (
                            <tr><td colSpan={4} className="text-center p-8">Chargement...</td></tr>
                        ) : (
                            users.map((user: SafeUser) => (
                                <tr key={user.id} className="border-b">
                                    <td className="px-6 py-4 font-medium">{user.name}</td>
                                    <td className="px-6 py-4">{user.email}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${user.role === 'SUPERADMIN' ? 'bg-red-200 text-red-800' :
                                            user.role === 'ADMIN' ? 'bg-yellow-200 text-yellow-800' :
                                                'bg-blue-200 text-blue-800'
                                            }`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 flex gap-2 justify-end">
                                        <button onClick={() => handleOpenModal(user)}><Edit size={18} /></button>
                                        <button onClick={() => handleDelete(user.id)}><Trash2 size={18} /></button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <AnimatePresence>
                {isModalOpen && (
                    <motion.div className="fixed inset-0 bg-black/60 z-30" onClick={handleCloseModal}>
                        <motion.div
                            initial={{ x: '100%' }} animate={{ x: '0%' }} exit={{ x: '100%' }}
                            onClick={e => e.stopPropagation()}
                            className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col z-40"
                        >
                            <div className="flex-shrink-0 px-6 py-4 flex items-center justify-between border-b">
                                <h2 className="text-xl font-semibold">{selectedUser ? 'Modifier' : 'Nouvel'} Utilisateur</h2>
                                <button onClick={handleCloseModal}><X size={24} /></button>
                            </div>
                            <UserForm
                                user={selectedUser}
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