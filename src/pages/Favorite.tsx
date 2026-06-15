import Container from "@/components/ui/Container";
import { Heart, Trash2, ShoppingCart, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { formatPrice } from "@/utils/formatPrice";
import { useCart } from "@/modules/cart";
import { useAuth } from "@/modules/auth";
import { toast } from "sonner";
import { useFavorites } from "@/modules/favorite";

const FavoritePage = () => {
  const { favorites, isLoading, toggleFavorite } = useFavorites();
  const { addItem } = useCart();
  const { isAuthenticated } = useAuth();

  const handleAddToCart = (productId: number) => {
    if (!isAuthenticated) {
      toast.error("Please login first");
      return;
    }
    addItem({ productId, quantity: 1 });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
        <p className="font-bold text-text-muted">Loading your favorites...</p>
      </div>
    );
  }

  return (
    <main className="bg-bg-page dark:bg-dark-bg-page py-10 md:py-20 min-h-screen">
      <Container>
        <div className="flex items-center gap-4 mb-12">
          <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
            <Heart size={28} />
          </div>
          <div>
            <h1 className="text-4xl font-black text-text-main tracking-tight italic">
              My <span className="text-primary">Favorites</span>
            </h1>
            <p className="text-text-muted font-medium text-sm mt-1">
              {favorites.length} saved items
            </p>
          </div>
        </div>

        {favorites.length === 0 ? (
          <div className="bg-bg-surface dark:bg-dark-bg-surface rounded-[3rem] p-16 border-2 border-dashed border-slate-100 dark:border-slate-800 text-center">
            <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
              <Heart size={32} />
            </div>
            <h3 className="text-2xl font-black text-text-main mb-2">No favorites yet</h3>
            <p className="text-text-muted font-medium mb-8">
              Click the heart icon on your favorite meals to save them here.
            </p>
            <Link
              to="/foods"
              className="px-10 py-4 bg-primary text-white rounded-2xl font-black shadow-lg shadow-primary/30 hover:scale-105 transition-all inline-block"
            >
              Explore Menu
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((fav) => (
              <div
                key={fav.id}
                className="bg-bg-surface dark:bg-dark-bg-surface rounded-[2.5rem] p-5 shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-xl transition-all duration-500 flex gap-5"
              >
                {/* Image */}
                <Link
                  to={`/foods/${fav.product.id}`}
                  className="w-28 h-28 bg-bg-soft dark:bg-dark-bg-soft rounded-2xl p-2 shrink-0"
                >
                  <img
                    src={fav.product.imageUrl}
                    alt={fav.product.name}
                    className="w-full h-full object-contain"
                  />
                </Link>

                {/* Content */}
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <Link
                      to={`/foods/${fav.product.id}`}
                      className="font-black text-text-main hover:text-primary transition-colors line-clamp-1"
                    >
                      {fav.product.name}
                    </Link>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-lg font-black text-primary">
                        ${formatPrice(fav.product.finalPrice)}
                      </span>
                      {fav.product.discount > 0 && (
                        <span className="text-xs text-text-muted line-through font-bold">
                          ${formatPrice(fav.product.price)}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-3">
                    <button
                      onClick={() => handleAddToCart(fav.product.id)}
                      className="flex-1 py-2.5 bg-primary text-white rounded-xl font-black text-xs flex items-center justify-center gap-1.5 hover:bg-primary-hover transition-colors cursor-pointer"
                    >
                      <ShoppingCart size={14} /> Add
                    </button>
                    <button
                      onClick={() => toggleFavorite(fav.product.id)}
                      className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-100 dark:border-slate-800 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors cursor-pointer"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </main>
  );
};

export default FavoritePage;
