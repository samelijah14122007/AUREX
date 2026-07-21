# AUREX Frontend

React 19 + TypeScript + Vite + Tailwind CSS.

See the [root README](../README.md) for full setup instructions and the
[API reference](../docs/API.md) for the backend contract this app talks to.

## Scripts

```bash
npm install
cp .env.example .env
npm run dev       # http://localhost:5173
npm run build
npm run lint
```

## Structure

- `src/lib/api.ts` - axios instance, JWT interceptor, error helper
- `src/services/` - one file per backend resource (`authService`, `chatService`)
- `src/hooks/useAuth.ts` - auth state
- `src/routes/ProtectedRoute.tsx` - route guard
- `src/pages/` - route-level screens
- `src/components/` - shared/presentational components
