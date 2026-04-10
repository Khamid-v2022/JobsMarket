# Talent Marketplace Monorepo

This repository is a monorepo foundation for building a large-scale job marketplace similar to Upwork.

Tech assumptions:

- Backend: Laravel 13.x + PHP 8.4 + PostgreSQL + Redis
- Frontend: Next.js 16.x (App Router) + TypeScript + Tailwind CSS 4.2 + SCSS
- Realtime / Async: Laravel Queue, Events, WebSocket (Broadcasting/Reverb or Soketi)
- Search: Meilisearch or OpenSearch
- Infra: Docker Compose (local), GitHub Actions (CI), container-first deployment

## Core Design Principles

- Start with a modular monolith Laravel API instead of early microservice fragmentation
- Use Next.js as a combined BFF + UI layer for SEO, landing pages, and dashboard UX
- Manage API contracts with OpenAPI and sync frontend types through generated clients
- Keep payment, messaging, search, and notifications loosely coupled behind clear domain boundaries
- Assume read/write optimization, queue-based async processing, observability, and idempotency from day one

## Monorepo Structure

```text
.
|-- apps
|   |-- api
|   |-- web
|   `-- docs-site
|-- packages
|   |-- config-eslint
|   |-- config-typescript
|   |-- contracts
|   |-- design-tokens
|   `-- ui
|-- infra
|   |-- docker
|   |-- github
|   `-- nginx
`-- docs
```

## App Responsibilities

- `apps/api`: Laravel 13 API server, Admin API, queue/scheduler, domain logic
- `apps/web`: Next.js user-facing web app, SSR/SEO, dashboard, search/form UX
- `apps/docs-site`: architecture and engineering documentation site

## Package Responsibilities

- `packages/contracts`: OpenAPI specs, generated types, API client contracts
- `packages/ui`: shared React UI components
- `packages/design-tokens`: color, typography, spacing, z-index, motion tokens
- `packages/config-eslint`, `packages/config-typescript`: shared lint/TS configuration

## Suggested Initial Domains

- Identity & Access
- User Profiles
- Talent Marketplace
- Client Hiring
- Proposals & Contracts
- Billing & Escrow
- Messaging & Notifications
- Reviews & Reputation
- CMS / Marketing
- Admin / Operations

## Recommended Start Sequence

1. Align on architectural rules in `docs/architecture.md`
2. Scaffold `apps/api` with Laravel and apply the domain-module structure
3. Scaffold `apps/web` with Next.js and apply the App Router structure
4. Add OpenAPI-first contract management in `packages/contracts`
5. Build vertical slices in this order: auth, user, jobs, proposals, contracts, billing

## Initial Run

1. Start local services with `pnpm dev:infra`
2. Install workspace packages with `pnpm install`
3. Start Laravel from the root with `pnpm dev:api`
4. Start Next.js from the root with `pnpm dev:web`

For details, read [docs/architecture.md](C:\WorkSpace\PromptEngineering\docs\architecture.md) and [docs/domain-map.md](C:\WorkSpace\PromptEngineering\docs\domain-map.md).
