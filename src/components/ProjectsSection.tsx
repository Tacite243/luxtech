"use client";

import { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import Image from 'next/image';
import { Plus, Link as LinkIcon } from 'lucide-react';

// --- Données des Projets ---

const projectsData = [
    { id: 1, title: 'Résidence Moderne', category: 'Construction', imageUrl: '/img/projects/construction-1.jpg' },
    { id: 2, title: 'Rénovation de Cuisine', category: 'Rénovation', imageUrl: '/img/projects/remodeling-1.jpg' },
    { id: 3, title: 'Système Électrique Commercial', category: 'Électricité', imageUrl: '/img/projects/repairs-1.jpg' },
    { id: 4, title: 'Design Intérieur Loft', category: 'Design', imageUrl: '/img/projects/design-1.jpg' },
    { id: 5, title: 'Extension de Maison', category: 'Construction', imageUrl: '/img/projects/construction-2.jpg' },
    { id: 6, title: 'Mise aux Normes Électriques', category: 'Électricité', imageUrl: '/img/projects/repairs-2.jpg' },
    { id: 7, title: 'Aménagement de Bureau', category: 'Design', imageUrl: '/img/projects/design-2.jpg' },
    { id: 8, title: 'Réfection de Salle de Bain', category: 'Rénovation', imageUrl: '/img/projects/remodeling-2.jpg' },
    { id: 9, title: 'Fondations & Gros Œuvre', category: 'Construction', imageUrl: '/img/projects/construction-3.jpg' },
];

const categories = ['Tous', 'Construction', 'Rénovation', 'Électricité', 'Design'];

// --- Variantes d'Animation ---
const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

export default function ProjectsSection() {
    const [activeFilter, setActiveFilter] = useState('Tous');

    const filteredProjects = activeFilter === 'Tous'
        ? projectsData
        : projectsData.filter(project => project.category === activeFilter);

    return (
        <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            className="bg-[#FFFFFF] py-16 md:py-24"
        >
            <div className="container mx-auto px-6">
                {/* En-tête de la section */}
                <motion.div variants={fadeInUp} className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#000000]">Nos Projets</h2>
                    <div className="w-20 h-1 bg-[#FF0000] my-4 mx-auto" />
                    <p className="text-lg text-[#6b7280]">
                        Découvrez quelques-unes de nos réalisations qui témoignent de notre engagement pour la qualité, l'innovation et la satisfaction de nos clients.
                    </p>
                </motion.div>

                {/* Filtres des projets */}
                <motion.ul variants={fadeInUp} className="flex justify-center flex-wrap gap-2 md:gap-4 mb-12">
                    {categories.map(category => (
                        <li key={category}>
                            <button
                                onClick={() => setActiveFilter(category)}
                                className={`px-4 py-2 text-sm md:text-base font-semibold rounded-md transition-colors duration-300 ${activeFilter === category
                                        ? 'bg-[#FF0000] text-[#FFFFFF]'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                            >
                                {category}
                            </button>
                        </li>
                    ))}
                </motion.ul>

                {/* Grille des projets */}
                <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    <AnimatePresence>
                        {filteredProjects.map(project => (
                            <motion.div
                                key={project.id}
                                layout
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.4, ease: 'easeInOut' }}
                                className="relative group overflow-hidden rounded-lg shadow-lg"
                            >
                                <Image
                                    src={project.imageUrl}
                                    alt={`Projet: ${project.title}`}
                                    width={600}
                                    height={400}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-[#000000]/30 transition-all duration-500 group-hover:bg-[#000000]/70" />
                                <div className="absolute inset-0 p-6 flex flex-col justify-end text-[#FFFFFF] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <motion.div
                                        initial={{ y: 20 }}
                                        animate={{ y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.1 }}
                                    >
                                        <h4 className="text-xl font-bold">{project.title}</h4>
                                        <p className="text-sm text-gray-200">{project.category}</p>
                                        <div className="flex gap-3 mt-4">
                                            <a href={project.imageUrl} title="Agrandir" className="bg-[#FF0000] p-2 rounded-full hover:bg-[#D90000] transition-colors"><Plus size={20} /></a>
                                            <a href="#" title="Voir les détails" className="bg-[#FF0000] p-2 rounded-full hover:bg-[#D90000] transition-colors"><LinkIcon size={20} /></a>
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </motion.section>
    );
}