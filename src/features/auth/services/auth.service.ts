import type { LoginInput, LoginResponse, RegisterInput, User } from "../types";
import type { ApiResponse } from "@/types";
import type { ChangePasswordInput } from "@/features/dashboard/profile/types";
import { apiClient } from "@/libs/api";

export const authApi = {
  register: async (data: RegisterInput) => {
    const response = await apiClient.post<ApiResponse<User>>("/auth/register", data);
    return response.data.body;
  },

  login: async (data: LoginInput): Promise<LoginResponse> => {
    const response = await apiClient.post<ApiResponse<LoginResponse>>("/auth/login", data);
    return response.data.body;
  },

  logout: async () => {
    await apiClient.post<ApiResponse<null>>("/auth/logout");
  },

  refreshToken: async (): Promise<{ accessToken: string }> => {
    const response = await apiClient.post<ApiResponse<{ accessToken: string }>>("/auth/refresh");
    return response.data.body;
  },

  changePassword: async (data: ChangePasswordInput): Promise<void> => {
    await apiClient.post<ApiResponse<null>>("/auth/change-password", data);
  },
};
