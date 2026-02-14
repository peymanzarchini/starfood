import axios from "axios";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 30000,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      toast.error("Token has expired. Please log in again.");

      localStorage.removeItem("auth_token");

      if (window.location.pathname !== "/login") {
        setTimeout(() => {
          window.location.href = "/login";
        }, 1500);
      }

      return Promise.reject(error);
    }
  },
);

export default apiClient;
