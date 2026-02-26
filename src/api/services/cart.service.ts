import type { ApiResponse } from "@/types";
import apiClient from "../client";
import type {
  AddToCartInput,
  Cart,
  CartPreviewDiscount,
  UpdateCartItemInput,
} from "@/modules/cart/types";

export const cartApi = {
  get: async (): Promise<Cart> => {
    const response = await apiClient.get<ApiResponse<Cart>>("/cart");
    return response.data.body;
  },

  addItem: async (data: AddToCartInput): Promise<Cart> => {
    const response = await apiClient.post<ApiResponse<Cart>>("/cart/items", data);
    return response.data.body;
  },

  updateItem: async (itemId: number, data: UpdateCartItemInput): Promise<Cart> => {
    const response = await apiClient.patch<ApiResponse<Cart>>(`/cart/items/${itemId}`, data);
    return response.data.body;
  },

  removeItem: async (itemId: number): Promise<Cart> => {
    const response = await apiClient.delete<ApiResponse<Cart>>(`/cart/items/${itemId}`);
    return response.data.body;
  },

  previewDiscount: async (code: string): Promise<CartPreviewDiscount> => {
    const response = await apiClient.get<ApiResponse<CartPreviewDiscount>>(
      "/cart/preview-discount",
      { params: { code } },
    );
    return response.data.body;
  },

  clear: async (): Promise<Cart> => {
    const response = await apiClient.delete<ApiResponse<Cart>>("/cart");
    return response.data.body;
  },

  getCount: async (): Promise<number> => {
    const response = await apiClient.get<ApiResponse<{ count: number }>>("/cart/count");
    return response.data.body.count;
  },
};
