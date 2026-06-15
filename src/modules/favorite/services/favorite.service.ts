import apiClient from "@/api/client";
import type { ApiResponse } from "@/types";
import type { Favorite } from "../types";

export const favoritesApi = {
  getAll: async (): Promise<Favorite[]> => {
    const response = await apiClient.get<ApiResponse<Favorite[]>>("/favorites");
    return response.data.body;
  },

  toggle: async (productId: number): Promise<{ isFavorite: boolean; message: string }> => {
    const response = await apiClient.post<ApiResponse<{ isFavorite: boolean; message: string }>>(
      `/favorites/toggle/${productId}`,
    );
    return response.data.body;
  },
};
