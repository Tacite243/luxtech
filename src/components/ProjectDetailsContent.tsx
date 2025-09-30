"use client";

import { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import type { Project } from '@/lib/project-data';

interface ProjectDetailsProps {
    project: Project;
}

const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

export default function ProjectDetailsContent({ project }: ProjectDetailsProps) {
    const [index, setIndex] = useState(0);

    const nextImage = () => {
        setIndex(prevIndex => (prevIndex + 1) % project.galleryImages.length);
    };

    const prevImage = () => {
        setIndex(prevIndex => (prevIndex - 1 + project.galleryImages.length) % project.galleryImages.length);
    };

    return (
        // Section principale avec un fond blanc (#FFFFFF)
        <motion.section
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
            className="project-details bg-[#FFFFFF] py-16 md:py-24"
        >
            <div className="container mx-auto px-6">
                <motion.div variants={fadeInUp} className="relative mb-8">
                    {/* Image Slider */}
                    <div className="relative h-[300px] md:h-[500px] w-full overflow-hidden rounded-lg shadow-lg">
                        <AnimatePresence>
                            <motion.div
                                key={index}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                className="absolute inset-0"
                            >
                                <Image
                                    src={project.galleryImages[index]}
                                    alt={`Image ${index + 1} du projet ${project.title}`}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                            </motion.div>
                        </AnimatePresence>
                    </div>
                    {/* Contrôles du slider avec couleurs en dur */}
                    <button onClick={prevImage} className="absolute top-1/2 left-4 -translate-y-1/2 bg-[#000000]/50 text-[#FFFFFF] p-2 rounded-full hover:bg-[#000000]/80 transition-colors"><ChevronLeft /></button>
                    <button onClick={nextImage} className="absolute top-1/2 right-4 -translate-y-1/2 bg-[#000000]/50 text-[#FFFFFF] p-2 rounded-full hover:bg-[#000000]/80 transition-colors"><ChevronRight /></button>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
                    {/* Description du Projet (Colonne de Gauche) */}
                    <motion.div variants={fadeInUp} className="lg:col-span-8">
                        <div className="portfolio-description">
                            <h2 className="text-3xl font-bold text-[#000000] mb-4">{project.title}</h2>
                            <div
                                className="prose max-w-none text-[#4b5563]"
                                dangerouslySetInnerHTML={{ __html: project.description }}
                            />

                            {project.testimonial && (
                                <div className="testimonial-item mt-8 p-6 bg-[#f9fafb] border-l-4 border-[#FFC107] rounded-r-lg">
                                    <p className="italic text-[#374151] relative">
                                        <Quote size={24} className="absolute -top-2 -left-3 text-[#e5e7eb]" />
                                        {project.testimonial.quote}
                                    </p>
                                    <div className="mt-4">
                                        <h3 className="font-bold text-[#000000]">{project.testimonial.author}</h3>
                                        <h4 className="text-sm text-[#6b7280]">{project.testimonial.role}</h4>
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>

                    {/* Informations du Projet (Colonne de Droite) */}
                    <motion.div variants={fadeInUp} className="lg:col-span-4">
                        <div className="portfolio-info bg-[#f9fafb] p-6 rounded-lg shadow-sm">
                            <h3 className="text-xl font-bold mb-4 border-b pb-2 text-[#000000] border-[#e5e7eb]">Informations du Projet</h3>
                            <ul>
                                <li className="mb-3 text-[#374151]"><strong>Catégorie:</strong> <span className="text-[#4b5563]">{project.category}</span></li>
                                <li className="mb-3 text-[#374151]"><strong>Client:</strong> <span className="text-[#4b5563]">{project.client}</span></li>
                                <li className="mb-3 text-[#374151]"><strong>Date du Projet:</strong> <span className="text-[#4b5563]">{project.projectDate}</span></li>
                                <li className="mb-4 text-[#374151]"><strong>URL du Projet:</strong> <a href={project.projectUrl} className="text-[#FF0000] hover:underline">Visiter le site</a></li>
                            </ul>
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
}