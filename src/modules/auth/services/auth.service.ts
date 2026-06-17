import apiClient from "@/api/client";
import type { ApiResponse } from "@/types";
import type { User, LoginInput, RegisterInput } from "../types";

export const authApi = {
  register: async (data: RegisterInput): Promise<User> => {
    const response = await apiClient.post<ApiResponse<User>>("/auth/register", data);
    return response.data.body;
  },

  login: async (data: LoginInput): Promise<User> => {
    const response = await apiClient.post<ApiResponse<{ user: User; accessToken: string }>>(
      "/auth/login",
      data,
    );
    return response.data.body.user;
  },

  logout: async (): Promise<void> => {
    await apiClient.post<ApiResponse<null>>("/auth/logout");
  },

  getProfile: async (): Promise<User> => {
    const response = await apiClient.get<ApiResponse<User>>("/auth/profile");
    return response.data.body;
  },
};
