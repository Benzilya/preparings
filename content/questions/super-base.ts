import type { LocalizedText, Question } from "@/entities/question";

import { createRankedQuestion, type RankedQuestionSpec } from "./create-ranked-question";

const studyNotesSource = {
  title: "1-8 СПРИНТЫ | СУПЕР БАЗА",
  url: "https://docs.google.com/document/d/10nQ6BofwVIFsmUFxgN0Yt4eMg3u2m79W1esdiTbkstY/edit?pli=1&tab=t.0#heading=h.vd25lm2hsry9",
  publisher: "User-provided QA study notes",
} as const;

const inclusionRationale: LocalizedText = {
  ru: "Вопрос импортирован из пользовательского учебного конспекта «1-8 СПРИНТЫ | СУПЕР БАЗА» и добавлен как дополнительный материал после основного TOP-100 рейтинга.",
  en: "This question was imported from the user-provided study notes “1-8 СПРИНТЫ | СУПЕР БАЗА” and added as supplemental material after the primary TOP-100 ranking.",
};

const category = (ru: string, en: string): LocalizedText => ({ ru, en });
const tag = (key: string, ru: string, en: string) => ({ key, label: { ru, en } });

function fromStudyNotes(
  spec: Omit<RankedQuestionSpec, "sources" | "frequencyTier">,
): Question {
  const question = createRankedQuestion({
    ...spec,
    sources: [studyNotesSource],
    frequencyTier: "frequent",
  });

  return {
    ...question,
    ranking: question.ranking
      ? { ...question.ranking, inclusionRationale }
      : undefined,
  };
}

