// src/components/HeroCarousel.tsx (ou HeroSection.tsx)
"use client";

import { useState, useEffect } from 'react';
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

    const paginate = (newDirection: number) => {
        setPage([page + newDirection, newDirection]);
    };

    const imageIndex = ((page % images.length) + images.length) % images.length;

    useEffect(() => {
        const interval = setInterval(() => {
            paginate(1);
        }, 5000);
        return () => clearInterval(interval);
    }, [page]);

    return (
        <section className="relative h-screen w-full overflow-hidden bg-primary">
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

            <div className="absolute inset-0 bg-black/70" />

            <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white px-4">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-4xl md:text-6xl font-extrabold"
                >
                    {/* NOUVEAU TITRE */}
                    Transformez vos espaces
                    <br />
                    avec <span className="text-secondary">LuxTech</span>
                </motion.h1>

                {/* LIGNE JAUNE RETIRÉE POUR UN LOOK PLUS ÉPURÉ */}

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    className="mt-6 max-w-2xl text-lg text-gray-300"
                >
                    {/* NOUVEAU PARAGRAPHE */}
                    Notre entreprise allie expertise technique et créativité pour offrir des services complets en construction, électricité et design d'intérieur.
                </motion.p>
                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.9 }}
                    className="mt-8 px-8 py-3 font-semibold rounded-full border-2 border-accent-yellow text-accent-yellow hover:bg-accent-yellow hover:text-primary transition-all duration-300"
                >
                    Commencer un projet
                </motion.button>
            </div>

            <button onClick={() => paginate(-1)} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/20 p-2 hover:bg-white/40">
                <FiChevronLeft size={24} className="text-white" />
            </button>
            <button onClick={() => paginate(1)} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/20 p-2 hover:bg-white/40">
                <FiChevronRight size={24} className="text-white" />
            </button>
        </section>
    );
}
