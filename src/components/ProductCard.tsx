import Image from 'next/image';
import Link from 'next/link';
import { ImageIcon, ShoppingCart, Star } from 'lucide-react';
// import type { Product } from '@/lib/products-data';
import { Product } from '@prisma/client';
import { useAppDispatch } from '@/redux/hooks';
import { addToCart } from '@/redux/features/cartSlice';


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
    const dispatch = useAppDispatch();
    // Logique pour déterminer si l'article est en promotion
    // const onSale = typeof product.salePrice === 'number' && product.salePrice < product.price;
    const displayPrice = product.price;
    const imageUrl = product.images && product.images.length > 0 ? product.images[0] : null;
    // const originalPrice = onSale ? product.price : null;


    const handleAddToCart = () => {
        dispatch(addToCart(product))
    }

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden group border border-gray-200 hover:border-[#FBBF24] hover:shadow-xl transition-all duration-300 flex flex-col">
            <Link href={`/store/product/${product.id}`} className="block">
                <div className="relative h-60 w-full overflow-hidden bg-gray-100">
                    {imageUrl ? (
                        <Image
                            src={imageUrl}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <ImageIcon className="w-12 h-12 text-gray-300" />
                        </div>
                    )}
                </div>
            </Link>

            <div className="p-6 flex-grow flex flex-col">
                <p className="text-sm text-gray-500 mb-1">{product.category}</p>
                <h3 className="text-lg font-bold text-[#111827] flex-grow min-h-[2.5em]">
                    <Link href={`/store/product/${product.id}`} className="hover:text-[#FBBF24] transition-colors">
                        {product.name}
                    </Link>
                </h3>

                <div className="my-3">
                    <StarRating rating={product.rating} />
                </div>

                <div className="mt-auto flex items-center justify-between pt-4">
                    <p className="text-xl font-extrabold text-[#111827]">
                        {displayPrice.toFixed(2)} $
                    </p>

                    <button
                        onClick={handleAddToCart}
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