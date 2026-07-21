# AUREX — Software Requirements Specification and Project Review

**Version:** 1.0  
**Prepared:** 19 July 2026  
**Status:** Based on source-code review of the `AUREX` repository

## 1. Purpose

AUREX is a web application for governed banking-change analysis. A signed-in user describes a proposed banking, regulatory, security, product, or platform change in plain language. The system applies deterministic rules to identify banking keywords, calculate a risk score, identify affected modules, create checklists and recommendations, and retain the resulting report in the user's private history.

The product also supplies an authenticated banking assistant. The analysis flow is offline-first: the Banking Intelligence Engine always creates a complete explainable report and can optionally enrich its executive summary through a locally running Ollama model. No external AI provider is used.

## 2. Scope

### In scope and implemented

- Public landing page.
- Account registration and login.
- Stateless JWT authentication and protected routes.
- Authenticated user profile lookup.
- Submission, deterministic analysis, persistence, retrieval and text search of banking change analyses.
- Per-user analysis ownership enforcement.
- Portfolio dashboard calculated from the signed-in user's saved analyses.
- Authenticated offline banking-assistant chat.
- Optional local Ollama enrichment using `llama3.2`, `mistral`, or `gemma3`, with automatic fallback when Ollama is unavailable.
- PostgreSQL persistence and CORS configuration for the local React application.

### Outside the implemented scope / currently prototype-only

- Document or circular upload and OCR/text extraction.
- RBI/SEBI circular compliance analysis pipeline.
- Password-reset email and reset-token flow.
- Social login.
- Saving profile/settings or changing password.
- Role-based authorization beyond assigning every registered user the `USER` role.
- Audit trail, user administration, notifications, report export, workflow approvals, and real-time collaboration.
- Cloud-hosted AI providers. The product is intentionally designed to operate without external AI dependencies.

## 3. Users and stakeholder roles

| Role | Current system capability | Intended usage |
|---|---|---|
| Unauthenticated visitor | View landing page; register or log in | Learn about AUREX and gain access |
| Authenticated user | Create, view, search and reopen only their analyses; use chat | Banking analyst, product owner, engineering or compliance contributor |
| Administrator / compliance approver | Not implemented | Future governance, approvals and audit review |

## 4. Technology and architecture

| Layer | Technology | Responsibility |
|---|---|---|
| Web client | React 19, TypeScript, Vite, React Router, Axios, Tailwind, Framer Motion | SPA, routing, forms, dashboard and API communication |
| API | Java 21, Spring Boot 3.5, Spring Web, Validation | REST endpoints and application logic |
| Security | Spring Security, BCrypt, JJWT | Password hashing, JWT issue/validation and endpoint protection |
| Analysis | Java `BankingRuleEngine` + optional local Ollama | Explainable domain/risk rules, with resilient local-model summary enrichment |
| Persistence | Spring Data JPA + PostgreSQL | Users and serialized analysis reports |

```text
Browser (React SPA)
  ├─ public pages: /, /login, /register, /forgot-password
  └─ protected pages: dashboard, analysis, history, chat, upload, settings
          │ Axios adds Bearer JWT from browser local storage
          ▼
Spring Boot REST API → Security/CORS/JWT filter → Controller → Service
                                                    ├─ Rule engine → structured report
                                                    ├─ Offline chat responder
                                                    └─ Optional local Ollama summary enrichment
                                                    └─ JPA repositories → PostgreSQL
```

The backend uses a conventional controller → service → repository → entity structure. It listens on port `8080` by default; the Vite client defaults to port `5173` and obtains its backend URL from `VITE_API_BASE_URL`.

## 5. Functional requirements

### FR-01: Registration

The system shall allow a visitor to register with name, email and password.

- Email must be syntactically valid and name/password must not be blank.
- Email must be unique.
- The password shall be stored as a BCrypt hash.
- A successful registration shall create a `USER` account and return a JWT.
- A duplicate email shall return HTTP 409.

### FR-02: Login and session handling

The system shall authenticate a registered user using email and password.

- Correct credentials return a signed JWT, valid for the configured duration (24 hours by default).
- Incorrect credentials return HTTP 401.
- The frontend stores the token under `aurex_token` and attaches it to API calls as `Authorization: Bearer <token>`.
- On a 401 response, the frontend clears the local token and redirects to `/login`.
- Logout is client-side only because the server is stateless.

