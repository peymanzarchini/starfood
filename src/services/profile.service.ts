import type { User } from "@/features/auth/types";
import { apiClient } from "@/libs/api";
import type { ApiResponse } from "@/types";
import type { UpdateProfileInput } from "../types";

export const profileApi = {
  getProfile: async (): Promise<User> => {
    const response = await apiClient.get<ApiResponse<User>>("/auth/profile");
    return response.data.body;
  },

  updateProfile: async (data: UpdateProfileInput): Promise<User> => {
    const response = await apiClient.patch<ApiResponse<User>>("/auth/profile", data);
    return response.data.body;
  },
};
