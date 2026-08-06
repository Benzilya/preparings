import { validateQuestions } from "@/entities/question/model/validate-question";

const records = [
  {
    id: "q-testing-pyramid",
    slug: "testing-pyramid",
    title: {
      ru: "Что такое пирамида тестирования и когда она не работает?",
      en: "What is the testing pyramid and when does it fail?",
    },
    category: { ru: "Стратегия тестирования", en: "Test Strategy" },
    categorySlug: "test-strategy",
    tags: [
      { key: "strategy", label: { ru: "стратегия", en: "strategy" } },
      { key: "automation", label: { ru: "автоматизация", en: "automation" } },
      { key: "test-levels", label: { ru: "уровни тестирования", en: "test levels" } },
    ],
    difficulty: "middle",
    popularityRank: 1,
    sourcesCount: 1,
    sources: [
      {
        title: "The Practical Test Pyramid",
        url: "https://martinfowler.com/articles/practical-test-pyramid.html",
        publisher: "Martin Fowler",
      },
    ],
    explanation: {
      ru: "Пирамида тестирования — модель скорости обратной связи и стоимости: много быстрых сфокусированных тестов, меньше сервисных интеграционных тестов и небольшое число дорогих сквозных сценариев.",
      en: "The testing pyramid is a feedback and cost model: many fast focused tests, fewer service-level tests, and a small number of expensive end-to-end tests.",
    },
    interviewerGoal: {
      ru: "Проверить, умеет ли кандидат выбирать уровни тестирования по риску, скорости обратной связи и стоимости поддержки, а не просто воспроизводить схему.",
      en: "Check whether the candidate can choose test levels by risk, feedback speed, and maintenance cost rather than repeat a diagram.",
    },
    expectedAnswer: {
      ru: "Объяснить компромиссы, назвать контексты, в которых форма пирамиды меняется, и связать модель с архитектурой продукта и риском релиза.",
      en: "Explain the trade-offs, name contexts where the shape changes, and connect the model to product architecture and release risk.",
    },
    alternativeAnswers: [
      { ru: "Трофей тестирования", en: "Testing trophy" },
      { ru: "Портфель тестов на основе рисков", en: "Risk-based test portfolio" },
    ],
    answerExamples: [
      {
        level: "junior",
        answer: {
          ru: "Большинство тестов должны быть быстрыми модульными тестами, а UI-тестов должно быть меньше.",
          en: "Most tests should be fast unit tests, with fewer UI tests.",
        },
      },
      {
        level: "middle",
        answer: {
          ru: "Пирамида оптимизирует скорость обратной связи и стоимость поддержки, но системам с большим числом сервисных взаимодействий может требоваться больше интеграционных тестов.",
          en: "The pyramid optimizes feedback and maintenance, but service-heavy systems may need more integration tests.",
        },
      },
      {
        level: "senior",
        answer: {
          ru: "Я рассматриваю её как ограничение портфеля тестов и настраиваю форму с учётом стоимости отказа, наблюдаемости, архитектуры и частоты развёртываний.",
          en: "I treat it as a portfolio constraint and tune the shape using failure cost, observability, architecture, and deployment frequency.",
        },
      },
    ],
    mistakes: [
      { ru: "Считать пирамиду фиксированным процентным соотношением", en: "Treating the pyramid as a fixed percentage" },
      { ru: "Игнорировать контрактные и интеграционные тесты", en: "Ignoring contract and integration tests" },
    ],
    followUpQuestions: [
      { ru: "Как вы тестировали бы границу микросервиса?", en: "How would you test a microservice boundary?" },
      { ru: "Что должно входить в сквозной тест?", en: "What belongs in an end-to-end test?" },
    ],
    relatedTopics: [
      { ru: "контрактное тестирование", en: "contract testing" },
      { ru: "стратегия тестирования", en: "test strategy" },
      { ru: "обратная связь CI", en: "CI feedback" },
    ],
    practicalExample: {
      ru: "Используйте модульные тесты для правил ценообразования, API-интеграционные тесты для оформления заказа и несколько браузерных тестов для критического пути покупки.",
      en: "Use unit tests for pricing rules, API integration tests for checkout, and a few browser tests for the critical purchase path.",
    },
    updatedAt: "2026-08-06",
  },
  {
    id: "q-flaky-tests",
    slug: "flaky-tests-investigation",
    title: {
      ru: "Как исследовать и сокращать нестабильные тесты?",
      en: "How do you investigate and reduce flaky tests?",
    },
    category: { ru: "Надёжность тестов", en: "Test Reliability" },
    categorySlug: "test-reliability",
    tags: [
      { key: "flaky-tests", label: { ru: "нестабильные тесты", en: "flaky tests" } },
      { key: "ci", label: { ru: "CI", en: "CI" } },
      { key: "debugging", label: { ru: "отладка", en: "debugging" } },
    ],
    difficulty: "senior",
    popularityRank: 2,
    sourcesCount: 1,
    sources: [
      {
        title: "Google Testing Blog: Flaky Tests",
        url: "https://testing.googleblog.com/2016/05/flaky-tests-at-google-and-how-we.html",
        publisher: "Google Testing Blog",
      },
    ],
    explanation: {
      ru: "Нестабильность — недетерминированное поведение теста, вызванное таймингами, общим состоянием, данными, инфраструктурой, внешними зависимостями или гонками в продукте.",
      en: "Flakiness is nondeterministic test behaviour caused by timing, shared state, data, infrastructure, external dependencies, or product races.",
    },
    interviewerGoal: {
      ru: "Оценить, использует ли кандидат данные, классификацию, ответственность и профилактику вместо слепых повторных запусков.",
      en: "Evaluate whether the candidate uses evidence, classification, ownership, and prevention instead of blind retries.",
    },
    expectedAnswer: {
      ru: "Описать воспроизведение, телеметрию, классификацию сбоев, политику карантина, исправление первопричин и метрики надёжности.",
      en: "Describe reproduction, telemetry, failure classification, quarantine policy, root-cause fixes, and reliability metrics.",
    },
    alternativeAnswers: [
      { ru: "Группировка сбоев по сигнатурам", en: "Failure clustering by signature" },
      { ru: "Детерминированный дизайн тестов", en: "Deterministic test design" },
    ],
    answerExamples: [
      {
        level: "junior",
        answer: { ru: "Перезапустить тест, изучить логи и убрать фиксированные ожидания.", en: "Re-run the test, inspect logs, and remove fixed sleeps." },
      },
      {
        level: "middle",
        answer: {
          ru: "Собрать артефакты, классифицировать проблемы таймингов или состояния, изолировать зависимости и заменить повторы явными условиями ожидания.",
          en: "Capture artifacts, classify timing or state issues, isolate dependencies, and replace retries with explicit conditions.",
        },
      },
      {
        level: "senior",
        answer: {
          ru: "Отслеживать долю нестабильности по владельцу и сигнатуре, помещать тесты в карантин с датой окончания, устранять системные причины и использовать надёжность набора как релизную метрику.",
          en: "Track flake rate by owner and signature, quarantine with expiry, fix systemic causes, and make suite reliability a release metric.",
        },
      },
    ],
    mistakes: [
      { ru: "Добавлять повторы без диагностики", en: "Adding retries without diagnosis" },
      { ru: "Удалять тесты без замены покрытия", en: "Deleting tests without replacing coverage" },
    ],
    followUpQuestions: [
      { ru: "Когда карантин допустим?", en: "When is quarantine acceptable?" },
      { ru: "Какие метрики отражают здоровье набора тестов?", en: "Which metrics show suite health?" },
    ],
    relatedTopics: [
      { ru: "наблюдаемость", en: "observability" },
      { ru: "изоляция тестов", en: "test isolation" },
      { ru: "надёжность CI", en: "CI reliability" },
    ],
    practicalExample: {
      ru: "Замените фиксированную двухсекундную задержку опросом наблюдаемого перехода состояния и прикладывайте трассировки при тайм-ауте.",
      en: "Replace a fixed two-second delay with polling on an observable state transition and attach traces on timeout.",
    },
    updatedAt: "2026-08-06",
  },
  {
    id: "q-api-contract-testing",
    slug: "api-contract-testing",
    title: {
      ru: "Как контрактные тесты защищают интеграции сервисов?",
      en: "How do contract tests protect service integrations?",
    },
    category: { ru: "Тестирование API", en: "API Testing" },
    categorySlug: "api-testing",
    tags: [
      { key: "api", label: { ru: "API", en: "API" } },
      { key: "contracts", label: { ru: "контракты", en: "contracts" } },
      { key: "microservices", label: { ru: "микросервисы", en: "microservices" } },
    ],
    difficulty: "middle",
    popularityRank: 3,
    sourcesCount: 1,
    sources: [
      {
        title: "Introduction to Consumer-Driven Contracts",
        url: "https://martinfowler.com/articles/consumerDrivenContracts.html",
        publisher: "Martin Fowler",
      },
    ],
    explanation: {
      ru: "Контрактные тесты проверяют согласованность форматов запросов и ответов между поставщиками и потребителями без полноценного сквозного окружения.",
      en: "Contract tests verify that providers and consumers agree on request and response shapes without requiring a full end-to-end environment.",
    },
    interviewerGoal: {
      ru: "Проверить, умеет ли кандидат отделять совместимость схем от поведения поставщика и сквозной проверки бизнес-процесса.",
      en: "Check whether the candidate can separate schema compatibility from provider behaviour and end-to-end business validation.",
    },
    expectedAnswer: {
      ru: "Описать обязанности потребителя и поставщика, версионирование, интеграцию с CI и ограничения контрактных тестов.",
      en: "Describe consumer and provider responsibilities, versioning, CI integration, and the limits of contract tests.",
    },
    alternativeAnswers: [
      { ru: "Проверка совместимости схем", en: "Schema compatibility testing" },
      { ru: "Верификация поставщика", en: "Provider verification" },
    ],
    answerExamples: [
      {
        level: "junior",
        answer: { ru: "Контрактный тест проверяет, что ответ API содержит поля, ожидаемые клиентом.", en: "A contract test checks that an API response has the fields a client expects." },
      },
      {
        level: "middle",
        answer: { ru: "Потребители публикуют ожидания, а поставщики проверяют их в CI до релиза.", en: "Consumers publish expectations and providers verify them in CI before release." },
      },
      {
        level: "senior",
        answer: { ru: "Контракты снижают интеграционный риск, но не заменяют тесты рабочих процессов, устойчивости и производственного мониторинга.", en: "Contracts reduce integration risk, but they do not replace workflow, resilience, or production monitoring tests." },
      },
    ],
    mistakes: [
      { ru: "Считать контракты полными тестами бизнес-процесса", en: "Treating contracts as full business-flow tests" },
      { ru: "Игнорировать обратную совместимость", en: "Ignoring backward compatibility" },
    ],
    followUpQuestions: [
      { ru: "Кто отвечает за нарушенный контракт?", en: "Who owns a broken contract?" },
      { ru: "Как версионировать необязательные поля?", en: "How do you version optional fields?" },
    ],
    relatedTopics: [
      { ru: "OpenAPI", en: "OpenAPI" },
      { ru: "эволюция схем", en: "schema evolution" },
      { ru: "микросервисы", en: "microservices" },
    ],
    practicalExample: {
      ru: "Клиент оформления заказа публикует используемые поля ответа, а сервис ценообразования проверяет этот контракт при каждом изменении.",
      en: "A checkout client publishes the response fields it consumes, and the pricing service verifies that contract on every change.",
    },
    updatedAt: "2026-08-06",
  },
  {
    id: "q-browser-locators",
    slug: "resilient-browser-locators",
    title: {
      ru: "Что делает локатор браузерного теста устойчивым?",
      en: "What makes a browser-test locator resilient?",
    },
    category: { ru: "Автоматизация UI", en: "UI Automation" },
    categorySlug: "ui-automation",
    tags: [
      { key: "playwright", label: { ru: "Playwright", en: "Playwright" } },
      { key: "selectors", label: { ru: "селекторы", en: "selectors" } },
      { key: "accessibility", label: { ru: "доступность", en: "accessibility" } },
    ],
    difficulty: "junior",
    popularityRank: 4,
    sourcesCount: 1,
    sources: [
      {
        title: "Playwright Locators",
        url: "https://playwright.dev/docs/locators",
        publisher: "Microsoft",
      },
    ],
    explanation: {
      ru: "Устойчивые локаторы выражают видимый пользователю смысл и не связывают тесты с деталями реализации вроде сгенерированных классов или глубины DOM.",
      en: "Resilient locators express user-visible meaning and avoid coupling tests to implementation details such as generated classes or DOM depth.",
    },
    interviewerGoal: {
      ru: "Оценить, отдаёт ли кандидат приоритет ролям, подписям, стабильным тестовым идентификаторам и понятной ответственности за селекторы.",
      en: "Assess whether the candidate prioritizes roles, labels, stable test IDs, and clear ownership of selectors.",
    },
    expectedAnswer: {
      ru: "Предпочитать доступные роли и подписи, использовать специальные идентификаторы, когда семантики недостаточно, и избегать хрупких цепочек CSS или XPath.",
      en: "Prefer accessible roles and labels, use dedicated IDs when semantics are insufficient, and avoid brittle CSS or XPath chains.",
    },
    alternativeAnswers: [
      { ru: "Семантические селекторы", en: "Semantic selectors" },
      { ru: "Локаторы с приоритетом доступности", en: "Accessibility-first locators" },
    ],
    answerExamples: [
      {
        level: "junior",
        answer: { ru: "Используйте роль, подпись или стабильный test ID вместо длинного CSS-селектора.", en: "Use a role, label, or stable test ID instead of a long CSS selector." },
      },
      {
        level: "middle",
        answer: { ru: "Выбирайте селекторы, соответствующие восприятию интерфейса пользователем и понятно падающие при изменении семантики.", en: "Choose selectors that match how users perceive the UI and fail clearly when semantics change." },
      },
      {
        level: "senior",
        answer: { ru: "Рассматривайте стратегию локаторов как продуктовый контракт разработчиков, тестировщиков и требований доступности.", en: "Treat locator strategy as a product contract shared by developers, testers, and accessibility requirements." },
      },
    ],
    mistakes: [
      { ru: "Выбирать элементы по сгенерированным CSS-классам", en: "Selecting by generated CSS classes" },
      { ru: "Использовать nth-child для бизнес-элементов", en: "Using nth-child for business elements" },
    ],
    followUpQuestions: [
      { ru: "Когда уместен test ID?", en: "When is a test ID appropriate?" },
      { ru: "Как локаторы поддерживают доступность?", en: "How do locators support accessibility?" },
    ],
    relatedTopics: [
      { ru: "Playwright", en: "Playwright" },
      { ru: "доступность", en: "accessibility" },
      { ru: "объекты страниц", en: "page objects" },
    ],
    practicalExample: {
      ru: "Находите действие отправки по роли кнопки и доступному имени, а не по положению элемента внутри формы.",
      en: "Locate the submit action by button role and accessible name rather than by its position inside a form.",
    },
    updatedAt: "2026-08-06",
  },
  {
    id: "q-risk-based-testing",
    slug: "risk-based-testing",
    title: {
      ru: "Как расставлять приоритеты тестирования при ограниченном времени?",
      en: "How do you prioritize testing when time is limited?",
    },
    category: { ru: "Стратегия тестирования", en: "Test Strategy" },
    categorySlug: "test-strategy",
    tags: [
      { key: "risk", label: { ru: "риск", en: "risk" } },
      { key: "prioritization", label: { ru: "приоритизация", en: "prioritization" } },
      { key: "release", label: { ru: "релиз", en: "release" } },
    ],
    difficulty: "senior",
    popularityRank: 5,
    sourcesCount: 1,
    sources: [
      {
        title: "ISO/IEC/IEEE 29119-2 Test Processes",
        url: "https://www.iso.org/standard/79428.html",
        publisher: "ISO",
      },
    ],
    explanation: {
      ru: "Тестирование на основе рисков распределяет усилия с учётом вероятности отказа, влияния на пользователей, масштаба изменений, обнаруживаемости и стоимости восстановления.",
      en: "Risk-based testing allocates effort according to failure probability, user impact, change scope, detectability, and recovery cost.",
    },
    interviewerGoal: {
      ru: "Оценить, умеет ли кандидат делать прозрачные компромиссы вместо попытки обеспечить одинаковое покрытие всего продукта.",
      en: "Evaluate whether the candidate can make transparent trade-offs instead of attempting uniform coverage.",
    },
    expectedAnswer: {
      ru: "Объяснить воспроизводимую модель риска, вовлечь заинтересованных лиц, выбрать подходящие техники тестирования и пересматривать приоритеты при появлении новых данных.",
      en: "Explain a repeatable risk model, involve stakeholders, select matching test techniques, and revisit priorities as evidence changes.",
    },
    alternativeAnswers: [
      { ru: "Матрица влияния и вероятности", en: "Impact-probability matrix" },
      { ru: "Приоритизация критического пути", en: "Critical-path prioritization" },
    ],
    answerExamples: [
      {
        level: "junior",
        answer: { ru: "Сначала тестировать самые важные и недавно изменённые пользовательские сценарии.", en: "Test the most important and recently changed user flows first." },
      },
      {
        level: "middle",
        answer: { ru: "Ранжировать функции по влиянию и вероятности, затем покрывать критические риски самыми быстрыми полезными тестами.", en: "Rank features by impact and likelihood, then cover critical risks with the fastest useful tests." },
      },
      {
        level: "senior",
        answer: { ru: "Явно фиксировать предположения о рисках, связывать их с наблюдаемостью и возможностями отката и непрерывно обновлять.", en: "Make risk assumptions explicit, connect them to observability and rollback options, and update them continuously." },
      },
    ],
    mistakes: [
      { ru: "Приравнивать риск к покрытию кода", en: "Equating risk with code coverage" },
      { ru: "Игнорировать операционное восстановление", en: "Ignoring operational recovery" },
    ],
    followUpQuestions: [
      { ru: "Как количественно оценить влияние?", en: "How do you quantify impact?" },
      { ru: "Когда релиз следует заблокировать?", en: "When should a release be blocked?" },
    ],
    relatedTopics: [
      { ru: "стратегия релиза", en: "release strategy" },
      { ru: "исследовательское тестирование", en: "exploratory testing" },
      { ru: "наблюдаемость", en: "observability" },
    ],
    practicalExample: {
      ru: "При проверке срочного релиза оформления заказа отдайте приоритет авторизации платежа и целостности данных, а не косметическим регрессиям.",
      en: "Prioritize payment authorization and data integrity over cosmetic regressions when validating an urgent checkout release.",
    },
    updatedAt: "2026-08-06",
  },
  {
    id: "q-test-data-management",
    slug: "test-data-management",
    title: {
      ru: "Как проектировать надёжные тестовые данные?",
      en: "How do you design reliable test data?",
    },
    category: { ru: "Надёжность тестов", en: "Test Reliability" },
    categorySlug: "test-reliability",
    tags: [
      { key: "test-data", label: { ru: "тестовые данные", en: "test data" } },
      { key: "isolation", label: { ru: "изоляция", en: "isolation" } },
      { key: "privacy", label: { ru: "приватность", en: "privacy" } },
    ],
    difficulty: "middle",
    popularityRank: 6,
    sourcesCount: 1,
    sources: [
      {
        title: "Test Isolation",
        url: "https://martinfowler.com/bliki/TestIsolation.html",
        publisher: "Martin Fowler",
      },
    ],
    explanation: {
      ru: "Надёжные тестовые данные изолированы, минимальны, воспроизводимы, безопасны с точки зрения приватности и создаются рядом с тестом, которому принадлежат.",
      en: "Reliable test data is isolated, minimal, reproducible, privacy-safe, and created close to the test that owns it.",
    },
    interviewerGoal: {
      ru: "Проверить понимание фабрик данных, очистки, параллельного выполнения и ограничений использования производственных данных.",
      en: "Check whether the candidate understands factories, cleanup, parallel execution, and production-data constraints.",
    },
    expectedAnswer: {
      ru: "Описать детерминированную подготовку, уникальное владение, безопасные синтетические данные, стратегию очистки и поддержку параллельных запусков.",
      en: "Describe deterministic setup, unique ownership, safe synthetic data, cleanup strategy, and support for parallel runs.",
    },
    alternativeAnswers: [
      { ru: "Фабрики данных", en: "Data factories" },
      { ru: "Эфемерные фикстуры", en: "Ephemeral fixtures" },
    ],
    answerExamples: [
      {
        level: "junior",
        answer: { ru: "Создавать только необходимые тесту данные и удалять их после выполнения.", en: "Create only the data a test needs and clean it up afterward." },
      },
      {
        level: "middle",
        answer: { ru: "Использовать фабрики с уникальными идентификаторами, чтобы тесты выполнялись независимо и параллельно.", en: "Use factories with unique identifiers so tests can run independently and in parallel." },
      },
      {
        level: "senior",
        answer: { ru: "Проектировать жизненный цикл данных, контроль приватности, наполнение окружений и наблюдаемость как единую систему надёжности.", en: "Design data lifecycle, privacy controls, environment seeding, and observability as one reliability system." },
      },
    ],
    mistakes: [
      { ru: "Совместно использовать изменяемые фикстуры между тестами", en: "Sharing mutable fixtures between tests" },
      { ru: "Копировать чувствительные производственные данные", en: "Copying sensitive production data" },
    ],
    followUpQuestions: [
      { ru: "Как тестировать миграции?", en: "How do you test migrations?" },
      { ru: "Когда допустим сброс базы данных?", en: "When is database reset acceptable?" },
    ],
    relatedTopics: [
      { ru: "параллельные тесты", en: "parallel tests" },
      { ru: "приватность", en: "privacy" },
      { ru: "тестирование базы данных", en: "database testing" },
    ],
    practicalExample: {
      ru: "Тест создаёт клиента с уникальным именем через API-фабрику и удаляет его через контролируемый сценарий очистки.",
      en: "A test creates a uniquely named customer through an API factory and deletes it through a controlled teardown path.",
    },
    updatedAt: "2026-08-06",
  },
] as const;

export const seedQuestions = validateQuestions(records);
