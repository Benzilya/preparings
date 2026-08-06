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
pnpm install
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
pnpm install
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

Known release debt / Известный технический долг:

- `pnpm-lock.yaml` must be regenerated after the Next.js 15.4.8 update and validated by a complete green GitHub Actions run before the PR is marked ready for merge.
- после обновления Next.js до 15.4.8 необходимо пересоздать `pnpm-lock.yaml` и подтвердить полный зелёный прогон GitHub Actions до перевода PR в состояние ready for merge.

Release audit / Аудит релиза: `docs/release/release-1-audit.md`.

## Development status / Статус разработки

Active development happens in the `agent/project-foundation` branch and PR #1.

Активная разработка ведётся в ветке `agent/project-foundation` и PR #1.

Release 1.0 implementation is feature-complete except for the documented lockfile and final CI verification debt.

Реализация Release 1.0 функционально завершена, кроме задокументированного долга по lockfile и финальной проверке CI.
