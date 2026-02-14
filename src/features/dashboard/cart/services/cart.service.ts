import apiClient from "@/libs/api";
import type { ApiResponse } from "@/types";
import type { AddToCartInput, Cart, UpdateCartItemInput } from "../types";

export const cartApi = {
  get: () => apiClient.get<ApiResponse<Cart>>("/cart"),

  getCount: () => apiClient.get<ApiResponse<{ count: number }>>("/cart/count"),

  validate: () =>
    apiClient.get<
      ApiResponse<{
        isValid: boolean;
        unavailableItems: string[];
        cart: Cart;
      }>
    >("/cart/validate"),

  addItem: (data: AddToCartInput) => apiClient.post<ApiResponse<Cart>>("/cart/items", data),

  updateItem: (itemId: number, data: UpdateCartItemInput) =>
    apiClient.patch<ApiResponse<Cart>>(`/cart/items/${itemId}`, data),

  removeItem: (itemId: number) => apiClient.delete<ApiResponse<Cart>>(`/cart/items/${itemId}`),

  removeUnavailable: () => apiClient.delete<ApiResponse<Cart>>("/cart/unavailable"),

  clear: () => apiClient.delete<ApiResponse<Cart>>("/cart"),
};
