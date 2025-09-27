import AboutStorySection from "@/components/AboutStorySection";
import HearoInterrior from "@/components/heroInterior";
import StatsSection from "@/components/StatsSection";

export default function AboutPage() {
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
            <div className="container mx-auto py-16 md:py-24 px-6">
                <h2 className="text-3xl font-bold text-center">Contenu de la page à venir...</h2>
            </div>

        </>
    );
}