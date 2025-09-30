import HearoInterrior from "@/components/heroInterior";
import ServicesGridSection from "@/components/ServicesGridSection";
import GetAQuote from "@/components/GetAQuote";
import TestimonialsSection from "@/components/TestimonialsSection";

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