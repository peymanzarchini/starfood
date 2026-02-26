/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Trash2,
  Minus,
  Plus,
  ShoppingBag,
  ArrowRight,
  Ticket,
  Truck,
  CreditCard,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

import Container from "@/components/ui/Container";
import { cartApi } from "@/api/services/cart.service";
import { formatPrice } from "@/utils/formatPrice";
import { useCart } from "@/modules/cart";
import type { CartPreviewDiscount } from "@/modules/cart/types";

const CartPage = () => {
  const { cart, isLoading, updateQuantity, removeItem, clearCart } = useCart();
  const [couponCode, setCouponCode] = useState<string>("");
  const [discountInfo, setDiscountInfo] = useState<CartPreviewDiscount | null>(null);
  const [isApplyingCoupon, setIsApplyingCoupon] = useState<boolean>(false);

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    try {
      setIsApplyingCoupon(true);
      const result = await cartApi.previewDiscount(couponCode);
      setDiscountInfo(result);
      if (result.isValid) toast.success("Discount applied!");
      else toast.error(result.message);
    } catch (error) {
      setDiscountInfo(null);
    } finally {
      setIsApplyingCoupon(false);
    }
  };
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
          {/* --- 1. Cart Items List (Left Side) --- */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex justify-between items-center mb-4 px-2">
              <span className="text-sm font-bold text-text-muted">
                {cart.itemCount} Items in your bag
              </span>
              <button
                onClick={() => clearCart()}
                className="text-xs font-black text-red-500 uppercase tracking-widest hover:underline flex items-center gap-1"
              >
                <Trash2 size={14} /> Clear Cart
              </button>
            </div>

            {cart.items.map((item) => (
              <div
                key={item.id}
                className="bg-bg-surface dark:bg-dark-bg-surface p-4 md:p-6 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row items-center gap-6"
              >
                {/* Product Image */}
                <div className="w-24 h-24 bg-bg-soft dark:bg-dark-bg-soft rounded-2xl p-2 shrink-0">
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Name & Details */}
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-lg font-black text-text-main">{item.product.name}</h3>
                  <p className="text-sm font-bold text-primary">
                    ${item.product.finalPrice}{" "}
                    <span className="text-text-muted text-xs line-through ml-2 opacity-50">
                      ${item.product.price}
                    </span>
                  </p>
                </div>

                {/* Quantity Control */}
                <div className="flex items-center gap-3 bg-bg-soft dark:bg-dark-bg-soft p-1.5 rounded-xl border border-slate-100 dark:border-slate-800">
                  <button
                    onClick={() =>
                      item.quantity > 1 &&
                      updateQuantity({ itemId: item.id, quantity: item.quantity - 1 })
                    }
                    className="w-8 h-8 flex items-center justify-center rounded-lg bg-bg-surface dark:bg-dark-bg-surface text-text-main hover:text-primary transition-colors"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-8 text-center font-black">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity({ itemId: item.id, quantity: item.quantity + 1 })}
                    className="w-8 h-8 flex items-center justify-center rounded-lg bg-bg-surface dark:bg-dark-bg-surface text-text-main hover:text-primary transition-colors"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                {/* Item Total & Remove */}
                <div className="flex items-center gap-6">
                  <span className="text-lg font-black text-text-main min-w-20 text-right">
                    ${item.itemTotal}
                  </span>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* --- 2. Order Summary (Right Side) --- */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-bg-surface dark:bg-dark-bg-surface p-8 rounded-[3rem] shadow-xl border border-slate-100 dark:border-slate-800 sticky top-28">
              <h2 className="text-2xl font-black text-text-main mb-6">Summary</h2>

              {/* Coupon Input */}
              <div className="relative mb-8">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <Ticket size={18} />
                </div>
                <input
                  type="text"
                  placeholder="Coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="w-full pl-12 pr-20 py-4 bg-bg-soft dark:bg-dark-bg-soft border border-slate-200 dark:border-slate-700 rounded-2xl focus:border-primary outline-none text-sm font-bold"
                />
                <button
                  onClick={handleApplyCoupon}
                  disabled={isApplyingCoupon || !couponCode}
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-text-main text-white dark:bg-white dark:text-text-main text-[10px] font-black uppercase tracking-widest rounded-xl hover:scale-105 transition-all disabled:opacity-50"
                >
                  {isApplyingCoupon ? <Loader2 size={14} className="animate-spin" /> : "Apply"}
                </button>
              </div>

              {/* Totals List */}
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-text-muted font-bold">
                  <span>Subtotal</span>
                  <span>${formatPrice(cart.total)}</span>
                </div>

                {/* Discount Row (Dynamic from Preview) */}
                {discountInfo?.isValid && (
                  <div className="flex justify-between text-green-500 font-bold animate-in fade-in slide-in-from-right-2">
                    <span className="flex items-center gap-1 italic">
                      <Ticket size={14} /> Discount
                    </span>
                    <span>-${discountInfo.discountAmount}</span>
                  </div>
                )}

                <div className="flex justify-between text-text-muted font-bold">
                  <span className="flex items-center gap-1">
                    <Truck size={16} /> Delivery Fee
                  </span>
                  <span>
                    {discountInfo ? `$${discountInfo.deliveryCost}` : "Calculated at next step"}
                  </span>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-end">
                  <span className="text-text-main font-black">Total Amount</span>
                  <span className="text-3xl font-black text-primary">
                    $
                    {formatPrice(
                      discountInfo?.isValid ? discountInfo.totalAfterDiscount : cart.total,
                    )}
                  </span>
                </div>

                {discountInfo?.isValid && (
                  <p className="text-[10px] bg-green-500/10 text-green-600 p-2 rounded-lg font-bold text-center mt-2">
                    🎉 {discountInfo.message}
                  </p>
                )}
              </div>

              {/* Checkout Button */}
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
