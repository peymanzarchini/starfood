import { Link } from "react-router-dom";
import { ShoppingBag, Trash2, ArrowRight, CreditCard, Truck } from "lucide-react";

import Container from "@/components/ui/Container";
import { useCart, CartItemCard } from "@/modules/cart";
import { formatPrice } from "@/utils/formatPrice";

const CartPage = () => {
  const { cart, isLoading, count, updateQuantity, removeItem, clearCart } = useCart();

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center font-bold">
        Loading your cart...
      </div>
    );

  if (!cart || cart.items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6 animate-bounce">
          <ShoppingBag size={40} />
        </div>
        <h2 className="text-3xl font-black text-text-main mb-2">Your cart is empty</h2>
        <p className="text-text-muted mb-8 font-medium">
          Looks like you haven't added any delicious food yet.
        </p>
        <Link
          to="/foods"
          className="px-10 py-4 bg-primary text-white rounded-2xl font-black shadow-lg shadow-primary/30 hover:scale-105 transition-all"
        >
          Explore Menu
        </Link>
      </div>
    );
  }

  return (
    <main className="bg-bg-page dark:bg-dark-bg-page py-10 md:py-20">
      <Container>
        <h1 className="text-4xl font-black text-text-main mb-10 tracking-tight">
          Shopping <span className="text-primary">Cart</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex justify-between items-center mb-4 px-2">
              <span className="text-sm font-bold text-text-muted">{count} Items in your bag</span>
              <button
                onClick={() => clearCart()}
                className="text-xs font-black text-red-500 uppercase tracking-widest hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Trash2 size={14} /> Clear Cart
              </button>
            </div>

            {cart.items.map((item) => (
              <CartItemCard
                key={item.id}
                item={item}
                onUpdateQuantity={(itemId, qty) => updateQuantity({ itemId, quantity: qty })}
                onRemoveItem={removeItem}
              />
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-bg-surface dark:bg-dark-bg-surface p-8 rounded-[3rem] shadow-xl border border-slate-100 dark:border-slate-800 sticky top-28">
              <h2 className="text-2xl font-black text-text-main mb-6">Summary</h2>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-text-muted font-bold">
                  <span>Subtotal</span>
                  <span>${formatPrice(cart.total)}</span>
                </div>
                <div className="flex justify-between text-text-muted font-bold">
                  <span className="flex items-center gap-1">
                    <Truck size={16} /> Delivery Fee
                  </span>
                  <span>Calculated at next step</span>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-end">
                  <span className="text-text-main font-black">Total Amount</span>
                  <span className="text-3xl font-black text-primary">
                    ${formatPrice(cart.total)}
                  </span>
                </div>
              </div>

              <Link
                to="/checkout"
                className="w-full py-5 bg-primary text-white rounded-4xl font-black shadow-xl shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-x-3"
              >
                <CreditCard size={22} /> Checkout <ArrowRight size={20} />
              </Link>

              <p className="text-[10px] text-text-muted text-center mt-6 font-bold uppercase tracking-widest opacity-50">
                Secure Payment Powered by StarFood
              </p>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
};

export default CartPage;
