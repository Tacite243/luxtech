"use client";

import { motion, Variants } from 'framer-motion';
import { CheckCircle, PlayCircle } from 'lucide-react';
import Image from 'next/image';

// --- Variantes d'Animation ---
const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.25 } } // Délai entre l'animation des deux colonnes
};

export default function AboutStorySection() {
    return (
        <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            className="about bg-[#FFFFFF] py-16 md:py-24"
        >
            <div className="container mx-auto px-6">
                {/* Grille principale à deux colonnes */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">

                    {/* === Colonne de Gauche : Contenu Textuel === */}
                    <motion.div variants={fadeInUp}>
                        <h2 className="text-3xl md:text-4xl font-bold text-[#374151] mb-6">
                            Notre Engagement pour l&apos;Excellence
                        </h2>
                        <div className="our-story bg-[#f8f9fa] p-8 md:p-10 rounded-md">
                            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Depuis 2020</h4>
                            <h3 className="text-2xl font-bold text-[#000000] mt-1 mb-4">Notre Histoire</h3>
                            <p className="text-[#6b7280] mb-4">
                                Fondée sur une passion pour l&apos;innovation et la qualité, LuxTech Services s&apos;est engagée à fournir des solutions complètes qui allient expertise technique, sécurité et design moderne.
                            </p>
                            <ul className="space-y-3 mb-6">
                                <li className="flex items-start">
                                    <CheckCircle size={20} className="text-[#FFC107] mt-1 mr-3 flex-shrink-0" />
                                    <span className="text-[#4b5563]">Fiabilité et respect des délais pour chaque projet.</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle size={20} className="text-[#FFC107] mt-1 mr-3 flex-shrink-0" />
                                    <span className="text-[#4b5563]">Utilisation de matériaux de haute qualité et durables.</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle size={20} className="text-[#FFC107] mt-1 mr-3 flex-shrink-0" />
                                    <span className="text-[#4b5563]">Suivi personnalisé et satisfaction client garantie.</span>
                                </li>
                            </ul>
                            <p className="text-[#6b7280] mb-8">
                                Chaque projet est une opportunité de démontrer notre savoir-faire et de construire une relation de confiance durable avec nos clients.
                            </p>

                            <div className="watch-video flex items-center">
                                <a href="#" className="flex items-center group text-lg font-semibold text-[#000000]">
                                    <PlayCircle size={48} className="text-[#FF0000] mr-2 transition-transform duration-300 group-hover:scale-110" strokeWidth={1.5} />
                                    <span>Voir notre vidéo</span>
                                </a>
                            </div>
                        </div>
                    </motion.div>

                    {/* === Colonne de Droite : Image === */}
                    <motion.div variants={fadeInUp}>
                        <Image
                            src="/img/about.jpg"
                            alt="Notre équipe travaillant sur un projet de construction"
                            width={800}
                            height={900}
                            className="rounded-md w-full h-auto shadow-lg"
                        />
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
}