import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { adminDiscountApi } from "../services/discount.admin.service";
import type { CreateDiscountInput } from "../types";

export const useAdminDiscounts = (params?: {
  page?: number;
  limit?: number;
  search?: string;
  isActive?: boolean;
}) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["admin", "discounts", params],
    queryFn: () => adminDiscountApi.getAll(params),
  });

  const createMutation = useMutation({
    mutationFn: (data: CreateDiscountInput) => adminDiscountApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "discounts"] });
      toast.success("Discount created successfully");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<CreateDiscountInput> }) =>
      adminDiscountApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "discounts"] });
      toast.success("Discount updated successfully");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: adminDiscountApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "discounts"] });
      toast.success("Discount deleted successfully");
    },
  });

  const toggleMutation = useMutation({
    mutationFn: adminDiscountApi.toggleStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "discounts"] });
      toast.success("Discount status toggled");
    },
  });

  return {
    discountsData: query.data,
    isLoading: query.isLoading,
    createDiscount: createMutation.mutate,
    isCreating: createMutation.isPending,
    updateDiscount: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    deleteDiscount: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
    toggleDiscount: toggleMutation.mutate,
    isToggling: toggleMutation.isPending,
  };
};
