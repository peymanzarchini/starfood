import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { productsApi } from "@/modules/product/services/product.service";
import type { GetProductsQuery, UpdateProductInput } from "@/modules/product/types";

export const useAdminProducts = (params?: GetProductsQuery) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["admin", "products", params],
    queryFn: () => productsApi.admin.getAll(params),
  });

  const createMutation = useMutation({
    mutationFn: productsApi.admin.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "products"] });
      toast.success("Product created successfully");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateProductInput }) =>
      productsApi.admin.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "products"] });
      toast.success("Product updated successfully");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: productsApi.admin.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "products"] });
      toast.success("Product deleted successfully");
    },
  });

  const toggleAvailabilityMutation = useMutation({
    mutationFn: productsApi.admin.toggleAvailability,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "products"] });
      toast.success("Product availability toggled");
    },
  });

  return {
    productsData: query.data,
    isLoading: query.isLoading,
    createProduct: createMutation.mutate,
    isCreating: createMutation.isPending,
    updateProduct: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    deleteProduct: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
    toggleAvailability: toggleAvailabilityMutation.mutate,
  };
};
