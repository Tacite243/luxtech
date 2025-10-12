import HearoInterrior from "@/components/heroInterior";
import ServicesGridSection from "@/components/ServicesGridSection";
import GetAQuote from "@/components/GetAQuote";
import dynamic from 'next/dynamic';
// On importe dynamiquement le carrousel car il est interactif et lourd en JS
const TestimonialsSection = dynamic(() => import('@/components/TestimonialsSection'), {
    loading: () => <p>Chargement des témoignages...</p> // Squelette de chargement
});



export default function ServicesPage() {
    return (
        <>
            <HearoInterrior
                title="Nos Services"
                breadcrumbs={[
                    { name: "Accueil", href: "/" },
                    { name: "Services" }
                ]}
            />
            <ServicesGridSection />
            <GetAQuote />
            <TestimonialsSection />
        </>
    );
}