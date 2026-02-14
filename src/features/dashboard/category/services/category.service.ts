import apiClient from "@/libs/api";
import type { ApiResponse, PaginatedResponse } from "@/types";
import type { Category, CreateCategoryInput, UpdateCategoryInput } from "../types";
import type { Product } from "@/assets/data/products";

export const categoriesApi = {
  //Public
  getAll: () => {
    apiClient.get<ApiResponse<Category[]>>("/categories");
  },

  getById: (id: number) => {
    apiClient.get<ApiResponse<Category>>(`/categories/${id}`);
  },

  getProducts: (id: number, page = 1, limit = 10) => {
    apiClient.get<ApiResponse<{ category: Category; products: PaginatedResponse<Product> }>>(
      `/categories/${id}/products`,
      { params: { page, limit } },
    );
  },

  //Admin
  admin: {
    getAll: (page = 1, limit = 10) => {
      apiClient.get<ApiResponse<PaginatedResponse<Category>>>("/admin/categories", {
        params: { page, limit },
      });
    },
    getById: (id: number) => apiClient.get<ApiResponse<Category>>(`/admin/categories/${id}`),

    create: (data: CreateCategoryInput) =>
      apiClient.post<ApiResponse<Category>>("/admin/categories", data),

    update: (id: number, data: UpdateCategoryInput) =>
      apiClient.put<ApiResponse<Category>>(`/admin/categories/${id}`, data),

    delete: (id: number) => apiClient.delete<ApiResponse<null>>(`/admin/categories/${id}`),

    reorder: (orderedIds: number[]) =>
      apiClient.put<ApiResponse<Category[]>>("/admin/categories/reorder", { orderedIds }),
  },
};
