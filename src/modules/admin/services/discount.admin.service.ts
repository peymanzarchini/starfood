import type { ApiPaginatedResponse, ApiResponse } from "@/types";
import type { CreateDiscountInput, Discount } from "../types";
import apiClient from "@/api/client";

export const adminDiscountApi = {
  getAll: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
    isActive?: boolean;
  }): Promise<ApiPaginatedResponse<Discount[]>> => {
    const response = await apiClient.get<ApiPaginatedResponse<Discount[]>>("/admin/discounts", {
      params,
    });
    return response.data;
  },

  create: async (data: CreateDiscountInput): Promise<Discount> => {
    const response = await apiClient.post<ApiResponse<Discount>>("/admin/discounts", data);
    return response.data.body;
  },

  update: async (id: number, data: Partial<CreateDiscountInput>): Promise<Discount> => {
    const response = await apiClient.put<ApiResponse<Discount>>(`/admin/discounts/${id}`, data);
    return response.data.body;
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete<ApiResponse<null>>(`/admin/discounts/${id}`);
  },

  toggleStatus: async (id: number): Promise<Discount> => {
    const response = await apiClient.patch<ApiResponse<Discount>>(`/admin/discounts/${id}/toggle`);
    return response.data.body;
  },
};
