import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Plus, Pencil, Trash2, GripVertical, X, Loader2 } from "lucide-react";

import { useAdminCategories } from "@/modules/admin/hooks/useAdminCategories";
import type { Category } from "@/modules/categories/types";
import { cn } from "@/libs/utils";
import { getCategoryIcon } from "@/utils/getCategoryIcon";
import ConfirmDialog from "@/components/ui/ConfirmDialog";

const categorySchema = z.object({
  name: z.string().min(2, "Name is too short"),
  description: z.string().optional(),
  imageUrl: z.string().url("Invalid URL").or(z.literal("")).optional(),
});

type CategoryFormValues = z.infer<typeof categorySchema>;

const SortableItem = ({
  category,
  onEdit,
  onDelete,
  onToggle,
}: {
  category: Category;
  onEdit: (cat: Category) => void;
  onDelete: (id: number) => void;
  onToggle: (id: number, isActive: boolean) => void;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: category.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-bg-surface dark:bg-dark-bg-surface p-4 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center gap-4 group hover:border-primary/30 transition-all"
    >
      <button
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing text-text-muted hover:text-primary p-1"
      >
        <GripVertical size={20} />
      </button>

      <div className="w-12 h-12 bg-bg-soft dark:bg-dark-bg-soft rounded-xl overflow-hidden shrink-0">
        {category.imageUrl ? (
          <img src={category.imageUrl} className="w-full h-full object-contain" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-2xl">
            {getCategoryIcon(category.name)}
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-black text-text-main truncate">{category.name}</h3>
        <p className="text-xs text-text-muted font-medium">Order: {category.displayOrder}</p>
      </div>

      <button
        onClick={() => onToggle(category.id, !category.isActive)}
        className={cn(
          "px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest cursor-pointer transition-all hover:opacity-80",
          category.isActive
            ? "bg-green-100 text-green-600 hover:bg-green-200"
            : "bg-red-100 text-red-600 hover:bg-red-200",
        )}
      >
        {category.isActive ? "Active" : "Inactive"}
      </button>

      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => onEdit(category)}
          className="p-2 hover:bg-primary/10 text-text-muted hover:text-primary rounded-lg transition-colors cursor-pointer"
        >
          <Pencil size={16} />
        </button>
        <button
          onClick={() => onDelete(category.id)}
          className="p-2 hover:bg-red-50 text-text-muted hover:text-red-500 rounded-lg transition-colors cursor-pointer"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

const AdminCategoriesPage = () => {
  const {
    categories,
    isLoading,
    createCategory,
    updateCategory,
    deleteCategory,
    reorderCategories,
    isCreating,
    isUpdating,
    isDeleting,
  } = useAdminCategories();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
  });

  const openCreateModal = () => {
    setEditingCategory(null);
    reset({ name: "", description: "", imageUrl: "" });
    setIsModalOpen(true);
  };

  const openEditModal = (cat: Category) => {
    setEditingCategory(cat);
    reset({ name: cat.name, description: cat.description || "", imageUrl: cat.imageUrl || "" });
    setIsModalOpen(true);
  };

  const handleToggle = (id: number, isActive: boolean) => {
    updateCategory({ id, data: { isActive } });
  };

  const onSubmit = (data: CategoryFormValues) => {
    const payload = {
      ...data,
      imageUrl: data.imageUrl?.trim() === "" ? undefined : data.imageUrl,
    };

    if (editingCategory) {
      updateCategory({ id: editingCategory.id, data: payload });
    } else {
      createCategory(payload);
    }
    setIsModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (deleteId !== null) {
      deleteCategory(deleteId);
      setDeleteId(null);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = categories.findIndex((c) => c.id === active.id);
      const newIndex = categories.findIndex((c) => c.id === over?.id);
      const newOrderedCategories = arrayMove(categories, oldIndex, newIndex);
      reorderCategories(newOrderedCategories.map((c) => c.id));
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-text-main tracking-tight italic">Categories</h1>
          <p className="text-text-muted text-sm font-medium mt-1">
            Drag and drop to reorder categories
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-2xl font-black shadow-lg shadow-primary/30 hover:scale-105 transition-all cursor-pointer"
        >
          <Plus size={20} /> Add Category
        </button>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={categories.map((c) => c.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-3">
            {categories.map((cat) => (
              <SortableItem
                key={cat.id}
                category={cat}
                onEdit={openEditModal}
                onDelete={(id) => setDeleteId(id)}
                onToggle={handleToggle}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-bg-surface dark:bg-dark-bg-surface w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-black text-text-main">
                {editingCategory ? "Edit Category" : "New Category"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-text-muted hover:text-primary cursor-pointer"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <input
                {...register("name")}
                placeholder="Category Name"
                className="w-full p-4 bg-bg-soft rounded-xl font-bold outline-none focus:ring-2 focus:ring-primary/20 border border-transparent focus:border-primary transition-all"
              />
              {errors.name && (
                <p className="text-red-500 text-xs font-bold">{errors.name.message}</p>
              )}

              <textarea
                {...register("description")}
                placeholder="Description (Optional)"
                rows={3}
                className="w-full p-4 bg-bg-soft rounded-xl font-bold outline-none focus:ring-2 focus:ring-primary/20 border border-transparent focus:border-primary transition-all resize-none"
              />

              <input
                {...register("imageUrl")}
                placeholder="Image URL (Optional)"
                className="w-full p-4 bg-bg-soft rounded-xl font-bold outline-none focus:ring-2 focus:ring-primary/20 border border-transparent focus:border-primary transition-all"
              />

              <button
                type="submit"
                disabled={isCreating || isUpdating}
                className="w-full py-4 bg-primary text-white rounded-2xl font-black shadow-lg hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
              >
                {(isCreating || isUpdating) && <Loader2 size={20} className="animate-spin" />}
                {editingCategory ? "Update Category" : "Create Category"}
              </button>
            </form>
          </div>
        </div>
      )}

      <ConfirmDialog
        isOpen={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Category"
        message="Are you sure you want to delete this category? This action cannot be undone."
        isLoading={isDeleting}
      />
    </div>
  );
};

export default AdminCategoriesPage;
