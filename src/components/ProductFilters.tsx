"use client";

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, SlidersHorizontal, X } from 'lucide-react';




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
    const [isSortOpen, setIsSortOpen] = useState(false);
    const sortRef = useRef<HTMLDivElement>(null);

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

    // --- Logique pour gérer le tri (inchangée et correcte) ---
    const handleSortChange = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('sort', value);
        params.set('page', '1');
        router.push(pathname + '?' + params.toString());
    };

    // Hook pour gérer la fermeture au clic extérieur
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
                setIsSortOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [sortRef]);

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
                <div ref={sortRef} className="relative">
                    {/* Le bouton qui affiche la sélection actuelle */}
                    <button
                        onClick={() => setIsSortOpen(!isSortOpen)}
                        className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FBBF24] focus:border-[#FBBF24] transition"
                    >
                        <span className="text-gray-700">
                            {sortOptions.find(opt => opt.value === searchParams.get('sort'))?.name || 'Pertinence'}
                        </span>
                        <motion.div
                            animate={{ rotate: isSortOpen ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <ChevronDown size={20} className="text-gray-500" />
                        </motion.div>
                    </button>

                    {/* Le menu déroulant animé */}
                    <AnimatePresence>
                        {isSortOpen && (
                            <motion.ul
                                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                transition={{ duration: 0.15, ease: 'easeOut' }}
                                className="absolute top-full left-0 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-20 overflow-hidden"
                            >
                                {[{ name: 'Pertinence', value: '' }, ...sortOptions].map(option => (
                                    <li key={option.value}>
                                        <button
                                            onClick={() => handleSortChange(option.value)}
                                            className="w-full text-left px-4 py-3 hover:bg-[#FBBF24] hover:text-[#111827] transition-colors"
                                        >
                                            {option.name}
                                        </button>
                                    </li>
                                ))}
                            </motion.ul>
                        )}
                    </AnimatePresence>
                </div>
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