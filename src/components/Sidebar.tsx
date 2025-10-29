"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Package,
  BarChart3,
  FolderKanban,
  ShoppingCart,
  Users,
  FileText,
  Settings,
  LogOut,
} from "lucide-react";
import { signOut } from "next-auth/react";

// Liens du back-office avec icônes actualisées
const adminNavLinks = [
  { name: "Vue d'ensemble", href: "/dashboard", icon: Home },
  { name: "Produits", href: "/dashboard/products", icon: Package },
  { name: "Stats", href: "/dashboard/stats", icon: BarChart3 },
  { name: "Gestion des Projets", href: "/dashboard/projects", icon: FolderKanban },
  { name: "Commandes", href: "/dashboard/orders", icon: ShoppingCart },
  { name: "Utilisateurs", href: "/dashboard/users", icon: Users, role: "SUPERADMIN" },
  { name: "Gestion des devis", href: "/dashboard/quotes", icon: FileText },
  { name: "Paramètres", href: "/dashboard/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 w-64 bg-[#111827] text-white flex-col z-10 hidden lg:flex shadow-lg">
      {/* --- Logo --- */}
      <div className="flex items-center justify-center h-20 border-b border-gray-700">
        <Link href="/dashboard" className="text-2xl font-bold tracking-tight">
          Lux<span className="text-[#FBBF24]">Tech</span>{" "}
          <span className="text-sm font-normal text-gray-400">Admin</span>
        </Link>
      </div>

      {/* --- Liens de navigation --- */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
        {adminNavLinks.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;

          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive
                  ? "bg-[#FBBF24] text-[#111827] font-semibold shadow-inner"
                  : "hover:bg-gray-800 text-gray-300 hover:text-white"
                }`}
            >
              <Icon size={20} className={`${isActive ? "text-[#111827]" : "text-[#FBBF24]"}`} />
              <span className="text-sm">{link.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* --- Bouton de déconnexion --- */}
      <div className="px-4 py-6 border-t border-gray-700">
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors duration-200"
        >
          <LogOut size={20} />
          <span>Déconnexion</span>
        </button>
      </div>
    </aside>
  );
}
