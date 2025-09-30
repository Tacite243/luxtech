"use client";

import { motion, Variants } from 'framer-motion';
import { HardHat, Zap, Paintbrush, BrainCircuit, Key, Wrench, ArrowRight } from 'lucide-react';

// --- Données des Services ---
const servicesData = [
    {
        icon: HardHat,
        title: "Construction Moderne",
        description: "Nous gérons des projets de construction clés en main, en respectant les normes de qualité et de sécurité les plus strictes."
    },
    {
        icon: Zap,
        title: "Installations Électriques",
        description: "Installation complète de réseaux, systèmes de protection, et dépannage rapide pour garantir votre sécurité et tranquillité d'esprit."
    },
    {
        icon: Paintbrush,
        title: "Design & Agencement",
        description: "Conception d'espaces fonctionnels et esthétiques : faux plafonds, luminaires décoratifs, peintures modernes et sols élégants."
    },
    {
        icon: BrainCircuit,
        title: "Solutions Domotiques",
        description: "Intégration de solutions innovantes et économes en énergie, comme l'éclairage intelligent pour un confort de vie simplifié."
    },
    {
        icon: Key,
        title: "Projets Clés en Main",
        description: "De l'étude de faisabilité à la livraison finale, nous assurons un suivi attentif pour une valeur ajoutée réelle et un projet sans souci."
    },
    {
        icon: Wrench,
        title: "Dépannage & Maintenance",
        description: "Un service professionnel et personnalisé pour la maintenance de vos installations et un dépannage efficace pour assurer leur fiabilité."
    }
];

// --- Animation Variants ---
const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export default function ServicesGridSection() {
    return (
        <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            className="bg-[#f8f9fa] py-16 md:py-24"
        >
            <div className="container mx-auto px-6">
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {servicesData.map((service, index) => (
                        <motion.div
                            key={index}
                            variants={fadeInUp}
                            className="service-item relative bg-[#FFFFFF] p-8 rounded-lg shadow-md border-b-4 border-transparent hover:border-[#FF0000] hover:-translate-y-2 transition-all duration-300 group"
                        >
                            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-6 group-hover:bg-[#FF0000]/10 transition-colors duration-300">
                                <service.icon size={32} className="text-[#FF0000]" strokeWidth={1.5} />
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-[#000000]">{service.title}</h3>
                            <p className="text-gray-600 mb-4">{service.description}</p>
                            <a href="#" className="font-semibold text-[#FF0000] inline-flex items-center stretched-link">
                                En savoir plus <ArrowRight size={16} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                            </a>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </motion.section>
    );
}