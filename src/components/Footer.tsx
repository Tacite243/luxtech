"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ShoppingCart,
  Home,
  Info,
  Briefcase,
  FolderOpen,
  Phone,
  ShoppingBag,
} from "lucide-react";
import { useAppSelector } from "@/redux/hooks";

const navLinks = [
  { name: "Accueil", href: "/", icon: Home },
  { name: "À Propos", href: "/about", icon: Info },
  { name: "Services", href: "/services", icon: Briefcase },
  { name: "Projets", href: "/projets", icon: FolderOpen },
  { name: "Boutique", href: "/store", icon: ShoppingBag },
  // J'ai retiré "Contact" du menu du bas pour garder 5 icônes, un standard ergonomique.
  // Il sera accessible via le menu overlay.
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const cartItems = useAppSelector((state) => state.cart.items);
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Effet pour le scroll et pour marquer le montage côté client
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    setIsClient(true);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Icône burger personnalisée comme dans votre image de référence
  const BurgerIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 12H21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 6H21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 18H15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  return (
    <>
      {/* -------- NAVBAR DESKTOP (inchangée) -------- */}
      <header
        className={`hidden md:fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${scrolled ? "bg-[#111827]/90 backdrop-blur-sm shadow-lg" : "bg-transparent"
          }`}
      >
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-white">
            Lux<span className="text-[#FBBF24]">Tech</span>
          </Link>
          <div className="flex items-center space-x-8">
            {[...navLinks, { name: 'Contact', href: '/contact' }].map((link) => { // Ajouter Contact ici pour le desktop
              const isActive = pathname === link.href;
              const baseClasses = `relative text-lg font-medium transition-colors duration-300`;
              const normalLink = `${baseClasses} ${isActive ? 'text-[#FBBF24]' : 'text-gray-200 hover:text-white'}`;
              const storeLink = `${baseClasses} border border-[#FBBF24] px-4 py-1 rounded-lg hover:bg-[#FBBF24] hover:text-[#111827] transition-all duration-300 ${isActive ? 'bg-[#FBBF24] text-[#111827]' : 'text-[#FBBF24]'}`;
              // ... (le reste de la logique des liens desktop est correcte)
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={storeLink ? storeLink : normalLink}
                >
                  {link.name}
                  {!storeLink && isActive && (
                    <motion.span
                      layoutId="underline"
                      className="absolute left-0 -bottom-1 block h-0.5 w-full bg-[#FBBF24]"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
            <Link href="/cart" className="relative text-gray-200 hover:text-white ml-3">
              <ShoppingCart size={24} />
              {isClient && totalItems > 0 && (
                <span className="absolute -top-2 -right-3 flex items-center justify-center w-5 h-5 bg-[#FBBF24] text-[#111827] text-xs font-bold rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </nav>
      </header>

      {/* -------- NOUVELLE NAVBAR TOP POUR MOBILE -------- */}
      <div
        className={`md:hidden fixed top-0 left-0 w-full z-40 transition-all duration-300 ease-in-out ${scrolled ? "bg-[#111827]/90 backdrop-blur-sm" : "bg-transparent"
          }`}
      >
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-white">
            Lux<span className="text-[#FBBF24]">Tech</span>
          </Link>
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white z-50 relative p-2 -mr-2"
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                key={isOpen ? "close" : "open"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {isOpen ? <X size={28} /> : <BurgerIcon />}
              </motion.div>
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* -------- NAVBAR MOBILE DU BAS (conservée) -------- */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#111827]/80 backdrop-blur-lg border-t border-gray-800 shadow-[0_-2px_10px_rgba(0,0,0,0.4)] z-50 rounded-t-2xl">
        <ul className="flex justify-around items-center h-16">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <li key={`bottom-nav-${link.name}`}>
                <Link href={link.href} className={`flex flex-col items-center text-xs font-medium transition-all duration-300 ${isActive ? "text-[#FBBF24] scale-105" : "text-gray-400 hover:text-white"}`}>
                  <Icon size={22} />
                  <span className="mt-1">{link.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* -------- MENU OVERLAY POUR MOBILE (contrôlé par le burger du haut) -------- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-[#111827] z-30 md:hidden"
          >
            <motion.ul
              variants={{
                open: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
                closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
              }}
              initial="closed"
              animate="open"
              exit="closed"
              className="flex flex-col items-center justify-center h-full space-y-8"
            >
              {/* On peut mettre tous les liens ici, y compris le panier et le contact */}
              {[...navLinks, { name: 'Panier', href: '/cart', icon: ShoppingCart }, { name: 'Contact', href: '/contact', icon: Phone }].map((link, i) => (
                <motion.li
                  key={`overlay-${link.name}`}
                  variants={{
                    open: { y: 0, opacity: 1, transition: { y: { stiffness: 1000, velocity: -100 } } },
                    closed: { y: 50, opacity: 0, transition: { y: { stiffness: 1000 } } }
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-3xl font-semibold text-gray-300 hover:text-[#FBBF24] transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}