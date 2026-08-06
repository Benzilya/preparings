# Release route smoke tests / Smoke-тесты маршрутов релиза

## English

`tests/release-routes-smoke.test.ts` protects the minimum navigable surface of Release 1.0.

The test verifies that:

- the Dashboard, Question Library, category catalog, Progress, Favorites, and Settings routes have App Router entry files;
- primary user routes remain discoverable through the typed navigation configuration;
- navigation href values are unique and absolute.

The checks are intentionally filesystem- and configuration-based. They run in the existing Node test runner without starting a browser or development server, so route regressions are detected early in CI.

### Dependency lock note

`package.json` currently targets the patched Next.js 15.4.8 line, while the committed lockfile was generated for 15.4.6. CI uses `pnpm install --no-frozen-lockfile`, but the lockfile must still be regenerated with pnpm and committed before Release 1.0 is considered reproducible.

## Русский

`tests/release-routes-smoke.test.ts` защищает минимальный навигационный контур Release 1.0.

Тест проверяет, что:

- для Dashboard, Question Library, каталога категорий, Progress, Favorites и Settings существуют входные файлы App Router;
- основные пользовательские маршруты остаются доступны через типизированную конфигурацию навигации;
- значения `href` уникальны и являются абсолютными маршрутами.

Проверки намеренно основаны на файловой системе и конфигурации. Они запускаются существующим Node test runner без браузера и dev-сервера, поэтому регрессии маршрутов обнаруживаются на раннем этапе CI.

### Примечание о lockfile

`package.json` сейчас использует исправленную ветку Next.js 15.4.8, а сохранённый lockfile был создан для 15.4.6. CI выполняет `pnpm install --no-frozen-lockfile`, но перед готовностью Release 1.0 lockfile необходимо заново сгенерировать через pnpm и закоммитить для воспроизводимой установки.
