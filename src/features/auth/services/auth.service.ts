import apiClient from "@/libs/api";
import type { LoginInput, LoginResponse, RegisterInput, User } from "../types";
import type { ApiResponse } from "@/types";
import { TOKEN_KEYS } from "@/consts/tokenKey";
import type { ChangePasswordInput } from "@/features/dashboard/profile/types";

export const authApi = {
  register: async (data: RegisterInput) => {
    const response = await apiClient.post<ApiResponse<User>>("/auth/register", data);
    return response.data.body;
  },

  login: async (data: LoginInput): Promise<LoginResponse> => {
    const response = await apiClient.post<ApiResponse<LoginResponse>>("/auth/login", data);
    const { accessToken, refreshToken, user } = response.data.body;

    localStorage.setItem(TOKEN_KEYS.ACCESS_TOKEN, accessToken);
    localStorage.setItem(TOKEN_KEYS.USER, JSON.stringify(user));

    return { accessToken, refreshToken, user };
  },

  logout: async () => {
    try {
      await apiClient.post<ApiResponse<null>>("/auth/logout");
    } finally {
      localStorage.removeItem(TOKEN_KEYS.ACCESS_TOKEN);
      localStorage.removeItem(TOKEN_KEYS.USER);
    }
  },

  refreshToken: async (): Promise<{ accessToken: string }> => {
    const response = await apiClient.post<ApiResponse<{ accessToken: string }>>("/auth/refresh");
    return response.data.body;
  },

  changePassword: async (data: ChangePasswordInput): Promise<void> => {
    await apiClient.post<ApiResponse<null>>("/auth/change-password", data);
  },
};
