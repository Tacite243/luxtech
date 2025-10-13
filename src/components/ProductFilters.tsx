"use client";

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, X } from 'lucide-react';



const categories = ["Tous", "Matériaux", "Outillage", "Électricité", "Finition", "Équipement de sécurité"];
const sortOptions = [
    { name: "Prix : Croissant", value: "price-asc" },
    { name: "Prix : Décroissant", value: "price-desc" },
];

export default function ProductFilters() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const activeCategory = searchParams.get('category') || "Tous";

    // --- Logique pour gérer les catégories ---
    const handleCategoryClick = (category: string) => {
        const params = new URLSearchParams(searchParams.toString());

        // Si on clique sur "Tous", on retire le paramètre 'category'
        if (category === "Tous") {
            params.delete('category');
        } else {
            params.set('category', category);
        }

        params.set('page', '1');
        router.push(pathname + '?' + params.toString());
    };

    // Fonction pour mettre à jour les paramètres de l'URL
    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set(name, value);
            // Réinitialiser la page à 1 lors du changement de filtre
            params.set('page', '1');
            return params.toString();
        },
        [searchParams]
    );

    // Un composant réutilisable pour le contenu des filtres (principe DRY)
    const FilterContent = () => (
        <div className="space-y-8">
            <div>
                <h3 className="text-xl font-bold text-[#111827] mb-4 border-b pb-2">Catégories</h3>
                <motion.ul
                    variants={{
                        visible: { transition: { staggerChildren: 0.05 } }
                    }}
                    initial="hidden"
                    animate="visible"
                    className="space-y-2"
                >
                    {categories.map(category => (
                        <motion.li
                            key={category}
                            variants={{
                                hidden: { opacity: 0, x: -20 },
                                visible: { opacity: 1, x: 0 }
                            }}
                            className="relative"
                        >
                            <button
                                onClick={() => handleCategoryClick(category)}
                                className={`w-full text-left p-2 rounded-md transition-colors text-base relative z-10 ${activeCategory === category
                                    ? 'text-[#111827] font-semibold'
                                    : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                            >
                                {category}
                            </button>
                            {activeCategory === category && (
                                <motion.div
                                    layoutId="activeCategoryBackground"
                                    className="absolute inset-0 bg-[#FBBF24] rounded-md z-0"
                                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                />
                            )}
                        </motion.li>
                    ))}
                </motion.ul>
            </div>
            <div>
                <h3 className="text-xl font-bold text-[#111827] mb-4 border-b pb-2">Trier par</h3>
            </div>
        </div>
    );

    return (
        <>
            {/* === BOUTON POUR MOBILE === */}
            {/* Ce bouton n'est visible que sur les écrans plus petits que `lg` */}
            <div className="lg:hidden mb-8">
                <button
                    onClick={() => setIsMobileMenuOpen(true)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm font-semibold text-[#111827]"
                >
                    <SlidersHorizontal size={20} />
                    Filtrer & Trier
                </button>
            </div>

            {/* === PANNEAU LATÉRAL POUR DESKTOP === */}
            {/* Ce panneau est caché sur mobile/tablette (`hidden`) et visible sur desktop (`lg:block`) */}
            <div className="hidden lg:block sticky top-24 bg-white p-6 rounded-xl shadow-sm border">
                <FilterContent />
            </div>

            {/* === MODAL PLEIN ÉCRAN POUR MOBILE === */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 z-40 lg:hidden"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        <motion.div
                            initial={{ y: '100%' }}
                            animate={{ y: '0%' }}
                            exit={{ y: '100%' }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            onClick={(e) => e.stopPropagation()} // Empêche la fermeture au clic sur le contenu
                            className="absolute bottom-0 left-0 w-full bg-gray-100 rounded-t-2xl shadow-2xl"
                        >
                            {/* En-tête du Modal */}
                            <div className="flex items-center justify-between p-4 border-b">
                                <h2 className="text-xl font-bold text-[#111827]">Filtres</h2>
                                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 rounded-full hover:bg-gray-200">
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Contenu des filtres */}
                            <div className="p-6">
                                <FilterContent />
                            </div>

                            {/* Pied de page du Modal */}
                            <div className="p-4 border-t bg-white">
                                <button
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="w-full py-3 bg-[#FBBF24] text-[#111827] font-bold rounded-lg"
                                >
                                    Voir les résultats
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}