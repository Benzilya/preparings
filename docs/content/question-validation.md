# Question Validation / Валидация вопросов

## English

Question records are treated as untrusted content until they pass `validateQuestion` or `validateQuestions`.

The validator guarantees:

- required textual fields are present and non-empty;
- question and category slugs use lowercase kebab-case;
- difficulty is one of `junior`, `middle`, or `senior`;
- tags, alternatives, mistakes, follow-ups, and related topics contain non-empty values;
- answer examples contain a valid level and answer;
- every source contains a title and a parseable URL;
- `sourcesCount` matches the actual source list;
- popularity rank is a non-negative integer;
- `updatedAt` is a valid date;
- IDs and question slugs are unique inside a collection.

Each question now contains both a display category and a stable `categorySlug`. Category pages are statically generated from validated seed content. Catalog sorting always uses a deterministic slug tie-breaker, so equal popularity ranks, dates, or titles cannot produce inconsistent ordering between renders.

The seed library currently covers Test Strategy, Test Reliability, API Testing, and UI Automation. The validator remains dependency-free; its internals may later be replaced by a schema library without changing the public entity API.

## Русский

Записи вопросов считаются недоверенным контентом, пока они не пройдут `validateQuestion` или `validateQuestions`.

Валидатор гарантирует:

- обязательные текстовые поля существуют и не пусты;
- slug вопроса и категории записаны в lowercase kebab-case;
- сложность имеет значение `junior`, `middle` или `senior`;
- теги, альтернативы, ошибки, уточняющие вопросы и связанные темы не содержат пустых значений;
- примеры ответов содержат корректный уровень и текст;
- каждый источник содержит название и корректно разбираемый URL;
- `sourcesCount` совпадает с фактическим списком источников;
- рейтинг популярности является неотрицательным целым числом;
- `updatedAt` содержит корректную дату;
- ID и slug вопросов уникальны внутри коллекции.

Теперь каждый вопрос содержит отображаемое название категории и стабильный `categorySlug`. Страницы категорий статически генерируются из валидированной seed-базы. Сортировка каталога всегда использует slug как дополнительный критерий, поэтому одинаковые рейтинги, даты или названия не приводят к нестабильному порядку.

Seed-база сейчас охватывает Test Strategy, Test Reliability, API Testing и UI Automation. Валидатор по-прежнему не зависит от внешних библиотек; позже его внутреннюю реализацию можно заменить схемой без изменения публичного API сущности.
