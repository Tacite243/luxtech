"use client";

import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchStats, createStat, updateStat, deleteStat } from '@/redux/features/statsSlice';
import { Stat } from '@prisma/client';
import { Edit, Trash2, Plus, X } from 'lucide-react';
import StatForm, { StatOutputValues } from '@/components/StatForm';
import { motion, AnimatePresence } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import toast from 'react-hot-toast';



// Mapper les noms de chaînes de caractères aux composants d'icônes
const iconMap: { [key: string]: React.ElementType } = {
    Smile: LucideIcons.Smile,
    FolderKanban: LucideIcons.FolderKanban,
    Headset: LucideIcons.Headset,
    Users: LucideIcons.Users,
    Award: LucideIcons.Award,
    ClipboardList: LucideIcons.ClipboardList,
};

export default function StatsPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedStat, setSelectedStat] = useState<Stat | null>(null);

    const dispatch = useAppDispatch();
    const { stats, status, error: listError } = useAppSelector((state) => state.stats);
    const { isLoading: isActionLoading } = useAppSelector((state) => state.ui);

    useEffect(() => {
        dispatch(fetchStats());
    }, [dispatch]);

    const handleOpenModal = (stat: Stat | null = null) => {
        setSelectedStat(stat);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => setIsModalOpen(false);

    const handleSubmit = async (data: StatOutputValues) => {
        if (selectedStat) {
            // Cas de la mise à jour
            await toast.promise(
                dispatch(updateStat({ id: selectedStat.id, data })).unwrap(),
                {
                    loading: 'Mise à jour...',
                    success: () => {
                        handleCloseModal();
                        return 'Statistique mise à jour !';
                    },
                    error: (err) => err || 'Erreur lors de la mise à jour.',
                }
            );
        } else {
            // Cas de la création
            await toast.promise(
                dispatch(createStat(data)).unwrap(),
                {
                    loading: 'Création...',
                    success: () => {
                        handleCloseModal();
                        return 'Statistique créée !';
                    },
                    error: (err) => err || 'Erreur lors de la création.',
                }
            );
        }
    };

    const handleDelete = async (statId: string) => {
        if (!window.confirm("Êtes-vous sûr ?")) return;
        await toast.promise(dispatch(deleteStat(statId)).unwrap(), {
            loading: 'Suppression...',
            success: 'Statistique supprimée !',
            error: (err) => err || 'Erreur lors de la suppression.',
        });
    };

    const isLoading = status === 'loading';

    const renderContent = () => {
        if (isLoading) {
            return <tr><td colSpan={5} className="text-center p-8 text-gray-500">Chargement...</td></tr>;
        }
        if (status === 'failed') {
            return <tr><td colSpan={5} className="text-center p-8 text-red-500">{listError || "Une erreur est survenue."}</td></tr>;
        }
        if (stats.length === 0) {
            return <tr><td colSpan={5} className="text-center p-8 text-gray-500">Aucune statistique trouvée.</td></tr>;
        }
        return stats.map((stat: Stat) => {
            const IconComponent = iconMap[stat.icon] || LucideIcons.HelpCircle;
            return (
                <tr key={stat.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4"><IconComponent className="text-gray-600" /></td>
                    <td className="px-6 py-4 font-medium text-gray-900">{stat.label}</td>
                    <td className="px-6 py-4 font-mono">{stat.target}</td>
                    <td className="px-6 py-4">{stat.order}</td>
                    <td className="px-6 py-4 flex gap-4 justify-end">
                        <button onClick={() => handleOpenModal(stat)} className="text-blue-600 hover:text-blue-800"><Edit size={18} /></button>
                        <button onClick={() => handleDelete(stat.id)} className="text-red-600 hover:text-red-800"><Trash2 size={18} /></button>
                    </td>
                </tr>
            );
        });
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-[#111827]">Gestion des Statistiques</h1>
                <button
                    onClick={() => handleOpenModal()}
                    className="inline-flex items-center gap-2 rounded-md bg-[#FBBF24] py-2 px-4 text-sm font-bold text-[#111827] shadow-sm hover:bg-[#F59E0B]"
                >
                    <Plus size={18} />
                    Ajouter une Statistique
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">Icône</th>
                            <th scope="col" className="px-6 py-3">Label</th>
                            <th scope="col" className="px-6 py-3">Cible</th>
                            <th scope="col" className="px-6 py-3">Ordre</th>
                            <th scope="col" className="px-6 py-3"><span className="sr-only">Actions</span></th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderContent()}
                    </tbody>
                </table>
            </div>

            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 z-30"
                        onClick={handleCloseModal}
                    >
                        <motion.div
                            initial={{ x: '100%' }} animate={{ x: '0%' }} exit={{ x: '100%' }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            onClick={e => e.stopPropagation()}
                            className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col z-40"
                        >
                            <div className="flex-shrink-0 px-6 py-4 flex items-center justify-between border-b">
                                <h2 className="text-xl font-semibold text-gray-900">
                                    {selectedStat ? 'Modifier la Statistique' : 'Nouvelle Statistique'}
                                </h2>
                                <button onClick={handleCloseModal} className="p-1 rounded-full hover:bg-gray-200">
                                    <X size={24} />
                                </button>
                            </div>
                            <StatForm
                                stat={selectedStat}
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