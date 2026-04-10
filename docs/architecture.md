# Architecture

## 1. Goals

This project targets a two-sided marketplace similar to Upwork.

- High traffic with search/filter-heavy UX
- Trust-critical contract, billing, and review workflows
- Strong admin and support tooling
- SEO-critical public job and profile pages
- A design that can evolve toward service separation over time

## 2. Recommended Architecture

Do not split into microservices too early. Start with this architecture:

- Frontend: `Next.js App Router`
- Backend: `Laravel API + Queue + Scheduler`
- Architecture style: `Modular Monolith`
- DB: `PostgreSQL`
- Cache / Queue: `Redis`
- Search: start with `Meilisearch`, scale to `OpenSearch` when needed

Why this works:

- Marketplace products have many domains, and boundaries change frequently early on
- A Laravel modular monolith keeps delivery fast while enforcing domain boundaries
- Next.js is strong for SEO, SSR, streaming UI, form actions, and caching strategies

## 3. High-Level System Topology

```text
[Browser]
   |
   v
[Next.js Web]
   |
   +--> [Laravel API]
   |        |
   |        +--> [PostgreSQL]
   |        +--> [Redis]
   |        +--> [Search Engine]
   |        +--> [Object Storage]
   |        `--> [Queue Workers / Scheduler]
   |
   `--> [Analytics / Feature Flags / Monitoring]
```

## 4. Standard Monorepo Structure

```text
apps/
  api/                  # Laravel application
  web/                  # Next.js application
  docs-site/            # Architecture/design system docs

packages/
  contracts/            # OpenAPI, shared schemas, generated TS clients
  ui/                   # Shared React components
  design-tokens/        # CSS variables, token exports
  config-eslint/        # Shared ESLint config
  config-typescript/    # Shared TS config

infra/
  docker/               # Local containers
  github/               # CI templates
  nginx/                # Reverse proxy config

docs/
  architecture.md
  domain-map.md
  delivery-roadmap.md
```

## 5. Laravel Design Rules

Do not keep only the default Laravel structure. Reorganize around domains.

```text
apps/api/
  app/
    Domain/
      Identity/
      User/
      Marketplace/
      Proposal/
      Contract/
      Billing/
      Messaging/
      Review/
      Cms/
      Admin/
      Shared/
    Application/
    Infrastructure/
    Http/
  routes/
    api.php
    admin.php
    internal.php
```

### Laravel Layer Rules

- `Domain`: entities, value objects, domain services, domain events
- `Application`: use cases, commands/queries, DTOs, transaction boundaries
- `Infrastructure`: Eloquent models, repository implementations, external APIs, cache, search, billing integrations
- `Http`: Controller, Request, Resource, Middleware

### Recommended Conventions

- Treat Eloquent models as infrastructure details; enforce business rules in Application/Domain
- Keep write flows use-case centered
- Optimize read flows with query services
- Place all external integrations under `Infrastructure/Integrations`
- Queue jobs must support idempotency keys and retry policies
- Billing/escrow/settlement flows require strict audit trails

## 6. Next.js Design Rules

Next.js is responsible for `UI + BFF`.

```text
apps/web/
  src/
    app/
      (marketing)/
      (auth)/
      (talent)/
      (client)/
      (admin)/
      api/
    features/
      auth/
      jobs/
      proposals/
      contracts/
      messaging/
      payments/
      profiles/
    entities/
    widgets/
    shared/
      api/
      config/
      hooks/
      lib/
      styles/
      types/
```

### Frontend Rules

- Use App Router for routing
- Keep `app/` for page entry points and layouts only
- Place domain-level screen logic in `features/`
- Keep shared business entities in `entities/`
- Keep reusable composed UI in `widgets/`
- Keep generic utilities and API wrappers in `shared/`
- Use Tailwind by default and SCSS modules only for complex component states

### Styling Strategy

- Manage design tokens as CSS variables
- Prefer Tailwind utilities for most styling
- Use SCSS modules for advanced state-driven styling
- Version brand themes in `packages/design-tokens`

## 7. Recommended Domain Map

Core modules:

- `Identity`: sign-up, sign-in, OAuth, 2FA, sessions, authorization
- `User`: account, profile, settings, KYC status
- `Marketplace`: job posts, categories, skills, search, recommendations
- `Proposal`: proposals, interviews, invitations, state transitions
- `Contract`: contracts, milestones, work status, time tracking
- `Billing`: payments, escrow, settlement, refunds, fees
- `Messaging`: direct messaging, attachments, system messages
- `Review`: ratings, feedback, dispute history
- `Cms`: landing, blog, FAQ, announcements
- `Admin`: operations tools, reports, moderation, manual adjustments

## 8. Database Strategy

- PostgreSQL as primary data store
- Use UUID or ULID keys
- Include `created_at`, `updated_at`, and consider `deleted_at` on major tables
- Maintain dedicated `activity_logs` and `audit_logs` where strong traceability is required
- Store money in integer minor units
- Enforce state transitions through enums plus transition policy checks

Recommended core table groups:

- users, roles, permissions
- talent_profiles, client_profiles
- jobs, job_skills, job_questions
- proposals, proposal_answers
- contracts, milestones, work_logs
- wallets, ledger_entries, escrow_accounts, payouts
- conversations, messages, attachments
- reviews, disputes, abuse_reports
- notifications, notification_preferences

## 9. API Strategy

- Use OpenAPI-first for externally consumed contracts
- Consume generated types/clients in frontend apps
- Standardize authentication with `Laravel Sanctum` or a single token strategy
- Keep admin and user APIs clearly separated
- Separate internal async events from public APIs (webhooks/queue events)

API versioning policy:

- `/api/v1`
- `/admin-api/v1`
- `/internal/v1`

## 10. Security and Operations

- RBAC plus policy-based authorization
- Billing/settlement/contract state changes require audit logs
- Rate limit, suspicious activity detection, abuse reporting
- Store uploads in object storage with private signed URLs
- Minimize PII collection and encrypt sensitive data when needed

## 11. Infrastructure and Deployment

Recommended local stack:

- `nginx`
- `web`
- `api`
- `postgres`
- `redis`
- `meilisearch`
- `mailpit`

Recommended production baseline:

- Deploy web and API separately
- Run worker and scheduler as separate processes
- CDN + object storage
- APM + centralized logging + tracing

## 12. Development Process

- Use trunk-based development or short-lived branches
- Run `lint`, `typecheck`, `test`, and `build` on every PR
- Regenerate frontend clients whenever backend contracts change
- Release by vertical slices

## 13. Suggested Delivery Order

1. Auth and authorization
2. User profiles
3. Job posting and search
4. Proposal submission and management
5. Contracts and milestones
6. Billing and escrow
7. Messaging and notifications
8. Reviews and operations tools
