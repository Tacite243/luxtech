"use client";

import { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import Image from 'next/image';
import { Plus, Link as LinkIcon } from 'lucide-react';
import { detailedProjectsData } from '@/lib/project-data';

// --- Type Definition for Props ---
interface ProjectsSectionProps {
    showTitle?: boolean;
}

// --- Données des Projets ---
const projectsData = detailedProjectsData;

const categories = ['Tous', 'Construction', 'Rénovation', 'Électricité', 'Design'];


const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};


// Modify the component to accept the new prop
export default function ProjectsSection({ showTitle = true }: ProjectsSectionProps) {
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
                {showTitle && (
                    <motion.div variants={fadeInUp} className="text-center max-w-3xl mx-auto mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#000000]">Nos Projets</h2>
                        <div className="w-20 h-1 bg-[#FF0000] my-4 mx-auto" />
                        <p className="text-lg text-[#6b7280]">
                            Découvrez quelques-unes de nos réalisations qui témoignent de notre engagement pour la qualité, l&apos;innovation et la satisfaction de nos clients.
                        </p>
                    </motion.div>
                )}

                <motion.ul variants={fadeInUp} className="flex justify-center flex-wrap gap-2 md:gap-4 mb-12">
                    {categories.map(category => (
                        <li key={category}>
                            <button
                                onClick={() => setActiveFilter(category)}
                                // Updated styles for filters to match the image
                                className={`px-4 py-2 text-sm md:text-base font-semibold rounded-md transition-colors duration-300 ${activeFilter === category
                                    ? 'text-[#FFC107]' // Active color is now yellow
                                    : 'text-gray-700 hover:text-[#FFC107]'
                                    }`}
                            >
                                {category}
                            </button>
                        </li>
                    ))}
                </motion.ul>

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
                                    src={project.mainImage}
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
                                            <a href={project.mainImage} title="Agrandir" className="bg-[#FF0000] p-2 rounded-full hover:bg-[#D90000] transition-colors"><Plus size={20} /></a>
                                            <a href={`/projets/${project.id}`} title="Voir les détails" className="bg-[#FF0000] p-2 rounded-full hover:bg-[#D90000] transition-colors"><LinkIcon size={20} /></a>
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