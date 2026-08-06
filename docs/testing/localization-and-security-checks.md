# Localization and security checks

## English

This increment adds an interaction test for the Settings language selector. The test verifies that choosing English updates the rendered control, persists `language: "en"` in the existing versioned settings storage, and applies `lang="en"` to the document root.

The Next.js runtime and matching ESLint configuration were upgraded from `15.4.6` to the patched `15.4.8` release. The application remains on the same Next.js minor line and keeps the existing App Router architecture.

Validation remains part of the Quality workflow: architecture boundaries, TypeScript, domain and component tests, ESLint, Prettier, and production build.

## Русский

В этом инкременте добавлен интеракционный тест переключателя языка на странице Settings. Тест проверяет, что выбор английского языка обновляет элемент интерфейса, сохраняет `language: "en"` в существующем версионированном хранилище настроек и применяет `lang="en"` к корневому элементу документа.

Версия Next.js и соответствующая конфигурация ESLint обновлены с `15.4.6` до исправленного релиза `15.4.8`. Приложение остаётся в той же minor-линии Next.js и сохраняет существующую архитектуру App Router.

Проверки по-прежнему выполняются workflow Quality: архитектурные границы, TypeScript, доменные и компонентные тесты, ESLint, Prettier и production build.
