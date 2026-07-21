import axios, { type AxiosRequestConfig, type InternalAxiosRequestConfig } from "axios";

/**
 * Central axios instance used by every service in src/services.
 *
 * Base URL comes from VITE_API_BASE_URL (see .env.example) so the
 * frontend can point at any backend (local dev, staging, prod)
 * without code changes.
 */
export const api = axios.create({
  // Service paths already include `/api`. Keeping the local base URL empty
  // prevents requests such as `/api/api/auth/login`; Vite proxies `/api` to
  // the local backend. Deployed environments can set this to the public
  // backend origin (for example, https://api.example.com).
  baseURL: import.meta.env.VITE_API_BASE_URL || "",
  timeout: 20_000,
  headers: {
    "Content-Type": "application/json",
  },
});

const TOKEN_KEY = "aurex_token";
const RETRYABLE_METHODS = new Set(["get", "head", "options"]);
const MAX_READ_RETRIES = 2;

type RetryableRequestConfig = AxiosRequestConfig & { _retryCount?: number };

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

// Attach the JWT (if present) to every outgoing request.
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getToken();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// If the backend ever responds 401 (missing/expired/invalid token),
// clear the stale token and send the user back to /login so they
// aren't stuck seeing failed requests silently.
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      clearToken();
      const publicAuthRequest = error.config?.url?.startsWith("/api/auth/login")
        || error.config?.url?.startsWith("/api/auth/register");
      if (!publicAuthRequest && window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    // Retry only idempotent reads. Retrying uploads or analysis creation could
    // duplicate user data when the first request succeeded but its response was lost.
    const request = error.config as RetryableRequestConfig | undefined;
    const method = request?.method?.toLowerCase();
    const retryableStatus = !error.response || error.response.status >= 500;
    const retryCount = request?._retryCount ?? 0;
    if (request && method && RETRYABLE_METHODS.has(method) && retryableStatus && retryCount < MAX_READ_RETRIES) {
      request._retryCount = retryCount + 1;
      await new Promise<void>((resolve) => window.setTimeout(resolve, 300 * 2 ** retryCount));
      return api.request(request);
    }

    return Promise.reject(error);
  }
);

/** Shape of the JSON error body returned by GlobalExceptionHandler. */
export type ApiErrorBody = {
  status: number;
  error: string;
  message: string;
  fieldErrors?: Record<string, string>;
};

/** Pulls a human-readable message out of an axios/API error. */
export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const body = error.response?.data as ApiErrorBody | undefined;
    if (body?.message) return body.message;
    if (error.code === "ERR_NETWORK") return "AUREX cannot reach the secure service. Confirm that the backend is running and that VITE_API_BASE_URL is configured for this environment.";
    if (error.code === "ECONNABORTED") return "AUREX took too long to respond. Please retry; if this continues, check the backend service health.";
    if (error.message) return error.message;
  }
  return "Something went wrong. Please try again.";
}
