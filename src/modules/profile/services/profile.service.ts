import apiClient from "@/api/client";
import type { ApiResponse } from "@/types";
import type { User } from "@/modules/auth";
import type { UpdateProfileInput, ChangePasswordInput } from "../types";

export const profileApi = {
  updateProfile: async (data: UpdateProfileInput): Promise<User> => {
    const response = await apiClient.patch<ApiResponse<User>>("/auth/profile", data);
    return response.data.body;
  },
  changePassword: async (data: ChangePasswordInput): Promise<void> => {
    await apiClient.post<ApiResponse<null>>("/auth/change-password", data);
  },
};
