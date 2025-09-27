"use client";

import { motion, Variants } from 'framer-motion';
import Link from 'next/link';

// Interface pour définir les props que notre composant accepte
interface PageHeaderProps {
    title: string;
    breadcrumbs: {
        name: string;
        href?: string;
    }[];
}

// Variantes d'animation
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.1 } }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

export default function HearoInterrior({ title, breadcrumbs }: PageHeaderProps) {
    return (
        // La section principale avec l'image de fond et la superposition
        <section
            className="relative bg-cover bg-center bg-no-repeat py-24 md:py-32"
            // REMPLACEZ CETTE IMAGE PAR CELLE DE VOTRE CHOIX POUR LES EN-TÊTES
            style={{ backgroundImage: "url('/img/breadcrumbs-bg.jpg')" }}
        >
            {/* Superposition sombre pour la lisibilité */}
            <div className="absolute inset-0 bg-[#000000]/60" />

            {/* Contenu centré avec animations */}
            <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center"
            >
                <motion.h2
                    variants={itemVariants}
                    className="text-4xl md:text-5xl font-bold text-[#FFFFFF]"
                >
                    {title}
                </motion.h2>

                <motion.ol
                    variants={itemVariants}
                    className="mt-4 flex items-center gap-2 text-lg text-[#FFFFFF]"
                >
                    {breadcrumbs.map((crumb, index) => (
                        <li key={index} className="flex items-center gap-2">
                            {crumb.href ? (
                                // Si le fil d'Ariane a un lien
                                <Link href={crumb.href} className="hover:text-[#FFC107] transition-colors">
                                    {crumb.name}
                                </Link>
                            ) : (
                                // Sinon, c'est la page active
                                <span className="text-[#FFC107]">{crumb.name}</span>
                            )}
                            {/* Ajoute un séparateur sauf pour le dernier élément */}
                            {index < breadcrumbs.length - 1 && <span>/</span>}
                        </li>
                    ))}
                </motion.ol>
            </motion.div>
        </section>
    );
}