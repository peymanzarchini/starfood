import type { ApiResponse } from "@/types";
import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

const TOKEN_KEYS = {
  ACCESS_TOKEN: "access_token",
  REFRESH_TOKEN: "refresh_token",
  USER: "user_data",
} as const;

export const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem(TOKEN_KEYS.ACCESS_TOKEN);
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: unknown) => void;
  reject: (reason: unknown) => void;
}> = [];

const processQueue = (error: AxiosError | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ApiResponse>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    //Handle 401 errors
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return apiClient(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const response =
          await apiClient.post<ApiResponse<{ accessToken: string }>>("/auth/refresh");
        const { accessToken } = response.data.body;
        localStorage.setItem(TOKEN_KEYS.ACCESS_TOKEN, accessToken);

        processQueue(null, accessToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError as AxiosError, null);

        localStorage.removeItem(TOKEN_KEYS.ACCESS_TOKEN);
        localStorage.removeItem(TOKEN_KEYS.USER);

        toast.error("Your session has expired. Please log in again.");

        if (window.location.pathname !== "/login") {
          setTimeout(() => {
            window.location.href = "/login";
          }, 1500);
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    const message = error.response?.data?.message || "An error has occurred";
    if (error.response?.status !== 401) {
      toast.error(message);
    }

    return Promise.reject(error);
  },
);

export default apiClient;
