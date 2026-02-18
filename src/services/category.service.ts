import apiClient from "@/libs/api";
import type { Category, CreateCategoryInput, UpdateCategoryInput } from "../types";
import type { ApiResponse, PaginatedResponse } from "@/types";
import type { Product } from "../../product/types";

export const categoriesApi = {
  // --- Public Endpoints ---
  getActive: async (): Promise<Category[]> => {
    const response = await apiClient.get<ApiResponse<Category[]>>("/categories");
    return response.data.body;
  },

  getById: async (id: number): Promise<Category> => {
    const response = await apiClient.get<ApiResponse<Category>>(`/categories/${id}`);
    return response.data.body;
  },

  /**
   * Fetches products belonging to a specific category
   */
  getProducts: async (
    categoryId: number,
    page = 1,
    limit = 10,
  ): Promise<{ category: Category; products: PaginatedResponse<Product> }> => {
    const response = await apiClient.get<
      ApiResponse<{ category: Category; products: PaginatedResponse<Product> }>
    >(`/categories/${categoryId}/products`, { params: { page, limit } });
    return response.data.body;
  },

  // --- Admin Endpoints ---
  admin: {
    getAll: async (page = 1, limit = 10): Promise<PaginatedResponse<Category>> => {
      const response = await apiClient.get<ApiResponse<PaginatedResponse<Category>>>(
        "/admin/categories",
        {
          params: { page, limit },
        },
      );
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
  },
};
