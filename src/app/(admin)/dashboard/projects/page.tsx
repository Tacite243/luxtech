"use client";

import { useEffect, useState } from 'react';
import { Project } from '@prisma/client';
import toast from 'react-hot-toast';
import { Plus, Edit, Trash2, X } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchProjects, createProject, updateProject, deleteProject } from '@/redux/features/projectsSlices';
import ProjectForm, { ProjectOutputValues } from '@/components/ProjectForm';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function ProjectsAdminPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const dispatch = useAppDispatch();
    const { projects, status } = useAppSelector((state) => state.projects);
    const { isLoading: isActionLoading } = useAppSelector((state) => state.ui);

    useEffect(() => {
        dispatch(fetchProjects());
    }, [dispatch]);

    const handleOpenModal = (project: Project | null = null) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => setIsModalOpen(false);

    const handleSubmit = async (data: ProjectOutputValues) => {
        if (selectedProject) {
            // Cas de la mise à jour
            await toast.promise(
                dispatch(updateProject({ id: selectedProject.id, data })).unwrap(),
                {
                    loading: 'Mise à jour du projet...',
                    success: 'Projet mis à jour avec succès !',
                    error: (err) => err || 'Erreur lors de la mise à jour.',
                }
            );
        } else {
            // Cas de la création
            await toast.promise(
                dispatch(createProject(data)).unwrap(),
                {
                    loading: 'Création du projet...',
                    success: 'Projet créé avec succès !',
                    error: (err) => err || 'Erreur lors de la création.',
                }
            );
        }
        handleCloseModal();
    };

    const handleDelete = async (projectId: string) => {
        if (!window.confirm("Êtes-vous sûr ?")) return;
        await toast.promise(dispatch(deleteProject(projectId)).unwrap(), {
            loading: 'Suppression...',
            success: 'Projet supprimé !',
            error: (err) => err || 'Erreur lors de la suppression.',
        });
    }

    const isListLoading = status === 'loading';

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Gestion des Projets</h1>
                <button onClick={() => handleOpenModal()} className="inline-flex items-center gap-2 rounded-md bg-[#FBBF24] py-2 px-4 text-sm font-bold text-[#111827] shadow-sm hover:bg-[#F59E0B]">
                    <Plus size={18} />
                    Ajouter un Projet
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-md border overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th className="px-6 py-3">Projet</th>
                            <th className="px-6 py-3">Catégorie</th>
                            <th className="px-6 py-3">Date</th>
                            <th className="px-6 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isListLoading ? (
                            <tr><td colSpan={4} className="text-center p-8">Chargement...</td></tr>
                        ) : (
                            projects.map((project: Project) => (
                                <tr key={project.id} className="border-b hover:bg-gray-50">
                                    <td className="px-6 py-4 flex items-center gap-4">
                                        <Image src={project.mainImage} alt={project.title} width={60} height={40} className="rounded-md object-cover bg-gray-100" />
                                        <span className="font-medium text-gray-900">{project.title}</span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">{project.category}</td>
                                    <td className="px-6 py-4 text-gray-600">{new Date(project.projectDate).toLocaleDateString('fr-FR')}</td>
                                    <td className="px-6 py-4 flex gap-4 justify-end">
                                        <button onClick={() => handleOpenModal(project)} className="text-blue-600 hover:text-blue-800"><Edit size={18} /></button>
                                        <button onClick={() => handleDelete(project.id)} className="text-red-600 hover:text-red-800"><Trash2 size={18} /></button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

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
                            className="fixed top-0 right-0 h-full w-full max-w-2xl bg-gray-100 shadow-2xl flex flex-col z-40"
                        >
                            <div className="flex-shrink-0 px-6 py-4 flex items-center justify-between border-b bg-white">
                                <h2 className="text-xl font-semibold text-gray-900">
                                    {selectedProject ? 'Modifier le Projet' : 'Nouveau Projet'}
                                </h2>
                                <button onClick={handleCloseModal} className="p-1 rounded-full hover:bg-gray-200">
                                    <X size={24} />
                                </button>
                            </div>
                            <ProjectForm
                                project={selectedProject}
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