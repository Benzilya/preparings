# Question Validation / Валидация вопросов

## English

Question records are treated as untrusted content until they pass `validateQuestion` or `validateQuestions`.

Every user-facing text field uses the strict `LocalizedText` contract with complete `ru` and `en` values. Stable technical identifiers remain language-neutral: `id`, `slug`, `categorySlug`, tag keys, difficulty, popularity rank, dates, source URLs, and progress keys never change when the interface language changes.

The validator guarantees:

- every localized field contains non-empty Russian and English text;
- question, category, and tag keys use lowercase kebab-case;
- difficulty is one of `junior`, `middle`, or `senior`;
- localized tags, alternatives, mistakes, follow-ups, and related topics contain complete values;
- answer examples contain a valid level and complete bilingual answer;
- every source contains a title and a parseable URL;
- `sourcesCount` matches the actual source list;
- popularity rank is a non-negative integer;
- `updatedAt` is a valid date;
- IDs and question slugs are unique inside a collection.

`localizeQuestion` creates a display-ready view for the current language without modifying the source record. Search, filters, categories, favorites, progress history, and detail pages therefore use localized text while preserving stored progress by the original question ID.

The six seed questions cover Test Strategy, Test Reliability, API Testing, and UI Automation. Catalog sorting uses the selected locale for visible titles and categories, with a deterministic slug tie-breaker.

## Русский

Записи вопросов считаются недоверенным контентом, пока они не пройдут `validateQuestion` или `validateQuestions`.

Каждое пользовательское текстовое поле использует строгий контракт `LocalizedText` с полными значениями `ru` и `en`. Стабильные технические идентификаторы не зависят от языка: `id`, `slug`, `categorySlug`, ключи тегов, сложность, рейтинг, даты, URL источников и ключи прогресса не меняются при переключении интерфейса.

Валидатор гарантирует:

- каждое локализованное поле содержит непустой русский и английский текст;
- ключи вопроса, категории и тегов записаны в lowercase kebab-case;
- сложность имеет значение `junior`, `middle` или `senior`;
- локализованные теги, альтернативы, ошибки, уточняющие вопросы и связанные темы заполнены полностью;
- примеры ответов содержат корректный уровень и полный двуязычный ответ;
- каждый источник содержит название и корректно разбираемый URL;
- `sourcesCount` совпадает с фактическим списком источников;
- рейтинг популярности является неотрицательным целым числом;
- `updatedAt` содержит корректную дату;
- ID и slug вопросов уникальны внутри коллекции.

`localizeQuestion` создаёт готовое для отображения представление на текущем языке, не изменяя исходную запись. Поэтому поиск, фильтры, категории, избранное, история прогресса и подробные страницы используют локализованный текст, а сохранённый прогресс остаётся привязан к прежнему ID вопроса.

Шесть seed-вопросов охватывают стратегию тестирования, надёжность тестов, тестирование API и автоматизацию UI. Каталог сортирует видимые названия по выбранной локали и использует slug как стабильный дополнительный критерий.
