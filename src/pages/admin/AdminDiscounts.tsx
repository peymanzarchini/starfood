import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Loader2,
  Tag,
  ChevronLeft,
  ChevronRight,
  Power,
} from "lucide-react";

import { useAdminDiscounts } from "@/modules/admin/hooks/useAdminDiscounts";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { formatPrice } from "@/utils/formatPrice";
import { cn } from "@/libs/utils";
import type { Discount } from "@/modules/admin/types";
import {
  discountSchema,
  type DiscountFormValues,
} from "@/modules/admin/validations/discountSchema";

const AdminDiscountsPage = () => {
  const [page, setPage] = useState(1);
  const {
    discountsData,
    isLoading,
    createDiscount,
    updateDiscount,
    deleteDiscount,
    toggleDiscount,
    isCreating,
    isUpdating,
    isDeleting,
  } = useAdminDiscounts({ page, limit: 10 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDiscount, setEditingDiscount] = useState<Discount | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<DiscountFormValues>({
    resolver: zodResolver(discountSchema),
  });

  const typeValue = watch("type");

  const openCreateModal = () => {
    setEditingDiscount(null);
    reset({
      code: "",
      type: "percentage",
      value: 0,
      minOrderAmount: 0,
      usageLimit: 100,
      expireDate: "",
      isActive: true,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (discount: Discount) => {
    setEditingDiscount(discount);
    reset({
      code: discount.code,
      type: discount.type,
      value: discount.value,
      minOrderAmount: discount.minOrderAmount,
      maxDiscountAmount: discount.maxDiscountAmount,
      usageLimit: discount.usageLimit,
      expireDate: new Date(discount.expireDate).toISOString().split("T")[0],
      isActive: discount.isActive,
    });
    setIsModalOpen(true);
  };

  const onSubmit = (data: DiscountFormValues) => {
    const payload = { ...data, expireDate: new Date(data.expireDate).toISOString() };
    if (editingDiscount) {
      updateDiscount({ id: editingDiscount.id, data: payload });
    } else {
      createDiscount(payload);
    }
    setIsModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (deleteId !== null) {
      deleteDiscount(deleteId);
      setDeleteId(null);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-text-main tracking-tight italic">Discounts</h1>
          <p className="text-text-muted text-sm font-medium mt-1">Create and manage promo codes</p>
        </div>
        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-2xl font-black shadow-lg shadow-primary/30 hover:scale-105 transition-all cursor-pointer"
        >
          <Plus size={20} /> Add Discount
        </button>
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
                  <th className="p-4 pl-8 text-left">Code</th>
                  <th className="p-4 text-center hidden md:table-cell">Value</th>
                  <th className="p-4 text-center hidden lg:table-cell">Usage</th>
                  <th className="p-4 text-center hidden md:table-cell">Expire Date</th>
                  <th className="p-4 text-center">Status</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {discountsData?.body.map((discount) => (
                  <tr
                    key={discount.id}
                    className="hover:bg-bg-soft/50 dark:hover:bg-dark-bg-soft/50 transition-colors"
                  >
                    <td className="p-4 pl-8 text-left">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                          <Tag size={18} />
                        </div>
                        <span className="font-black text-text-main tracking-wider">
                          {discount.code}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-center hidden md:table-cell text-sm font-bold text-text-main">
                      {discount.type === "percentage"
                        ? `${discount.value}%`
                        : `$${formatPrice(discount.value)}`}
                    </td>
                    <td className="p-4 text-center hidden lg:table-cell text-sm font-bold text-text-muted">
                      {discount.usedCount} / {discount.usageLimit}
                    </td>
                    <td className="p-4 text-center hidden md:table-cell text-sm font-bold text-text-muted">
                      {new Date(discount.expireDate).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-center">
                      <span
                        className={cn(
                          "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                          discount.isActive
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600",
                        )}
                      >
                        {discount.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => toggleDiscount(discount.id)}
                          disabled={discount.usedCount >= discount.usageLimit}
                          className="p-2 hover:bg-amber-50 text-text-muted hover:text-amber-500 rounded-lg cursor-pointer transition-colors disabled:opacity-30"
                        >
                          <Power size={16} />
                        </button>
                        <button
                          onClick={() => openEditModal(discount)}
                          className="p-2 hover:bg-blue-50 text-text-muted hover:text-blue-500 rounded-lg cursor-pointer"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => setDeleteId(discount.id)}
                          className="p-2 hover:bg-red-50 text-text-muted hover:text-red-500 rounded-lg cursor-pointer"
                        >
                          <Trash2 size={16} />
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
      {!isLoading && discountsData && discountsData.totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-10">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={discountsData.pageNumber <= 1}
            className="p-2 rounded-xl border border-slate-200 disabled:opacity-30 cursor-pointer hover:border-primary hover:text-primary"
          >
            <ChevronLeft size={20} />
          </button>
          <span className="font-bold text-text-muted">
            Page {discountsData.pageNumber} of {discountsData.totalPages}
          </span>
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={discountsData.pageNumber >= discountsData.totalPages}
            className="p-2 rounded-xl border border-slate-200 disabled:opacity-30 cursor-pointer hover:border-primary hover:text-primary"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-bg-surface dark:bg-dark-bg-surface w-full max-w-xl rounded-[2.5rem] p-8 shadow-2xl my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-black text-text-main">
                {editingDiscount ? "Edit Discount" : "New Discount"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-text-muted hover:text-primary cursor-pointer"
              >
                <X size={24} />
              </button>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid grid-cols-1 md:grid-cols-2 gap-5"
            >
              <div className="space-y-1">
                <label className="text-xs font-black uppercase tracking-widest text-text-muted">
                  Code
                </label>
                <input
                  {...register("code")}
                  placeholder="SUMMER20"
                  className="w-full p-4 bg-bg-soft rounded-xl font-bold outline-none border border-transparent focus:border-primary transition-all uppercase"
                />
                {errors.code && (
                  <p className="text-red-500 text-xs font-bold">{errors.code.message}</p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-black uppercase tracking-widest text-text-muted">
                  Type
                </label>
                <select
                  {...register("type")}
                  className="w-full p-4 bg-bg-soft rounded-xl font-bold outline-none border border-transparent focus:border-primary transition-all cursor-pointer"
                >
                  <option value="percentage">Percentage (%)</option>
                  <option value="fixed">Fixed Amount ($)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-black uppercase tracking-widest text-text-muted">
                  Value
                </label>
                <input
                  type="number"
                  {...register("value", { valueAsNumber: true })}
                  className="w-full p-4 bg-bg-soft rounded-xl font-bold outline-none border border-transparent focus:border-primary transition-all"
                />
                {errors.value && (
                  <p className="text-red-500 text-xs font-bold">{errors.value.message}</p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-black uppercase tracking-widest text-text-muted">
                  Usage Limit
                </label>
                <input
                  type="number"
                  {...register("usageLimit", { valueAsNumber: true })}
                  className="w-full p-4 bg-bg-soft rounded-xl font-bold outline-none border border-transparent focus:border-primary transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-black uppercase tracking-widest text-text-muted">
                  Min Order Amount ($)
                </label>
                <input
                  type="number"
                  {...register("minOrderAmount", { valueAsNumber: true })}
                  className="w-full p-4 bg-bg-soft rounded-xl font-bold outline-none border border-transparent focus:border-primary transition-all"
                />
              </div>

              {typeValue === "percentage" && (
                <div className="space-y-1">
                  <label className="text-xs font-black uppercase tracking-widest text-text-muted">
                    Max Discount Amount ($)
                  </label>
                  <input
                    type="number"
                    {...register("maxDiscountAmount", { valueAsNumber: true })}
                    className="w-full p-4 bg-bg-soft rounded-xl font-bold outline-none border border-transparent focus:border-primary transition-all"
                  />
                </div>
              )}

              <div className="md:col-span-2 space-y-1">
                <label className="text-xs font-black uppercase tracking-widest text-text-muted">
                  Expire Date
                </label>
                <input
                  type="date"
                  {...register("expireDate")}
                  className="w-full p-4 bg-bg-soft rounded-xl font-bold outline-none border border-transparent focus:border-primary transition-all cursor-pointer"
                />
                {errors.expireDate && (
                  <p className="text-red-500 text-xs font-bold">{errors.expireDate.message}</p>
                )}
              </div>

              <div className="md:col-span-2 mt-4">
                <button
                  type="submit"
                  disabled={isCreating || isUpdating}
                  className="w-full py-4 bg-primary text-white rounded-2xl font-black shadow-lg hover:scale-[1.02] active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {(isCreating || isUpdating) && <Loader2 size={20} className="animate-spin" />}
                  {editingDiscount ? "Update Discount" : "Create Discount"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmDialog
        isOpen={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Discount?"
        message="Are you sure you want to delete this discount code?"
        isLoading={isDeleting}
      />
    </div>
  );
};

export default AdminDiscountsPage;
