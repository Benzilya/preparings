# Favorites, Activity, and Safe Reset / Избранное, активность и безопасный сброс

## English

Release 1.0 stores question progress locally in the browser and reuses the same versioned storage adapter for all progress views.

The progress experience includes:

- a dedicated `/bookmarks` page derived from `favorite` flags in stored question records;
- deterministic favorite ordering by latest progress update and then question slug;
- the current progress status on every favorite card;
- activity history grouped by calendar date and ordered by the latest update time;
- links from activity entries back to the source question;
- an explicit destructive-action flow that requires typing `DELETE` before local progress can be removed;
- unchanged JSON import and export compatibility with storage format version `1`.

No question content is duplicated in progress storage. Stored records reference questions only by `questionId`, while titles, categories, difficulty, and routes are resolved from the validated Question Library seed. Unknown question IDs in imported or stale records are ignored by derived views without rewriting the backup.

## Русский

Release 1.0 хранит прогресс вопросов локально в браузере и использует один версионированный storage-адаптер для всех представлений прогресса.

Система прогресса включает:

- отдельную страницу `/bookmarks`, построенную на флагах `favorite` из сохранённых записей вопросов;
- детерминированную сортировку избранного по времени последнего изменения и затем по slug вопроса;
- текущий статус прогресса на каждой карточке избранного;
- историю активности, сгруппированную по календарным датам и отсортированную по времени последнего изменения;
- ссылки из истории на исходные страницы вопросов;
- явный сценарий разрушительного действия, требующий ввода `DELETE` перед удалением локального прогресса;
- сохранённую совместимость импорта и экспорта JSON с версией формата `1`.

Контент вопросов не дублируется в хранилище прогресса. Записи содержат только `questionId`, а названия, категории, сложность и маршруты берутся из валидированной seed-базы Question Library. Неизвестные ID вопросов из импортированных или устаревших записей игнорируются производными представлениями без перезаписи резервной копии.
