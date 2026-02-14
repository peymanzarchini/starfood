import { createContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { toast } from "sonner";

import type { User, LoginInput, RegisterInput } from "@/features/auth/types";
import type { ChangePasswordInput, UpdateProfileInput } from "@/features/dashboard/profile/types";

import { tokenHelpers } from "@/utils/tokenHelpers";
import { authApi } from "@/features/auth/services/auth.service";
import { profileApi } from "@/features/dashboard/profile/services/profile.service";

// ============================================
// Types
// ============================================

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;

  login: (data: LoginInput) => Promise<User>;
  register: (data: RegisterInput) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: UpdateProfileInput) => Promise<void>;
  changePassword: (data: ChangePasswordInput) => Promise<void>;
  checkAuth: () => Promise<void>;
}

// ============================================
// Context
// ============================================

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ============================================
// Provider
// ============================================

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Derived state
  const isAuthenticated = !!user;
  const isAdmin = user?.role === "admin";

  // ============================================
  // Check Authentication on Mount
  // ============================================

  const checkAuth = useCallback(async () => {
    try {
      setIsLoading(true);

      const token = tokenHelpers.getAccessToken();
      if (!token) {
        setUser(null);
        return;
      }

      const profile = await profileApi.getProfile();
      setUser(profile);
    } catch {
      tokenHelpers.clearTokens();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // ============================================
  // Login
  // ============================================

  const login = async (data: LoginInput) => {
    try {
      setIsLoading(true);

      const response = await authApi.login(data);
      const { user, accessToken } = response;

      tokenHelpers.setTokens(accessToken, user);
      setUser(user);

      toast.success(`welcome ${user.firstName}!`);

      return user;
    } catch (error: unknown) {
      const message =
        (error as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        "Login failed";
      toast.error(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // ============================================
  // Register
  // ============================================

  const register = async (data: RegisterInput) => {
    try {
      setIsLoading(true);

      await authApi.register(data);

      toast.success("Registration was successful. Please log in.");
    } catch (error: unknown) {
      const message =
        (error as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        "Registration failed";
      toast.error(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // ============================================
  // Logout
  // ============================================

  const logout = async () => {
    try {
      await authApi.logout();
    } catch {
      // Ignore logout API errors
    } finally {
      tokenHelpers.clearTokens();
      setUser(null);
      toast.success("You have successfully logged out");
    }
  };

  // ============================================
  // Update Profile
  // ============================================

  const updateProfile = async (data: UpdateProfileInput) => {
    try {
      setIsLoading(true);

      const updatedUser = await profileApi.updateProfile(data);

      setUser(updatedUser);
      tokenHelpers.setTokens(tokenHelpers.getAccessToken() || "", updatedUser);

      toast.success("Profile updated successfully");
    } catch (error: unknown) {
      const message =
        (error as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        "Profile update failed";
      toast.error(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // ============================================
  // Change Password
  // ============================================

  const changePassword = async (data: ChangePasswordInput) => {
    try {
      setIsLoading(true);

      await authApi.changePassword(data);

      toast.success("Password changed successfully");
      await logout();
    } catch (error: unknown) {
      const message =
        (error as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        "Password change failed";
      toast.error(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // ============================================
  // Context Value
  // ============================================

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated,
    isAdmin,
    login,
    register,
    logout,
    updateProfile,
    changePassword,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;
