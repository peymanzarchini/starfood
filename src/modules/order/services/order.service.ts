import apiClient from "@/api/client";
import type { ApiResponse, PaginatedResponse } from "@/types";
import type { Order, OrderList, CreateOrderInput, OrderStatus } from "../types";

export const ordersApi = {
  getUserOrders: async (
    page = 1,
    limit = 10,
    status?: OrderStatus,
  ): Promise<PaginatedResponse<OrderList>> => {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<OrderList>>>("/orders", {
      params: { page, limit, status },
    });
    return response.data.body;
  },

  getOrderById: async (id: number): Promise<Order> => {
    const response = await apiClient.get<ApiResponse<Order>>(`/orders/${id}`);
    return response.data.body;
  },

  create: async (data: CreateOrderInput): Promise<Order> => {
    const response = await apiClient.post<ApiResponse<Order>>("/orders", data);
    return response.data.body;
  },

  cancel: async (id: number): Promise<Order> => {
    const response = await apiClient.post<ApiResponse<Order>>(`/orders/${id}/cancel`);
    return response.data.body;
  },
};
