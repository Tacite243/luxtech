import { ReactNode } from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Sidebar from '@/components/Sidebar';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  // Double vérification de sécurité côté serveur
  const session = await getServerSession(authOptions);
  
  if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'SUPERADMIN')) {
    redirect('/'); // Rediriger si l'utilisateur n'a pas les droits
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Barre latérale fixe */}
      <Sidebar />
      
      {/* Contenu principal avec une marge à gauche pour laisser de la place à la sidebar */}
      <main className="lg:pl-64"> {/* pl-64 correspond à la largeur de la sidebar (w-64) */}
        <div className="p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}