### FR-03: Current-user profile

The system shall expose the authenticated user's ID, name, email, role and creation time at `GET /api/auth/me`.

### FR-04: Banking change analysis

The system shall accept an authenticated change request of 1–5,000 characters and generate a structured analysis.

The engine shall:

1. Convert request text to lower case and scan configured keyword categories.
2. Start every analysis at risk score 12.
3. Add the matching category weights, cap the score at 100, and classify the score:
   - Low: under 30
   - Medium: 30–54
   - High: 55–74
   - Critical: 75–100
4. Identify affected modules, matched terms, category explanations and recommendations.
5. Add 10 points and limit/account modules if `limit` or `balance` occurs.
6. Produce standard business, technical, development, testing and deployment guidance.
7. Persist the report and return its ID and full content.

Rule categories currently implemented:

| Category | Illustrative terms | Added risk |
|---|---|---:|
| Payments | NEFT, RTGS, IMPS, UPI, SWIFT, settlement | 18 |
| Compliance | KYC, AML, RBI, NPCI, audit, tax | 22 |
| Banking products | loan, mortgage, interest, card, insurance | 14 |
| Security | encryption, authentication, OTP, PIN, fraud | 25 |
| Platform | database, API, microservice, integration, rollback | 12 |

### FR-05: Analysis history and ownership

The system shall list saved analyses for only the current user, newest first. It shall optionally search the original request text, case-insensitively. It shall retrieve an analysis by ID only when the requesting user owns it; otherwise it returns HTTP 404.

### FR-06: Dashboard

The dashboard shall calculate user-specific metrics from saved analyses: count, average risk, high/critical count, leading impacted modules, risk distribution and five most recent requests.

### FR-07: Banking assistant

The protected chat endpoint shall accept a nonblank `message` and return an offline guidance response. The current responder detects greetings and questions, then supplies generic change-governance guidance. Conversation history is not persisted or passed to the service.

For analysis reports, AUREX shall attempt a short local Ollama request only after the deterministic report has been generated. A network timeout, missing local service, model error, or unsupported model shall silently preserve the complete deterministic report.

### FR-08: Errors and validation

The API shall return JSON errors shaped as `status`, `error`, `message`, and optionally `fieldErrors`. Validation errors return 400; not-found analyses return 404; unexpected application errors return 500.

## 6. User interface and routes

| Route | Access | State |
|---|---|---|
| `/` | Public | Implemented marketing/landing page |
| `/login`, `/register` | Public | Implemented and connected to API |
| `/forgot-password` | Public | Visual form only; no action/API |
| `/dashboard` | JWT | Implemented and uses real analysis history |
| `/analysis` | JWT | Implemented and connected to rule-engine API |
| `/history` | JWT | Implemented and connected to saved analyses/search |
| `/chat` | JWT | Implemented and connected to offline chat API |
| `/upload` | JWT | UI prototype only |
| `/settings` | JWT | Static placeholder data; save/update controls do nothing |

## 7. External API specification

| Method | Endpoint | Auth | Request | Successful result |
|---|---|---|---|---|
| POST | `/api/auth/register` | No | `name`, `email`, `password` | JWT and message |
| POST | `/api/auth/login` | No | `email`, `password` | JWT and message |
| GET | `/api/auth/me` | JWT | — | User profile |
| POST | `/api/analyses` | JWT | `requestText` | Complete saved analysis |
| GET | `/api/analyses?q=` | JWT | Optional `q` | Current user's analyses |
| GET | `/api/analyses/{id}` | JWT | — | Owned analysis |
| POST | `/api/ai/chat` | JWT | `message` | `{ response }` |
| POST | `/api/chat` | JWT | `message` | Backward-compatible chat endpoint |

## 8. Data requirements

### `users`

`id`, `name`, unique `email`, BCrypt `password`, `role`, `created_at`.

### `change_requests`

`id`, `user_id`, `request_text`, `risk_score`, `risk_level`, `confidence_score`, `title`, `summary`, `analysis_json`, `created_at`.

