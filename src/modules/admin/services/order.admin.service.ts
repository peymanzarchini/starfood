import apiClient from "@/api/client";
import type { ApiResponse, ApiPaginatedResponse } from "@/types";
import type { Order, OrderList, OrderStatus } from "@/modules/order/types";

export interface OrderStatusInfo {
  key: OrderStatus;
  label: string;
  color: string;
  nextStatuses: { key: OrderStatus; label: string }[];
}

export const adminOrderApi = {
  getStatuses: async (): Promise<OrderStatusInfo[]> => {
    const response = await apiClient.get<ApiResponse<OrderStatusInfo[]>>("/admin/orders/statuses");
    return response.data.body;
  },

  getAll: async (params?: {
    page?: number;
    limit?: number;
    status?: OrderStatus;
  }): Promise<ApiPaginatedResponse<OrderList[]>> => {
    const response = await apiClient.get<ApiPaginatedResponse<OrderList[]>>("/admin/orders", {
      params,
    });
    return response.data;
  },

  getById: async (id: number): Promise<Order> => {
    const response = await apiClient.get<ApiResponse<Order>>(`/admin/orders/${id}`);
    return response.data.body;
  },

  updateStatus: async (id: number, status: OrderStatus): Promise<Order> => {
    const response = await apiClient.patch<ApiResponse<Order>>(`/admin/orders/${id}/status`, {
      status,
    });
    return response.data.body;
  },
};
