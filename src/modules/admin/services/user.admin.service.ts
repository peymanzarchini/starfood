import apiClient from "@/api/client";
import type { ApiResponse, ApiPaginatedResponse } from "@/types";
import type { User } from "@/modules/auth/types";

export const adminUserApi = {
  getAll: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<ApiPaginatedResponse<User[]>> => {
    const response = await apiClient.get<ApiPaginatedResponse<User[]>>("/admin/users", { params });
    return response.data;
  },

  updateRole: async (id: number, role: "admin" | "customer"): Promise<User> => {
    const response = await apiClient.patch<ApiResponse<User>>(`/admin/users/${id}/role`, { role });
    return response.data.body;
  },

  toggleStatus: async (id: number): Promise<User> => {
    const response = await apiClient.patch<ApiResponse<User>>(`/admin/users/${id}/toggle-status`);
    return response.data.body;
  },
};