One user owns many change requests. The full response is serialized in `analysis_json`, then deserialized when history or a report is reopened.

## 9. Non-functional requirements

### Security

- Use TLS in every non-local deployment.
- Restrict CORS origins with `CORS_ALLOWED_ORIGINS`.
- Use a long, random `JWT_SECRET` from a secrets manager in production.
- Use environment-provided database credentials; never commit production secrets.
- Retain BCrypt password storage and authorization checks on every protected endpoint.
- Add rate limiting, security headers, token revocation/rotation and audit logging before handling real banking data.

### Performance and reliability

- Standard analyses should complete synchronously in under two seconds under normal load because the engine is in-process and deterministic.
- Database-backed history should remain paginated as volume grows; pagination is not yet implemented.
- Back up PostgreSQL and define restore objectives before production use.

### Explainability and privacy

- Each rule-generated result must expose its detected signals, modules, recommendations and risk reasoning.
- Current analysis and chat processing remains local to the deployed application. Database content still requires normal access controls, backups, retention and privacy governance.

## 10. Acceptance criteria for delivered core

1. A new user can register, is routed to the dashboard, and the API returns a JWT.
2. A valid user can log in, reload the app, and have the token verified through `/api/auth/me`.
3. An unauthenticated call to a protected endpoint is rejected with JSON HTTP 401.
4. A browser client from an allowed Vite origin can make protected API requests after CORS preflight.
5. A request containing `UPI`, `OTP` and `RBI` returns payment, security and compliance impacts with a risk score and checklists.
6. The result is saved, shown on dashboard/history, searchable by request text, and retrievable only by its owner.
7. The assistant returns a reply only for an authenticated caller.

## 11. Review findings and recommended next work

### High priority before production

1. Completed: database credentials and JWT secret are now environment-required. Keep secrets in deployment configuration and rotate them regularly.
2. Replace local-storage JWTs with a safer session approach (such as secure, HttpOnly cookies) or add strong XSS protection and a token-expiry strategy.
3. Define password complexity and server-side length rules. The UI uses an 8-character minimum, but the API currently accepts any nonblank password.
4. Add automated tests for authentication, ownership isolation, scoring rules, CORS and error responses. The repository currently contains only a basic Spring Boot context-load test.
5. Add database migrations (Flyway or Liquibase) instead of relying on `ddl-auto=update` for production.

### Product-completion work

1. Implement document upload, virus scanning, storage, extraction and a documented analysis workflow, or remove the Upload page until it exists.
2. Implement password reset, social auth and profile/password updates, or label those controls as unavailable.
3. Add pagination, report export, approvals, audit events and role-based permissions for enterprise governance.
4. If local model enrichment is expanded, keep it behind a resilient provider abstraction with evaluation, prompt/data controls and an explicit deterministic fallback.

### Code-quality observations

- The SRS/API documentation should be synchronized: the legacy root `README.md` says the analysis/upload pages are mockups, but source code shows analysis, history and dashboard are live. Upload remains a mockup.
- The frontend build was attempted with `npm.cmd run build; npm.cmd run lint`, but the combined command timed out after 60 seconds while TypeScript/Vite compilation was still running. It did not provide a pass/fail result. The direct `npm` PowerShell shim is blocked by the local execution policy; `npm.cmd` is the working invocation.
- The `Settings` page contains fixed example values and has no persistence implementation. The forgot-password and social-login controls have no backend support.

## 12. Local operation

1. Start PostgreSQL with a database accessible at the configured `DB_URL` (default `jdbc:postgresql://localhost:5433/aurex`).
2. In `aurex-backend`, run `mvnw.cmd spring-boot:run`.
3. In `frontend`, set `VITE_API_BASE_URL` if required and run `npm.cmd run dev`.
4. Open the Vite URL, register an account, submit a banking change request, and check Dashboard, History and Assistant.

## 13. Conclusion

AUREX is a working, locally deployable banking change-intelligence MVP. Its most complete flow is **register/login → deterministic analysis with optional local Ollama enrichment → persist/report → dashboard/history → offline assistant**. It is suitable for demonstrations and controlled internal development. It is not yet a production-ready banking platform because governance workflows, document handling, advanced security hardening, tests, migrations, and several visible UI features remain incomplete.
