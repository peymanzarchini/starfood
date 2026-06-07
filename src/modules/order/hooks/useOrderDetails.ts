import { useQuery } from "@tanstack/react-query";
import { ordersApi } from "../services/order.service";

export const useOrderDetails = (id: number) => {
  return useQuery({
    queryKey: ["order", id],
    queryFn: () => ordersApi.getOrderById(id),
    enabled: !!id,
  });
};
