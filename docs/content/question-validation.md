# Question Validation / Валидация вопросов

## English

Question records are treated as untrusted content until they pass `validateQuestion` or `validateQuestions`.

The validator currently guarantees:

- required textual fields are present and non-empty;
- every question has tags and at least one source;
- `sourcesCount` matches the actual source list;
- popularity rank is non-negative;
- IDs and slugs are unique inside a collection.

This boundary keeps malformed content out of UI components and domain workflows. The validator is intentionally dependency-free for the foundation stage. A schema library may replace its internals later without changing the public entity API.

## Русский

Записи вопросов считаются недоверенным контентом, пока они не пройдут `validateQuestion` или `validateQuestions`.

Сейчас валидатор гарантирует:

- обязательные текстовые поля существуют и не пусты;
- у каждого вопроса есть теги и хотя бы один источник;
- `sourcesCount` совпадает с фактическим списком источников;
- рейтинг популярности неотрицательный;
- ID и slug уникальны внутри коллекции.

Эта граница не допускает некорректный контент в UI-компоненты и доменные сценарии. На этапе foundation валидатор не зависит от внешней библиотеки. Позже его внутреннюю реализацию можно заменить схемой, не изменяя публичный API сущности.
