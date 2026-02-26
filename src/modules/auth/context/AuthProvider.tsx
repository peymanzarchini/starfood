/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useEffect, useState, type ReactNode } from "react";
import type { User } from "../types";
import { profileApi } from "@/api/services/profile.service";
import type { LoginFormValues, RegisterFormValues } from "../schemas/auth.schema";
import { authApi } from "@/api/services/auth.service";
import { toast } from "sonner";
import axios, { AxiosError } from "axios";
import type { ApiResponse } from "@/types";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const checkAuth = useCallback(async () => {
    try {
      setIsLoading(true);
      const userData = await profileApi.getProfile();
      setUser(userData);
    } catch (error) {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = async (data: LoginFormValues) => {
    try {
      setIsLoading(true);
      const response = await authApi.login(data);
      setUser(response.user);
      toast.success(`Welcome back, ${response.user.firstName}!`);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ApiResponse>;
        toast.error(axiosError.response?.data.message || "Login failed");
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterFormValues) => {
    try {
      setIsLoading(true);
      await authApi.register(data);
      toast.success("Account created! Please login.");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ApiResponse>;
        toast.error(axiosError.response?.data?.message || "Registration failed");
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } finally {
      setUser(null);
      toast.success("Logged out successfully");
      window.location.href = "/login";
    }
  };

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
    login,
    register,
    logout,
    checkAuth,
    updateProfile: async () => {},
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
