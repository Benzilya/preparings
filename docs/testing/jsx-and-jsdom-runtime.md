# JSX and JSDOM Runtime Stability / Стабильность JSX и JSDOM

## English

Component tests run through Node's test runner with `tsx` and JSDOM. Components rendered directly by this test path explicitly import the React JSX runtime, while browser events are constructed from the active JSDOM window.

This keeps the tests aligned with the application without changing production behavior:

- Question Library and Question Progress Controls render under the Node test runner;
- `user-event` receives the active JSDOM document;
- settings change notifications use `window.CustomEvent`;
- production Next.js compilation remains unchanged.

## Русский

Компонентные тесты запускаются через Node test runner, `tsx` и JSDOM. Компоненты, которые напрямую рендерятся этим тестовым контуром, явно импортируют React JSX runtime, а браузерные события создаются из активного окна JSDOM.

Это стабилизирует тесты без изменения production-поведения:

- Question Library и Question Progress Controls рендерятся в Node test runner;
- `user-event` получает активный JSDOM document;
- уведомления об изменении настроек используют `window.CustomEvent`;
- production-компиляция Next.js остаётся без изменений.
