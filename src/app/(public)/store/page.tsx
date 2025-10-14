

import HearoInterrior from "@/components/heroInterior";
import StoreContent from "@/components/StoreContent"; // Importer notre nouveau composant

// On peut garder cet export par sécurité, mais il n'est plus aussi crucial
export const dynamic = 'force-dynamic';

// La page n'a plus besoin de props !
export default function StorePage() {
    return (
        <>
            <HearoInterrior
                title="Notre Boutique"
                breadcrumbs={[
                    { name: "Accueil", href: "/" },
                    { name: "Boutique" }
                ]}
            />
            <main className="bg-gray-100 py-16">
                <div className="container mx-auto px-6">
                    {/* On rend simplement le composant client qui s'occupe de tout */}
                    <StoreContent />
                </div>
            </main>
        </>
    );
}