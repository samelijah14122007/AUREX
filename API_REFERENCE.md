# API Reference

| Method | Endpoint | Authentication | Purpose |
|---|---|---:|---|
| POST | `/api/auth/register` | No | Create user and issue JWT |
| POST | `/api/auth/login` | No | Authenticate and issue JWT |
| GET | `/api/auth/me` | JWT | Current user profile |
| POST | `/api/analyses` | JWT | Run and save banking analysis |
| GET | `/api/analyses` | JWT | User analysis history; optional `q` search |
| GET | `/api/analyses/{id}` | JWT | Retrieve owned analysis |
| POST | `/api/ai/chat` | JWT | Offline banking assistant guidance |

JWT is supplied as `Authorization: Bearer <token>`.
