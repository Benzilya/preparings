# ADR-0001: Application foundation

- Status: Accepted
- Date: 2026-08-06

## Context

The product must grow from an interview-preparation MVP into a modular platform with AI interview orchestration, educational content, progress tracking, practice labs, and future multi-user persistence. The initial repository is empty, so the first decision must establish a maintainable baseline without prematurely implementing every future subsystem.

## Decision

Use Next.js App Router, React, and strict TypeScript as the initial application runtime. Keep educational content and domain logic independent from page components. Introduce feature modules incrementally and keep cross-feature primitives in `shared` only when reuse is proven.

The first foundation includes:

- strict TypeScript;
- App Router and server-component-first defaults;
- accessible responsive styling;
- ESLint and Prettier quality gates;
- GitHub Actions for typecheck, lint, formatting, and build;
- architecture decisions stored in `docs/adr`.

## Alternatives considered

### Full monorepo from day one

Rejected for the first commit. The future `apps`, `packages`, and `content` boundaries remain valid, but adding workspace complexity before a second deployable or reusable package exists would increase maintenance without immediate value.

### NestJS backend immediately

Deferred. Next.js route handlers are sufficient for the first product increments. The AI and persistence layers will use explicit interfaces so a future NestJS extraction remains possible.

### Database-first content storage

Rejected for educational content. Versioned MDX or structured files are easier to review, cite, test, and contribute to. PostgreSQL will be introduced for user-owned state such as progress, sessions, notes, and bookmarks.

## Consequences

- The repository stays simple enough to bootstrap quickly.
- Domain and content boundaries must be enforced as features are added.
- A workspace migration may happen when independent packages or applications provide concrete value.
- CI becomes mandatory for every pull request.
