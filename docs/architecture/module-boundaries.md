# Module Boundaries / Границы модулей

## English

The application uses explicit dependency boundaries inspired by Feature-Sliced Design.

- `shared` contains reusable infrastructure, configuration, primitives, and utilities. It does not import from higher layers.
- `entities` contains stable business concepts such as Question and Interview. Entities may depend only on `shared`.
- `features` contains user actions and use cases. Features may depend on `entities` and `shared`, but features do not import one another directly.
- `widgets` composes entities and features into large interface sections such as the application shell.
- `app` owns routing, providers, global styles, metadata, and final composition.
- `content` stores versioned educational material separately from UI and runtime state.

Dependencies flow downward: `app -> widgets -> features -> entities -> shared`. Content is read through validated adapters rather than imported into presentation components without validation.

## Русский

Приложение использует явные границы зависимостей, основанные на принципах Feature-Sliced Design.

- `shared` содержит переиспользуемую инфраструктуру, конфигурацию, примитивы и утилиты. Этот слой не импортирует верхние слои.
- `entities` содержит стабильные бизнес-сущности, например Question и Interview. Сущности могут зависеть только от `shared`.
- `features` содержит пользовательские действия и сценарии. Фичи могут зависеть от `entities` и `shared`, но не импортируют друг друга напрямую.
- `widgets` собирает сущности и фичи в крупные части интерфейса, например каркас приложения.
- `app` отвечает за маршрутизацию, провайдеры, глобальные стили, метаданные и финальную композицию.
- `content` хранит версионируемые образовательные материалы отдельно от UI и пользовательского состояния.

Зависимости направлены вниз: `app -> widgets -> features -> entities -> shared`. Контент подключается через валидируемые адаптеры и не должен попадать в UI без проверки структуры.

## Current domain contracts / Текущие доменные контракты

The Question model captures difficulty, popularity, sources, interviewer intent, expected and alternative answers, level-specific examples, mistakes, follow-ups, related topics, and experience mapping.

Модель Question описывает сложность, популярность, источники, цель интервьюера, ожидаемые и альтернативные ответы, примеры по уровням, ошибки, дополнительные вопросы, связанные темы и связь с практическим опытом.

The Interview model separates session state, answers, scoring, and final results so the future AI provider and persistence implementation can be replaced independently.

Модель Interview разделяет состояние сессии, ответы, оценивание и итоговый результат, чтобы в будущем независимо менять AI-провайдера и реализацию хранения данных.
