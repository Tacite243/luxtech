"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTopButton() {
    const [isVisible, setIsVisible] = useState(false);

    // Gère la visibilité du bouton
    const toggleVisibility = () => {
        if (window.scrollY > 300) { // Le bouton apparaît après 300px de défilement
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // Fait défiler la page vers le haut
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth', // Pour un défilement fluide
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        // Nettoie l'écouteur d'événement pour éviter les fuites de mémoire
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                    onClick={scrollToTop}
                    className="fixed bottom-6 right-6 z-50 bg-[#FF0000] text-[#FFFFFF] p-3 rounded-md shadow-lg hover:bg-[#D90000] transition-colors"
                    aria-label="Retourner en haut de la page"
                >
                    <ArrowUp size={20} />
                </motion.button>
            )}
        </AnimatePresence>
    );
}