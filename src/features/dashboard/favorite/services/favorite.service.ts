import apiClient from "@/libs/api";
import type { ApiResponse } from "@/types";
import type { Favorite } from "../types";

export const favoritesApi = {
  getAll: () => apiClient.get<ApiResponse<Favorite[]>>("/favorites"),

  toggle: (productId: number) =>
    apiClient.post<ApiResponse<{ isFavorite: boolean; message: string }>>(
      `/favorites/toggle/${productId}`,
    ),

  remove: (productId: number) => apiClient.delete<ApiResponse<null>>(`/favorites/${productId}`),
};
