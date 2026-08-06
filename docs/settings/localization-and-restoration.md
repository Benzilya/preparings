# Localization and Settings Restoration / Локализация и восстановление настроек

## English

The application restores browser-local settings when the client shell mounts. The same versioned settings adapter remains the single source of truth.

- `restoreSettings()` reads validated version `v1` preferences and applies document attributes.
- `useSettings()` keeps the shell synchronized with settings changes and browser storage events.
- Sidebar navigation, workspace labels, search labels, and accessibility labels switch between English and Russian.
- Catalog density and explanation visibility continue to be applied through root HTML data attributes.
- Invalid or damaged local settings fall back to documented defaults.
- Automated tests cover persistence, restoration, invalid JSON, and reset behavior.

## Русский

Приложение восстанавливает локальные настройки браузера при загрузке клиентского каркаса. Единственным источником данных остаётся существующий версионированный settings-адаптер.

- `restoreSettings()` читает валидированные настройки версии `v1` и применяет атрибуты документа.
- `useSettings()` синхронизирует каркас приложения с изменениями настроек и событиями browser storage.
- Навигация, подписи рабочего пространства, поиск и accessibility-метки переключаются между русским и английским языками.
- Плотность каталога и видимость пояснений продолжают применяться через data-атрибуты корневого HTML-элемента.
- Повреждённые или невалидные локальные настройки заменяются документированными значениями по умолчанию.
- Автоматические тесты проверяют сохранение, восстановление, повреждённый JSON и сброс.
