"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Liste des liens pour une gestion plus simple
const navLinks = [
  { name: 'Accueil', href: '/' },
  { name: 'À Propos', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Projets', href: '/projets' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="absolute top-0 left-0 w-full z-50 bg-primary/70 backdrop-blur-sm">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-accent">
            Lux<span className="text-secondary">Tech</span>.
          </Link>

          {/* Liens de navigation pour bureau */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative text-accent hover:text-accent-yellow transition-colors duration-300 hover:text-[#FF0000] transition-colors
                    ${isActive ? 'text-accent-yellow' : ''}`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute left-0 -bottom-2 block h-0.5 w-full bg-accent-yellow" />
                  )}
                </Link>
              );
            })}
          </div>
          
          {/* Menu burger pour mobile (à implémenter plus tard) */}
          <div className="md:hidden">
            <button className="text-accent">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};