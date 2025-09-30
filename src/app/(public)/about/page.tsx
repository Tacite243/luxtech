import AboutStorySection from "@/components/AboutStorySection";// 1. Import the new FeatureSection component
import FeatureSection from "@/components/FeatureSection";
import { ClipboardList, HardHat, ShieldCheck, Wrench } from 'lucide-react';
import HearoInterrior from "@/components/heroInterior";
import StatsSection from "@/components/StatsSection";
import TeamSection from "@/components/TeamSection";
import TestimonialsSection from "@/components/TestimonialsSection";



export default function AboutPage() {
    // --- Data for the first feature section ---
    const planningFeatures = [
        {
            icon: <ClipboardList size={24} className="text-[#FFC107]" />,
            title: "Planification Détaillée",
            description: "Chaque projet commence par une analyse approfondie pour garantir une exécution sans faille et dans le respect des délais."
        },
        {
            icon: <HardHat size={24} className="text-[#FFC107]" />,
            title: "Exécution par des Experts",
            description: "Nos équipes qualifiées mettent en œuvre les plans avec une précision et un savoir-faire inégalés."
        }
    ];

    // --- Data for the second feature section ---
    const qualityFeatures = [
        {
            icon: <ShieldCheck size={24} className="text-[#FFC107]" />,
            title: "Engagement Qualité",
            description: "Nous utilisons uniquement des matériaux de première qualité pour assurer la durabilité et la performance de nos constructions."
        },
        {
            icon: <Wrench size={24} className="text-[#FFC107]" />,
            title: "Support et Maintenance",
            description: "Notre relation ne s'arrête pas à la livraison. Nous offrons un support complet pour garantir la longévité de votre investissement."
        }
    ];
    return (
        <>
            <HearoInterrior
                title="À Propos de Nous"
                breadcrumbs={[
                    { name: "Accueil", href: "/" },
                    { name: "À Propos" }
                ]}
            />
            <AboutStorySection />
            <StatsSection />
            <FeatureSection
                imageUrl="/img/alt-services.jpg"
                title="Notre Approche Rigoureuse et Planifiée"
                description="Nous croyons qu'un projet réussi est le fruit d'une planification méticuleuse et d'une exécution experte. Notre méthodologie est conçue pour garantir des résultats qui dépassent vos attentes."
                features={planningFeatures}
                imageSide="left" // Image on the left (default)
                bgColor="white"
            />

            <FeatureSection
                imageUrl="/img/alt-services-2.jpg"
                title="Qualité et Fiabilité au Cœur de Nos Services"
                description="La confiance de nos clients se construit sur la qualité de notre travail et la fiabilité de nos solutions. Nous nous engageons à fournir l'excellence à chaque étape."
                features={qualityFeatures}
                imageSide="right" // Image on the right
                bgColor="gray"   // Alternate background color
            />
            <TeamSection />
            <TestimonialsSection />
            {/* <div className="container mx-auto py-16 md:py-24 px-6">
                <h2 className="text-3xl font-bold text-center">Contenu de la page à venir...</h2>
            </div> */}

        </>
    );
}