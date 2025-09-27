"use client";

import { useRef, useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import { Star, Quote } from 'lucide-react';

// --- Données des Témoignages ---

const testimonialsData = [
    {
        name: "Client A",
        role: "Propriétaire de Villa",
        quote: "LuxTech a transformé notre maison avec une installation électrique impeccable et un design lumineux. Un service fiable et très professionnel, je recommande vivement !",
        imageUrl: "/img/testimonials/testimonials-1.jpg",
        rating: 5,
    },
    {
        name: "Client B",
        role: "Gérant de Boutique",
        quote: "Leur équipe a géré la rénovation de notre espace commercial de A à Z. Le résultat est au-delà de nos attentes, alliant esthétique et fonctionnalité.",
        imageUrl: "/img/testimonials/testimonials-2.jpg",
        rating: 5,
    },
    {
        name: "Client C",
        role: "Architecte Partenaire",
        quote: "Collaborer avec LuxTech est un plaisir. Leur expertise technique et leur respect des délais en font un partenaire de choix pour des projets complexes.",
        imageUrl: "/img/testimonials/testimonials-3.jpg",
        rating: 5,
    },
    {
        name: "Client D",
        role: "Particulier",
        quote: "Le système de domotique installé a simplifié notre quotidien. Une équipe à l'écoute et des solutions vraiment innovantes. La satisfaction est totale.",
        imageUrl: "/img/testimonials/testimonials-4.jpg",
        rating: 5,
    },
];

// --- Variantes d'Animation ---
const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

export default function TestimonialsSection() {
    const [width, setWidth] = useState(0);
    const carouselRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (carouselRef.current) {
            // Calcule la largeur maximale pour le glissement
            setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
        }
    }, []);

    return (
        <motion.section
            initial="hidden"
            whileInView="visible"
            // viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            className="bg-[#f8f9fa] py-16 md:py-24 overflow-hidden"
        >
            <div className="container mx-auto px-6">
                {/* En-tête de la section */}
                <motion.div variants={fadeInUp} className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#000000]">Témoignages</h2>
                    <div className="w-20 h-1 bg-[#FF0000] my-4 mx-auto" />
                    <p className="text-lg text-[#6b7280]">
                        La confiance et la satisfaction de nos clients sont notre plus grande fierté. Découvrez ce qu&apos;ils disent de notre collaboration.
                    </p>
                </motion.div>

                {/* Carrousel */}
                <motion.div
                    ref={carouselRef}
                    className="cursor-grab"
                    whileTap={{ cursor: "grabbing" }}
                >
                    <motion.div
                        drag="x"
                        dragConstraints={{ right: 0, left: -width }}
                        className="flex gap-8"
                    >
                        {testimonialsData.map((testimonial, index) => (
                            <motion.div key={index} className="min-w-[90%] sm:min-w-[45%] lg:min-w-[30%]">
                                <div className="bg-[#FFFFFF] p-8 rounded-lg shadow-lg h-full">
                                    <div className="flex items-start gap-4">
                                        <Image
                                            src={testimonial.imageUrl}
                                            alt={`Photo de ${testimonial.name}`}
                                            width={80}
                                            height={80}
                                            className="rounded-full border-4 border-white shadow-md -mt-12"
                                        />
                                        <div>
                                            <h3 className="font-bold text-lg text-[#000000]">{testimonial.name}</h3>
                                            <p className="text-sm text-gray-500">{testimonial.role}</p>
                                            <div className="flex mt-1">
                                                {Array.from({ length: testimonial.rating }).map((_, i) => (
                                                    <Star key={i} size={16} className="text-[#FFC107]" fill="#FFC107" />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <p className="mt-6 text-gray-600 relative">
                                        <Quote size={24} className="absolute -top-2 -left-4 text-gray-200" strokeWidth={1.5} />
                                        {testimonial.quote}
                                        <Quote size={24} className="absolute -bottom-2 -right-4 text-gray-200 rotate-180" strokeWidth={1.5} />
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </motion.section>
    );
}