# Accessibility hardening / Усиление доступности

## English

Release 1.0 includes keyboard-navigation safeguards in the application shell:

- a localized skip link moves focus directly to the main content;
- the main content landmark has a stable `main-content` target;
- primary and utility navigation use distinct accessible names;
- links, buttons, inputs, and selects expose a visible `:focus-visible` outline;
- the focused main landmark suppresses only its own decorative outline after the skip action.

These changes improve keyboard and assistive-technology navigation without changing route structure or stored user data.

## Русский

В Release 1.0 добавлены базовые гарантии клавиатурной доступности каркаса приложения:

- локализованная skip-ссылка переводит фокус прямо к основному содержимому;
- основной landmark имеет стабильную цель `main-content`;
- основная и служебная навигация используют разные доступные названия;
- ссылки, кнопки, поля и списки получают заметный `:focus-visible` контур;
- после перехода skip-ссылкой скрывается только декоративный контур самого main-landmark.

Изменения улучшают навигацию с клавиатуры и вспомогательных технологий, не меняя маршруты и формат локальных данных.
