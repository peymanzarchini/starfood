import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Loader2,
  Eye,
  EyeOff,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { useAdminCategories } from "@/modules/admin/hooks/useAdminCategories";
import type { Product } from "@/modules/product/types";
import { formatPrice } from "@/utils/formatPrice";
import { cn } from "@/libs/utils";
import { productSchema, type ProductFormValues } from "@/modules/admin/validations/productSchema";
import { useAdminProducts } from "@/modules/admin/hooks/useAdminProduct";
import ConfirmDialog from "@/components/ui/ConfirmDialog"; // 🌟 ایمپورت دیالوگ

const AdminProductsPage = () => {
  const [page, setPage] = useState<number>(1);
  const {
    productsData,
    isLoading,
    createProduct,
    updateProduct,
    deleteProduct,
    toggleAvailability,
    isCreating,
    isUpdating,
    isDeleting,
  } = useAdminProducts({ page, limit: 10 });
  const { categories } = useAdminCategories();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
  });

  const openCreateModal = () => {
    setEditingProduct(null);
    reset({
      name: "",
      description: "",
      price: 0,
      categoryId: 0,
      isAvailable: true,
      isPopular: false,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    reset({
      name: product.name,
      description: product.description,
      price: product.price,
      categoryId: product.categoryId,
      imageUrl: product.imageUrl,
      discount: product.discount,
      preparationTime: product.preparationTime || 0,
      calories: product.calories || 0,
      isAvailable: product.isAvailable,
      isPopular: product.isPopular,
    });
    setIsModalOpen(true);
  };

  const onSubmit = (data: ProductFormValues) => {
    const payload = { ...data, imageUrl: data.imageUrl || undefined };
    if (editingProduct) {
      updateProduct({ id: editingProduct.id, data: payload });
    } else {
      createProduct(payload);
    }
    setIsModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (deleteId !== null) {
      deleteProduct(deleteId);
      setDeleteId(null);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-text-main tracking-tight italic">Products</h1>
          <p className="text-text-muted text-sm font-medium mt-1">Manage your food items</p>
        </div>
        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-2xl font-black shadow-lg shadow-primary/30 hover:scale-105 transition-all cursor-pointer"
        >
          <Plus size={20} /> Add Product
        </button>
      </div>

      {/* لیست محصولات */}
      <div className="bg-bg-surface dark:bg-dark-bg-surface rounded-[2.5rem] border border-slate-100 dark:border-slate-800 overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-primary" size={40} />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead className="bg-bg-soft dark:bg-dark-bg-soft border-b border-slate-100 dark:border-slate-800">
                <tr className="text-text-muted text-xs font-black uppercase tracking-widest">
                  <th className="p-4 pl-8">Product</th>
                  <th className="p-4 hidden md:table-cell">Category</th>
                  <th className="p-4">Price</th>
                  <th className="p-4 hidden lg:table-cell">Status</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {productsData?.body.map((product) => {
                  const category = categories.find((c) => c.id === product.categoryId);
                  return (
                    <tr
                      key={product.id}
                      className="hover:bg-bg-soft/50 dark:hover:bg-dark-bg-soft/50 transition-colors"
                    >
                      <td className="p-4 pl-8">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-bg-soft dark:bg-dark-bg-soft rounded-xl overflow-hidden shrink-0">
                            <img
                              src={product.imageUrl || "/placeholder-food.png"}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div>
                            <p className="font-black text-text-main">{product.name}</p>
                            <p className="text-xs text-text-muted line-clamp-1 max-w-xs">
                              {product.description}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 hidden md:table-cell text-sm font-bold text-text-muted">
                        {category?.name || "Unknown"}
                      </td>
                      <td className="p-4">
                        <div className="flex flex-col">
                          <span className="font-black text-text-main">
                            ${formatPrice(product.finalPrice)}
                          </span>
                          {product.discount > 0 && (
                            <span className="text-xs text-red-500 line-through">
                              ${formatPrice(product.price)}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-4 hidden lg:table-cell">
                        <button
                          onClick={() => toggleAvailability(product.id)}
                          className={cn(
                            "px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest",
                            product.isAvailable
                              ? "bg-green-100 text-green-600"
                              : "bg-red-100 text-red-600",
                          )}
                        >
                          {product.isAvailable ? "Available" : "Unavailable"}
                        </button>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => toggleAvailability(product.id)}
                            className="p-2 hover:bg-primary/10 text-text-muted hover:text-primary rounded-lg cursor-pointer hidden lg:block"
                          >
                            {product.isAvailable ? <Eye size={16} /> : <EyeOff size={16} />}
                          </button>
                          <button
                            onClick={() => openEditModal(product)}
                            className="p-2 hover:bg-blue-50 text-text-muted hover:text-blue-500 rounded-lg cursor-pointer"
                          >
                            <Pencil size={16} />
                          </button>
                          <button
                            onClick={() => setDeleteId(product.id)}
                            className="p-2 hover:bg-red-50 text-text-muted hover:text-red-500 rounded-lg cursor-pointer"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {!isLoading && productsData && productsData.totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-10">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={productsData.pageNumber <= 1}
            className="p-2 rounded-xl border border-slate-200 disabled:opacity-30 cursor-pointer hover:border-primary hover:text-primary"
          >
            <ChevronLeft size={20} />
          </button>
          <span className="font-bold text-text-muted">
            Page {productsData.pageNumber} of {productsData.totalPages}
          </span>
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={productsData.pageNumber >= productsData.totalPages}
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
            className="bg-bg-surface dark:bg-dark-bg-surface w-full max-w-2xl rounded-[2.5rem] p-8 shadow-2xl my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-black text-text-main">
                {editingProduct ? "Edit Product" : "New Product"}
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
              <div className="md:col-span-2 space-y-1">
                <label className="text-xs font-black uppercase tracking-widest text-text-muted">
                  Product Name
                </label>
                <input
                  {...register("name")}
                  className="w-full p-4 bg-bg-soft rounded-xl font-bold outline-none border border-transparent focus:border-primary transition-all"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs font-bold">{errors.name.message}</p>
                )}
              </div>

              <div className="md:col-span-2 space-y-1">
                <label className="text-xs font-black uppercase tracking-widest text-text-muted">
                  Description
                </label>
                <textarea
                  {...register("description")}
                  rows={3}
                  className="w-full p-4 bg-bg-soft rounded-xl font-bold outline-none border border-transparent focus:border-primary transition-all resize-none"
                />
                {errors.description && (
                  <p className="text-red-500 text-xs font-bold">{errors.description.message}</p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-black uppercase tracking-widest text-text-muted">
                  Price ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register("price", { valueAsNumber: true })}
                  className="w-full p-4 bg-bg-soft rounded-xl font-bold outline-none border border-transparent focus:border-primary transition-all"
                />
                {errors.price && (
                  <p className="text-red-500 text-xs font-bold">{errors.price.message}</p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-black uppercase tracking-widest text-text-muted">
                  Category
                </label>
                <select
                  {...register("categoryId", { valueAsNumber: true })}
                  className="w-full p-4 bg-bg-soft rounded-xl font-bold outline-none border border-transparent focus:border-primary transition-all cursor-pointer"
                >
                  <option value={0}>Select Category...</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                {errors.categoryId && (
                  <p className="text-red-500 text-xs font-bold">{errors.categoryId.message}</p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-black uppercase tracking-widest text-text-muted">
                  Discount (%)
                </label>
                <input
                  type="number"
                  {...register("discount", { valueAsNumber: true })}
                  className="w-full p-4 bg-bg-soft rounded-xl font-bold outline-none border border-transparent focus:border-primary transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-black uppercase tracking-widest text-text-muted">
                  Prep Time (min)
                </label>
                <input
                  type="number"
                  {...register("preparationTime", { valueAsNumber: true })}
                  className="w-full p-4 bg-bg-soft rounded-xl font-bold outline-none border border-transparent focus:border-primary transition-all"
                />
              </div>

              <div className="md:col-span-2 space-y-1">
                <label className="text-xs font-black uppercase tracking-widest text-text-muted">
                  Main Image URL
                </label>
                <input
                  {...register("imageUrl")}
                  placeholder="https://..."
                  className="w-full p-4 bg-bg-soft rounded-xl font-bold outline-none border border-transparent focus:border-primary transition-all"
                />
                {errors.imageUrl && (
                  <p className="text-red-500 text-xs font-bold">{errors.imageUrl.message}</p>
                )}
              </div>

              <div className="md:col-span-2 flex gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer font-bold text-text-main">
                  <input
                    type="checkbox"
                    {...register("isAvailable")}
                    className="w-5 h-5 accent-primary"
                  />{" "}
                  Available
                </label>
                <label className="flex items-center gap-2 cursor-pointer font-bold text-text-main">
                  <input
                    type="checkbox"
                    {...register("isPopular")}
                    className="w-5 h-5 accent-primary"
                  />{" "}
                  Popular
                </label>
              </div>

              <div className="md:col-span-2 mt-4">
                <button
                  type="submit"
                  disabled={isCreating || isUpdating}
                  className="w-full py-4 bg-primary text-white rounded-2xl font-black shadow-lg hover:scale-[1.02] active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {(isCreating || isUpdating) && <Loader2 size={20} className="animate-spin" />}
                  {editingProduct ? "Update Product" : "Create Product"}
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
        title="Delete Product?"
        message="Are you sure you want to delete this product? This action cannot be undone."
        isLoading={isDeleting}
      />
    </>
  );
};

export default AdminProductsPage;