export const superBaseQuestions: readonly Question[] = [
  fromStudyNotes({
    rank: 101,
    slug: "browser-engines-and-cross-browser-testing",
    difficulty: "junior",
    categorySlug: "web-platform",
    category: category("Веб-платформа", "Web platform"),
    title: {
      ru: "Какие движки используют современные браузеры и зачем QA кросс-браузерное тестирование?",
      en: "Which engines do modern browsers use and why does QA need cross-browser testing?",
    },
    summary: {
      ru: "Chrome, Edge, Opera, Brave и Vivaldi относятся к Chromium-семейству и используют Blink; Firefox использует Gecko, Safari — WebKit. Проверки стоит проводить в популярных десктопных и мобильных браузерах, учитывая версии и ОС, потому что CSS, JavaScript и рендеринг могут отличаться.",
      en: "Chrome, Edge, Opera, Brave, and Vivaldi belong to the Chromium family and use Blink; Firefox uses Gecko and Safari uses WebKit. QA should cover popular desktop and mobile browsers, versions, and operating systems because CSS, JavaScript, and rendering behavior can differ.",
    },
    tags: [
      tag("browsers", "браузеры", "browsers"),
      tag("rendering-engines", "движки рендеринга", "rendering engines"),
      tag("cross-browser", "кросс-браузерность", "cross-browser"),
    ],
  }),
  fromStudyNotes({
    rank: 102,
    slug: "what-happens-when-opening-a-website",
    difficulty: "middle",
    categorySlug: "web-platform",
    category: category("Веб-платформа", "Web platform"),
    title: {
      ru: "Что происходит после ввода URL в браузере до отображения страницы?",
      en: "What happens after entering a URL in the browser until the page is displayed?",
    },
    summary: {
      ru: "Браузер ищет IP через кэши и DNS, устанавливает TCP-соединение, для HTTPS выполняет TLS-handshake, отправляет HTTP-запрос и получает ответ. Затем HTML парсится в DOM, CSS — в CSSOM, формируется render tree, загружаются дополнительные ресурсы, выполняется JavaScript и страница становится интерактивной.",
      en: "The browser resolves the IP through caches and DNS, establishes a TCP connection, performs a TLS handshake for HTTPS, sends an HTTP request, and receives a response. It then parses HTML into the DOM, CSS into the CSSOM, builds the render tree, loads additional resources, executes JavaScript, and makes the page interactive.",
    },
    tags: [
      tag("dns", "DNS", "DNS"),
      tag("tcp", "TCP", "TCP"),
      tag("tls", "TLS", "TLS"),
      tag("rendering", "рендеринг", "rendering"),
    ],
  }),
  fromStudyNotes({
    rank: 103,
    slug: "qa-engineer-tool-stack",
    difficulty: "junior",
    categorySlug: "qa-tooling",
    category: category("Инструменты QA", "QA tooling"),
    title: {
      ru: "Какие инструменты входят в типичный стек QA-инженера?",
      en: "Which tools are commonly included in a QA engineer's stack?",
    },
    summary: {
      ru: "В конспекте стек QA включает таск-трекеры, wiki и API-документацию, TMS, системы логирования, инструменты работы с БД, DevTools, CI/CD, Git, снифферы и прокси, API-клиенты, инструменты нагрузочного и мобильного тестирования, а также фреймворки автоматизации фронтенда и бэкенда.",
      en: "The notes group a QA stack into task trackers, wikis and API documentation, TMS tools, logging systems, database clients, DevTools, CI/CD, Git, sniffers and proxies, API clients, load and mobile testing tools, plus frontend and backend automation frameworks.",
    },
    tags: [
      tag("qa-tools", "QA-инструменты", "QA tools"),
      tag("devtools", "DevTools", "DevTools"),
      tag("automation", "автоматизация", "automation"),
    ],
  }),
  fromStudyNotes({
    rank: 104,
    slug: "logging-levels-trace-debug-info-warn-error-fatal",
    difficulty: "junior",
    categorySlug: "observability",
    category: category("Наблюдаемость", "Observability"),
    title: {
      ru: "Чем отличаются уровни логирования TRACE, DEBUG, INFO, WARN, ERROR и FATAL?",
      en: "How do TRACE, DEBUG, INFO, WARN, ERROR, and FATAL logging levels differ?",
    },
    summary: {
      ru: "TRACE фиксирует самые мелкие детали, DEBUG помогает при отладке, INFO описывает штатные ключевые события, WARN указывает на потенциальную проблему, ERROR — на ошибку конкретной операции, а FATAL или CRITICAL — на критический сбой, после которого система может продолжать работу некорректно или остановиться.",
      en: "TRACE captures the finest execution details, DEBUG supports debugging, INFO records normal key events, WARN signals a potential problem, ERROR records a failed operation, and FATAL or CRITICAL represents a severe failure that can make the system unusable or stop it.",
    },
    tags: [
      tag("logs", "логи", "logs"),
      tag("debugging", "отладка", "debugging"),
      tag("observability", "наблюдаемость", "observability"),
    ],
  }),
  fromStudyNotes({
    rank: 105,
    slug: "mobile-testing-specifics",
    difficulty: "middle",
    categorySlug: "mobile-testing",
    category: category("Мобильное тестирование", "Mobile testing"),
    title: {
      ru: "Какие особенности нужно учитывать при тестировании мобильного приложения?",
      en: "What should be considered when testing a mobile application?",
    },
    summary: {
      ru: "Проверяют фон и возврат в приложение, звонки и SMS, подключение зарядки и низкий заряд, GPS, тёмную тему, жесты и аппаратную кнопку Back, установку/удаление/обновление, биометрию, разные Android-оболочки и поведение при потере и восстановлении сети.",
      en: "Typical checks include backgrounding and resuming, calls and SMS, charger and low-battery interruptions, GPS, dark mode, touch gestures and the Android Back button, install/remove/update flows, biometrics, different Android vendor shells, and behavior when network connectivity is lost and restored.",
    },
    tags: [
      tag("mobile", "мобильное тестирование", "mobile testing"),
      tag("interruptions", "прерывания", "interruptions"),
      tag("network", "сеть", "network"),
    ],
  }),
  fromStudyNotes({
    rank: 106,
    slug: "adb-purpose-and-basic-commands",
    difficulty: "middle",
    categorySlug: "mobile-testing",
    category: category("Мобильное тестирование", "Mobile testing"),
    title: {
      ru: "Что такое ADB и какие базовые задачи он решает?",
      en: "What is ADB and which basic tasks does it solve?",
    },
    summary: {
      ru: "Android Debug Bridge — консольная утилита Android SDK для взаимодействия компьютера с Android-устройством по USB или сети. Через ADB можно посмотреть подключённые устройства, устанавливать и удалять APK, читать системные логи, перезагружать устройство и открывать shell; базовые команды из конспекта — adb devices, adb install и adb uninstall.",
      en: "Android Debug Bridge is an Android SDK command-line utility for communicating with an Android device over USB or a network. It can list devices, install or remove APKs, read system logs, reboot a device, and open a shell; the notes highlight adb devices, adb install, and adb uninstall as basic commands.",
    },
    tags: [
      tag("adb", "ADB", "ADB"),
      tag("android", "Android", "Android"),
      tag("mobile-tools", "мобильные инструменты", "mobile tools"),
    ],
  }),
  fromStudyNotes({
    rank: 107,
    slug: "testing-metrics",
    difficulty: "middle",
    categorySlug: "test-management",
    category: category("Управление тестированием", "Test management"),
    title: {
      ru: "Какие метрики тестирования можно отслеживать в команде?",
      en: "Which testing metrics can a team track?",
    },
    summary: {
      ru: "В конспекте перечислены Zero Bug Policy, процент покрытия тест-кейсами и автотестами, время задачи в Ready for Testing или Testing, длительность регресса и скорость разбора тикетов от поддержки. Метрики полезно связывать с целями команды, а не использовать как самоцель.",
      en: "The notes list Zero Bug Policy, coverage by test cases and automated tests, time spent in Ready for Testing or Testing, regression duration, and speed of handling support tickets. Such metrics are most useful when tied to team goals rather than treated as goals by themselves.",
    },
    tags: [
      tag("metrics", "метрики", "metrics"),
      tag("coverage", "покрытие", "coverage"),
      tag("regression", "регресс", "regression"),
    ],
  }),
  fromStudyNotes({
    rank: 108,
    slug: "testing-artifacts-and-documentation",
    difficulty: "junior",
    categorySlug: "test-management",
    category: category("Управление тестированием", "Test management"),
    title: {
      ru: "Какие основные артефакты и документы создаёт тестировщик?",
      en: "Which core artifacts and documents does a tester create?",
    },
    summary: {
      ru: "К основным артефактам относятся чек-лист, тест-кейс, баг-репорт, отчёт о тестировании и тест-план. Тест-кейс содержит цель, приоритет, предусловия, шаги, ожидаемый результат и при необходимости постусловия; баг-репорт фиксирует фактический и ожидаемый результат, шаги, окружение, логи и приоритет/серьёзность.",
      en: "Core artifacts include checklists, test cases, bug reports, test reports, and test plans. A test case captures purpose, priority, preconditions, steps, expected result, and optional postconditions; a bug report records actual and expected results, reproduction steps, environment, logs, and priority/severity information.",
    },
    tags: [
      tag("test-cases", "тест-кейсы", "test cases"),
      tag("bug-reports", "баг-репорты", "bug reports"),
      tag("test-plan", "тест-план", "test plan"),
    ],
  }),
  fromStudyNotes({
    rank: 109,
    slug: "testing-process-stages",
    difficulty: "junior",
    categorySlug: "test-management",
    category: category("Управление тестированием", "Test management"),
    title: {
      ru: "Из каких этапов состоит процесс тестирования фичи?",
      en: "Which stages make up the testing process for a feature?",
    },
    summary: {
      ru: "Последовательность из конспекта: тест-анализ, создание чек-листа, подготовка тест-кейсов, выполнение проверок, smoke, sanity и regression с учётом изменений, выкладка в production, smoke на production и добавление новых кейсов в регрессионный набор.",
      en: "The notes describe the flow as test analysis, checklist creation, test-case preparation, execution, smoke, sanity, and regression testing based on changes, production deployment, production smoke testing, and adding new cases to the regression suite.",
    },
    tags: [
      tag("test-process", "процесс тестирования", "test process"),
      tag("smoke", "smoke", "smoke"),
      tag("sanity", "sanity", "sanity"),
    ],
  }),
  fromStudyNotes({
    rank: 110,
    slug: "goals-of-software-testing",
    difficulty: "junior",
    categorySlug: "testing-theory",
    category: category("Теория тестирования", "Testing theory"),
    title: {
      ru: "Каковы основные цели тестирования?",
      en: "What are the main goals of software testing?",
    },
    summary: {
      ru: "В конспекте цели сформулированы как проверка соответствия требованиям, понимание текущего состояния и качества продукта, ускорение безопасного релиза и обнаружение дефектов раньше пользователей.",
      en: "The notes define the goals as checking conformance to requirements, understanding the current state and quality of the product, enabling faster safe releases, and finding defects before users do.",
    },
    tags: [
      tag("testing-goals", "цели тестирования", "testing goals"),
      tag("quality", "качество", "quality"),
      tag("requirements", "требования", "requirements"),
    ],
  }),
  fromStudyNotes({
    rank: 111,
    slug: "client-server-architecture-components",
    difficulty: "junior",
    categorySlug: "architecture",
    category: category("Архитектура", "Architecture"),
    title: {
      ru: "Из каких компонентов обычно состоит клиент-серверная архитектура?",
      en: "Which components usually make up a client-server architecture?",
    },
    summary: {
      ru: "Конспект выделяет клиент, сервер, backend, базу данных, балансировщики, объектное/облачное хранилище вроде S3 и CDN. Для QA важно понимать путь запроса и место каждого компонента, чтобы локализовать сбои и выбирать уровень проверки.",
      en: "The notes identify the client, server, backend, database, load balancers, object or cloud storage such as S3, and a CDN. QA benefits from understanding the request path and each component's role to localize failures and choose the right test level.",
    },
    tags: [
      tag("client-server", "клиент-сервер", "client-server"),
      tag("load-balancer", "балансировщик", "load balancer"),
      tag("cdn", "CDN", "CDN"),
    ],
  }),
  fromStudyNotes({
    rank: 112,
    slug: "seven-testing-principles",
    difficulty: "junior",
    categorySlug: "testing-theory",
    category: category("Теория тестирования", "Testing theory"),
    title: {
      ru: "Какие ключевые принципы тестирования нужно знать?",
      en: "Which key software-testing principles should a QA engineer know?",
    },
    summary: {
      ru: "Конспект перечисляет раннее тестирование, парадокс пестицида, зависимость тестирования от контекста, скопление дефектов, заблуждение об отсутствии ошибок, принцип «тестирование показывает наличие дефектов, а не их отсутствие» и невозможность исчерпывающего тестирования.",
      en: "The notes cover early testing, the pesticide paradox, context-dependent testing, defect clustering, the absence-of-errors fallacy, the principle that testing shows the presence rather than absence of defects, and the impossibility of exhaustive testing.",
    },
    tags: [
      tag("testing-principles", "принципы тестирования", "testing principles"),
      tag("pesticide-paradox", "парадокс пестицида", "pesticide paradox"),
      tag("defect-clustering", "скопление дефектов", "defect clustering"),
    ],
  }),
  fromStudyNotes({
    rank: 113,
    slug: "error-bug-failure-differences",
    difficulty: "junior",
    categorySlug: "testing-theory",
    category: category("Теория тестирования", "Testing theory"),
    title: {
      ru: "Чем отличаются ошибка, баг и сбой и когда можно зафиксировать баг?",
      en: "How do error, bug, and failure differ, and when can a bug be recorded?",
    },
    summary: {
      ru: "В конспекте ошибка — неправильное действие или решение при разработке, баг — несоответствие фактического поведения ожидаемому, а сбой — нарушение работы системы. Для фиксации бага должны быть известны фактический и ожидаемый результаты и подтверждено, что они различаются.",
      en: "In the notes, an error is an incorrect action or decision during development, a bug is a mismatch between actual and expected behavior, and a failure is a disruption in system operation. To record a bug, the actual and expected results must be known and shown to differ.",
    },
    tags: [
      tag("defects", "дефекты", "defects"),
      tag("expected-result", "ожидаемый результат", "expected result"),
      tag("actual-result", "фактический результат", "actual result"),
    ],
  }),
  fromStudyNotes({
    rank: 114,
    slug: "tls-handshake-and-encryption",
    difficulty: "middle",
    categorySlug: "security",
    category: category("Безопасность", "Security"),
    title: {
      ru: "Как TLS устанавливает защищённое соединение между клиентом и сервером?",
      en: "How does TLS establish a secure connection between a client and a server?",
    },
    summary: {
      ru: "Конспект описывает TLS-handshake как обмен сертификатом и параметрами шифрования, проверку сертификата клиентом и согласование общего сессионного ключа для дальнейшего защищённого обмена. Это учебная упрощённая схема, цель которой — показать переход от установления доверия к симметричному шифрованию сессии.",
      en: "The notes describe the TLS handshake as exchanging a certificate and cryptographic parameters, validating the certificate on the client, and agreeing on a shared session key for subsequent protected communication. It is a simplified learning model intended to show the transition from establishing trust to symmetric session encryption.",
    },
    tags: [
      tag("tls", "TLS", "TLS"),
      tag("https", "HTTPS", "HTTPS"),
      tag("encryption", "шифрование", "encryption"),
    ],
  }),
  fromStudyNotes({
    rank: 115,
    slug: "cookies-and-set-cookie",
    difficulty: "junior",
    categorySlug: "web-platform",
    category: category("Веб-платформа", "Web platform"),
    title: {
      ru: "Чем Cookie отличается от Set-Cookie и какие атрибуты cookie важны?",
      en: "How does Cookie differ from Set-Cookie and which cookie attributes matter?",
    },
    summary: {
      ru: "Cookie — заголовок запроса, через который браузер передаёт сохранённые cookie серверу; Set-Cookie — заголовок ответа, которым сервер просит браузер сохранить или изменить cookie. В конспекте перечислены Name, Value, Expires, Max-Age, Domain, Path, Secure и HttpOnly.",
      en: "Cookie is a request header through which the browser sends stored cookies to the server; Set-Cookie is a response header asking the browser to store or update a cookie. The notes list Name, Value, Expires, Max-Age, Domain, Path, Secure, and HttpOnly as key attributes.",
    },
    tags: [
      tag("cookies", "cookie", "cookies"),
      tag("set-cookie", "Set-Cookie", "Set-Cookie"),
      tag("http-headers", "HTTP-заголовки", "HTTP headers"),
    ],
  }),
  fromStudyNotes({
    rank: 116,
    slug: "api-protocols-styles-and-interaction-models",
    difficulty: "middle",
    categorySlug: "api",
    category: category("API и протоколы", "API and protocols"),
    title: {
      ru: "Чем отличаются HTTP/HTTPS, REST, SOAP, GraphQL, gRPC, Webhook и WebSocket?",
      en: "How do HTTP/HTTPS, REST, SOAP, GraphQL, gRPC, Webhook, and WebSocket differ?",
    },
    summary: {
      ru: "HTTP/HTTPS задают транспорт веб-запросов, REST — архитектурный стиль API, SOAP — протокол со строгой XML-структурой, GraphQL — язык запросов, gRPC — RPC-подход на HTTP/2 с protobuf, Webhook — callback-механизм доставки события, WebSocket — постоянное двунаправленное соединение после upgrade.",
      en: "HTTP/HTTPS define web request transport, REST is an API architectural style, SOAP is a protocol with strict XML structure, GraphQL is a query language, gRPC is an RPC approach over HTTP/2 with protobuf, Webhook is a callback mechanism for delivering events, and WebSocket is a persistent bidirectional connection after an upgrade.",
    },
    tags: [
      tag("api", "API", "API"),
      tag("protocols", "протоколы", "protocols"),
      tag("grpc", "gRPC", "gRPC"),
      tag("websocket", "WebSocket", "WebSocket"),
    ],
  }),
  fromStudyNotes({
    rank: 117,
    slug: "rest-vs-soap",
    difficulty: "junior",
    categorySlug: "api",
    category: category("API и протоколы", "API and protocols"),
    title: {
      ru: "В чём основные различия REST и SOAP?",
      en: "What are the main differences between REST and SOAP?",
    },
    summary: {
      ru: "REST в конспекте рассматривается как более гибкий архитектурный стиль поверх HTTP/HTTPS с разными форматами данных и возможностью HTTP-кэширования. SOAP — протокол с более строгими правилами и XML-сообщениями; его контракт обычно описывается WSDL, а для ручной проверки часто используют SoapUI.",
      en: "The notes present REST as a more flexible architectural style over HTTP/HTTPS that can use multiple data formats and HTTP caching. SOAP is a protocol with stricter rules and XML messages; its contract is commonly described with WSDL and manual checks are often performed with SoapUI.",
    },
    tags: [
      tag("rest", "REST", "REST"),
      tag("soap", "SOAP", "SOAP"),
      tag("wsdl", "WSDL", "WSDL"),
    ],
  }),
  fromStudyNotes({
    rank: 118,
    slug: "http-request-response-methods-headers-statuses",
    difficulty: "middle",
    categorySlug: "api",
    category: category("API и протоколы", "API and protocols"),
    title: {
      ru: "Из чего состоят HTTP-запрос и ответ и что важно знать о методах, заголовках и статус-кодах?",
      en: "What do HTTP requests and responses contain, and what matters about methods, headers, and status codes?",
    },
    summary: {
      ru: "Запрос включает URL, метод, заголовки и при необходимости body; ответ — статус-код, заголовки и body. Конспект разбирает методы GET, POST, PUT, PATCH, DELETE, OPTIONS, TRACE, HEAD и CONNECT, типовые заголовки Content-Type, Authorization, Cookie/Set-Cookie, Cache-Control и классы статусов 1xx–5xx.",
      en: "A request contains a URL, method, headers, and optionally a body; a response contains a status code, headers, and a body. The notes cover GET, POST, PUT, PATCH, DELETE, OPTIONS, TRACE, HEAD, and CONNECT, common headers such as Content-Type, Authorization, Cookie/Set-Cookie, and Cache-Control, plus the 1xx–5xx status-code classes.",
    },
    tags: [
      tag("http", "HTTP", "HTTP"),
      tag("http-methods", "HTTP-методы", "HTTP methods"),
      tag("status-codes", "статус-коды", "status codes"),
      tag("headers", "заголовки", "headers"),
    ],
  }),
  fromStudyNotes({
    rank: 119,
    slug: "json-vs-xml-payload-formats",
    difficulty: "junior",
    categorySlug: "data-formats",
    category: category("Форматы данных", "Data formats"),
    title: {
      ru: "Как выглядят JSON и XML и чем отличаются эти форматы данных?",
      en: "What do JSON and XML look like and how do these data formats differ?",
    },
    summary: {
      ru: "JSON представляет данные через пары ключ-значение, объекты, массивы, числа, строки, boolean и null и обычно передаётся с Content-Type application/json. XML представляет данные вложенными тегами и обычно используется с application/xml; в SOAP XML имеет строгую структуру Envelope, Header и Body.",
      en: "JSON represents data with key-value pairs, objects, arrays, numbers, strings, booleans, and null and is commonly sent as application/json. XML represents data with nested tags and is commonly sent as application/xml; in SOAP, XML follows a strict Envelope, Header, and Body structure.",
    },
    tags: [
      tag("json", "JSON", "JSON"),
      tag("xml", "XML", "XML"),
      tag("payload", "payload", "payload"),
    ],
  }),
  fromStudyNotes({
    rank: 120,
    slug: "test-design-techniques",
    difficulty: "middle",
    categorySlug: "test-design",
    category: category("Тест-дизайн", "Test design"),
    title: {
      ru: "Какие основные техники тест-дизайна применяет QA?",
      en: "Which core test-design techniques does QA use?",
    },
    summary: {
      ru: "Конспект перечисляет классы эквивалентности, анализ граничных значений, pairwise, таблицы принятия решений, переходы состояний, матрицу трассируемости и предугадывание ошибок. Выбор техники зависит от структуры входных данных, количества комбинаций, состояний и рисков продукта.",
      en: "The notes list equivalence partitioning, boundary-value analysis, pairwise testing, decision tables, state transitions, traceability matrices, and error guessing. The choice depends on input structure, the number of combinations, system states, and product risks.",
    },
    tags: [
      tag("equivalence-partitioning", "классы эквивалентности", "equivalence partitioning"),
      tag("boundary-values", "граничные значения", "boundary values"),
      tag("pairwise", "pairwise", "pairwise"),
    ],
  }),
  fromStudyNotes({
    rank: 121,
    slug: "testing-types-levels-and-pyramid",
    difficulty: "middle",
    categorySlug: "testing-theory",
    category: category("Теория тестирования", "Testing theory"),
    title: {
      ru: "Как классифицируют виды и уровни тестирования и где здесь пирамида тестов?",
      en: "How are testing types and levels classified, and where does the test pyramid fit?",
    },
    summary: {
      ru: "Конспект классифицирует проверки по позитивности, функциональности, объёму, доступу к коду, продукту, автоматизации, исполнителям, наличию документации и статике/динамике. По уровням выделяются contract, unit, component, integration, end-to-end, system и acceptance testing.",
      en: "The notes classify testing by positive/negative intent, functionality, scope, code access, product type, automation, performers, documentation availability, and static/dynamic execution. The listed levels include contract, unit, component, integration, end-to-end, system, and acceptance testing.",
    },
    tags: [
      tag("test-levels", "уровни тестирования", "test levels"),
      tag("test-pyramid", "пирамида тестирования", "test pyramid"),
      tag("integration", "интеграционное тестирование", "integration testing"),
    ],
  }),
  fromStudyNotes({
    rank: 122,
    slug: "atomic-vs-scenario-test-cases",
    difficulty: "middle",
    categorySlug: "test-design",
    category: category("Тест-дизайн", "Test design"),
    title: {
      ru: "Чем атомарные тест-кейсы отличаются от сценарных?",
      en: "How do atomic test cases differ from scenario-based cases?",
    },
    summary: {
      ru: "Атомарный кейс проверяет одну функцию или небольшой аспект и содержит точные, однозначные шаги и данные. Сценарный кейс описывает последовательность пользовательских действий через несколько функций ради выполнения целевой задачи и помогает проверять целостный пользовательский поток.",
      en: "An atomic test case checks one function or a small aspect with precise, unambiguous steps and data. A scenario-based case describes a sequence of user actions across multiple functions to achieve a goal and helps validate an end-to-end user flow.",
    },
    tags: [
      tag("test-cases", "тест-кейсы", "test cases"),
      tag("atomic-tests", "атомарные кейсы", "atomic cases"),
      tag("scenarios", "сценарии", "scenarios"),
    ],
  }),
  fromStudyNotes({
    rank: 123,
    slug: "sql-nosql-acid-crud-transactions-and-joins",
    difficulty: "middle",
    categorySlug: "databases",
    category: category("Базы данных", "Databases"),
    title: {
      ru: "Что QA нужно знать про SQL/NoSQL, ACID, CRUD, транзакции и JOIN?",
      en: "What should QA know about SQL/NoSQL, ACID, CRUD, transactions, and JOINs?",
    },
    summary: {
      ru: "Конспект сравнивает реляционные и нереляционные БД, описывает свойства ACID, CRUD и транзакции, перечисляет основные SQL-операторы и виды JOIN: INNER, LEFT, RIGHT, FULL и CROSS. Для тестирования важно понимать связи данных, целостность транзакций и ожидаемый результат запросов.",
      en: "The notes compare relational and non-relational databases, describe ACID, CRUD, and transactions, and list common SQL operations and JOIN types: INNER, LEFT, RIGHT, FULL, and CROSS. For QA, the key is understanding data relationships, transaction integrity, and expected query results.",
    },
    tags: [
      tag("sql", "SQL", "SQL"),
      tag("acid", "ACID", "ACID"),
      tag("crud", "CRUD", "CRUD"),
      tag("joins", "JOIN", "JOINs"),
    ],
  }),
  fromStudyNotes({
    rank: 124,
    slug: "linux-command-line-basics-for-qa",
    difficulty: "junior",
    categorySlug: "qa-tooling",
    category: category("Инструменты QA", "QA tooling"),
    title: {
      ru: "Какие базовые Linux-команды полезны тестировщику?",
      en: "Which basic Linux commands are useful for a QA engineer?",
    },
    summary: {
      ru: "В конспекте перечислены pwd, cd, ls, mkdir, mv, cp, touch, cat, head, tail, grep, env, echo, export, sudo, tee и scp. Они покрывают навигацию по файловой системе, работу с файлами, чтение и поиск логов, переменные окружения, повышение прав и копирование файлов между машинами.",
      en: "The notes list pwd, cd, ls, mkdir, mv, cp, touch, cat, head, tail, grep, env, echo, export, sudo, tee, and scp. Together they cover filesystem navigation, file operations, log reading and search, environment variables, privilege elevation, and copying files between machines.",
    },
    tags: [
      tag("linux", "Linux", "Linux"),
      tag("cli", "командная строка", "CLI"),
      tag("logs", "логи", "logs"),
    ],
  }),
  fromStudyNotes({
    rank: 125,
    slug: "postman-variable-scopes",
    difficulty: "middle",
    categorySlug: "api",
    category: category("API и протоколы", "API and protocols"),
    title: {
      ru: "Какие области видимости переменных есть в Postman?",
      en: "Which variable scopes are available in Postman?",
    },
    summary: {
      ru: "Конспект выделяет глобальные переменные, переменные коллекции, окружения, data-переменные из CSV/JSON, локальные и динамические переменные. Область видимости определяет, где значение доступно и сохраняется ли оно между запросами и запусками.",
      en: "The notes distinguish global, collection, environment, data variables loaded from CSV/JSON, local variables, and dynamic variables. Scope determines where a value is available and whether it persists across requests and runs.",
    },
    tags: [
      tag("postman", "Postman", "Postman"),
      tag("variables", "переменные", "variables"),
      tag("api-testing", "тестирование API", "API testing"),
    ],
  }),
  fromStudyNotes({
    rank: 126,
    slug: "message-brokers-and-asynchronous-communication",
    difficulty: "middle",
    categorySlug: "architecture",
    category: category("Архитектура", "Architecture"),
    title: {
      ru: "Что такое брокер сообщений и зачем нужны Kafka, RabbitMQ или Artemis MQ?",
      en: "What is a message broker and why are Kafka, RabbitMQ, or Artemis MQ used?",
    },
    summary: {
      ru: "Брокер сообщений связывает producer и consumer и обеспечивает обмен сообщениями между приложениями или модулями. Конспект подчёркивает асинхронность: отправляющий сервис может передать сообщение и продолжить работу, не блокируясь в ожидании ответа получателя.",
      en: "A message broker connects producers and consumers and enables message exchange between applications or modules. The notes emphasize asynchronous communication: a sending service can publish a message and continue working without blocking while it waits for the receiver.",
    },
    tags: [
      tag("message-broker", "брокеры сообщений", "message brokers"),
      tag("kafka", "Kafka", "Kafka"),
      tag("rabbitmq", "RabbitMQ", "RabbitMQ"),
      tag("async", "асинхронность", "asynchronous"),
    ],
  }),
  fromStudyNotes({
    rank: 127,
    slug: "top-down-bottom-up-big-bang-testing-strategies",
    difficulty: "middle",
    categorySlug: "test-design",
    category: category("Тест-дизайн", "Test design"),
    title: {
      ru: "Чем отличаются стратегии интеграционного тестирования сверху-вниз, снизу-вверх и Big Bang?",
      en: "How do top-down, bottom-up, and Big Bang integration-testing strategies differ?",
    },
    summary: {
      ru: "В конспекте перечислены три стратегии: сверху-вниз, снизу-вверх и большой взрыв. Их различие — в порядке объединения и проверки компонентов: от верхних уровней к нижним, от нижних к верхним либо одновременная интеграция большого набора компонентов.",
      en: "The notes list three strategies: top-down, bottom-up, and Big Bang. They differ in the order components are integrated and tested: from higher layers downward, from lower layers upward, or by integrating a large set of components at once.",
    },
    tags: [
      tag("integration-testing", "интеграционное тестирование", "integration testing"),
      tag("top-down", "сверху-вниз", "top-down"),
      tag("big-bang", "Big Bang", "Big Bang"),
    ],
  }),
  fromStudyNotes({
    rank: 128,
    slug: "symmetric-vs-asymmetric-encryption",
    difficulty: "middle",
    categorySlug: "security",
    category: category("Безопасность", "Security"),
    title: {
      ru: "Чем симметричное шифрование отличается от асимметричного?",
      en: "How does symmetric encryption differ from asymmetric encryption?",
    },
    summary: {
      ru: "В симметричном шифровании один общий ключ используется для шифрования и расшифрования данных; в асимметричном применяется пара публичного и приватного ключей. Конспект связывает сессионный ключ с быстрым симметричным обменом, а публичный/приватный ключи — с установлением доверия и безопасным обменом ключевой информацией.",
      en: "Symmetric encryption uses one shared key to encrypt and decrypt data, while asymmetric encryption uses a public/private key pair. The notes associate a session key with efficient symmetric communication and public/private keys with establishing trust and securely exchanging key material.",
    },
    tags: [
      tag("encryption", "шифрование", "encryption"),
      tag("symmetric", "симметричное", "symmetric"),
      tag("asymmetric", "асимметричное", "asymmetric"),
    ],
  }),
];
