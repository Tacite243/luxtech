import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Star } from 'lucide-react';
import type { Product } from '@/lib/products-data';

// Composant pour afficher les étoiles
const StarRating = ({ rating }: { rating: number }) => (
    <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, index) => (
            <Star
                key={index}
                size={16}
                className={index < rating ? 'text-[#FBBF24] fill-current' : 'text-gray-300'}
            />
        ))}
    </div>
);

export default function ProductCard({ product }: { product: Product }) {
    // Logique pour déterminer si l'article est en promotion
    const onSale = typeof product.salePrice === 'number' && product.salePrice < product.price;
    const displayPrice = onSale ? product.salePrice : product.price;
    const originalPrice = onSale ? product.price : null;

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden group border border-gray-200 hover:border-[#FBBF24] hover:shadow-xl transition-all duration-300 flex flex-col">
            <Link href={`/store/product/${product.id}`} className="block">
                <div className="relative h-60 w-full overflow-hidden">
                    <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                        {product.isNew && (
                            <span className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                                NOUVEAU
                            </span>
                        )}
                        {onSale && (
                            <span className="bg-[#FBBF24] text-[#111827] text-xs font-bold px-3 py-1 rounded-full shadow">
                                PROMO
                            </span>
                        )}
                    </div>
                </div>
            </Link>

            <div className="p-6 flex-grow flex flex-col">
                <p className="text-sm text-gray-500 mb-1">{product.category}</p>
                <h3 className="text-lg font-bold text-[#111827] flex-grow">
                    <Link href={`/store/product/${product.id}`} className="hover:text-[#FBBF24] transition-colors">
                        {product.name}
                    </Link>
                </h3>

                <div className="my-3">
                    <StarRating rating={product.rating} />
                </div>

                <div className="mt-auto flex items-center justify-between">
                    <p className="text-xl font-extrabold text-[#111827]">
                        {displayPrice?.toFixed(2)} €
                        {originalPrice && (
                            <span className="text-sm text-gray-400 line-through ml-2">
                                {originalPrice.toFixed(2)} €
                            </span>
                        )}
                    </p>

                    <button
                        aria-label="Ajouter au panier"
                        className="p-2 rounded-full bg-gray-100 hover:bg-[#FBBF24] text-[#111827] transition-colors"
                    >
                        <ShoppingCart size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
}