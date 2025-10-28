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
  { name: "Contact", href: "/contact", icon: Phone },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // --- Gérer l'état d'hydratation ---
  const [isClient, setIsClient] = useState(false);

  const cartItems = useAppSelector((state) => state.cart.items);
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Effet pour le scroll et pour marquer le montage côté client
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);

    // Marquer le composant comme monté côté client après le premier rendu
    setIsClient(true);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Icône burger personnalisée
  const BurgerIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-7 w-7"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6h16M4 12h16m-7 6h7"
      />
    </svg>
  );

  return (
    <>
      {/* -------- NAVBAR DESKTOP -------- */}
      <header
        className={`hidden md:block fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${scrolled
            ? "bg-[#111827]/90 backdrop-blur-sm shadow-lg"
            : "bg-transparent"
          }`}
      >
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-white">
            Lux<span className="text-[#FBBF24]">Tech</span>
          </Link>

          <div className="flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const isStore = link.name === "Boutique";
              const baseClasses = "relative text-lg font-medium transition-colors duration-300";
              const normalLink = `${baseClasses} ${isActive ? "text-[#FBBF24]" : "text-gray-200 hover:text-white"}`;
              const storeLink = `${baseClasses} border border-[#FBBF24] px-4 py-1 rounded-lg hover:bg-[#FBBF24] hover:text-[#111827] transition-all duration-300 ${isActive ? "bg-[#FBBF24] text-[#111827]" : "text-[#FBBF24]"}`;

              return (
                <Link key={link.name} href={link.href} className={isStore ? storeLink : normalLink}>
                  {link.name}
                  {!isStore && isActive && (
                    <motion.span
                      layoutId="underline"
                      className="absolute left-0 -bottom-1 block h-0.5 w-full bg-[#FBBF24]"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}

            <Link href="/cart" className="relative text-gray-200 hover:text-white ml-3">
              <ShoppingCart size={24} />
              {/* --- N'afficher le badge que si on est côté client --- */}
              {isClient && totalItems > 0 && (
                <span className="absolute -top-2 -right-3 flex items-center justify-center w-5 h-5 bg-[#FBBF24] text-[#111827] text-xs font-bold rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </nav>
      </header>

      {/* -------- NAVBAR MOBILE (EN BAS) -------- */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#111827]/70 backdrop-blur-lg border-t border-gray-800 shadow-[0_-2px_10px_rgba(0,0,0,0.4)] z-50 rounded-t-2xl">
        <ul className="flex justify-around items-center py-3">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const isStore = link.name === "Boutique";
            const Icon = link.icon;

            return (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={`flex flex-col items-center text-xs font-medium transition-all duration-300 ${isStore
                      ? `border border-[#FBBF24] px-3 py-1 rounded-xl shadow-md backdrop-blur-md ${isActive
                        ? "bg-[#FBBF24] text-[#111827] shadow-[0_0_10px_rgba(251,191,36,0.5)] scale-105"
                        : "text-[#FBBF24] hover:bg-[#FBBF24]/10 hover:scale-105"
                      }`
                      : isActive
                        ? "text-[#FBBF24] scale-105"
                        : "text-gray-400 hover:text-[#FBBF24]"
                    }`}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Icon size={22} />
                  </motion.div>
                  <span>{link.name}</span>
                </Link>
              </li>
            );
          })}

          {/* --- Panier Mobile --- */}
          <li>
            <Link
              href="/cart"
              className="relative flex flex-col items-center text-gray-400 hover:text-[#FBBF24] transition-all duration-300"
            >
              <motion.div
                whileTap={{ scale: 0.9 }}
                className="relative flex flex-col items-center"
              >
                <ShoppingCart size={22} />
                <span>Panier</span>
                {/* --- N'afficher le badge que si on est côté client --- */}
                {isClient && totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="absolute -top-1 right-0 flex items-center justify-center w-4 h-4 bg-[#FBBF24] text-[#111827] text-[10px] font-bold rounded-full"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </motion.div>
            </Link>
          </li>
        </ul>
      </nav>

      {/* -------- MENU BURGER MOBILE (Optionnel, inchangé) -------- */}
      <div className="md:hidden">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="hidden text-white z-50 relative p-2 -mr-2"
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
    </>
  );
}