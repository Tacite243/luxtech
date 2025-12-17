"use client";

import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import Pagination from "@/components/Pagination";
import ProductFilters from "@/components/ProductFilters";
import { Product } from "@prisma/client";

// Le composant accepte maintenant les produits initiaux en props
interface StoreContentProps {
  initialProducts: Product[];
}

// Un composant "squelette" pour l'état de chargement
const ProductCardSkeleton = () => (
  <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
    <div className="relative h-60 w-full bg-gray-200 animate-pulse" />
    <div className="p-6">
      <div className="h-4 bg-gray-200 rounded w-1/4 mb-2 animate-pulse" />
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-4 animate-pulse" />
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-6 animate-pulse" />
      <div className="flex items-center justify-between">
        <div className="h-8 bg-gray-200 rounded w-1/3 animate-pulse" />
        <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
      </div>
    </div>
  </div>
);

export default function StoreContent({ initialProducts }: StoreContentProps) {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const sort = searchParams.get("sort");
  const page = searchParams.get("page");

  // 2. On utilise directement les produits passés par le Server Component
  const allProducts = initialProducts;

  // La logique de filtrage et de tri reste la même
  let filteredProducts = [...allProducts];

  if (category && category !== "Tous") {
    filteredProducts = filteredProducts.filter((p) => p.category === category);
  }

  if (sort) {
    if (sort === "price-asc") {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sort === "price-desc") {
      filteredProducts.sort((a, b) => b.price - a.price);
    }
  }

  const currentPage = parseInt(page || "1", 10);
  const itemsPerPage = 9;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  // 3. La logique de rendu est simplifiée
  const renderContent = () => {
    // Il n'y a plus d'état de chargement ou d'erreur à gérer ici
    if (paginatedProducts.length > 0) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {paginatedProducts.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      );
    }

    return (
      <div className="text-center py-20 bg-white rounded-lg border">
        <h3 className="text-2xl font-bold text-[#111827]">
          Aucun produit trouvé
        </h3>
        <p className="text-gray-600 mt-2">
          Essayez d&apos;ajuster vos filtres.
        </p>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
      <aside className="lg:col-span-1">
        <ProductFilters />
      </aside>

      <section className="lg:col-span-3">
        {renderContent()}

        {totalPages > 1 && (
          <div className="mt-16">
            <Pagination currentPage={currentPage} totalPages={totalPages} />
          </div>
        )}
      </section>
    </div>
  );
}
