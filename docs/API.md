# API Reference

Base URL: `http://localhost:8080`

All error responses share this shape (see `GlobalExceptionHandler`):

```json
{
  "status": 400,
  "error": "Bad Request",
  "message": "Validation failed",
  "fieldErrors": { "email": "Invalid email" }
}
```

## Auth (`/api/auth`) - public

### `POST /api/auth/register`
```json
// request
{ "name": "Sam Elijah", "email": "sam@example.com", "password": "secret123" }

// response 200
{ "token": "<jwt>", "message": "User registered successfully" }
```
`409 Conflict` if the email is already registered.

### `POST /api/auth/login`
```json
// request
{ "email": "sam@example.com", "password": "secret123" }

// response 200
{ "token": "<jwt>", "message": "Login successful" }
```
`401 Unauthorized` on bad credentials.

## Auth (protected - requires `Authorization: Bearer <token>`)

### `GET /api/auth/me`
```json
{
  "id": 1,
  "name": "Sam Elijah",
  "email": "sam@example.com",
  "role": "USER",
  "createdAt": "2026-07-01T10:00:00"
}
```

## AI Chat (protected)

The chat endpoint is answered locally by `MockChatService` (`AiChatService`
interface) - no external AI API, no key required. This is separate from the
banking change analysis engine below.

### `POST /api/ai/chat`
```json
// request
{ "message": "What is Artificial Intelligence?" }

// response 200
{ "response": "..." }
```
`400` if `message` is blank.

`POST /api/chat` is kept as a backward-compatible alias with the same
request/response shape.

## Banking Change Analysis (protected)

Core feature. `POST` runs a request through `BankingRuleEngine` (deterministic,
offline, keyword-driven) and optionally enriches the executive summary via a
local Ollama instance if one is reachable at `ollama.base-url` - if Ollama is
absent or slow, the rule-engine output is used as-is. The app never fails
because of this - Ollama is a pure enhancement, never a dependency.

### `POST /api/analyses`
```json
// request
{ "requestText": "Increase UPI transaction limit for retail customers" }

// response 200 - AnalysisResponse (see entity/dto for full field list)
{
  "id": 12,
  "title": "Increase UPI transaction limit for retail customers",
  "riskScore": 72,
  "riskLevel": "High",
  "confidenceScore": 91,
  "summary": "...",
  "executiveSummary": "...",
  "impactedModules": ["Payments Engine", "Mobile Banking", "Fraud Detection"],
  "developmentChecklist": ["..."],
  "testingChecklist": ["..."],
  "deploymentChecklist": ["..."],
  "rollbackPlan": ["..."],
  "riskExplanation": { "business": "...", "technical": "...", "security": "...", "compliance": "..." },
  "effort": { "developerHours": "...", "testingHours": "...", "reviewHours": "...", "timeline": "..." },
  "createdAt": "2026-07-19T10:00:00"
}
```
Every analysis is persisted against the calling user (`change_requests` table).

### `GET /api/analyses`
Returns the caller's analysis history, newest first.
Optional `?q=` filters by substring match against the original request text.

### `GET /api/analyses/{id}`
Returns one analysis. `404` if it doesn't exist or belongs to another user.

### `GET /api/analyses/{id}/report`
**New.** Generates and streams a PDF version of the analysis
(`Content-Type: application/pdf`, `Content-Disposition: attachment`).
Built with PDFBox directly from the stored analysis - nothing is
regenerated or re-scored, it's a formatted export of the same data
`GET /api/analyses/{id}` returns. Same ownership/`404` rule applies.

## Documents (protected)

### `POST /api/documents` (multipart/form-data)
Upload a file (`pdf`, `docx`, `txt`, `csv`, `xlsx`) as form field `file`.
Optional `?analyse=true` (default) also runs the extracted text through
the analysis engine. Text is extracted server-side (PDFBox for PDF, POI
for DOCX/XLSX) and stored alongside the document metadata.

### `GET /api/documents`
Returns the caller's upload history.

## Misc

### `GET /api/hello` - public
Simple liveness check, returns a plain welcome string.
