# Component Interaction Tests / Тесты взаимодействия компонентов

## English

Release 1.0 uses Node's test runner with `tsx`, JSDOM, and Testing Library for focused client-component tests.

The current component coverage verifies:

- Question Library search and difficulty filtering;
- the empty result state and filter reset action;
- question status changes through Progress Controls;
- adding a question to favorites;
- persistence to the existing versioned local-storage adapter;
- restoration of previously stored status and favorite state.

Tests use the validated Question Library seed and the production storage key. They do not introduce a second content source or a mock progress schema.

Run the suite with:

```bash
pnpm test
```

The GitHub Actions quality job runs component tests after architecture and type checks and before lint, formatting, and the production build.

## Русский

Release 1.0 использует Node test runner вместе с `tsx`, JSDOM и Testing Library для сфокусированных тестов клиентских компонентов.

Текущее покрытие компонентов проверяет:

- поиск и фильтрацию по уровню в Question Library;
- пустое состояние и сброс фильтров;
- изменение статуса вопроса через Progress Controls;
- добавление вопроса в избранное;
- сохранение через существующий версионированный local-storage адаптер;
- восстановление ранее сохранённых статуса и признака избранного.

Тесты используют валидированную seed-базу Question Library и production-ключ хранилища. Отдельный источник контента или дублирующая схема прогресса не создаются.

Запуск набора:

```bash
pnpm test
```

GitHub Actions запускает компонентные тесты после проверки архитектуры и типов, но до lint, форматирования и production build.
