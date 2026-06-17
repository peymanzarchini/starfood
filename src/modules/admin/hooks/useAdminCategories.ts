// src/modules/admin/hooks/useAdminCategories.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { adminCategoryApi } from "../services/category.admin.service";
import type { UpdateCategoryInput } from "@/modules/categories/types";

export const useAdminCategories = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["admin", "categories"],
    queryFn: adminCategoryApi.getAll,
  });

  const createMutation = useMutation({
    mutationFn: adminCategoryApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "categories"] });
      toast.success("Category created successfully");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateCategoryInput }) =>
      adminCategoryApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "categories"] });
      toast.success("Category updated successfully");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: adminCategoryApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "categories"] });
      toast.success("Category deleted successfully");
    },
  });

  const reorderMutation = useMutation({
    mutationFn: adminCategoryApi.reorder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "categories"] });
      toast.success("Categories reordered successfully");
    },
  });

  return {
    categories: query.data || [],
    isLoading: query.isLoading,
    createCategory: createMutation.mutate,
    isCreating: createMutation.isPending,
    updateCategory: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    deleteCategory: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
    reorderCategories: reorderMutation.mutate,
    isReordering: reorderMutation.isPending,
  };
};
