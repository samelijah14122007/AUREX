# AUREX deployment

## Frontend

For local development, leave `VITE_API_BASE_URL` empty: Vite proxies `/api` to `VITE_API_PROXY_TARGET` (default `http://localhost:8080`), preventing browser CORS/network failures. For Vercel or Netlify production builds, set `VITE_API_BASE_URL` to the public HTTPS backend URL (for example, `https://api.example.com`) and set the identical frontend URL in backend `CORS_ALLOWED_ORIGINS`. Deploy `frontend` to Vercel or Netlify; the included SPA rewrite configurations keep protected client routes working after a refresh.

## Backend

Deploy `aurex-backend` with Java 21 and set `SERVER_PORT`, `DB_URL`, `DB_USERNAME`, `DB_PASSWORD`, `JWT_SECRET`, `CORS_ALLOWED_ORIGINS`, and `APP_STORAGE_DIRECTORY`. Use a managed persistent volume for uploads and a random JWT secret of at least 32 bytes. Optionally set `OLLAMA_ENABLED=true`, `OLLAMA_BASE_URL`, and `OLLAMA_MODEL` to use a local Ollama model for the Banking Knowledge Assistant.

## Database and Ollama

Use a PostgreSQL/Neon JDBC URL. Flyway owns the schema and Hibernate validates it. Before deploying an installation that previously applied the older V1/V2 migration checksums, run `flyway repair` once as a controlled maintenance action, then deploy; fresh databases apply the corrected migrations directly. When Ollama is not enabled or is unavailable, the Banking Knowledge Assistant automatically uses AUREX's embedded banking knowledge base.
