# AUREX Architecture

AUREX is an offline enterprise banking intelligence platform. It uses a deterministic Java rule engine; no cloud LLM or external AI API is required.

```mermaid
flowchart TD
  UI[React + Vite] --> API[Spring Boot REST API]
  API --> JWT[JWT Security Layer]
  JWT --> INT[Banking Intelligence Engine]
  INT --> RISK[Risk & Recommendation Logic]
  API --> DB[(PostgreSQL)]
```

The backend follows controller → service → repository → entity layers. Analysis results are persisted as a user-owned change request, including the structured report payload.

## Analysis pipeline

```mermaid
flowchart LR
  A[Change request] --> B[Keyword detection]
  B --> C[Domain and rule matching]
  C --> D[Risk scoring]
  D --> E[Modules, controls and checklists]
  E --> F[Persisted explainable report]
```
