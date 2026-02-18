import { useQuery } from "@tanstack/react-query";
import { ordersApi } from "@/services/order.service";
import type { OrderStatus } from "@/features/dashboard/order/types";

export const useOrders = (page: number = 1, status?: OrderStatus) => {
  return useQuery({
    queryKey: ["orders", "me", page, status],
    queryFn: () => ordersApi.getUserOrders(page, 10, status),
    staleTime: 30 * 1000, // Refresh status every 30 seconds
  });
};

export const useOrderDetails = (id: number) => {
  return useQuery({
    queryKey: ["order", id],
    queryFn: () => ordersApi.getOrderById(id),
    enabled: !!id,
  });
};
