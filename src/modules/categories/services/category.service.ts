import apiClient from "@/api/client";
import type { Category } from "../types";
import type { ApiResponse } from "@/types";

export const categoriesApi = {
  getActive: async (): Promise<Category[]> => {
    const { data } = await apiClient.get<ApiResponse<Category[]>>("/categories");
    return data.body;
  },
};
