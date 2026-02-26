import type { ApiResponse } from "@/types";
import type { Favorite } from "../../features/dashboard/favorite/types";
import apiClient from "../client";

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

  remove: async (productId: number): Promise<void> => {
    await apiClient.delete<ApiResponse<null>>(`/favorites/${productId}`);
  },
};
