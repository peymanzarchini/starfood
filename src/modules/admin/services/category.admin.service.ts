import apiClient from "@/api/client";
import type { Category } from "@/modules/categories";
import type { CreateCategoryInput, UpdateCategoryInput } from "@/modules/categories/types";
import type { ApiResponse, ApiPaginatedResponse } from "@/types";

export const adminCategoryApi = {
  getAll: async (): Promise<Category[]> => {
    const response = await apiClient.get<ApiPaginatedResponse<Category[]>>("/admin/categories", {
      params: { limit: 1000 },
    });
    return response.data.body;
  },

  create: async (data: CreateCategoryInput): Promise<Category> => {
    const response = await apiClient.post<ApiResponse<Category>>("/admin/categories", data);
    return response.data.body;
  },

  update: async (id: number, data: UpdateCategoryInput): Promise<Category> => {
    const response = await apiClient.put<ApiResponse<Category>>(`/admin/categories/${id}`, data);
    return response.data.body;
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete<ApiResponse<null>>(`/admin/categories/${id}`);
  },

  reorder: async (orderedIds: number[]): Promise<Category[]> => {
    const response = await apiClient.put<ApiResponse<Category[]>>("/admin/categories/reorder", {
      orderedIds,
    });
    return response.data.body;
  },
};
