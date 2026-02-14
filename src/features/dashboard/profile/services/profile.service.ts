import type { User } from "@/features/auth/types";
import apiClient from "@/libs/api";
import type { ApiResponse } from "@/types";
import type { UpdateProfileInput } from "../types";

export const profileApi = {
  getProfile: () => {
    apiClient.get<ApiResponse<User>>("/auth/profile");
  },

  updateProfile: (data: UpdateProfileInput) => {
    apiClient.patch<ApiResponse<User>>("/auth/profile", data);
  },
};
