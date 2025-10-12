"use client";

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Image from 'next/image';

const images = [
    '/img/hero-carousel/hero-carousel-1.jpg',
    '/img/hero-carousel/hero-carousel-2.jpg',
    '/img/hero-carousel/hero-carousel-3.jpg',
    '/img/hero-carousel/hero-carousel-4.jpg',
    '/img/hero-carousel/hero-carousel-5.jpg',
];

const slideVariants: Variants = {
    hidden: (direction: number) => ({
        x: direction > 0 ? '100%' : '-100%',
        opacity: 0,
    }),
    visible: {
        x: '0%',
        opacity: 1,
        transition: { duration: 0.5, ease: 'easeInOut' },
    },
    exit: (direction: number) => ({
        x: direction < 0 ? '100%' : '-100%',
        opacity: 0,
        transition: { duration: 0.5, ease: 'easeInOut' },
    }),
};

export default function HeroSection() {
    const [[page, direction], setPage] = useState([0, 0]);

    // 2. Envelopper la fonction `paginate` dans useCallback
    // Elle ne sera recréée que si `page` change.
    const paginate = useCallback(
        (newDirection: number) => {
            setPage([page + newDirection, newDirection]);
        }, [page]
    );

    const imageIndex = ((page % images.length) + images.length) % images.length;

    useEffect(() => {
        const interval = setInterval(() => {
            paginate(1);
        }, 5000);
        return () => clearInterval(interval);
    }, [paginate]);

    return (
        <section className="relative h-screen w-full overflow-hidden bg-[#000000]">
            <AnimatePresence initial={false} custom={direction}>
                <motion.div
                    key={page}
                    custom={direction}
                    variants={slideVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute inset-0 h-full w-full"
                >
                    <Image
                        src={images[imageIndex]}
                        alt="Projets de construction et d'installation électrique par LuxTech"
                        fill
                        style={{ objectFit: 'cover' }}
                        priority={true}
                    />
                </motion.div>
            </AnimatePresence>

            <div className="absolute inset-0 bg-[#000000]/70" />

            <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-[#FFFFFF] px-4">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-4xl md:text-6xl font-extrabold"
                >
                    Transformez vos espaces
                    <br />
                    {/* Le mot LuxTech en ROUGE (#FF0000) */}
                    avec <span className="text-[#FF0000]">LuxTech</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    // Texte en blanc cassé (#e5e7eb) pour être plus doux à l'oeil
                    className="mt-6 max-w-2xl text-lg text-[#e5e7eb]"
                >
                    Notre entreprise allie expertise technique et créativité pour offrir des services complets en construction, électricité et design d&apos;intérieur.
                </motion.p>
                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.9 }}
                    // Bouton ROUGE (#FF0000) avec texte BLANC (#FFFFFF)
                    className="mt-8 px-8 py-3 font-semibold rounded-md bg-[#FF0000] text-[#FFFFFF] hover:bg-[#D90000] transition-all duration-300"
                >
                    Découvrir nos services
                </motion.button>
            </div>

            {/* Contrôles de navigation neutres */}
            <button onClick={() => paginate(-1)} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/20 p-2 hover:bg-white/40">
                <FiChevronLeft size={24} className="text-white" />
            </button>
            <button onClick={() => paginate(1)} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/20 p-2 hover:bg-white/40">
                <FiChevronRight size={24} className="text-white" />
            </button>
        </section>
    );
}