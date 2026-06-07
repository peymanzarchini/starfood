import { useQuery } from "@tanstack/react-query";
import type { OrderStatus } from "../types";
import { ordersApi } from "../services/order.service";

export const useOrders = (page: number = 1, status?: OrderStatus) => {
  return useQuery({
    queryKey: ["orders", "me", page, status],
    queryFn: () => ordersApi.getUserOrders(page, 10, status),
    staleTime: 30 * 1000,
  });
};
