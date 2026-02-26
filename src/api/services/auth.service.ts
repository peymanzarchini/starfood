import type { ApiResponse } from "@/types";
import type { ChangePasswordInput } from "@/modules/dashboard/types";
import type { AuthResponse, LoginFormValues, RegisterFormValues, User } from "@/modules/auth";
import apiClient from "../client";

export const authApi = {
  register: async (data: RegisterFormValues) => {
    const response = await apiClient.post<ApiResponse<User>>("/auth/register", data);
    return response.data.body;
  },

  login: async (data: LoginFormValues) => {
    const response = await apiClient.post<ApiResponse<AuthResponse>>("/auth/login", data);
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
