# AUREX — AI Powered Banking Change Analysis Platform

AUREX is an offline-first banking change-intelligence application. It analyses proposed banking changes through an explainable Banking Intelligence Engine and can optionally enrich summaries through a locally running Ollama model. No cloud AI account, API key, or external AI service is required.

## Stack

- Frontend: React, TypeScript, Vite, Tailwind CSS
- Backend: Spring Boot 3.5, Java 21, Spring Security, JWT
- Database: PostgreSQL
- Optional local model: Ollama (`llama3.2`, `mistral`, or `gemma3`)

## What works

- Registration, login and JWT-protected routes
- Banking-change analysis, report persistence, history and search
- Explainable risk scoring, modules, affected teams, checklists, workflow, rollback and deployment guidance
- Portfolio dashboard with risk metrics
- Offline banking assistant
- Automatic local Ollama detection with deterministic fallback

## Run locally

1. The bundled PostgreSQL instance uses port `5433`. Provision the database and its non-superuser application role once (the command prompts for passwords rather than storing them):

   ```powershell
   cd database
   .\bootstrap-aurex.ps1 -StartServer -AdminPassword (Read-Host -AsSecureString) -ApplicationPassword (Read-Host -AsSecureString)
   ```

2. Save the application password plus a long random `JWT_SECRET` in `aurex-backend/.env.local.ps1` (which is ignored by Git). The default URL and username in `.env.example` match the bundled database.
3. Start the API:

   ```powershell
   cd aurex-backend
   .\mvnw.cmd spring-boot:run
   ```

4. Start the web app:

   ```powershell
   cd frontend
   npm.cmd run dev
   ```

The frontend defaults to `http://localhost:5173` and API to `http://localhost:8080`.

## Optional local Ollama

Start Ollama locally and download one supported model, for example:

```powershell
ollama pull llama3.2
ollama serve
```

Set `OLLAMA_MODEL` to `llama3.2`, `mistral`, or `gemma3` if needed. AUREX detects the local service at `OLLAMA_BASE_URL` (default `http://localhost:11434`). If it is unavailable, every analysis still completes through the Banking Intelligence Engine.

## Production configuration

Set `DB_URL`, `DB_USERNAME`, `DB_PASSWORD`, `JWT_SECRET`, `JWT_EXPIRATION_MS`, and `CORS_ALLOWED_ORIGINS` as deployment environment variables. Use a managed PostgreSQL instance, TLS, and a long random JWT secret.

Database changes are versioned in `aurex-backend/src/main/resources/db/migration`. Flyway applies them on a fresh database and Hibernate validates the result at startup; do not enable `ddl-auto=update` in any environment.
