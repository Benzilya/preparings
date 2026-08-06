# Release security review / Проверка безопасности релиза

## English

Release 1.0 uses browser-local data only and does not require authentication or a backend API. The baseline review covers the currently implemented surface:

- the `X-Powered-By` response header is disabled;
- all routes receive `X-Content-Type-Options: nosniff`;
- referrer data is limited with `strict-origin-when-cross-origin`;
- framing is denied with `X-Frame-Options: DENY`;
- camera, microphone, and geolocation are disabled by `Permissions-Policy`;
- cross-origin opener isolation uses `same-origin`;
- imported progress JSON is validated before it replaces local state;
- destructive progress reset requires explicit confirmation;
- external question sources open with `rel="noreferrer"`.

Deferred technical debt: regenerate `pnpm-lock.yaml` for Next.js 15.4.8 and restore frozen-lockfile installation after GitHub Actions reliably registers a run.

## Русский

Release 1.0 хранит данные только в браузере и не требует авторизации или backend API. Базовая проверка покрывает реализованную поверхность:

- отключён ответный заголовок `X-Powered-By`;
- все маршруты получают `X-Content-Type-Options: nosniff`;
- передача referrer ограничена политикой `strict-origin-when-cross-origin`;
- встраивание во frame запрещено через `X-Frame-Options: DENY`;
- камера, микрофон и геолокация отключены через `Permissions-Policy`;
- для cross-origin opener применяется `same-origin`;
- импортируемый JSON прогресса валидируется до замены локального состояния;
- удаление прогресса требует явного подтверждения;
- внешние источники вопросов открываются с `rel="noreferrer"`.

Отложенный технический долг: пересоздать `pnpm-lock.yaml` для Next.js 15.4.8 и вернуть установку с frozen lockfile после стабильной регистрации GitHub Actions run.
