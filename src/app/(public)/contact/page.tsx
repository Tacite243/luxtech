import HearoInterrior from "@/components/heroInterior";
import ContactSection from "@/components/ContactSection";

export default function ContactPage() {
    return (
        <>
            <HearoInterrior
                title="Contactez-Nous"
                breadcrumbs={[
                    { name: "Accueil", href: "/" },
                    { name: "Contact" }
                ]}
            />

            <ContactSection />
        </>
    );
}