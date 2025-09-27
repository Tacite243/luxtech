"use client";

import { motion, Variants } from 'framer-motion';
import { Smile, FolderKanban, Headset, Users } from 'lucide-react';
import AnimatedCounter from './AnimatedCounter'; // Import our new counter

// --- Données des Statistiques ---
const statsData = [
    {
        icon: Smile,
        target: 127,
        label: "Clients Satisfaits"
    },
    {
        icon: FolderKanban,
        target: 84,
        label: "Projets Réalisés"
    },
    {
        icon: Headset,
        target: 2400,
        label: "Heures d'Assistance"
    },
    {
        icon: Users,
        target: 12,
        label: "Collaborateurs Experts"
    }
];

// --- Variantes d'Animation ---
const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

export default function StatsSection() {
    return (
        <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
            className="bg-[#f8f9fa] py-16"
        >
            <div className="container mx-auto px-6">
                {/* Grille responsive pour les statistiques */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {statsData.map((stat, index) => (
                        <motion.div key={index} variants={fadeInUp}>
                            <div className="stats-item bg-[#FFFFFF] p-6 rounded-lg shadow-md flex items-center w-full h-full">
                                {/* Icône */}
                                <stat.icon size={48} className="text-[#FFC107] flex-shrink-0 mr-5" strokeWidth={1.5} />
                                {/* Contenu textuel */}
                                <div>
                                    <span className="text-4xl font-bold text-[#000000]">
                                        <AnimatedCounter to={stat.target} />
                                    </span>
                                    <p className="text-gray-500 mt-1">{stat.label}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.section>
    );
}