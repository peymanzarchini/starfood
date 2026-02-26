import { useState, type ReactNode } from "react";
import {
  Package,
  Calendar,
  ChevronRight,
  Clock,
  CheckCircle2,
  Truck,
  XCircle,
  ShoppingBag,
  Loader2,
} from "lucide-react";
import { Link } from "react-router-dom";

import Container from "@/components/ui/Container";
import { cn } from "@/libs/utils";
import type { OrderStatus } from "@/features/dashboard/order/types";
import { useOrders } from "@/features/home/hooks/useOrders";
import { formatPrice } from "@/utils/formatPrice";

/**
 * Configuration for Order Status UI
 */
const STATUS_CONFIG: Record<OrderStatus, { label: string; color: string; icon: ReactNode }> = {
  pending: {
    label: "Pending",
    color: "text-amber-600 bg-amber-50 dark:bg-amber-900/20",
    icon: <Clock size={14} />,
  },
  confirmed: {
    label: "Confirmed",
    color: "text-blue-600 bg-blue-50 dark:bg-blue-900/20",
    icon: <CheckCircle2 size={14} />,
  },
  preparing: {
    label: "Preparing",
    color: "text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20",
    icon: <Package size={14} />,
  },
  ready: {
    label: "Ready",
    color: "text-cyan-600 bg-cyan-50 dark:bg-cyan-900/20",
    icon: <Package size={14} />,
  },
  delivering: {
    label: "On the way",
    color: "text-purple-600 bg-purple-50 dark:bg-purple-900/20",
    icon: <Truck size={14} />,
  },
  delivered: {
    label: "Delivered",
    color: "text-green-600 bg-green-50 dark:bg-green-900/20",
    icon: <CheckCircle2 size={14} />,
  },
  cancelled: {
    label: "Cancelled",
    color: "text-red-600 bg-red-50 dark:bg-red-900/20",
    icon: <XCircle size={14} />,
  },
};

const OrdersPage = () => {
  const [page, setPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState<OrderStatus | "all">("all");

  const { data, isLoading, isError } = useOrders(
    page,
    activeFilter === "all" ? undefined : activeFilter,
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
        <p className="font-bold text-text-muted">Fetching your orders...</p>
      </div>
    );
  }

  return (
    <main className="bg-bg-page dark:bg-dark-bg-page py-10 md:py-16 min-h-screen">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-text-main tracking-tight italic">
              Order <span className="text-primary">History</span>
            </h1>
            <p className="text-text-muted font-medium mt-2">
              Track and manage your delicious requests
            </p>
          </div>

          {/* Simple Status Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            <button
              onClick={() => {
                setActiveFilter("all");
                setPage(1);
              }}
              className={cn(
                "px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all shrink-0",
                activeFilter === "all"
                  ? "bg-primary text-white"
                  : "bg-bg-surface dark:bg-dark-bg-surface text-text-muted hover:bg-primary/10",
              )}
            >
              All
            </button>
            {(["pending", "delivering", "delivered", "cancelled"] as const).map((status) => (
              <button
                key={status}
                onClick={() => {
                  setActiveFilter(status);
                  setPage(1);
                }}
                className={cn(
                  "px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all shrink-0",
                  activeFilter === status
                    ? "bg-primary text-white"
                    : "bg-bg-surface dark:bg-dark-bg-surface text-text-muted hover:bg-primary/10",
                )}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {isError || !data || data.items.length === 0 ? (
          <div className="bg-bg-surface dark:bg-dark-bg-surface rounded-[3rem] p-16 border-2 border-dashed border-slate-100 dark:border-slate-800 text-center">
            <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
              <ShoppingBag size={32} />
            </div>
            <h3 className="text-2xl font-black text-text-main mb-2">No orders found</h3>
            <p className="text-text-muted font-medium mb-8">
              It seems you haven't placed any orders yet.
            </p>
            <Link
              to="/foods"
              className="px-10 py-4 bg-primary text-white rounded-2xl font-black shadow-lg shadow-primary/30 hover:scale-105 transition-all inline-block"
            >
              Start Ordering
            </Link>
          </div>
        ) : (
          <div className="grid gap-6">
            {data.items.map((order) => {
              const config = STATUS_CONFIG[order.status];
              return (
                <div
                  key={order.id}
                  className="bg-bg-surface dark:bg-dark-bg-surface p-6 md:p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-xl transition-all duration-500 group"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    {/* Left: Info */}
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 bg-bg-soft dark:bg-dark-bg-soft rounded-2xl flex items-center justify-center text-text-muted group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                        <Package size={28} />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-lg font-black text-text-main">
                            #{order.orderNumber}
                          </span>
                          <div
                            className={cn(
                              "flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                              config.color,
                            )}
                          >
                            {config.icon} {config.label}
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-xs font-bold text-text-muted uppercase tracking-tighter">
                          <span className="flex items-center gap-1">
                            <Calendar size={14} /> {new Date(order.createdAt).toLocaleDateString()}
                          </span>
                          <span>•</span>
                          <span>{order.itemCount} items</span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Price & Action */}
                    <div className="flex items-center justify-between md:justify-end gap-8 border-t md:border-t-0 pt-4 md:pt-0 border-slate-50 dark:border-slate-800">
                      <div className="text-right">
                        <p className="text-[10px] text-text-muted font-black uppercase tracking-widest mb-1">
                          Total Amount
                        </p>
                        <p className="text-2xl font-black text-text-main">
                          ${formatPrice(order.totalAmount)}
                        </p>
                      </div>
                      <Link
                        to={`/orders/${order.id}`}
                        className="w-12 h-12 flex items-center justify-center rounded-2xl bg-bg-soft dark:bg-dark-bg-soft text-text-main hover:bg-primary hover:text-white transition-all shadow-sm"
                      >
                        <ChevronRight size={24} />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Pagination Controls */}
            {data.pagination.totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-10">
                {Array.from({ length: data.pagination.totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={cn(
                      "w-10 h-10 rounded-xl font-black transition-all",
                      page === i + 1
                        ? "bg-primary text-white shadow-lg"
                        : "bg-bg-surface dark:bg-dark-bg-surface text-text-muted border border-slate-100 dark:border-slate-800 hover:border-primary/50",
                    )}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </Container>
    </main>
  );
};

export default OrdersPage;
