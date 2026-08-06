# Domain and Progress Tests / Тесты домена и прогресса

## English

Release 1.0 now runs automated TypeScript tests with Node's built-in test runner through `tsx`.

The test suite covers:

- validation of the complete Question Library seed;
- rejection of malformed question slugs, source URLs, duplicate IDs, and duplicate slugs;
- progress import format version checks;
- rejection of malformed JSON and invalid progress records;
- deterministic deduplication that keeps the latest record per `questionId`;
- progress summary counts for learning, completed, and favorite questions.

Run locally with:

```bash
pnpm test
```

The GitHub Actions quality workflow runs the tests after architecture and type checks and before lint, formatting, and production build.

## Русский

Release 1.0 теперь запускает автоматические TypeScript-тесты через встроенный test runner Node.js и `tsx`.

Набор тестов проверяет:

- валидацию всей seed-базы Question Library;
- отклонение некорректных slug, URL источников, повторяющихся ID и slug;
- версию формата импорта прогресса;
- отклонение повреждённого JSON и невалидных записей прогресса;
- детерминированную дедупликацию с сохранением самой новой записи для каждого `questionId`;
- расчёт количества изучаемых, завершённых и избранных вопросов.

Локальный запуск:

```bash
pnpm test
```

GitHub Actions запускает тесты после проверки архитектуры и типов, но до lint, форматирования и production build.
