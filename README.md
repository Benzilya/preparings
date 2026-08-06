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

## Development status / Статус разработки

Active development happens in the `agent/project-foundation` branch and PR #1.

Активная разработка ведётся в ветке `agent/project-foundation` и PR #1.
