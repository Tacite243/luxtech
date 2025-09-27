"use client";

import { motion, Variants } from 'framer-motion';
import { Zap, Paintbrush, HardHat, ArrowRight, Key, BrainCircuit, Wrench } from 'lucide-react';

const servicesData = [
    { icon: HardHat, title: "Construction Moderne & Durable", description: "Réalisation de constructions clés en main, respectant les normes de qualité et de sécurité les plus strictes, de l'étude à la réalisation." },
    { icon: Zap, title: "Installations Électriques & Sécurité", description: "Installation complète de réseaux, mise en place de systèmes de protection, et dépannage rapide pour garantir votre sécurité et tranquillité d'esprit." },
    { icon: Paintbrush, title: "Design & Agencement Intérieur", description: "Conception d'espaces fonctionnels et esthétiques : faux plafonds design, luminaires décoratifs, peintures modernes et sols élégants." },
    { icon: BrainCircuit, title: "Solutions Domotiques Intelligentes", description: "Intégration de solutions innovantes et économes en énergie, comme l'éclairage LED intelligent et la domotique pour un confort de vie simplifié." },
    { icon: Key, title: "Projets Clés en Main", description: "Nous gérons votre projet de A à Z. De l'étude de faisabilité à la livraison finale, nous assurons un suivi attentif pour une valeur ajoutée réelle." },
    { icon: Wrench, title: "Dépannage & Maintenance", description: "Un service professionnel et personnalisé pour la maintenance de vos installations et un dépannage efficace pour assurer leur fiabilité à long terme." }
];

// Variante pour l'animation des éléments enfants (fade in + slide up)
const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

// CHANGEMENT ICI : Variante pour le conteneur principal qui orchestre la cascade
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

export default function ServicesSection() {
    return (
        <motion.section
            initial="hidden"
            whileInView="visible"
            // viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            className="bg-[#f8f9fa] py-16 md:py-24"
        >
            <div className="container mx-auto px-6">
                <motion.div variants={fadeInUp} className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#000000]">Nos Services</h2>
                    <div className="w-20 h-1 bg-[#FF0000] my-4 mx-auto" />
                    <p className="text-lg text-[#6b7280]">
                        Découvrez comment notre expertise en construction, électricité et design peut transformer vos espaces et simplifier votre vie.
                    </p>
                </motion.div>

                <motion.div
                    variants={{
                        visible: { transition: { staggerChildren: 0.1 } }
                    }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {servicesData.map((service, index) => (
                        <motion.div
                            key={index}
                            variants={fadeInUp}
                            className="bg-[#FFFFFF] p-8 rounded-lg shadow-lg text-center transition-transform duration-300 hover:-translate-y-2 flex flex-col"
                        >
                            <div className="inline-block p-4 bg-[#f8f9fa] rounded-full mb-4 mx-auto">
                                <service.icon size={32} className="text-[#FF0000]" strokeWidth={1.5} />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-[#000000]">{service.title}</h3>
                            <p className="text-[#6b7280] mb-6 flex-grow">{service.description}</p>
                            <a href="#" className="font-semibold text-[#FF0000] inline-flex items-center justify-center group mt-auto">
                                En savoir plus
                                <ArrowRight size={16} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                            </a>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </motion.section>
    );
}