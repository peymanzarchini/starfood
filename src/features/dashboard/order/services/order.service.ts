import apiClient from "@/libs/api";
import type { ApiResponse, PaginatedResponse } from "@/types";
import type { Order, OrderList, CreateOrderInput, OrderStats, OrderStatus } from "../types";

export const ordersApi = {
  // User Operations
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

  create: async (data: CreateOrderInput): Promise<Order> => {
    const response = await apiClient.post<ApiResponse<Order>>("/orders", data);
    return response.data.body;
  },

  cancel: async (id: number): Promise<Order> => {
    const response = await apiClient.post<ApiResponse<Order>>(`/orders/${id}/cancel`);
    return response.data.body;
  },

  // Admin Operations
  admin: {
    getStats: async (): Promise<OrderStats> => {
      const response = await apiClient.get<ApiResponse<OrderStats>>("/admin/orders/stats");
      return response.data.body;
    },

    updateStatus: async (id: number, status: OrderStatus): Promise<Order> => {
      const response = await apiClient.patch<ApiResponse<Order>>(`/admin/orders/${id}/status`, {
        status,
      });
      return response.data.body;
    },
  },
};
