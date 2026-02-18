/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ShoppingCart,
  Star,
  Clock,
  Flame,
  ChevronRight,
  Minus,
  Plus,
  CheckCircle2,
  MessageSquare,
  Info,
} from "lucide-react";
import { toast } from "sonner";

import Container from "@/components/ui/customs/Container";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { cn } from "@/libs/utils";
import { useFoodDetails } from "@/features/home/hooks/useFoodDetails";
import { useProductReviews } from "@/features/home/hooks/useProductReviews";
import ProductReviews from "@/features/home/components/products/ProductReviews";
import { cartApi } from "@/services/cart.service";

const FoodDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);
  const { isAuthenticated } = useAuth();

  // --- States ---
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<"desc" | "reviews">("desc");
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState<boolean>(false);

  // --- Fetch Data ---
  const { data: product, isLoading, isError } = useFoodDetails(productId);
  const { data: reviewData, refetch } = useProductReviews(productId);

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center font-bold">
        Loading product...
      </div>
    );
  if (isError || !product)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 font-bold">
        Product not found.
      </div>
    );

  const mainImage = selectedImg || product.imageUrl;

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.error("Please login to add items to your cart");
      return;
    }

    try {
      setIsAdding(true);
      await cartApi.addItem({ productId: product.id, quantity });
      toast.success(`${quantity} x ${product.name} added to cart successfully!`);
    } catch (error) {
      // Error handled by interceptor
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <main className="bg-bg-page dark:bg-dark-bg-page py-10 md:py-20">
      <Container>
        {/* --- Breadcrumbs --- */}
        <div className="flex items-center gap-2 text-sm font-bold text-text-muted mb-8">
          <Link to="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <ChevronRight size={14} />
          <Link to="/foods" className="hover:text-primary transition-colors">
            Menu
          </Link>
          <ChevronRight size={14} />
          <span className="text-primary">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* --- Left: Image Gallery --- */}
          <div className="space-y-6">
            <div className="aspect-square bg-bg-surface dark:bg-dark-bg-surface rounded-[3rem] p-8 shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden group">
              <img
                src={mainImage}
                alt={product.name}
                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700"
              />
            </div>

            {/* Gallery Thumbnails */}
            {product.gallery && product.gallery.length > 0 && (
              <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
                <button
                  onClick={() => setSelectedImg(null)}
                  className={cn(
                    "w-20 h-20 rounded-2xl p-2 bg-bg-surface dark:bg-dark-bg-surface border-2 transition-all shrink-0",
                    selectedImg === null
                      ? "border-primary shadow-lg"
                      : "border-transparent opacity-60",
                  )}
                >
                  <img src={product.imageUrl} className="w-full h-full object-contain" />
                </button>
                {product.gallery.map((img) => (
                  <button
                    key={img.id}
                    onClick={() => setSelectedImg(img.url)}
                    className={cn(
                      "w-20 h-20 rounded-2xl p-2 bg-bg-surface dark:bg-dark-bg-surface border-2 transition-all shrink-0",
                      selectedImg === img.url
                        ? "border-primary shadow-lg"
                        : "border-transparent opacity-60",
                    )}
                  >
                    <img src={img.url} className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* --- Right: Product Info --- */}
          <div className="flex flex-col gap-y-6">
            <div>
              <span className="px-4 py-1.5 bg-primary/10 text-primary text-xs font-black uppercase tracking-widest rounded-full">
                {product.category.name}
              </span>
              <h1 className="text-4xl md:text-5xl font-black text-text-main mt-4 tracking-tight">
                {product.name}
              </h1>
              <div className="flex items-center gap-x-4 mt-4">
                <div className="flex items-center gap-1 text-amber-500 font-black">
                  <Star size={18} fill="currentColor" />
                  <span>{reviewData?.stats.averageRating || "0.0"}</span>
                </div>
                <span className="text-text-muted font-bold text-sm">
                  ({reviewData?.stats.totalReviews || 0} customer reviews)
                </span>
              </div>
            </div>

            <div className="flex items-center gap-x-6 py-4 border-y border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2 text-text-muted font-bold">
                <Clock size={20} className="text-primary" />
                <span>{product.preparationTime || 15} min</span>
              </div>
              <div className="flex items-center gap-2 text-text-muted font-bold">
                <Flame size={20} className="text-primary" />
                <span>{product.calories || 350} kcal</span>
              </div>
            </div>

            <p className="text-text-muted leading-relaxed font-medium">{product.description}</p>

            {/* Price & Quantity */}
            <div className="flex flex-wrap items-center justify-between gap-6 mt-4">
              <div className="flex flex-col">
                <span className="text-sm font-bold text-text-muted mb-1 uppercase tracking-widest">
                  Price
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-4xl font-black text-text-main">${product.finalPrice}</span>
                  {product.discount > 0 && (
                    <span className="text-xl text-text-muted line-through opacity-50">
                      ${product.price}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 bg-bg-soft dark:bg-dark-bg-soft p-2 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-inner">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-bg-surface dark:bg-dark-bg-surface text-text-main hover:text-primary transition-colors shadow-sm"
                >
                  <Minus size={18} />
                </button>
                <span className="w-12 text-center text-lg font-black">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => Math.min(99, q + 1))}
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-bg-surface dark:bg-dark-bg-surface text-text-main hover:text-primary transition-colors shadow-sm"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <button
                onClick={handleAddToCart}
                disabled={isAdding}
                className="flex-1 py-5 bg-primary text-white rounded-4xl font-black shadow-xl shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-x-3 disabled:opacity-70"
              >
                {isAdding ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    {" "}
                    <ShoppingCart size={22} /> Add to Cart
                  </>
                )}
              </button>
              <button className="px-8 py-5 border-2 border-slate-200 dark:border-slate-800 text-text-main rounded-4xl font-black hover:bg-bg-soft transition-all">
                Buy Now
              </button>
            </div>

            {/* Tags/Ingredients */}
            <div className="flex flex-wrap gap-2 mt-4">
              {product.ingredients.map((ing, idx) => (
                <span
                  key={idx}
                  className="flex items-center gap-1.5 px-4 py-2 bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-black rounded-xl"
                >
                  <CheckCircle2 size={14} /> {ing}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* --- Lower Section: Tabs --- */}
        <div className="mt-20">
          <div className="flex gap-x-8 border-b border-slate-100 dark:border-slate-800">
            <button
              onClick={() => setActiveTab("desc")}
              className={cn(
                "pb-4 text-lg font-black transition-all relative",
                activeTab === "desc" ? "text-primary" : "text-text-muted opacity-50",
              )}
            >
              <div className="flex items-center gap-2">
                <Info size={20} /> Description
              </div>
              {activeTab === "desc" && (
                <div className="absolute bottom-0 left-0 w-full h-1 bg-primary rounded-full" />
              )}
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={cn(
                "pb-4 text-lg font-black transition-all relative",
                activeTab === "reviews" ? "text-primary" : "text-text-muted opacity-50",
              )}
            >
              <div className="flex items-center gap-2">
                <MessageSquare size={20} /> Reviews ({reviewData?.stats.totalReviews || 0})
              </div>
              {activeTab === "reviews" && (
                <div className="absolute bottom-0 left-0 w-full h-1 bg-primary rounded-full" />
              )}
            </button>
          </div>

          <div className="py-10">
            {activeTab === "desc" ? (
              <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h4 className="text-xl font-black text-text-main mb-4">Detailed Information</h4>
                <p className="text-text-muted leading-relaxed font-medium whitespace-pre-line">
                  {product.description}
                </p>
              </div>
            ) : (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <ProductReviews data={reviewData} productId={productId} refetch={refetch} />
              </div>
            )}
          </div>
        </div>
      </Container>
    </main>
  );
};

export default FoodDetailsPage;
