# QA Interview Trainer

Production-grade open-source platform for preparing QA Fullstack Engineers for technical interviews.

Production-grade open-source платформа для подготовки QA Fullstack Engineers к техническим собеседованиям.

## Interface language / Язык интерфейса

Russian is always used on the first visit when no saved preference exists. The visible `RU / EN` switch changes the interface without a page reload and stores the selected language in `localStorage` for future visits.

При первом посещении без сохранённой настройки всегда используется русский язык. Заметный переключатель `RU / EN` меняет язык без перезагрузки страницы и сохраняет выбор в `localStorage` для следующих посещений.

The Question Library content is bilingual. Search, category filters, sorting, detail pages, favorites, and progress history use the currently selected language while stable IDs and slugs preserve links and local progress.

Весь контент базы вопросов двуязычный. Поиск, категории, сортировка, подробные страницы, избранное и история прогресса используют выбранный язык, а стабильные ID и slug сохраняют ссылки и локальный прогресс.

## Contacts and author / Контакты и автор

The project author is [@benzilya](https://github.com/Benzilya). The application footer and `/contacts` page contain safe, accessible links to email, phone, Telegram, GitHub, and the portfolio website. External links open in a new tab with `noopener noreferrer`. No contact form, backend, analytics, or personal-data collection is used.

Автор проекта — [@benzilya](https://github.com/Benzilya). В подвале приложения и на странице `/contacts` размещены безопасные и доступные ссылки на email, телефон, Telegram, GitHub и портфолио. Внешние ссылки открываются в новой вкладке с `noopener noreferrer`. Контактная форма, backend, аналитика и сбор персональных данных не используются.

## Local development / Локальный запуск

### Requirements / Требования

- Node.js 22+
- pnpm 10.15.0+
- Git

### Install and run / Установка и запуск

```bash
git clone https://github.com/Benzilya/preparings.git
cd preparings
git switch main
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

Open / Откройте:

```text
http://localhost:3000
```

If port `3000` is busy, Next.js may choose another port such as `3001`. Use the `Local` address printed by `pnpm dev`.

Если порт `3000` занят, Next.js может выбрать другой порт, например `3001`. Открывайте адрес `Local`, который показывает команда `pnpm dev`.

### Change the local development port / Смена порта локального запуска

To start the development server on a specific port, pass the port to Next.js through the existing `dev` script. For example, to use port `3001`:

Чтобы запустить dev-сервер на конкретном порту, передайте номер порта Next.js через существующий `dev`-скрипт. Например, для порта `3001`:

```bash
pnpm dev -- -p 3001
```

You can use any free local port, for example:

Можно использовать любой свободный локальный порт, например:

```bash
pnpm dev -- -p 3005
pnpm dev -- -p 8080
```

Then open the matching address in the browser:

После запуска откройте соответствующий адрес в браузере:

```text
http://localhost:3001
```

#### Check which process is using a port in PowerShell / Проверка занятого порта в PowerShell

To see which process is using port `3000`:

Чтобы узнать, какой процесс занимает порт `3000`:

```powershell
Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue |
  Select-Object LocalAddress, LocalPort, State, OwningProcess
```

To inspect the process by PID:

Чтобы посмотреть процесс по его PID:

```powershell
Get-Process -Id <PID>
```

If it is an old local development server and you are sure it can be stopped:

Если это старый локальный dev-сервер и вы уверены, что его можно завершить:

```powershell
Stop-Process -Id <PID>
```

You can also force termination when a normal stop does not work:

Если обычное завершение не сработало, можно использовать принудительное:

```powershell
Stop-Process -Id <PID> -Force
```

After freeing the port, run the application again with `pnpm dev` or choose another port explicitly with `pnpm dev -- -p <PORT>`.

После освобождения порта снова запустите приложение командой `pnpm dev` или явно выберите другой порт через `pnpm dev -- -p <PORT>`.

### Update an existing local repository / Обновление существующей локальной копии

Use this sequence when the repository is already cloned and you want to get the latest version from `main`.

Используйте эту последовательность, если репозиторий уже клонирован и нужно получить последнюю версию из `main`.

First stop the development server with `Ctrl + C`, then run:

Сначала остановите dev-сервер сочетанием `Ctrl + C`, затем выполните:

```bash
git switch main
git status
git pull --ff-only origin main
pnpm install --frozen-lockfile
pnpm dev
```

Before `git pull`, check the output of `git status`. If there are no local changes, the commands above are sufficient.

Перед `git pull` проверьте вывод `git status`. Если локальных изменений нет, достаточно команд выше.

#### If you have local changes / Если есть локальные изменения

Do not discard them and do not force the pull. Save them temporarily with Git stash:

Не удаляйте их и не выполняйте принудительный pull. Временно сохраните изменения через Git stash:

```bash
git stash push -u -m "local changes before update"
git switch main
git pull --ff-only origin main
pnpm install --frozen-lockfile
pnpm dev
```

Verify that the updated site works before restoring old local changes. Restore the stash only if you actually need those changes:

Сначала убедитесь, что обновлённый сайт работает. Возвращайте старые локальные изменения только в том случае, если они действительно нужны:

```bash
git stash list
git stash pop
```

If `git stash pop` reports conflicts, resolve them manually. In particular, do not overwrite the current `pnpm-lock.yaml` with an old local copy.

Если `git stash pop` сообщает о конфликтах, разрешите их вручную. В частности, не перезаписывайте актуальный `pnpm-lock.yaml` старой локальной копией.

To verify which version is running locally:

Чтобы проверить, какая версия находится локально:

```bash
git status
git log -1 --oneline
```

### Quality checks / Проверки качества

```bash
pnpm install --frozen-lockfile
pnpm architecture
pnpm typecheck
pnpm test
pnpm lint
pnpm format
pnpm build
```

If `pnpm` is unavailable / Если команда `pnpm` недоступна:

```bash
corepack enable
corepack prepare pnpm@10.15.0 --activate
```

## Release 1.0 scope / Состав Release 1.0

Included / Включено:

- bilingual Question Library with localized search, categories, filters, stable sorting, and complete question details;
- local progress statuses, favorites, activity history, category analytics, import, export, and safe reset flows;
- responsive Dashboard, Progress, Favorites, Settings, Contacts, and localized English/Russian interface surfaces;
- Russian-first interface defaults with persisted `RU / EN` switching;
- accessible author attribution and typed contact configuration;
- accessibility hardening, security headers, architecture checks, domain tests, component tests, and release smoke tests;
- bilingual architecture, testing, content, security, accessibility, and release documentation.

- двуязычная база вопросов, локализованный поиск, категории, фильтры, устойчивая сортировка и полные подробные ответы;
- локальные статусы прогресса, избранное, история активности, статистика по категориям, импорт, экспорт и безопасный сброс;
- адаптивные Dashboard, Progress, Favorites, Settings и Contacts, а также локализованные английский и русский интерфейсы;
- русский язык по умолчанию и сохраняемый переключатель `RU / EN`;
- доступное указание автора и типизированная конфигурация контактов;
- улучшения доступности, security headers, архитектурные проверки, доменные и компонентные тесты и smoke-тесты релиза;
- двуязычная документация по архитектуре, тестированию, контенту, безопасности, доступности и релизу.

## Release gate status / Статус release gate

- Next.js is pinned to `15.4.10`;
- CI requires `pnpm install --frozen-lockfile` followed by architecture, typecheck, tests, lint, format, and build;
- the lockfile has been regenerated and validated with frozen install;
- merged changes are delivered through `main`.

- Next.js зафиксирован на версии `15.4.10`;
- CI требует `pnpm install --frozen-lockfile`, затем architecture, typecheck, tests, lint, format и build;
- lockfile пересоздан и подтверждён установкой в frozen-режиме;
- объединённые изменения поставляются через ветку `main`.

Release audit / Аудит релиза: `docs/release/release-1-audit.md`.
