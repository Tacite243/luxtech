import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { DollarSign, ShoppingCart, Users, ArrowUpRight, LucideIcon } from 'lucide-react';


// interface pour les props
interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  change?: string;
}


// Composant pour une carte de statistique
const StatCard = ({ title, value, icon: Icon, change }: StatCardProps) => (
  <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
    <div className="flex items-center justify-between">
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <Icon className="w-6 h-6 text-gray-400" />
    </div>
    <div className="mt-2">
      <p className="text-3xl font-bold text-[#111827]">{value}</p>
      {change && (
        <p className="text-xs text-green-600 flex items-center mt-1">
          <ArrowUpRight className="w-4 h-4 mr-1" />
          {change} par rapport au mois dernier
        </p>
      )}
    </div>
  </div>
);

// Données de démonstration (à remplacer par des appels à la BDD)
const stats = [
  { title: "Revenu Total", value: "12,450 $", icon: DollarSign, change: "+12.5%" },
  { title: "Nouvelles Commandes", value: "89", icon: ShoppingCart, change: "+5.2%" },
  { title: "Nouveaux Utilisateurs", value: "32", icon: Users, change: "+2.1%" },
];


export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <h1 className="text-3xl font-bold text-[#111827]">
        Bonjour, {session?.user?.name || 'Admin'} !
      </h1>
      <p className="mt-1 text-gray-600">
        Voici un aperçu de l&apos;activité de votre boutique.
      </p>

      {/* Grille de statistiques */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map(stat => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Sections futures */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
          <h3 className="font-semibold">Commandes Récentes</h3>
          {/* TODO: Afficher une liste des 5 dernières commandes */}
          <p className="mt-4 text-gray-500">Aucune commande récente.</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
          <h3 className="font-semibold">Produits en Faible Stock</h3>
          {/* TODO: Afficher une liste des produits avec un stock < 5 */}
          <p className="mt-4 text-gray-500">Tous les produits sont en stock.</p>
        </div>
      </div>
    </div>
  );
}