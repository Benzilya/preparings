# CI verification checkpoint / Контрольная точка CI

## Purpose / Назначение

This checkpoint records the final Release 1.0 verification gate after dependency and lockfile synchronization.

Эта контрольная точка фиксирует финальный gate Release 1.0 после синхронизации зависимостей и lockfile.

## Confirmed configuration / Подтверждённая конфигурация

- Next.js: `15.4.10`;
- package manager: `pnpm@10.15.0`;
- synchronized `pnpm-lock.yaml`;
- CI install command: `pnpm install --frozen-lockfile`;
- workflow triggers: pull request, manual dispatch, push to `main` and `agent/project-foundation`.

- Next.js: `15.4.10`;
- package manager: `pnpm@10.15.0`;
- синхронизированный `pnpm-lock.yaml`;
- команда установки в CI: `pnpm install --frozen-lockfile`;
- триггеры workflow: pull request, ручной запуск, push в `main` и `agent/project-foundation`.

## Required green checks / Обязательные зелёные проверки

1. Architecture
2. Typecheck
3. Tests
4. Lint
5. Format
6. Production build

## Release rule / Правило релиза

PR #1 remains draft. It must not be marked Ready or merged without separate user approval, even after all checks are green.

PR #1 остаётся draft. Его нельзя переводить в Ready или объединять без отдельного разрешения пользователя, даже после полного green CI.
