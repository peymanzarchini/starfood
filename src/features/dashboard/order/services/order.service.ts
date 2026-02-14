import apiClient from "@/libs/api";
import type { ApiResponse, PaginatedResponse } from "@/types";
import type { CreateOrderInput, Order, OrderList, OrderStats, OrderStatus } from "../types";

export const ordersApi = {
  // User
  getAll: (page = 1, limit = 10, status?: OrderStatus) =>
    apiClient.get<ApiResponse<PaginatedResponse<OrderList>>>("/orders", {
      params: { page, limit, status },
    }),

  getById: (id: number) => apiClient.get<ApiResponse<Order>>(`/orders/${id}`),

  create: (data: CreateOrderInput) => apiClient.post<ApiResponse<Order>>("/orders", data),

  cancel: (id: number) => apiClient.post<ApiResponse<Order>>(`/orders/${id}/cancel`),

  // Admin
  admin: {
    getAll: (params?: {
      page?: number;
      limit?: number;
      status?: OrderStatus;
      startDate?: string;
      endDate?: string;
      search?: string;
    }) => apiClient.get<ApiResponse<PaginatedResponse<OrderList>>>("/admin/orders", { params }),

    getById: (id: number) => apiClient.get<ApiResponse<Order>>(`/admin/orders/${id}`),

    updateStatus: (id: number, data: { status: OrderStatus; estimatedDelivery?: string }) =>
      apiClient.patch<ApiResponse<Order>>(`/admin/orders/${id}/status`, data),

    getStats: () => apiClient.get<ApiResponse<OrderStats>>("/admin/orders/stats"),
  },
};
