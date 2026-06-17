import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { adminOrderApi } from "../services/order.admin.service";
import type { OrderStatus } from "@/modules/order/types";

export const useAdminOrders = (params?: {
  page?: number;
  limit?: number;
  status?: OrderStatus;
}) => {
  const queryClient = useQueryClient();

  const statusesQuery = useQuery({
    queryKey: ["admin", "order-statuses"],
    queryFn: adminOrderApi.getStatuses,
    staleTime: Infinity,
  });

  const ordersQuery = useQuery({
    queryKey: ["admin", "orders", params],
    queryFn: () => adminOrderApi.getAll(params),
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: number; status: OrderStatus }) =>
      adminOrderApi.updateStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "orders"] });
      toast.success("Order status updated successfully");
    },
  });

  return {
    statuses: statusesQuery.data || [],
    ordersData: ordersQuery.data,
    isLoading: ordersQuery.isLoading,
    updateStatus: updateStatusMutation.mutate,
    isUpdating: updateStatusMutation.isPending,
  };
};

export const useAdminOrderDetails = (id: number | null) => {
  return useQuery({
    queryKey: ["admin", "order", id],
    queryFn: () => adminOrderApi.getById(id!),
    enabled: !!id,
  });
};
