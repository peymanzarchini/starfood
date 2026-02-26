import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Package, MapPin, CreditCard, CheckCircle2 } from "lucide-react";
import Container from "@/components/ui/Container";
import { useOrderDetails } from "@/features/home/hooks/useOrders";
import { formatPrice } from "@/utils/formatPrice";

const OrderDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: order, isLoading, isError } = useOrderDetails(Number(id));

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
              <h2 className="text-4xl font-black capitalize tracking-tight italic">
                {order.status}
              </h2>
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

            {/* 4. Timeline (Visual Only) */}
            <section className="pt-8 border-t border-slate-100 dark:border-slate-800 text-center">
              <p className="text-[10px] text-text-muted font-black uppercase tracking-widest mb-2">
                Created at: {new Date(order.createdAt).toLocaleString()}
              </p>
              <div className="flex items-center justify-center gap-2 py-3 px-6 bg-green-500/10 text-green-600 rounded-full mx-auto">
                <CheckCircle2 size={16} />
                <span className="text-xs font-black uppercase">Verified Secure Transaction</span>
              </div>
            </section>
          </div>
        </div>
      </Container>
    </main>
  );
};

export default OrderDetailsPage;
