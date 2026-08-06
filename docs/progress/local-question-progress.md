# Local Question Progress / Локальный прогресс вопросов

## English

Release 1.0 stores question progress in the browser without authentication or a backend.

Each record contains:

- question ID;
- status: `not-started`, `learning`, or `completed`;
- favorite flag;
- last update timestamp.

The storage key is versioned as `qa-interview-trainer:question-progress:v1`. Invalid or corrupted records are ignored during reading. Updates are written through the `track-question-progress` feature, which keeps browser persistence outside page components.

This approach gives users immediate progress tracking in the MVP while preserving a migration path to an authenticated server-side store in a later release.

## Русский

Release 1.0 хранит прогресс по вопросам в браузере без авторизации и backend.

Каждая запись содержит:

- ID вопроса;
- статус: `not-started`, `learning` или `completed`;
- признак избранного;
- время последнего обновления.

Ключ хранилища версионируется как `qa-interview-trainer:question-progress:v1`. Некорректные или повреждённые записи игнорируются при чтении. Обновления выполняются через feature `track-question-progress`, поэтому работа с браузерным хранилищем не находится внутри компонентов страниц.

Такой подход сразу даёт пользователю отслеживание прогресса в MVP и сохраняет возможность позже перенести данные в серверное хранилище с авторизацией.
