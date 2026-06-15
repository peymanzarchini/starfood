/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  MapPin,
  Plus,
  ClipboardList,
  CheckCircle2,
  ArrowLeft,
  CreditCard,
  Loader2,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { toast } from "sonner";

import Container from "@/components/ui/Container";
import { cn } from "@/libs/utils";
import { useAddresses } from "@/modules/address";
import { useCreateOrder } from "@/modules/order";
import { useCart } from "@/modules/cart";
import { formatPrice } from "@/utils/formatPrice";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cart, isLoading: cartLoading, appliedDiscount } = useCart();
  const { addresses, isLoading: addrLoading } = useAddresses();
  const { mutate: createOrder, isPending: isSubmitting } = useCreateOrder();

  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
  const [notes, setNotes] = useState<string>("");

  useEffect(() => {
    if (addresses.length > 0 && !selectedAddressId) {
      const defaultAddr = addresses.find((a) => a.isDefault) || addresses[0];
      setSelectedAddressId(defaultAddr.id);
    }
  }, [addresses, selectedAddressId]);

  const handlePlaceOrder = async () => {
    if (!selectedAddressId) {
      toast.error("Please select a delivery address to continue.");
      return;
    }

    createOrder(
      {
        addressId: selectedAddressId,
        notes: notes.trim() || undefined,
        discountCode: appliedDiscount?.discount.code,
      },
      {
        onSuccess: () => {
          navigate("/orders", { replace: true });
        },
      },
    );
  };

  if (cartLoading || addrLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
        <p className="font-bold text-text-muted">Preparing your checkout...</p>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center">
        <ShoppingBag size={60} className="text-slate-200 mb-6" />
        <h2 className="text-3xl font-black text-text-main mb-4">Your cart is empty</h2>
        <Link
          to="/foods"
          className="px-8 py-3 bg-primary text-white rounded-2xl font-black shadow-lg"
        >
          Back to Menu
        </Link>
      </div>
    );
  }

  const subtotal = appliedDiscount ? appliedDiscount.subtotal : cart.total;
  const deliveryCost = appliedDiscount ? appliedDiscount.deliveryCost : null;
  const discountAmount = appliedDiscount ? appliedDiscount.discountAmount : 0;
  const totalAmount = appliedDiscount ? appliedDiscount.totalAfterDiscount : cart.total;

  return (
    <main className="bg-bg-page dark:bg-dark-bg-page py-10 md:py-16">
      <Container>
        <Link
          to="/cart"
          className="flex items-center gap-2 text-text-muted font-bold mb-8 hover:text-primary transition-colors group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back
          to Shopping Cart
        </Link>

        <h1 className="text-4xl md:text-5xl font-black text-text-main mb-12 tracking-tight italic">
          Final <span className="text-primary">Step</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-2 space-y-10">
            <section className="space-y-6">
              <div className="flex items-center justify-between px-2">
                <h3 className="text-2xl font-black text-text-main flex items-center gap-3">
                  <MapPin size={26} className="text-primary" /> Delivery Address
                </h3>
                <Link
                  to="/profile"
                  className="text-xs font-black text-primary uppercase tracking-widest flex items-center gap-1.5 hover:underline bg-primary/5 px-4 py-2 rounded-full"
                >
                  <Plus size={14} /> Add New Address
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {addresses.length === 0 ? (
                  <div className="md:col-span-2 p-12 bg-bg-surface dark:bg-dark-bg-surface rounded-[2.5rem] border-2 border-dashed border-slate-200 dark:border-slate-800 text-center">
                    <p className="text-text-muted font-bold mb-6">No saved addresses found.</p>
                    <Link
                      to="/profile"
                      className="px-8 py-3 bg-primary text-white font-black rounded-2xl inline-block shadow-xl shadow-primary/20"
                    >
                      Manage Addresses
                    </Link>
                  </div>
                ) : (
                  addresses.map((addr) => (
                    <button
                      key={addr.id}
                      onClick={() => setSelectedAddressId(addr.id)}
                      className={cn(
                        "p-6 rounded-[2.5rem] border-2 text-left transition-all duration-500 relative group overflow-hidden cursor-pointer",
                        selectedAddressId === addr.id
                          ? "bg-primary/5 border-primary shadow-xl shadow-primary/10 -translate-y-1"
                          : "bg-bg-surface dark:bg-dark-bg-surface border-slate-100 dark:border-slate-800 hover:border-primary/30",
                      )}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <span className="font-black text-text-main text-lg">{addr.title}</span>
                        {selectedAddressId === addr.id ? (
                          <CheckCircle2 size={22} className="text-primary animate-in zoom-in" />
                        ) : (
                          <div className="w-5 h-5 rounded-full border-2 border-slate-200 dark:border-slate-700" />
                        )}
                      </div>
                      <p className="text-sm text-text-muted font-medium leading-relaxed line-clamp-2 mb-4">
                        {addr.fullAddress}
                      </p>
                      <div className="pt-4 border-t border-slate-50 dark:border-slate-800/50 flex items-center gap-2 text-text-main font-bold text-xs uppercase tracking-tighter">
                        <Truck size={14} className="text-primary" /> {addr.phoneNumber}
                      </div>
                    </button>
                  ))
                )}
              </div>
            </section>

            <section className="space-y-4">
              <h3 className="text-2xl font-black text-text-main flex items-center gap-3 px-2">
                <ClipboardList size={26} className="text-primary" /> Delivery Instructions
              </h3>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Examples: Apartment number, gate code..."
                rows={4}
                className="w-full p-6 bg-bg-surface dark:bg-dark-bg-surface border border-slate-200 dark:border-slate-800 rounded-[2.5rem] focus:border-primary outline-none text-sm font-medium transition-all shadow-sm focus:ring-4 focus:ring-primary/5 resize-none"
              />
            </section>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-bg-surface dark:bg-dark-bg-surface p-8 rounded-[3rem] shadow-2xl border border-slate-100 dark:border-slate-800 sticky top-28 overflow-hidden">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
              <h2 className="text-2xl font-black text-text-main mb-8 relative">Order Review</h2>

              <div className="space-y-6 relative">
                <div className="max-h-45 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
                  {cart.items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center text-sm">
                      <span className="text-text-muted font-bold">
                        <span className="text-primary font-black">{item.quantity}x</span>{" "}
                        {item.product.name}
                      </span>
                      <span className="text-text-main font-black">
                        ${formatPrice(item.itemTotal)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-4">
                  <div className="flex justify-between text-text-muted font-bold text-sm">
                    <span>Food Subtotal</span>
                    <span>${formatPrice(subtotal)}</span>
                  </div>

                  {appliedDiscount && discountAmount > 0 && (
                    <div className="flex justify-between text-green-500 font-bold text-sm">
                      <span>Promo ({appliedDiscount.discount.code})</span>
                      <span>-${formatPrice(discountAmount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-text-muted font-bold text-sm">
                    <span className="flex items-center gap-1.5">
                      <Truck size={16} /> Delivery Fee
                    </span>
                    <span className={deliveryCost === 0 ? "text-green-600" : ""}>
                      {deliveryCost !== null
                        ? deliveryCost === 0
                          ? "FREE"
                          : `$${formatPrice(deliveryCost)}`
                        : "Calculated at next step"}
                    </span>
                  </div>

                  <div className="flex justify-between items-end pt-4">
                    <div>
                      <p className="text-[10px] text-text-muted font-black uppercase tracking-widest mb-1">
                        Total Amount
                      </p>
                      <span className="text-text-main text-lg font-black">To be paid</span>
                    </div>
                    <span className="text-4xl font-black text-primary tracking-tighter">
                      ${formatPrice(totalAmount)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handlePlaceOrder}
                  disabled={isSubmitting || !selectedAddressId}
                  className="w-full py-5 bg-primary text-white rounded-4xl font-black shadow-xl shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-x-3 disabled:opacity-50 disabled:grayscale mt-6 cursor-pointer"
                >
                  {isSubmitting ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <>
                      <CreditCard size={22} /> <span>Place Order Now</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
};

export default CheckoutPage;
