"use client";

import { useSearchParams } from 'next/navigation';
import ProductCard from "@/components/ProductCard";
import Pagination from "@/components/Pagination";
import ProductFilters from "@/components/ProductFilters";
import { productsData, type Product } from "@/lib/products-data";

// Helper pour le prix
const getEffectivePrice = (product: Product) => product.salePrice ?? product.price;

export default function StoreContent() {
    const searchParams = useSearchParams();
    const category = searchParams.get('category');
    const sort = searchParams.get('sort');
    const page = searchParams.get('page');

    let filteredProducts = [...productsData];

    if (category && category !== "Tous") {
        filteredProducts = filteredProducts.filter(p => p.category === category);
    }

    if (sort) {
        if (sort === 'price-asc') {
            filteredProducts.sort((a, b) => getEffectivePrice(a) - getEffectivePrice(b));
        } else if (sort === 'price-desc') {
            filteredProducts.sort((a, b) => getEffectivePrice(b) - getEffectivePrice(a));
        }
    }

    const currentPage = parseInt(page || '1', 10);
    const itemsPerPage = 9;
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const paginatedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);


    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            <aside className="lg:col-span-1">
                <ProductFilters />
            </aside>

            <section className="lg:col-span-3">
                {paginatedProducts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                        {paginatedProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-lg border">
                        <h3 className="text-2xl font-bold text-[#111827]">Aucun produit trouvé</h3>
                        <p className="text-gray-600 mt-2">Essayez d&apos;ajuster vos filtres.</p>
                    </div>
                )}

                {totalPages > 1 && (
                    <div className="mt-16">
                        <Pagination currentPage={currentPage} totalPages={totalPages} />
                    </div>
                )}
            </section>
        </div>
    );
}