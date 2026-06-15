import { useCallback, useEffect, useState, type ReactNode } from "react";
import type { User } from "../types";
import type { LoginFormValues, RegisterFormValues } from "../schemas/auth.schema";
import { toast } from "sonner";
import { AuthContext } from "./AuthContext";
import { authApi } from "../services/auth.service";
import { handleApiError } from "@/utils/handleApiError";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const checkAuth = useCallback(async () => {
    try {
      setIsLoading(true);
      const userData = await authApi.getProfile();
      setUser(userData);
    } catch {
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
      const userData = await authApi.login(data);
      setUser(userData);
      toast.success(`Welcome back, ${userData.firstName}!`);
    } catch (error) {
      handleApiError(error);
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
    } catch (error) {
      handleApiError(error);
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
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
