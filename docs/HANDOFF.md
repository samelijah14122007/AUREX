# AUREX — Handoff Notes (Claude → Codex)

This document exists so whoever/whatever continues this project (Codex) doesn't
have to reverse-engineer decisions already made. Read this before touching code.

## What AUREX actually is right now

A working full-stack app: Spring Boot backend + React/Vite frontend, JWT auth,
PostgreSQL, and an AI chat endpoint. **This part is done and tested.**

There is also a **separate, unbuilt product direction** described in
`docs/product/` — an AI-powered *banking change-request analysis platform*
(paste a change request, get risk score / impacted modules / checklists).
That direction is **not implemented in the codebase**. Two standalone HTML
mockups exploring that direction were built as throwaway visual previews —
they are NOT part of the React app and were not delivered in this zip. If you
want that direction built into the real app, it's a fresh build, not a
continuation of existing code.

Know which one you're extending before making changes.

## What's implemented (backend)

- `aurex-backend/` — Spring Boot 3.5, Java 21, Maven, layered architecture:
  `controller/ → service/ → repository/`, plus `entity/`, `dto/`,
  `security/`, `config/`, `exception/`.
- Auth: register/login, BCrypt password hashing, JWT issuance + validation,
  `GET /api/auth/me` (protected, returns current user profile).
- Chat: `POST /api/ai/chat` (and `POST /api/chat`, kept for backward
  compatibility) — both protected, both return `ChatResponse`.
- **AI provider is pluggable**, not hardcoded to Gemini:
  - `service/AiChatService.java` — interface, `String chat(String message)`.
  - `service/MockChatService.java` — default active bean
    (`ai.provider=mock`, which is the default). Rule-based offline
    responder. No API key or internet needed. This is what runs out of the
    box.
  - `service/GeminiService.java` — real Gemini integration, implements the
    same interface, only activates when `ai.provider=gemini`.
  - Controllers depend on the `AiChatService` interface only — switching
    provider is a property/env-var change (`AI_PROVIDER=gemini`), not a
    code change.
  - **Why this exists:** the user's Gemini API key could not be verified as
    working during this session. Rather than block the whole project on
    that, the app was decoupled from Gemini so everything else (auth, JWT,
    chat UI, full request/response round-trip) is provably working
    independent of the key. Once a working key is confirmed, flip the
    switch — no other change needed.
- CORS: previously **completely missing**, which was the root cause of a
  403 on `POST /api/ai/chat` (browser preflight `OPTIONS` requests were
  blocked before the JWT-bearing `POST` ever went out; Postman/`.http`
  files worked fine because they don't send a CORS preflight — that's why
  it looked inconsistent). Fixed in `config/SecurityConfig.java` via a
  `CorsConfigurationSource` bean, origins from
  `app.cors.allowed-origins` / `CORS_ALLOWED_ORIGINS`.
- Consistent error handling: `exception/ApiException`,
  `exception/ErrorResponse`, `exception/GlobalExceptionHandler`
  (`@RestControllerAdvice`) — every error returns
  `{status, error, message, fieldErrors}`.
- `application.properties` — every value externalized as
  `${ENV_VAR:original-default}`. **Defaults are byte-for-byte identical**
  to the user's original config: DB `aurex` on port `5433`, user
  `postgres`, `ddl-auto=update`. No schema/migration changes were made or
  are needed — do not switch `ddl-auto` to `create`/`create-drop` without
  explicit sign-off, the user has an existing DB they don't want touched.

## What's implemented (frontend)

- `frontend/` — React + Vite + TypeScript + Tailwind, path alias `@` → `src`.
- `src/lib/api.ts` — axios instance, JWT request interceptor (reads
  `aurex_token` from localStorage), 401 response interceptor clears token
  and redirects to `/login`.
- `src/services/authService.ts`, `src/services/chatService.ts` — real
  backend calls (previously `authService.ts` was empty and `lib/auth.ts`
  was a hardcoded mock — both fixed/removed).
- `src/hooks/useAuth.ts` — real auth state, validates token via
  `GET /api/auth/me` on mount.
- `src/routes/ProtectedRoute.tsx` — was hardcoded `isAuthenticated=true`,
  now uses `useAuth()` for real.
- `src/pages/auth/Login.tsx`, `Register.tsx` — wired to real backend, toast
  feedback via `react-hot-toast`.
- `src/pages/dashboard/Chat.tsx` (new) — full chat UI, registered as
  protected route `/chat` in `src/app/AppRouter.tsx`.
- `.env.example` — `VITE_API_BASE_URL=http://localhost:8080`.
- Verified with `npx tsc -b --noEmit` (clean pass). `vite build` could not
  be verified in the sandbox (missing native binary, environment-only
  issue, unrelated to the code).

## Explicitly NOT implemented (known scope boundary)

These pages exist in the frontend as **static mockups only** — no backend,
no real data, by prior agreement with the user (documented in
`docs/product/` as future scope, not part of this build):
- Document upload
- AI-driven document/change analysis
- Compliance scoring / risk dashboard
- History page

If Codex is asked to "complete the project," these are the actual gap —
everything above this section is done and working.

## Known open item

- The user has not confirmed their Gemini API key is valid (checked via
  `GET https://generativelanguage.googleapis.com/v1beta/models?key=...`,
  never confirmed working in this session). App does not depend on it
  (see AI provider section above), but real Gemini chat won't work until
  this is resolved.

## Do not re-litigate these decisions without cause

- `ddl-auto=update`, DB name/port/credentials — kept identical to the
  user's original setup on purpose. Don't "improve" this into a fresh
  schema.
- Mock AI mode is the *default*, not a placeholder to delete — it's load
  bearing for testing without a Gemini key.
- `ChatController` (`/api/chat`) is kept alongside `AIController`
  (`/api/ai/chat`) for backward compatibility — don't delete one assuming
  it's dead code without checking frontend usage.
