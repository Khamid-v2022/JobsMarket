# Contracts Package

Manages API contracts between frontend and backend.

Recommended contents:

- `openapi/`: OpenAPI source
- `generated/`: generated TypeScript client
- `schemas/`: shared JSON schemas

Strategy:

- Update OpenAPI whenever Laravel APIs change
- Detect generated client drift in CI
- Use generated clients by default in Next.js
