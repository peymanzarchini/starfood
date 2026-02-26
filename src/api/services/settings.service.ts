import type { ApiResponse } from "@/types";
import apiClient from "../client";

export interface SystemSettings {
  restaurant_name: string;
  opening_hour: string;
  closing_hour: string;
  delivery_fee: string;
  free_delivery_threshold: string;
  is_open: string;
  [key: string]: string;
}

export const settingsApi = {
  getAll: async (): Promise<SystemSettings> => {
    const response = await apiClient.get<ApiResponse<SystemSettings>>("/admin/settings");
    return response.data.body;
  },

  update: async (key: string, value: string): Promise<{ key: string; value: string }> => {
    const response = await apiClient.patch<ApiResponse<{ key: string; value: string }>>(
      `/admin/settings/${key}`,
      { value },
    );
    return response.data.body;
  },
};
