# Change log - what was touched and why

Everything below is additive/corrective to the existing codebase. No
architecture was replaced; no framework or folder layout was swapped out.

## Downloadable PDF report (latest change)

The analysis screen showed a full report on-screen but there was no way to
export it - `reportService.ts` existed as an empty placeholder file and no
backend endpoint existed to serve one. Fixed:

- **`service/ReportService.java` (new)** - generates a formatted PDF from an
  `AnalysisResponse` using PDFBox (already a dependency, previously only
  used to *read* uploaded PDFs). Multi-page, word-wrapped, branded header,
  covers executive summary, risk/confidence/complexity, impacted modules,
  business/technical impact, all three checklists, rollback plan, risk
  explanation, effort estimate, and recommendations.
- **`controller/AnalysisController.java`** - added
  `GET /api/analyses/{id}/report`, protected, same ownership rule as
  `GET /api/analyses/{id}` (404 if the analysis isn't yours). Streams
  `application/pdf` with a `Content-Disposition: attachment` filename.
- **`frontend/src/services/reportService.ts`** - was a 0-byte placeholder,
  now actually calls the endpoint (`responseType: "blob"`) and triggers a
  browser download.
- **`frontend/src/pages/dashboard/Analysis.tsx`** - added a "Download PDF"
  button to the report header with loading/error states.
- **`docs/API.md`** - was stale (still described the old single-chat-only
  API and a Gemini switch that no longer exists in this codebase). Rewritten
  to match what's actually implemented: `/api/analyses`, `/api/documents`,
  and the new `/api/analyses/{id}/report` endpoint, none of which were
  documented before.

## Backend (`aurex-backend`)

### `config/SecurityConfig.java` - **the 403 fix**
- Added a `CorsConfigurationSource` bean and wired it into the filter chain
  (`.cors(...)`). This was completely missing before.
- Permitted `OPTIONS` requests globally so CORS preflight never gets caught
  by `anyRequest().authenticated()`.
- Added `AuthenticationEntryPoint` / `AccessDeniedHandler` beans returning
  clean JSON (`401`/`403`) instead of Spring's default blank/HTML response,
  so the frontend can branch on status code reliably.
- Allowed origins now come from `app.cors.allowed-origins`
  (`CORS_ALLOWED_ORIGINS` env var) instead of being hardcoded.

### `security/JWTService.java`
- Secret and expiration are now injected from `application.properties`
  (`jwt.secret`, `jwt.expiration-ms`) instead of a hardcoded constant -
  same default value, but now overridable per environment without a code
  change/redeploy.
- Expired tokens are now explicitly caught (`ExpiredJwtException`) and
  treated as invalid rather than falling into the generic `catch (Exception)`.

### `application.properties`
- Every value wrapped as `${ENV_VAR:original-default}`. **Defaults are
  unchanged** - your existing DB credentials, Gemini key, and behavior are
  identical unless you set the corresponding environment variable. This
  makes the config safe to use in staging/production without editing the
  file or committing new secrets.
- Added `app.cors.allowed-origins` and `gemini.model`.

### `exception/` (new package: `ApiException`, `ErrorResponse`, `GlobalExceptionHandler`)
- `ApiException` - a small runtime exception carrying an `HttpStatus`, thrown
  by service code for expected failures (duplicate email, bad password,
  Gemini failure, etc.).
- `GlobalExceptionHandler` (`@RestControllerAdvice`) - converts
  `ApiException`, validation errors, and auth failures into a consistent
  `{ status, error, message, fieldErrors? }` JSON body instead of a raw
  stack trace or an empty 500. This is the "improve error handling" item.

### `service/AuthService.java` / `controller/AuthController.java`
- `register`/`login` now throw `ApiException` (409 for duplicate email, 401
  for bad credentials) instead of returning a plain string like
  `"Email already exists"` with a `200 OK` status - previously a
  successful-looking response could contain a failure message, which is
  awkward for a frontend to branch on.
- Both endpoints now return the **already-defined-but-unused** `AuthResponse`
  DTO (`{ token, message }`) instead of a raw `String`, and `register` also
  returns a token so a new user is logged in immediately (matches typical
  auth UX and what the frontend now expects).
- Added `GET /api/auth/me` (protected) returning `UserProfileResponse`
  (another DTO that existed but was never used) - the frontend uses this to
  validate a stored token on load and to hydrate the current user.

### `service/AiChatService.java`, `service/MockChatService.java` (new)
- Added an `AiChatService` interface and a `MockChatService` default
  implementation so the chat endpoint works fully offline, with no Gemini
  key required, out of the box (`ai.provider=mock`, the default).
  `MockChatService` gives short, clearly-labeled rule-based replies
  (`[Offline demo mode ...]`) so it's never mistaken for a real AI answer,
  and it exists purely to let the rest of the stack (auth, JWT, the chat
  UI round-trip) be verified independently of Gemini credentials.
- `GeminiService` is now annotated `@ConditionalOnProperty(name =
  "ai.provider", havingValue = "gemini")` and implements the same
  `AiChatService` interface - only one of the two beans is active at a
  time, selected by the `ai.provider` property (`AI_PROVIDER` env var).
  `AIController`/`ChatController` depend on `AiChatService`, not a
  concrete class, so switching providers is a config change, not a code
  change.

### `service/GeminiService.java`
- Previously returned Gemini's **raw JSON response body** directly to the
  client. Now parses `candidates[0].content.parts[0].text` and returns plain
  text, matching what `ChatResponse` / the frontend expect.
- Message text is now JSON-escaped via Jackson instead of being interpolated
  directly into a JSON string template (that was a latent bug: any message
  containing a `"` or newline would have produced invalid JSON and thrown).
- Wraps `WebClient` failures (timeouts, non-2xx from Gemini, safety-filter
  blocks with an empty candidate list) in `ApiException` with an appropriate
  status instead of letting a `WebClientResponseException` propagate as a
  bare 500.
- Model name (`gemini-2.5-flash`) is now configurable via `gemini.model`.

### `controller/AIController.java`, `controller/ChatController.java`, `dto/ChatRequest.java`
- Added `@Valid`/`@NotBlank` on the incoming message so an empty chat message
  is rejected with a clear `400` + field error instead of reaching
  `GeminiService` and failing there.
- `ChatController` (`/api/chat`) kept for backward compatibility, now
  returns the same `ChatResponse` shape as `/api/ai/chat` instead of a raw
  `String`.

## Frontend (`frontend`)

### `src/lib/api.ts` (new)
- Single axios instance used by every service. Request interceptor attaches
  `Authorization: Bearer <token>` automatically from `localStorage`. Response
  interceptor clears the token and redirects to `/login` on `401`.
- `getErrorMessage()` helper extracts the backend's `{ message }` field for
  toast notifications.

### `src/services/authService.ts` (was an empty file)
- Implements `register`, `login`, `logout`, `getCurrentUser`,
  `isAuthenticated` against the real backend endpoints.

### `src/services/chatService.ts` (new)
- `sendChatMessage()` calls `POST /api/ai/chat`.

### `src/hooks/useAuth.ts` (was a no-op stub)
- Real auth state: validates any stored token against `GET /api/auth/me` on
  mount, exposes `login`/`register`/`logout`, `user`, `isAuthenticated`,
  `isLoading`.

### `src/routes/ProtectedRoute.tsx` (was hardcoded `isAuthenticated = true`)
- Now uses `useAuth()`; shows a small loading spinner while the token is
  being validated, then redirects to `/login` if there's no valid session.

### `src/pages/auth/Login.tsx`, `src/pages/auth/Register.tsx`
- Were static forms with no `onSubmit`, no controlled inputs, and no state.
  Now fully wired: controlled inputs, submit handlers calling `useAuth()`,
  loading state on the submit button, and `react-hot-toast` error/success
  feedback. Fixed a pre-existing bug where "Login" on the Register page
  linked to `/` instead of `/login`.

### `src/pages/dashboard/Chat.tsx` (new) + route + sidebar entry
- A full chat UI (message list, input, send button, loading state) wired to
  `chatService.sendChatMessage`. Added `/chat` to `AppRouter.tsx` (behind
  `ProtectedRoute`) and an "AI Chat" entry to `Sidebar.tsx`.

### `src/components/dashboard/Sidebar.tsx`
- Logout button previously just navigated to `/login` without clearing any
  session state. Now calls `useAuth().logout()` first.

### `src/types/user.ts`, `src/types/chat.ts`
- Added `User`, `AuthResponse`, `LoginPayload`, `RegisterPayload`,
  `ChatMessage`, `ChatRequestPayload`, `ChatResponsePayload` - previously
  empty files.

### `src/main.tsx`
- Mounted `<Toaster />` (react-hot-toast, already a dependency but unused)
  globally so any page can show error/success toasts.

### `src/vite-env.d.ts` (new), `.env` / `.env.example` (new)
- `VITE_API_BASE_URL` typing + example value (`http://localhost:8080`).

### `src/lib/auth.ts` - removed
- This was a hardcoded mock (`setTimeout` + `{ success: true }`) that no
  file in the project imported. Removed in favor of the real
  `services/authService.ts` + `hooks/useAuth.ts` to avoid two competing
  "auth" modules.

### `tsconfig.app.json`
- Added `"ignoreDeprecations": "6.0"` to silence a TypeScript 6.0
  deprecation error on `baseUrl` that was otherwise failing `tsc -b`
  entirely with this project's pinned `typescript: ~6.0.2`. Unrelated to the
  403 fix, but was blocking verification of the rest of the build.

## Not changed

- Database schema/entities, JWT algorithm, BCrypt usage, Maven dependencies,
  Vite/Tailwind config, and the overall package structure are all untouched.
- The document-upload / AI-analysis-report / history pages remain the
  original static mockups (see "Known scope boundary" in the root README).

## Folder-structure cleanup

- Removed a stray literal `@/components/ui/button.tsx` directory (and
  `components.json`) from the frontend root. This was a broken artifact from
  a `shadcn` CLI run that failed to resolve the `@` path alias - it depended
  on `radix-ui` and `class-variance-authority`, neither of which are in
  `package.json`, so it could never have compiled. Nothing in `src/`
  referenced it.
