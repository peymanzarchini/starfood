import apiClient from "@/libs/api";
import type {
  CreateProductInput,
  GetProductsQuery,
  Product,
  ProductDetail,
  UpdateProductInput,
} from "../types";
import type { ApiResponse, PaginatedResponse } from "@/types";

export const productsApi = {
  //Public
  getAll: (params?: GetProductsQuery) =>
    apiClient.get<ApiResponse<PaginatedResponse<Product>>>("/products", { params }),

  getById: (id: number) => apiClient.get<ApiResponse<ProductDetail>>(`/products/${id}`),

  getPopular: (limit = 10) =>
    apiClient.get<ApiResponse<Product[]>>("/products/popular", { params: { limit } }),

  getDiscounted: (limit = 10) =>
    apiClient.get<ApiResponse<Product[]>>("/products/discounted", { params: { limit } }),
  // Admin
  admin: {
    getAll: (params?: GetProductsQuery & { isAvailable?: boolean }) =>
      apiClient.get<ApiResponse<PaginatedResponse<Product>>>("/admin/products", { params }),

    getById: (id: number) => apiClient.get<ApiResponse<ProductDetail>>(`/admin/products/${id}`),

    create: (data: CreateProductInput) =>
      apiClient.post<ApiResponse<ProductDetail>>("/admin/products", data),

    update: (id: number, data: UpdateProductInput) =>
      apiClient.put<ApiResponse<ProductDetail>>(`/admin/products/${id}`, data),

    delete: (id: number) => apiClient.delete<ApiResponse<null>>(`/admin/products/${id}`),

    toggleAvailability: (id: number) =>
      apiClient.patch<ApiResponse<ProductDetail>>(`/admin/products/${id}/toggle-availability`),

    togglePopular: (id: number) =>
      apiClient.patch<ApiResponse<ProductDetail>>(`/admin/products/${id}/toggle-popular`),

    // Product Images
    addImage: (productId: number, data: { url: string; thumbnailUrl?: string; altText?: string }) =>
      apiClient.post<ApiResponse<ProductDetail["gallery"][0]>>(
        `/admin/products/${productId}/images`,
        data,
      ),

    updateImage: (
      imageId: number,
      data: { url?: string; thumbnailUrl?: string; altText?: string },
    ) =>
      apiClient.put<ApiResponse<ProductDetail["gallery"][0]>>(
        `/admin/products/images/${imageId}`,
        data,
      ),

    deleteImage: (imageId: number) =>
      apiClient.delete<ApiResponse<null>>(`/admin/products/images/${imageId}`),
  },
};
