"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart } from 'lucide-react';
import { useAppSelector } from '@/redux/hooks';

const navLinks = [
  { name: 'Accueil', href: '/' },
  { name: 'À Propos', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Projets', href: '/projets' },
  { name: 'Contact', href: '/contact' },
  { name: 'Boutique', href: '/store' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const cartItems = useAppSelector((state) => state.cart.items);
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const BurgerIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
    </svg>
  );

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${
        scrolled ? 'bg-[#111827]/90 backdrop-blur-sm shadow-lg' : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-white">
            Lux<span className="text-[#FBBF24]">Tech</span>
          </Link>

          {/* --- NAV LINKS --- */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const isStore = link.name === 'Boutique';

              // Style spécial pour "Boutique"
              const baseClasses = `relative text-lg font-medium transition-colors duration-300`;
              const normalLink = `${baseClasses} ${
                isActive ? 'text-[#FBBF24]' : 'text-gray-200 hover:text-white'
              }`;
              const storeLink = `${baseClasses} border border-[#FBBF24] px-4 py-1 rounded-lg hover:bg-[#FBBF24] hover:text-[#111827] transition-all duration-300 ${
                isActive ? 'bg-[#FBBF24] text-[#111827]' : 'text-[#FBBF24]'
              }`;

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={isStore ? storeLink : normalLink}
                >
                  {link.name}
                  {!isStore && isActive && (
                    <motion.span
                      layoutId="underline"
                      className="absolute left-0 -bottom-1 block h-0.5 w-full bg-[#FBBF24]"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}

            {/* Icône du panier desktop */}
            <Link href="/cart" className="relative text-gray-200 hover:text-white ml-3">
              <ShoppingCart size={24} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-3 flex items-center justify-center w-5 h-5 bg-[#FBBF24] text-[#111827] text-xs font-bold rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>

          {/* --- MENU BURGER --- */}
          <div className="md:hidden">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white z-50 relative p-2 -mr-2"
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  key={isOpen ? 'close' : 'open'}
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
      </nav>

      {/* --- MENU MOBILE --- */}
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
                  const isActive = pathname === link.href;
                  const isStore = link.name === 'Boutique';

                  return (
                    <li key={`mobile-${link.name}`}>
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`text-3xl font-semibold transition-colors ${
                          isStore
                            ? `border border-[#FBBF24] px-6 py-2 rounded-lg hover:bg-[#FBBF24] hover:text-[#111827] transition-all duration-300 ${
                                isActive ? 'bg-[#FBBF24] text-[#111827]' : 'text-[#FBBF24]'
                              }`
                            : isActive
                            ? 'text-[#FBBF24]'
                            : 'text-gray-200 hover:text-[#FBBF24]'
                        }`}
                      >
                        {link.name}
                      </Link>
                    </li>
                  );
                })}

                <li>
                  <Link href="/cart" className="relative text-gray-200 hover:text-white">
                    <ShoppingCart size={24} />
                    {totalItems > 0 && (
                      <span className="absolute -top-2 -right-3 flex items-center justify-center w-5 h-5 bg-[#FBBF24] text-[#111827] text-xs font-bold rounded-full">
                        {totalItems}
                      </span>
                    )}
                  </Link>
                </li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
