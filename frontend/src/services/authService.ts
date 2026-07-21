import { api, setToken, clearToken, getToken } from "@/lib/api";
import type {
  AuthResponse,
  LoginPayload,
  RegisterPayload,
  User,
} from "@/types/user";

/**
 * Registers a new user, stores the returned JWT, and returns the
 * server response. Backed by POST /api/auth/register (public).
 */
export async function register(payload: RegisterPayload): Promise<AuthResponse> {
  const { data } = await api.post<AuthResponse>("/api/auth/register", payload);
  if (!data?.token) throw new Error("Registration service returned an invalid response. Check the frontend API configuration.");
  setToken(data.token);
  return data;
}

/**
 * Logs an existing user in, stores the returned JWT, and returns the
 * server response. Backed by POST /api/auth/login (public).
 */
export async function login(payload: LoginPayload): Promise<AuthResponse> {
  const { data } = await api.post<AuthResponse>("/api/auth/login", payload);
  if (!data?.token) throw new Error("Login service returned an invalid response. Check the frontend API configuration.");
  setToken(data.token);
  return data;
}

/** Clears the stored JWT. There is no server-side session to invalidate
 *  since auth is stateless JWT - logout is purely a client-side action. */
export function logout(): void {
  clearToken();
}

/**
 * Fetches the current user's profile using the stored JWT.
 * Backed by GET /api/auth/me (protected). Used on app load to confirm
 * a stored token is still valid before treating the user as logged in.
 */
export async function getCurrentUser(): Promise<User> {
  const { data } = await api.get<User>("/api/auth/me");
  return data;
}

export function isAuthenticated(): boolean {
  return Boolean(getToken());
}
