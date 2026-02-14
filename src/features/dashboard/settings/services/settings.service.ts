import apiClient from "@/libs/api";
import type { ApiResponse } from "@/types";
import type { Settings } from "../types";

export const settingsApi = {
  getAll: () => apiClient.get<ApiResponse<Settings>>("/admin/settings"),

  update: (key: string, value: string) =>
    apiClient.patch<ApiResponse<{ key: string; value: string }>>(`/admin/settings/${key}`, {
      value,
    }),
};
