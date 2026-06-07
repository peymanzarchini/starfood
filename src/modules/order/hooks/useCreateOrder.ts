import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import type { CreateOrderInput } from "../types";
import { ordersApi } from "../services/order.service";

export const useCreateOrder = () => {
  return useMutation({
    mutationFn: (data: CreateOrderInput) => ordersApi.create(data),
    onSuccess: (order) => {
      toast.success(`Order #${order.orderNumber} placed successfully!`);
    },
  });
};
