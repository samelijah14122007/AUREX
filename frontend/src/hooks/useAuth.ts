import { useCallback, useEffect, useState } from "react";
import * as authService from "@/services/authService";
import type { LoginPayload, RegisterPayload, User } from "@/types/user";

/**
 * Central auth hook. Tracks whether the user is authenticated, exposes
 * login/register/logout, and validates any stored token against
 * GET /api/auth/me on mount so a stale/expired token doesn't silently
 * leave the app in a logged-in-looking state.
 */
export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(() => authService.isAuthenticated());

  const loadUser = useCallback(async () => {
    if (!authService.isAuthenticated()) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    try {
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
    } catch {
      authService.logout();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!authService.isAuthenticated()) return;
    const validationTimer = window.setTimeout(() => {
      void loadUser();
    }, 0);
    return () => window.clearTimeout(validationTimer);
  }, [loadUser]);

  const login = useCallback(async (payload: LoginPayload) => {
    const response = await authService.login(payload);
    await loadUser();
    return response;
  }, [loadUser]);

  const register = useCallback(async (payload: RegisterPayload) => {
    const response = await authService.register(payload);
    await loadUser();
    return response;
  }, [loadUser]);

  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
  }, []);

  return {
    user,
    isAuthenticated: Boolean(user),
    isLoading,
    login,
    register,
    logout,
  };
}
