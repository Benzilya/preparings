# Shared Interface Dictionary / Единый словарь интерфейса

## EN

Interface copy for Russian and English is centralized in `src/features/manage-settings/model/translations.ts`.

The dictionary currently covers the application shell and Question Library. Components select one language through the existing `useSettings()` hook and never concatenate Russian and English labels in the same control.

Rules:

- translation keys describe product meaning rather than component structure;
- both languages must expose the same key hierarchy;
- domain content such as question titles remains unchanged;
- new interface areas should extend the shared dictionary instead of adding inline language conditions.

## RU

Тексты русского и английского интерфейса централизованы в `src/features/manage-settings/model/translations.ts`.

Словарь уже используется в основном каркасе приложения и Question Library. Компоненты выбирают один язык через существующий hook `useSettings()` и больше не объединяют русские и английские подписи в одном элементе управления.

Правила:

- ключи перевода описывают смысл продукта, а не структуру компонента;
- оба языка должны иметь одинаковую иерархию ключей;
- доменный контент, включая названия вопросов, не переводится автоматически;
- новые части интерфейса должны расширять общий словарь вместо локальных проверок языка.
