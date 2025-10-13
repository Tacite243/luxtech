import HearoInterrior from "@/components/heroInterior";
import ProductCard from "@/components/ProductCard";
import ProductFilters from "@/components/ProductFilters";
import Pagination from "@/components/Pagination";
import { productsData, type Product } from "@/lib/products-data";



// Interface pour les paramètres de recherche de l'URL
interface StorePageProps {
    searchParams: {
        category?: string;
        sort?: string;
        page?: string;
    }
}

// Helper pour obtenir le prix effectif (soldé ou non)
const getEffectivePrice = (product: Product) => product.salePrice ?? product.price;

export default function StorePage({ searchParams }: StorePageProps) {
    // --- Logique de filtrage et de pagination (côté serveur) ---
    let filteredProducts = [...productsData];

    // Filtrer par catégorie, on filtre uniquement si 
    // une catégorie est spécifiée ET qu'elle n'est pas "Tous"
    if (searchParams.category && searchParams.category !== "Tous") {
        filteredProducts = filteredProducts.filter(p => p.category === searchParams.category);
    }

    // Trier les produits
    if (searchParams.sort) {
        if (searchParams.sort === 'price-asc') {
            filteredProducts.sort((a, b) => getEffectivePrice(a) - getEffectivePrice(b));
        } else if (searchParams.sort === 'price-desc') {
            filteredProducts.sort((a, b) => getEffectivePrice(b) - getEffectivePrice(a));
        }
    }

    // Pagination
    const currentPage = parseInt(searchParams.page || '1', 10);
    const itemsPerPage = 9;
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const paginatedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <>
            <HearoInterrior
                title="Notre Boutique"
                breadcrumbs={[
                    { name: "Accueil", href: "/" },
                    { name: "Boutique" }
                ]}
            />

            <main className="bg-gray-100 py-16"> {/* ex: bg-[#F9FAFB] */}
                <div className="container mx-auto px-6">
                    <div className="lg:hidden">
                        <ProductFilters />
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                        {/* Colonne des Filtres */}
                        <aside className="hidden lg:block lg:col-span-1">
                            <ProductFilters />
                        </aside>

                        {/* Colonne des Produits */}
                        <section className="lg:col-span-3">
                            {paginatedProducts.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                                    {paginatedProducts.map(product => (
                                        <ProductCard key={product.id} product={product} />
                                    ))}
                                </div>
                            ) : (
                                // 3. Style adapté au thème clair
                                <div className="text-center py-20 bg-white rounded-lg border">
                                    <h3 className="text-2xl font-bold text-[#111827]">Aucun produit trouvé</h3>
                                    <p className="text-gray-600 mt-2">Essayez d'ajuster vos filtres.</p>
                                </div>
                            )}

                            {totalPages > 1 && (
                                <div className="mt-16">
                                    <Pagination currentPage={currentPage} totalPages={totalPages} />
                                </div>
                            )}
                        </section>
                    </div>
                </div>
            </main>
        </>
    );
}