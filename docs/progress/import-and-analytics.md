# Progress Import and Analytics / Импорт и аналитика прогресса

## English

Release 1.0 stores question progress locally in the browser. The `/progress` route provides:

- completion, learning, and favorites totals;
- category-level completion bars;
- recently changed questions;
- JSON export for backup;
- validated JSON import;
- full local reset.

Imported files must use version `1` and contain only valid progress records. Invalid JSON, unsupported versions, malformed timestamps, and invalid statuses are rejected without replacing the current data. Duplicate question records are normalized by `questionId`.

The data remains private to the current browser profile. There is no server synchronization or account dependency in Release 1.0.

## Русский

Release 1.0 хранит прогресс по вопросам локально в браузере. Маршрут `/progress` предоставляет:

- общие показатели завершённых, изучаемых и избранных вопросов;
- прогресс по категориям;
- список недавно изменённых вопросов;
- экспорт JSON для резервного копирования;
- валидируемый импорт JSON;
- полный сброс локальных данных.

Импортируемый файл должен иметь версию `1` и содержать только корректные записи прогресса. Невалидный JSON, неподдерживаемая версия, некорректные даты и неизвестные статусы отклоняются без замены текущих данных. Дубликаты нормализуются по `questionId`.

Данные остаются приватными для текущего профиля браузера. В Release 1.0 нет серверной синхронизации и зависимости от аккаунта.
