# Public APIs and Architecture Quality / Публичные API и контроль архитектуры

## English

Each architectural slice exposes supported imports through an `index.ts` public API. Consumers should import from the slice root, for example `@/widgets/app-shell`, rather than reaching into internal folders.

The `pnpm architecture` command scans source imports and enforces the dependency direction:

`app -> widgets -> features -> entities -> shared`

A lower layer must never import a higher layer. The command runs in GitHub Actions before type checking, linting, formatting, and the production build.

Reusable visual primitives live in `src/shared/ui`. Product-specific interactions, such as theme switching, live in `src/features`.

## Русский

Каждый архитектурный слайс предоставляет поддерживаемые импорты через публичный API `index.ts`. Потребители должны импортировать код из корня слайса, например `@/widgets/app-shell`, а не обращаться к внутренним папкам напрямую.

Команда `pnpm architecture` анализирует импорты исходного кода и контролирует направление зависимостей:

`app -> widgets -> features -> entities -> shared`

Нижний слой не должен импортировать верхний. Команда выполняется в GitHub Actions перед проверкой типов, линтингом, форматированием и production-сборкой.

Переиспользуемые визуальные примитивы находятся в `src/shared/ui`. Продуктовые пользовательские действия, например переключение темы, находятся в `src/features`.
