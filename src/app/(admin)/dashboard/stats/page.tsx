"use client";

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchStats } from '@/redux/features/statsSlice';
import { Stat } from '@prisma/client';
import { Edit, Trash2, Plus } from 'lucide-react';
// Vous devrez créer un StatForm, similaire à ProductForm

export default function StatsPage() {
    const dispatch = useAppDispatch();
    const { stats, status } = useAppSelector((state) => state.stats);

    useEffect(() => {
        dispatch(fetchStats());
    }, [dispatch]);

    const isLoading = status === 'loading';

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-[#111827]">Gestion des Statistiques</h1>
                <button className="inline-flex items-center gap-2 rounded-md bg-[#FBBF24] py-2 px-4 text-sm font-bold text-[#111827] shadow-sm hover:bg-[#F59E0B]">
                    <Plus size={18} />
                    Ajouter une Statistique
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-md border border-gray-200">
                <table className="w-full">
                    {/* ... (thead du tableau) ... */}
                    <tbody>
                        {isLoading ? (
                            <tr><td colSpan={4}>Chargement...</td></tr>
                        ) : (
                            stats.map((stat: Stat) => (
                                <tr key={stat.id} className="border-b">
                                    <td className="p-4">{stat.icon}</td>
                                    <td className="p-4 font-medium">{stat.label}</td>
                                    <td className="p-4">{stat.target}</td>
                                    <td className="p-4 flex gap-2 justify-end">
                                        <button className="text-blue-600"><Edit size={18} /></button>
                                        <button className="text-red-600"><Trash2 size={18} /></button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            {/* Ici, vous intégrerez votre modal avec le StatForm */}
        </div>
    );
}