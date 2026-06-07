import { TOKEN_KEYS } from "@/consts/tokenKey";
import type { User } from "@/modules/auth";

export const tokenHelpers = {
  getAccessToken: () => localStorage.getItem(TOKEN_KEYS.ACCESS_TOKEN),

  getStoredUser: (): User | null => {
    const userStr = localStorage.getItem(TOKEN_KEYS.USER);
    return userStr ? JSON.parse(userStr) : null;
  },

  setTokens: (accessToken: string, user: User) => {
    localStorage.setItem(TOKEN_KEYS.ACCESS_TOKEN, accessToken);
    localStorage.setItem(TOKEN_KEYS.USER, JSON.stringify(user));
  },

  clearTokens: () => {
    localStorage.removeItem(TOKEN_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(TOKEN_KEYS.USER);
  },

  isAuthenticated: () => !!localStorage.getItem(TOKEN_KEYS.ACCESS_TOKEN),
};
