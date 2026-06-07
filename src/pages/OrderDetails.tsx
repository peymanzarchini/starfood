import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Package, MapPin, CreditCard, CheckCircle2, XCircle } from "lucide-react";
import Container from "@/components/ui/Container";
import { useOrderDetails, useCancelOrder, StatusBadge } from "@/modules/order"; // ⭐ ماژول سفارشات
import { formatPrice } from "@/utils/formatPrice";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const OrderDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: order, isLoading, isError } = useOrderDetails(Number(id));
  const { mutate: cancelOrder, isPending: isCancelling } = useCancelOrder();
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center font-bold text-primary">
        Loading order details...
      </div>
    );
  if (isError || !order)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 font-bold">
        Order not found.
      </div>
    );

  const canCancel = order.status === "pending" || order.status === "confirmed";

  return (
    <main className="bg-bg-page dark:bg-dark-bg-page py-10 md:py-20 min-h-screen">
      <Container className="max-w-4xl">
        <Link
          to="/orders"
          className="flex items-center gap-2 text-text-muted font-bold mb-8 hover:text-primary transition-all"
        >
          <ArrowLeft size={18} /> Back to My Orders
        </Link>

        <div className="bg-bg-surface dark:bg-dark-bg-surface rounded-[3rem] shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden">
          {/* Header Status */}
          <div className="bg-primary p-8 md:p-12 text-white flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <p className="text-primary-foreground/80 font-bold uppercase tracking-widest text-xs mb-2">
                Order Status
              </p>
              <div className="flex items-center gap-4">
                <h2 className="text-4xl font-black capitalize tracking-tight italic">
                  {order.status}
                </h2>
                <StatusBadge status={order.status} /> {/* ⭐ ماژول */}
              </div>
            </div>
            <div className="text-center md:text-right font-black">
              <p className="text-xs uppercase opacity-80 mb-1">Order Number</p>
              <p className="text-xl">#{order.orderNumber}</p>
            </div>
          </div>

          <div className="p-8 md:p-12 space-y-12">
            {/* 1. Items List */}
            <section>
              <h3 className="text-xl font-black text-text-main mb-6 flex items-center gap-2 italic">
                <Package size={22} className="text-primary" /> Ordered Items
              </h3>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center py-4 border-b border-slate-50 dark:border-slate-800 last:border-0"
                  >
                    <div>
                      <h4 className="font-black text-text-main">{item.productName}</h4>
                      <p className="text-xs text-text-muted font-bold mt-1 uppercase tracking-tighter">
                        {item.quantity} x ${formatPrice(item.unitPrice)}
                      </p>
                    </div>
                    <span className="font-black text-lg text-text-main">
                      ${formatPrice(item.totalPrice)}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* 2. Delivery Info */}
              <section className="space-y-4">
                <h3 className="text-xl font-black text-text-main flex items-center gap-2 italic">
                  <MapPin size={22} className="text-primary" /> Delivery Detail
                </h3>
                <div className="bg-bg-soft dark:bg-dark-bg-soft p-6 rounded-4xl">
                  <p className="font-black text-text-main mb-2">{order.address.title}</p>
                  <p className="text-sm text-text-muted font-medium mb-4">
                    {order.address.fullAddress}
                  </p>
                  <p className="text-xs font-black text-text-main">{order.address.phoneNumber}</p>
                </div>
              </section>

              {/* 3. Payment Summary */}
              <section className="space-y-4">
                <h3 className="text-xl font-black text-text-main flex items-center gap-2 italic">
                  <CreditCard size={22} className="text-primary" /> Payment Summary
                </h3>
                <div className="bg-bg-soft dark:bg-dark-bg-soft p-6 rounded-4xl space-y-3 font-bold text-sm">
                  <div className="flex justify-between text-text-muted">
                    <span>Subtotal</span>
                    <span>${formatPrice(order.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-text-muted">
                    <span>Delivery Fee</span>
                    <span>${formatPrice(order.deliveryCost)}</span>
                  </div>
                  {order.discountAmount > 0 && (
                    <div className="flex justify-between text-green-500 italic">
                      <span>Discount ({order.discountCode})</span>
                      <span>-${formatPrice(order.discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-end pt-4 border-t border-slate-200 dark:border-slate-700">
                    <span className="text-text-main font-black">Total Paid</span>
                    <span className="text-2xl font-black text-primary">
                      ${formatPrice(order.totalAmount)}
                    </span>
                  </div>
                </div>
              </section>
            </div>

            {/* 4. Actions & Timeline */}
            <section className="pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col items-center gap-6">
              <p className="text-[10px] text-text-muted font-black uppercase tracking-widest">
                Created at: {new Date(order.createdAt).toLocaleString()}
              </p>

              {/* دکمه لغو سفارش */}
              {canCancel && !showCancelConfirm && (
                <button
                  onClick={() => setShowCancelConfirm(true)}
                  className="px-8 py-3 border-2 border-red-200 dark:border-red-900 text-red-500 rounded-2xl font-black hover:bg-red-50 dark:hover:bg-red-900/20 transition-all cursor-pointer"
                >
                  Cancel Order
                </button>
              )}

              {showCancelConfirm && (
                <div className="bg-red-50 dark:bg-red-900/10 p-6 rounded-2xl border border-red-200 dark:border-red-900 text-center space-y-4 w-full max-w-sm">
                  <XCircle size={32} className="text-red-500 mx-auto" />
                  <p className="font-black text-text-main">Are you sure you want to cancel?</p>
                  <div className="flex gap-3">
                    <button
                      onClick={() =>
                        cancelOrder(order.id, { onSuccess: () => setShowCancelConfirm(false) })
                      }
                      disabled={isCancelling}
                      className="flex-1 py-3 bg-red-500 text-white rounded-xl font-black text-xs cursor-pointer flex items-center justify-center gap-1 disabled:opacity-70"
                    >
                      {isCancelling ? (
                        <Loader2 size={14} className="animate-spin" />
                      ) : (
                        "Yes, Cancel"
                      )}
                    </button>
                    <button
                      onClick={() => setShowCancelConfirm(false)}
                      className="flex-1 py-3 bg-slate-100 text-text-main rounded-xl font-black text-xs cursor-pointer"
                    >
                      No, Keep It
                    </button>
                  </div>
                </div>
              )}

              {!canCancel && (
                <div className="flex items-center justify-center gap-2 py-3 px-6 bg-green-500/10 text-green-600 rounded-full">
                  <CheckCircle2 size={16} />
                  <span className="text-xs font-black uppercase">Verified Secure Transaction</span>
                </div>
              )}
            </section>
          </div>
        </div>
      </Container>
    </main>
  );
};

export default OrderDetailsPage;
