# AI Interview MVP audit / Аудит AI Interview MVP

## Status / Статус

Development is split into eight completed implementation stages. The feature remains in Draft PR #6 until an explicit decision is made to mark it Ready or merge it.

Разработка разделена на восемь этапов реализации. Функция остаётся в Draft PR #6 до отдельного явного решения перевести PR в Ready или выполнить merge.

## Implemented scope / Реализованный объём

1. Typed interview session, turns, scoring, adaptive decisions and local persistence.
2. Russian/English interview setup with level, topic, question count, duration and language selection.
3. Resumable live interview runner with question progress, answers and local persistence.
4. Deterministic adaptive mock evaluator with feedback and follow-up questions.
5. Server-side OpenAI Responses API integration with automatic local fallback.
6. Junior/Middle/Senior scoring calibration, one-follow-up limit and cumulative session scoring.
7. Final result breakdown and separate local history of completed interviews.
8. Security hardening, privacy settings, operating documentation and final Quality gate.

9. Типизированная сессия интервью, ходы, scoring, адаптивные решения и локальное хранение.
10. Настройка интервью на русском/английском: уровень, тема, количество вопросов, длительность и язык.
11. Восстанавливаемый live-runner с прогрессом, ответами и локальным хранением.
12. Детерминированный adaptive mock evaluator с feedback и уточняющими вопросами.
13. Server-side интеграция OpenAI Responses API с автоматическим локальным fallback.
14. Калибровка Junior/Middle/Senior, лимит одного follow-up и накопительный score сессии.
15. Итоговая разбивка результата и отдельная локальная история завершённых интервью.
16. Security hardening, privacy-настройки, эксплуатационная документация и финальный Quality gate.

## Security and privacy / Безопасность и приватность

- `OPENAI_API_KEY` is server-only and is never required by client components;
- browser requests go to `/api/interview/evaluate`, not directly to the provider;
- candidate answers are validated and size-limited before provider access;
- prompt instructions explicitly treat candidate text as untrusted content;
- Structured Outputs use a strict JSON Schema;
- provider response storage is disabled with `store: false`;
- the provider call has a timeout and failures use the deterministic local evaluator;
- `.env` and `.env.*` are ignored while `.env.example` contains placeholders only;
- interview history uses localStorage only and is separated from the active session key.

- `OPENAI_API_KEY` используется только на сервере и не требуется клиентским компонентам;
- браузер обращается к `/api/interview/evaluate`, а не напрямую к провайдеру;
- ответы кандидата валидируются и ограничиваются по размеру до внешнего запроса;
- prompt явно рассматривает текст кандидата как недоверенный контент;
- Structured Outputs используют strict JSON Schema;
- хранение ответа у провайдера отключено через `store: false`;
- внешний запрос имеет timeout, при ошибке используется детерминированный локальный evaluator;
- `.env` и `.env.*` игнорируются, а `.env.example` содержит только placeholders;
- история интервью использует только localStorage и отделена от ключа активной сессии.

## Persistence / Хранение состояния

Active session key: `qa-interview-trainer:ai-interview-session:v1`.

Completed history key: `qa-interview-trainer:ai-interview-history:v1`.

History is deduplicated by session ID, sorted newest-first and capped at 20 completed sessions. Opening a historical result does not replace the active interview session.

История дедуплицируется по ID сессии, сортируется от новой к старой и ограничена 20 завершёнными сессиями. Открытие исторического результата не заменяет активную сессию интервью.

## Quality / Качество

The final acceptance gate is:

```text
pnpm install --frozen-lockfile
pnpm architecture
pnpm typecheck
pnpm test
pnpm lint
pnpm format
pnpm build
```

A stage is considered complete only when this gate passes on the current PR head. Final run evidence must be recorded in the PR description after the last documentation/security commit.
