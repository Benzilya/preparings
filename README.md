# QA Interview Trainer

Production-grade open-source platform for preparing QA Fullstack Engineers for technical interviews.

Production-grade open-source платформа для подготовки QA Fullstack Engineers к техническим собеседованиям.

## Local development / Локальный запуск

### Requirements / Требования

- Node.js 22+
- pnpm 10.15.0+
- Git

### Install and run / Установка и запуск

```bash
git clone https://github.com/Benzilya/preparings.git
cd preparings
git switch agent/project-foundation
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

Open / Откройте:

```text
http://localhost:3000
```

The development server supports hot reload: saved code changes appear in the browser automatically.

Сервер разработки поддерживает hot reload: сохранённые изменения автоматически появляются в браузере.

### Update the local copy / Обновление локальной копии

```bash
git switch agent/project-foundation
git pull origin agent/project-foundation
pnpm install --frozen-lockfile
pnpm dev
```

### Quality checks / Проверки качества

```bash
pnpm architecture
pnpm typecheck
pnpm test
pnpm lint
pnpm format
pnpm build
```

### Common issues / Частые проблемы

If port 3000 is busy / Если порт 3000 занят:

```bash
pnpm dev -- --port 3001
```

Then open / Затем откройте:

```text
http://localhost:3001
```

If `pnpm` is unavailable / Если команда `pnpm` недоступна:

```bash
corepack enable
corepack prepare pnpm@10.15.0 --activate
```

## Release 1.0 scope / Состав Release 1.0

Release 1.0 focuses on a local-first interview preparation workflow without the AI interview module.

Release 1.0 сфокусирован на локальной подготовке к собеседованиям без модуля AI-интервью.

Included / Включено:

- Question Library with validated seed content, categories, search, filters, stable sorting, and question details;
- local progress statuses, favorites, activity history, category analytics, import, export, and safe reset flows;
- responsive Dashboard, Progress, Favorites, Settings, and localized English/Russian interface surfaces;
- accessibility hardening, security headers, architecture checks, domain tests, component tests, and release smoke tests;
- bilingual architecture, testing, security, accessibility, and release documentation.

- база вопросов с валидированным seed-контентом, категориями, поиском, фильтрами, устойчивой сортировкой и страницами вопросов;
- локальные статусы прогресса, избранное, история активности, статистика по категориям, импорт, экспорт и безопасный сброс;
- адаптивные Dashboard, Progress, Favorites и Settings, а также локализованные английский и русский интерфейсы;
- улучшения доступности, security headers, архитектурные проверки, доменные и компонентные тесты и smoke-тесты релиза;
- двуязычная документация по архитектуре, тестированию, безопасности, доступности и релизу.

Release gate status / Статус release gate:

- Next.js is pinned to 15.4.10;
- `pnpm-lock.yaml` is synchronized with the package manifest;
- CI installs dependencies with `pnpm install --frozen-lockfile`;
- PR readiness still requires one complete green GitHub Actions run.

- Next.js зафиксирован на версии 15.4.10;
- `pnpm-lock.yaml` синхронизирован с package manifest;
- CI устанавливает зависимости через `pnpm install --frozen-lockfile`;
- для готовности PR всё ещё требуется один полный зелёный прогон GitHub Actions.

Release audit / Аудит релиза: `docs/release/release-1-audit.md`.

## Development status / Статус разработки

Active development happens in the `agent/project-foundation` branch and PR #1.

Активная разработка ведётся в ветке `agent/project-foundation` и PR #1.

Release 1.0 implementation is feature-complete. The remaining gate is full CI confirmation; PR #1 stays draft until that result is green.

Реализация Release 1.0 функционально завершена. Оставшийся gate — подтверждение полного CI; PR #1 остаётся draft до зелёного результата.