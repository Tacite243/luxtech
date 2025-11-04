import { prisma } from '@/lib/prisma'; 
import AnimatedCounter from './AnimatedCounter';
import * as LucideIcons from 'lucide-react';
import { Stat } from '@prisma/client'; // Importer le type pour plus de sécurité

// Mapper les noms de chaînes de caractères aux composants d'icônes
const iconMap: { [key: string]: React.ElementType } = {
    Smile: LucideIcons.Smile,
    FolderKanban: LucideIcons.FolderKanban,
    Headset: LucideIcons.Headset,
    Users: LucideIcons.Users,
    Award: LucideIcons.Award,
    ClipboardList: LucideIcons.ClipboardList,
};

export default async function StatsSection() {
    let statsData: Stat[] = [];
    try {
        // Appel direct à la base de données côté serveur, dans un bloc try/catch
        statsData = await prisma.stat.findMany({
            orderBy: { order: 'asc' },
        });
    } catch (error) {
        console.error("Impossible de récupérer les statistiques:", error);
        // En cas d'erreur (ex: BDD non accessible), on retourne un composant vide
        // pour ne pas faire planter toute la page.
        return null;
    }

    return (
        <section className="bg-[#f8f9fa] py-16">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {statsData.map((stat) => {
                        const IconComponent = iconMap[stat.icon] || LucideIcons.HelpCircle;

                        return (
                            <div key={stat.id} className="stats-item bg-white p-6 rounded-lg shadow-md flex items-center w-full h-full">
                                <IconComponent size={48} className="text-[#FBBF24] flex-shrink-0 mr-5" strokeWidth={1.5} />
                                <div>
                                    <span className="text-4xl font-bold text-black">
                                        <AnimatedCounter to={stat.target} />
                                    </span>
                                    <p className="text-gray-500 mt-1">{stat.label}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}