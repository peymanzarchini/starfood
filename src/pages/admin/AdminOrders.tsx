import { useState } from "react";
import { Loader2, ChevronLeft, ChevronRight, Eye, X } from "lucide-react";

import { useAdminOrders, useAdminOrderDetails } from "@/modules/admin/hooks/useAdminOrders";
import type { OrderStatus } from "@/modules/order/types";
import { StatusBadge } from "@/modules/order";
import { formatPrice } from "@/utils/formatPrice";
import { cn } from "@/libs/utils";

const AdminOrdersPage = () => {
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all");
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);

  const { statuses, ordersData, isLoading, updateStatus, isUpdating } = useAdminOrders({
    page,
    limit: 10,
    status: statusFilter === "all" ? undefined : statusFilter,
  });

  const { data: viewingOrder, isLoading: isLoadingDetails } = useAdminOrderDetails(selectedOrderId);

  const currentStatusInfo = statuses.find((s) => s.key === viewingOrder?.status);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-text-main tracking-tight italic">Orders</h1>
          <p className="text-text-muted text-sm font-medium mt-1">
            Manage and track customer orders
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 no-scrollbar">
        <button
          onClick={() => {
            setStatusFilter("all");
            setPage(1);
          }}
          className={cn(
            "px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all shrink-0 cursor-pointer",
            statusFilter === "all"
              ? "bg-primary text-white"
              : "bg-bg-surface text-text-muted hover:bg-primary/10",
          )}
        >
          All Orders
        </button>
        {statuses.map((s) => (
          <button
            key={s.key}
            onClick={() => {
              setStatusFilter(s.key);
              setPage(1);
            }}
            className={cn(
              "px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all shrink-0 cursor-pointer",
              statusFilter === s.key
                ? "bg-primary text-white"
                : "bg-bg-surface text-text-muted hover:bg-primary/10",
            )}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="bg-bg-surface dark:bg-dark-bg-surface rounded-[2.5rem] border border-slate-100 dark:border-slate-800 overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-primary" size={40} />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-bg-soft dark:bg-dark-bg-soft border-b border-slate-100 dark:border-slate-800">
                <tr className="text-text-muted text-xs font-black uppercase tracking-widest">
                  <th className="p-4 pl-8 text-left">Order ID</th>
                  <th className="p-4 hidden md:table-cell text-center">Items</th>
                  <th className="p-4 text-center">Total</th>
                  <th className="p-4 text-center">Status</th>
                  <th className="p-4 hidden lg:table-cell text-center">Date</th>
                  <th className="p-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {ordersData?.body.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-bg-soft/50 dark:hover:bg-dark-bg-soft/50 transition-colors"
                  >
                    {/* ستون آیدی */}
                    <td className="p-4 pl-8 text-left font-black text-text-main">
                      #{order.orderNumber}
                    </td>

                    {/* ستون تعداد آیتم‌ها */}
                    <td className="p-4 hidden md:table-cell text-center text-sm font-bold text-text-muted">
                      {order.itemCount} items
                    </td>

                    {/* ستون مبلغ کل */}
                    <td className="p-4 text-center font-black text-primary">
                      ${formatPrice(order.totalAmount)}
                    </td>

                    {/* ستون وضعیت */}
                    <td className="p-4 text-center">
                      <div className="flex justify-center">
                        <StatusBadge status={order.status} />
                      </div>
                    </td>

                    {/* ستون تاریخ */}
                    <td className="p-4 hidden lg:table-cell text-center text-sm font-bold text-text-muted">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>

                    {/* ستون اکشن (دکمه چشم) */}
                    <td className="p-4 text-center">
                      <div className="flex justify-center">
                        <button
                          onClick={() => setSelectedOrderId(order.id)}
                          className="p-2 hover:bg-primary/10 text-text-muted hover:text-primary rounded-lg cursor-pointer"
                        >
                          <Eye size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {!isLoading && ordersData && ordersData.totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-10">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={ordersData.pageNumber <= 1}
            className="p-2 rounded-xl border border-slate-200 disabled:opacity-30 cursor-pointer hover:border-primary hover:text-primary"
          >
            <ChevronLeft size={20} />
          </button>
          <span className="font-bold text-text-muted">
            Page {ordersData.pageNumber} of {ordersData.totalPages}
          </span>
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={ordersData.pageNumber >= ordersData.totalPages}
            className="p-2 rounded-xl border border-slate-200 disabled:opacity-30 cursor-pointer hover:border-primary hover:text-primary"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}

      {selectedOrderId && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedOrderId(null)}
        >
          <div
            className="bg-bg-surface dark:bg-dark-bg-surface w-full max-w-lg rounded-[2.5rem] p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {isLoadingDetails || !viewingOrder ? (
              <div className="flex justify-center py-20">
                <Loader2 className="animate-spin text-primary" size={40} />
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-2xl font-black text-text-main">Order Details</h2>
                    <p className="text-sm font-bold text-text-muted">#{viewingOrder.orderNumber}</p>
                  </div>
                  <button
                    onClick={() => setSelectedOrderId(null)}
                    className="text-text-muted hover:text-primary cursor-pointer"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-sm font-bold border-b border-slate-100 dark:border-slate-800 pb-2">
                    <span className="text-text-muted">Customer Address:</span>
                    <span className="text-text-main text-left max-w-[60%]">
                      {viewingOrder.address.fullAddress}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-bold border-b border-slate-100 dark:border-slate-800 pb-2">
                    <span className="text-text-muted">Items:</span>
                    <span className="text-text-main">{viewingOrder.items.length} Items</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold border-b border-slate-100 dark:border-slate-800 pb-2">
                    <span className="text-text-muted">Total Amount:</span>
                    <span className="text-primary">${formatPrice(viewingOrder.totalAmount)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-bold">
                    <span className="text-text-muted">Current Status:</span>
                    <StatusBadge status={viewingOrder.status} />
                  </div>
                </div>

                {/* بخش داینامیک تغییر وضعیت */}
                {currentStatusInfo && currentStatusInfo.nextStatuses.length > 0 ? (
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-text-muted mb-3">
                      Change Status To:
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {currentStatusInfo.nextStatuses.map((nextStatus) => {
                        const isCancel = nextStatus.key === "cancelled";
                        return (
                          <button
                            key={nextStatus.key}
                            onClick={() => {
                              updateStatus({ id: viewingOrder.id, status: nextStatus.key });
                              setSelectedOrderId(null);
                            }}
                            disabled={isUpdating}
                            className={cn(
                              "flex-1 py-3 rounded-2xl font-black text-sm transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50",
                              isCancel
                                ? "bg-red-100 text-red-600 hover:bg-red-200"
                                : "bg-primary text-white hover:scale-[1.02]",
                            )}
                          >
                            {isUpdating ? (
                              <Loader2 size={16} className="animate-spin" />
                            ) : (
                              nextStatus.label
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="bg-green-50 dark:bg-green-900/20 text-green-600 p-4 rounded-2xl text-center font-black text-sm">
                    This order has reached its final state.
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrdersPage;
