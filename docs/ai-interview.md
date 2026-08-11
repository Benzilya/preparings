# AI Interview / AI-интервью

## How it works / Как это работает

AI Interview uses the existing bilingual QA Question Library and stable question IDs. A user configures the interview level, language, topic, question count, duration and structured-adaptive mode. The prepared session is stored locally and can be resumed after a page reload.

AI-интервью использует существующую двуязычную базу QA-вопросов и стабильные ID вопросов. Пользователь выбирает уровень, язык, тему, количество вопросов, длительность и структурированно-адаптивный режим. Подготовленная сессия хранится локально и восстанавливается после перезагрузки страницы.

For every answer the application tries the server-side evaluator first. When `OPENAI_API_KEY` is not configured, the provider is unavailable, or the request fails, the interview automatically falls back to the deterministic local mock evaluator. The candidate never needs an API key in the browser.

Для каждого ответа приложение сначала пытается использовать серверную AI-оценку. Если `OPENAI_API_KEY` не настроен, провайдер недоступен или запрос завершается ошибкой, интервью автоматически использует детерминированный локальный mock-движок. API-ключ никогда не требуется в браузере.

## Adaptive scoring / Адаптивная оценка

- scores: correctness, completeness, clarity, depth and total, each from 0 to 100;
- Junior, Middle and Senior use different expectations for answer depth;
- at most one follow-up is allowed for each question;
- after the follow-up the interview moves to the next question, or completes when it is the final question;
- the UI continuously shows question progress and the average session score;
- completed sessions are saved locally in a separate history and can be opened without overwriting the active session.

- оцениваются корректность, полнота, ясность, глубина и итоговый балл от 0 до 100;
- для Junior, Middle и Senior используются разные ожидания по глубине ответа;
- на один вопрос допускается не более одного уточняющего вопроса;
- после уточнения интервью переходит дальше либо завершается на последнем вопросе;
- интерфейс постоянно показывает прогресс по вопросам и средний балл сессии;
- завершённые сессии сохраняются в отдельной локальной истории и открываются без перезаписи активной сессии.

## Enable real AI locally / Включение реального AI локально

Copy `.env.example` to `.env.local` and set your own server-side key:

Скопируйте `.env.example` в `.env.local` и укажите собственный серверный ключ:

```powershell
Copy-Item .env.example .env.local
notepad .env.local
```

or / или:

```bash
cp .env.example .env.local
```

Set / Укажите:

```text
OPENAI_API_KEY=your_key_here
OPENAI_INTERVIEW_MODEL=gpt-5-mini
```

`OPENAI_INTERVIEW_MODEL` is optional. If omitted, the application uses `gpt-5-mini`.

`OPENAI_INTERVIEW_MODEL` необязателен. Если переменная не задана, приложение использует `gpt-5-mini`.

Never commit `.env.local`, screenshots containing a key, terminal history with a key, or a real key inside `.env.example`.

Никогда не коммитьте `.env.local`, скриншоты с ключом, историю терминала с ключом или настоящий ключ внутри `.env.example`.

Restart the development server after changing environment variables:

После изменения переменных окружения перезапустите dev-сервер:

```bash
pnpm dev
```

## Privacy and security / Приватность и безопасность

- the API key is read only by the Next.js server route from `process.env.OPENAI_API_KEY`;
- the browser calls only the local `/api/interview/evaluate` endpoint;
- the provider request uses the OpenAI Responses API with strict JSON Schema structured output;
- provider-side response storage is explicitly disabled with `store: false`;
- candidate input is size-limited and treated as untrusted answer text in the evaluator prompt;
- the provider request has a timeout and failures fall back to the local evaluator;
- no backend database is introduced for interview history; current session and completed history remain in separate localStorage keys.

- API-ключ читается только серверным маршрутом Next.js из `process.env.OPENAI_API_KEY`;
- браузер обращается только к локальному `/api/interview/evaluate`;
- запрос к провайдеру использует OpenAI Responses API и strict JSON Schema;
- хранение ответа на стороне провайдера явно отключено через `store: false`;
- ответ кандидата ограничен по размеру и рассматривается в prompt как недоверенный текст;
- внешний запрос имеет timeout, а при ошибке используется локальный evaluator;
- база данных для истории интервью не добавляется: активная сессия и история завершённых сессий находятся в разных ключах localStorage.

## Quality gate / Проверки

```bash
pnpm install --frozen-lockfile
pnpm architecture
pnpm typecheck
pnpm test
pnpm lint
pnpm format
pnpm build
```
