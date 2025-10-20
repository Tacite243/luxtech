"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Package, ShoppingCart, Users, Settings, LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';

// Définir les liens de navigation du back-office
const adminNavLinks = [
  { name: 'Vue d\'ensemble', href: '/dashboard', icon: Home },
  { name: 'Produits', href: '/dashboard/products', icon: Package },
  { name: 'Commandes', href: '/dashboard/orders', icon: ShoppingCart },
  { name: 'Utilisateurs', href: '/dashboard/users', icon: Users, role: 'SUPERADMIN' }, // Uniquement pour le SUPERADMIN
  { name: 'Paramètres', href: '/dashboard/settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 w-64 bg-[#111827] text-white flex-col z-10 hidden lg:flex">
      {/* Logo */}
      <div className="flex items-center justify-center h-20 border-b border-gray-700">
        <Link href="/dashboard" className="text-2xl font-bold">
          Lux<span className="text-[#FBBF24]">Tech</span> <span className="text-sm font-normal">Admin</span>
        </Link>
      </div>

      {/* Liens de navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {adminNavLinks.map((link) => {
          const isActive = pathname === link.href;
          // TODO: Ajouter la logique pour n'afficher le lien que si l'utilisateur a le bon rôle
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-[#FBBF24] text-[#111827] font-semibold'
                  : 'hover:bg-gray-700'
              }`}
            >
              <link.icon size={20} />
              <span>{link.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Section Déconnexion */}
      <div className="px-4 py-6 border-t border-gray-700">
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-500/20 text-red-400 transition-colors"
        >
          <LogOut size={20} />
          <span>Déconnexion</span>
        </button>
      </div>
    </aside>
  );
}