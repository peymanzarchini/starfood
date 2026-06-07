import { authApi } from "@/modules/auth/services/auth.service";
import { useAuth } from "@/modules/auth";
import type { ApiResponse } from "@/types";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

export const useChangePassword = () => {
  const { logout } = useAuth();

  return useMutation({
    mutationFn: authApi.changePassword,
    onSuccess: () => {
      toast.success("Password changed successfully! Please log in again.");

      setTimeout(() => {
        logout();
      }, 2000);
    },
    onError: (error: unknown) => {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ApiResponse>;
        toast.error(axiosError.response?.data?.message || "Failed to change password");
      }
    },
  });
};
