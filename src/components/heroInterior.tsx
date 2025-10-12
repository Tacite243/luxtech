import { Variants } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

// Interface pour définir les props que notre composant accepte
interface PageHeaderProps {
    title: string;
    breadcrumbs: {
        name: string;
        href?: string;
    }[];
}

// Variantes d'animation
// const containerVariants: Variants = {
//     hidden: { opacity: 0 },
//     visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.1 } }
// };

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

export default function HearoInterrior({ title, breadcrumbs }: PageHeaderProps) {
    return (
        // La section principale avec l'image de fond et la superposition
        <section className="relative py-24 md:py-32 overflow-hidden">
            <Image
                src="/img/breadcrumbs-bg.jpg"
                alt="Intérieur design de LuxTech Services"
                fill
                className="object-cover"
                quality={75}
                priority
            />

            <div className="absolute inset-0 bg-[#000000]/60" />

            <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-[#FFFFFF]">
                    {title}
                </h2>

                <ol className="mt-4 flex items-center gap-2 text-lg text-[#FFFFFF]">
                    {breadcrumbs.map((crumb, index) => (
                        <li key={index} className="flex items-center gap-2">
                            {crumb.href ? (
                                <Link href={crumb.href} className="hover:text-[#FFC107] transition-colors">
                                    {crumb.name}
                                </Link>
                            ) : (
                                <span className="text-[#FFC107]">{crumb.name}</span>
                            )}
                            {index < breadcrumbs.length - 1 && <span>/</span>}
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}