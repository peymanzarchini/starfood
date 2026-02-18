import { ShoppingCart, Star, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

import type { Product } from "@/features/dashboard/product/types";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { cn } from "@/libs/utils";
import { useCart } from "../../hooks/useCart";
import { formatPrice } from "@/utils/formatPrice";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { isAuthenticated } = useAuth();

  /**
   * We use the centralized useCart hook to ensure
   * the Header Badge and Cart Page sync instantly.
   */
  const { addItem, isAdding } = useCart();

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      toast.error("Please login first to add items to your cart");
      return;
    }

    addItem({ productId: product.id, quantity: 1 });
  };

  return (
    <div className="group relative bg-bg-surface dark:bg-dark-bg-surface rounded-[2.5rem] p-4 shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 dark:border-slate-800 hover:border-primary/20">
      {/* Product Image Wrapper */}
      <Link
        to={`/foods/${product.id}`}
        className="block overflow-hidden rounded-4xl aspect-square bg-bg-soft dark:bg-dark-bg-soft relative"
      >
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700"
        />

        {/* Status Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isPopular && (
            <div className="bg-amber-400 text-white text-[10px] font-black px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-lg">
              <Star size={10} fill="currentColor" /> POPULAR
            </div>
          )}
        </div>

        {product.discount > 0 && (
          <div className="absolute top-3 right-3 bg-primary text-white text-[10px] font-black px-2.5 py-1 rounded-lg shadow-lg">
            {product.discount}% OFF
          </div>
        )}
      </Link>

      {/* Content Section */}
      <div className="mt-5 flex flex-col gap-y-1.5 px-1">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-black text-primary uppercase tracking-[0.15em]">
            Delicious Food
          </span>
          <div className="flex items-center gap-x-1 text-amber-500">
            <Star size={14} fill="currentColor" />
            <span className="text-xs font-black text-text-main">4.9</span>
          </div>
        </div>

        <Link
          to={`/foods/${product.id}`}
          className="text-lg font-black text-text-main line-clamp-1 group-hover:text-primary transition-colors duration-300"
        >
          {product.name}
        </Link>

        <p className="text-xs text-text-muted line-clamp-2 h-8 leading-relaxed font-medium">
          {product.description}
        </p>

        {/* Pricing & Action Area */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex flex-col">
            {product.discount > 0 && (
              <span className="text-[11px] text-text-muted line-through font-bold opacity-60">
                ${formatPrice(product.price)}
              </span>
            )}
            <span className="text-2xl font-black text-text-main tracking-tight">
              ${formatPrice(product.finalPrice)}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className={cn(
              "w-12 h-12 flex items-center justify-center rounded-2xl transition-all duration-300 shadow-lg disabled:opacity-50",
              "bg-primary text-white shadow-primary/20 hover:bg-primary-hover hover:rotate-6 active:scale-90",
            )}
            title="Add to Cart"
          >
            {isAdding ? <Loader2 size={20} className="animate-spin" /> : <ShoppingCart size={22} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
