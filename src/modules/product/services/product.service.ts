import apiClient from "@/api/client";
import type { ApiResponse, ApiPaginatedResponse } from "@/types";
import type {
  Product,
  ProductDetail,
  GetProductsQuery,
  CreateProductInput,
  UpdateProductInput,
  ProductImage,
} from "../types";

export const productsApi = {
  getAll: async (params?: GetProductsQuery): Promise<ApiPaginatedResponse<Product[]>> => {
    const response = await apiClient.get<ApiPaginatedResponse<Product[]>>("/products", { params });
    return response.data;
  },

  getById: async (id: number): Promise<ProductDetail> => {
    const response = await apiClient.get<ApiResponse<ProductDetail>>(`/products/${id}`);
    return response.data.body;
  },

  getPopular: async (limit: number = 10): Promise<Product[]> => {
    const response = await apiClient.get<ApiResponse<Product[]>>("/products/popular", {
      params: { limit },
    });
    return response.data.body;
  },

  getDiscounted: async (limit: number = 10): Promise<Product[]> => {
    const response = await apiClient.get<ApiResponse<Product[]>>("/products/discounted", {
      params: { limit },
    });
    return response.data.body;
  },

  admin: {
    getAll: async (params?: GetProductsQuery): Promise<ApiPaginatedResponse<Product[]>> => {
      const response = await apiClient.get<ApiPaginatedResponse<Product[]>>("/admin/products", {
        params,
      });
      return response.data;
    },

    create: async (data: CreateProductInput): Promise<ProductDetail> => {
      const response = await apiClient.post<ApiResponse<ProductDetail>>("/admin/products", data);
      return response.data.body;
    },
    update: async (id: number, data: UpdateProductInput): Promise<ProductDetail> => {
      const response = await apiClient.put<ApiResponse<ProductDetail>>(
        `/admin/products/${id}`,
        data,
      );
      return response.data.body;
    },
    delete: async (id: number): Promise<void> => {
      await apiClient.delete<ApiResponse<null>>(`/admin/products/${id}`);
    },
    toggleAvailability: async (id: number): Promise<ProductDetail> => {
      const response = await apiClient.patch<ApiResponse<ProductDetail>>(
        `/admin/products/${id}/toggle-availability`,
      );
      return response.data.body;
    },
    togglePopular: async (id: number): Promise<ProductDetail> => {
      const response = await apiClient.patch<ApiResponse<ProductDetail>>(
        `/admin/products/${id}/toggle-popular`,
      );
      return response.data.body;
    },
    addImage: async (
      productId: number,
      data: { url: string; thumbnailUrl?: string; altText?: string },
    ): Promise<ProductImage> => {
      const response = await apiClient.post<ApiResponse<ProductImage>>(
        `/admin/products/${productId}/images`,
        data,
      );
      return response.data.body;
    },
  },
};
