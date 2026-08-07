# Release 1.0 audit / Аудит Release 1.0

## Scope / Объём

Release 1.0 delivers the non-AI interview preparation workflow. AI Interview remains intentionally deferred to a later release.

Release 1.0 реализует сценарий подготовки к интервью без AI. AI Interview намеренно перенесён в следующий релиз.

## Completed product scope / Завершённый продуктовый объём

- responsive Next.js application shell and typed navigation;
- strict bilingual question model with complete `ru` and `en` text for every user-facing field;
- all six seed questions translated in full while preserving stable IDs, slugs, difficulty, rank, dates, source URLs, and progress keys;
- localized Question Library hero, cards, visible tags, categories, difficulty labels, detail answers, favorites, and progress activity;
- search, filtering, and visible-title sorting operate in the selected locale;
- local progress statuses, favorites, import, export, activity history, and safe reset;
- Russian is the unconditional first-visit default when no saved preference exists;
- visible `RU / EN` switching without page reload, persisted in `localStorage`;
- typed author and contact configuration with accessible email, phone, Telegram, GitHub, and portfolio links;
- localized `/contacts` page and author attribution in the application footer and About section;
- runtime validation requires complete bilingual question content and stable technical keys;
- tests cover Russian default content, English switching, bilingual search, detail/category/favorites/progress surfaces, stable identities, and complete seed translations;
- keyboard accessibility safeguards, localized navigation, visible focus states, and responsive layouts;
- baseline response security headers and disabled framework disclosure header;
- bilingual architecture, content, testing, settings, progress, security, accessibility, and release documentation.

- адаптивный каркас Next.js и типизированная навигация;
- строгая двуязычная модель вопросов с полными значениями `ru` и `en` для каждого пользовательского поля;
- все шесть seed-вопросов переведены полностью с сохранением стабильных ID, slug, сложности, рейтинга, дат, URL источников и ключей прогресса;
- локализованы hero базы вопросов, карточки, видимые теги, категории, уровни сложности, подробные ответы, избранное и история прогресса;
- поиск, фильтрация и сортировка видимых названий работают в выбранной локали;
- локальные статусы, избранное, импорт, экспорт, история активности и безопасный сброс прогресса;
- русский язык безусловно используется при первом посещении, если настройка ещё не сохранена;
- заметный переключатель `RU / EN` работает без перезагрузки и сохраняется в `localStorage`;
- типизированная конфигурация автора и контактов с доступными ссылками на email, телефон, Telegram, GitHub и портфолио;
- локализованная страница `/contacts` и указание автора в подвале приложения и разделе «О проекте»;
- runtime-валидация требует полный двуязычный контент и стабильные технические ключи;
- тесты покрывают русский контент по умолчанию, переключение на английский, двуязычный поиск, detail/category/favorites/progress, стабильные идентификаторы и полноту seed-переводов;
- клавиатурная доступность, локализованная навигация, видимые focus-состояния и адаптивные layout;
- базовые security headers и отключение заголовка раскрытия фреймворка;
- двуязычная документация архитектуры, контента, тестирования, настроек, прогресса, безопасности, доступности и релиза.

## Localization evidence / Подтверждение локализации

- bilingual domain model: `0dff1cbebc5f1e05932a7a7194a0d180e9539296`;
- bilingual runtime validation: `89430aff74a2daca58d59cc436b8f5f840f77e1b`;
- complete translation of all six seed questions: `717a80000c49d37eba176a1c4edbc221f7d9a2e0`;
- typed localized hero and difficulty labels: `709ec4b58e9aa0c3e13b1f07637d15a6395d680a`;
- localized catalog search, filters, sorting, and cards: `77f0a487dc173e584b82049dfda4c3f5d6e642d0`;
- localized detail and category surfaces: `034be8a0715b1e21fdf08fc13da15334398cccb0`;
- localized favorites and progress surfaces: `1ca21dc6695e580ecbcfe1c3363bccf82efdd45a`;
- bilingual catalog component tests: `0ca196846f865f6e114983f7a3003a71645a48fc`;
- bilingual identity and validation tests: `081a8cc63738e300c2def000f36d894f4163ae6f`;
- complete content and surface tests: `d75ef29c8e932acc6a802d886e00ee1b781858f5`, `d968302cd2426bad286323f5b08ff9d244bbc37c`;
- complete detail rendering and typed status labels: `fbefa25c2245c59c533c3e17c80ede8e2f76e7d5`, `6d6dc6baadaa119438d37af86ec666ca80c66e3a`.

## Current technical gate / Текущий технический gate

The checked-in `pnpm-lock.yaml` is corrupted: it contains non-YAML command-output lines and a literal truncated integrity fragment. It cannot pass `pnpm install --frozen-lockfile` and must not be repaired by inventing hashes. A dedicated GitHub-runner workflow regenerates it from `package.json` with pnpm `10.15.0`, applies formatting, and runs architecture, typecheck, tests, lint, format, and build before committing verified generated files.

Текущий `pnpm-lock.yaml` повреждён: он содержит служебные строки, не являющиеся YAML, и буквальный усечённый фрагмент integrity. Такой файл не может пройти `pnpm install --frozen-lockfile`, а хеши нельзя восстанавливать вручную. Отдельный workflow на GitHub runner пересоздаёт его из `package.json` через pnpm `10.15.0`, применяет форматирование и выполняет architecture, typecheck, tests, lint, format и build до коммита проверенных файлов.

## Remaining release gate / Оставшийся release gate

1. Complete deterministic lockfile regeneration through pnpm.
2. Confirm a complete green Quality run for frozen install, architecture, typecheck, tests, lint, format, and build.
3. Keep PR #1 in Draft and do not mark it Ready or merge without explicit user approval.

4. Завершить детерминированное пересоздание lockfile через pnpm.
5. Подтвердить полный зелёный Quality run: frozen install, architecture, typecheck, tests, lint, format и build.
6. Оставить PR #1 в Draft и не переводить его в Ready и не выполнять merge без отдельного разрешения пользователя.
