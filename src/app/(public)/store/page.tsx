import HearoInterrior from "@/components/heroInterior";
import StoreContent from "@/components/StoreContent";
import { prisma } from "@/lib/prisma";

interface StorePageProps {
  searchParams: {
    category?: string;
    sort?: string;
    page?: string;
  };
}

export default async function StorePage({ searchParams }: StorePageProps) {
  const { category, sort } = searchParams;

  const whereClause = category && category !== "Tous" ? { category } : {};
  let orderByClause = {};
  if (sort === "price-asc") orderByClause = { price: "asc" };
  if (sort === "price-desc") orderByClause = { price: "desc" };

  // L'appel à la base de données est correct
  const products = await prisma.product.findMany({
    where: whereClause,
    orderBy: orderByClause,
  });

  return (
    <>
      <HearoInterrior
        title="Notre Boutique"
        breadcrumbs={[{ name: "Accueil", href: "/" }, { name: "Boutique" }]}
      />
      <main className="bg-gray-100 py-16">
        <div className="container mx-auto px-6">
          {/* Cet appel est maintenant valide */}
          <StoreContent initialProducts={products} />
        </div>
      </main>
    </>
  );
}
