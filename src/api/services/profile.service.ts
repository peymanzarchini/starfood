import type { UpdateProfileInput } from "@/modules/dashboard/types";
import type { ApiResponse } from "@/types";
import type { User } from "@/modules/auth";
import apiClient from "../client";

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
