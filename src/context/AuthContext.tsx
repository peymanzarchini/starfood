/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { toast } from "sonner";
import axios, { AxiosError } from "axios";

import type { User, LoginInput, RegisterInput } from "@/features/auth/types";
import type { ApiResponse } from "@/types";
import { authApi } from "@/features/auth/services/auth.service";
import { profileApi } from "@/services/profile.service";
import type { ChangePasswordInput, UpdateProfileInput } from "@/features/dashboard/profile/types";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (data: LoginInput) => Promise<void>;
  register: (data: RegisterInput) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  changePassword: (data: ChangePasswordInput) => Promise<void>;
  updateProfile: (data: UpdateProfileInput) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const checkAuth = useCallback(async () => {
    try {
      setIsLoading(true);
      const userData = await profileApi.getProfile();
      setUser(userData);
    } catch (error) {
      // If profile fetch fails, the user is considered unauthenticated
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = async (data: LoginInput): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await authApi.login(data);
      setUser(response.user);
      toast.success(`Welcome back, ${response.user.firstName}!`);
    } catch (error: unknown) {
      let errorMessage = "Invalid email or password";

      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ApiResponse>;
        errorMessage = axiosError.response?.data?.message || errorMessage;
      }

      toast.error(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterInput): Promise<void> => {
    try {
      setIsLoading(true);
      await authApi.register(data);
      toast.success("Registration successful! You can now log in.");
    } catch (error: unknown) {
      let errorMessage = "Registration failed. Please try again.";

      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ApiResponse>;
        errorMessage = axiosError.response?.data?.message || errorMessage;
      }

      toast.error(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error("Logout request failed:", error);
    } finally {
      setUser(null);
      toast.success("Successfully logged out.");
      window.location.href = "/login";
    }
  };

  const changePassword = async (data: ChangePasswordInput): Promise<void> => {
    try {
      setIsLoading(true);
      await authApi.changePassword(data);
      toast.success("Password changed successfully! Please log in again.");
      await logout(); // بعد از تغییر رمز، کاربر را خارج می‌کنیم تا دوباره لاگین کند
    } catch (error: unknown) {
      let errorMessage = "Failed to change password.";
      if (axios.isAxiosError(error)) {
        errorMessage = (error as AxiosError<ApiResponse>).response?.data?.message || errorMessage;
      }
      toast.error(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (data: UpdateProfileInput): Promise<void> => {
    try {
      setIsLoading(true); // Start loading for the button

      // 1. Call the PATCH /auth/profile service
      const updatedUser = await profileApi.updateProfile(data);

      // 2. Update the global state with the user object returned in "body"
      setUser(updatedUser);

      // 3. Show success toast
      toast.success("Profile updated successfully!");
    } catch (error: unknown) {
      let errorMessage = "Failed to update profile";
      if (axios.isAxiosError(error)) {
        errorMessage = (error as AxiosError<ApiResponse>).response?.data?.message || errorMessage;
      }
      toast.error(errorMessage);
      throw error;
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
    login,
    register,
    logout,
    checkAuth,
    changePassword,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;
