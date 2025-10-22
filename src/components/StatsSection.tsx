import { prisma } from '@/lib/prisma';
import AnimatedCounter from './AnimatedCounter';
import * as LucideIcons from 'lucide-react';



// Mapper les noms de chaînes de caractères aux composants d'icônes
const iconMap = {
    Smile: LucideIcons.Smile,
    FolderKanban: LucideIcons.FolderKanban,
    Headset: LucideIcons.Headset,
    Users: LucideIcons.Users,
};

// Le composant devient `async` pour pouvoir fetcher les données
export default async function StatsSection() {
    // Appel direct à la base de données côté serveur
    const statsData = await prisma.stat.findMany({
        orderBy: { order: 'asc' },
    });

    return (
        <section className="bg-[#f8f9fa] py-16">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {statsData.map((stat) => {
                        // Récupérer le composant d'icône à partir du nom stocké en BDD
                        const IconComponent = iconMap[stat.icon as keyof typeof iconMap] || LucideIcons.HelpCircle;

                        return (
                            <div key={stat.id} className="stats-item bg-[#FFFFFF] p-6 rounded-lg shadow-md flex items-center w-full h-full">
                                <IconComponent size={48} className="text-[#FFC107] flex-shrink-0 mr-5" strokeWidth={1.5} />
                                <div>
                                    <span className="text-4xl font-bold text-[#000000]">
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
