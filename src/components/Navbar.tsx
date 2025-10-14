"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';



const navLinks = [
  { name: 'Accueil', href: '/' },
  { name: 'À Propos', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Projets', href: '/projets' },
  { name: 'Boutique', href: '/store' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Hook pour détecter le défilement
  useEffect(() => {
    const handleScroll = () => {
      // Si on a défilé de plus de 10px, on met `scrolled` à true
      setScrolled(window.scrollY > 10);
    };

    // Ajouter l'écouteur d'événement
    window.addEventListener('scroll', handleScroll);

    // Nettoyer l'écouteur quand le composant est démonté (très important !)
    return () => window.removeEventListener('scroll', handleScroll);
  }, []); // Le tableau vide signifie que cet effet ne s'exécute qu'une fois (au montage)

  // Icône personnalisée pour le menu burger
  const BurgerIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
    </svg>
  );

  return (
    // Les classes de l'en-tête changent dynamiquement
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${scrolled ? 'bg-[#111827]/90 backdrop-blur-sm shadow-lg' : 'bg-transparent'
        }`}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-white">
            Lux<span className="text-[#FBBF24]">Tech</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  // Le texte change de couleur pour rester lisible sur la Hero Section
                  className={`relative text-lg font-medium transition-colors duration-300 ${isActive ? 'text-[#FBBF24]' : 'text-gray-200 hover:text-white'
                    }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.span
                      layoutId="underline"
                      className="absolute left-0 -bottom-1 block h-0.5 w-full bg-[#FBBF24]"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white z-50 relative">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div> */}
          <div className="md:hidden">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white z-50 relative p-2 -mr-2" // Zone de clic plus grande
              whileTap={{ scale: 0.9 }} // Effet de clic
            >
              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  key={isOpen ? 'close' : 'open'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* On affiche l'icône X ou notre BurgerIcon personnalisé */}
                  {isOpen ? <X size={28} /> : <BurgerIcon />}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Le menu mobile reste inchangé, son design est déjà bon pour un overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: '0%' }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-0 bg-[#111827] z-40 md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full">
              <ul className="space-y-8 text-center">
                {navLinks.map((link) => {
                  // On recalcule `isActive` à l'intérieur de cette boucle
                  const isActive = pathname === link.href;

                  return (
                    <li key={`mobile-${link.name}`}>
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        // On utilise une classe dynamique comme pour le desktop
                        className={`text-3xl font-semibold transition-colors ${isActive ? 'text-[#FBBF24]' : 'text-gray-200 hover:text-[#FBBF24]'
                          }`}
                      >
                        {link.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};