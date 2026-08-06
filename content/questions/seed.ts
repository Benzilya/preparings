import { validateQuestions } from "@/entities/question/model/validate-question";

const records = [
  {
    id: "q-testing-pyramid",
    slug: "testing-pyramid",
    title: "What is the testing pyramid and when does it fail?",
    category: "Test Strategy",
    categorySlug: "test-strategy",
    tags: ["strategy", "automation", "test-levels"],
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
    explanation:
      "The testing pyramid is a feedback and cost model: many fast focused tests, fewer service-level tests, and a small number of expensive end-to-end tests.",
    interviewerGoal:
      "Check whether the candidate can choose test levels by risk, feedback speed, and maintenance cost rather than repeat a diagram.",
    expectedAnswer:
      "Explain the trade-offs, name contexts where the shape changes, and connect the model to product architecture and release risk.",
    alternativeAnswers: ["Testing trophy", "Risk-based test portfolio"],
    answerExamples: [
      { level: "junior", answer: "Most tests should be fast unit tests, with fewer UI tests." },
      {
        level: "middle",
        answer:
          "The pyramid optimizes feedback and maintenance, but service-heavy systems may need more integration tests.",
      },
      {
        level: "senior",
        answer:
          "I treat it as a portfolio constraint and tune the shape using failure cost, observability, architecture, and deployment frequency.",
      },
    ],
    mistakes: [
      "Treating the pyramid as a fixed percentage",
      "Ignoring contract and integration tests",
    ],
    followUpQuestions: [
      "How would you test a microservice boundary?",
      "What belongs in an end-to-end test?",
    ],
    relatedTopics: ["contract testing", "test strategy", "CI feedback"],
    practicalExample:
      "Use unit tests for pricing rules, API integration tests for checkout, and a few browser tests for the critical purchase path.",
    updatedAt: "2026-08-06",
  },
  {
    id: "q-flaky-tests",
    slug: "flaky-tests-investigation",
    title: "How do you investigate and reduce flaky tests?",
    category: "Test Reliability",
    categorySlug: "test-reliability",
    tags: ["flaky-tests", "ci", "debugging"],
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
    explanation:
      "Flakiness is nondeterministic test behaviour caused by timing, shared state, data, infrastructure, external dependencies, or product races.",
    interviewerGoal:
      "Evaluate whether the candidate uses evidence, classification, ownership, and prevention instead of blind retries.",
    expectedAnswer:
      "Describe reproduction, telemetry, failure classification, quarantine policy, root-cause fixes, and reliability metrics.",
    alternativeAnswers: ["Failure clustering by signature", "Deterministic test design"],
    answerExamples: [
      { level: "junior", answer: "Re-run the test, inspect logs, and remove fixed sleeps." },
      {
        level: "middle",
        answer:
          "Capture artifacts, classify timing or state issues, isolate dependencies, and replace retries with explicit conditions.",
      },
      {
        level: "senior",
        answer:
          "Track flake rate by owner and signature, quarantine with expiry, fix systemic causes, and make suite reliability a release metric.",
      },
    ],
    mistakes: ["Adding retries without diagnosis", "Deleting tests without replacing coverage"],
    followUpQuestions: ["When is quarantine acceptable?", "Which metrics show suite health?"],
    relatedTopics: ["observability", "test isolation", "CI reliability"],
    practicalExample:
      "Replace a fixed two-second delay with polling on an observable state transition and attach traces on timeout.",
    updatedAt: "2026-08-06",
  },
  {
    id: "q-api-contract-testing",
    slug: "api-contract-testing",
    title: "How do contract tests protect service integrations?",
    category: "API Testing",
    categorySlug: "api-testing",
    tags: ["api", "contracts", "microservices"],
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
    explanation:
      "Contract tests verify that providers and consumers agree on request and response shapes without requiring a full end-to-end environment.",
    interviewerGoal:
      "Check whether the candidate can separate schema compatibility from provider behaviour and end-to-end business validation.",
    expectedAnswer:
      "Describe consumer and provider responsibilities, versioning, CI integration, and the limits of contract tests.",
    alternativeAnswers: ["Schema compatibility testing", "Provider verification"],
    answerExamples: [
      { level: "junior", answer: "A contract test checks that an API response has the fields a client expects." },
      { level: "middle", answer: "Consumers publish expectations and providers verify them in CI before release." },
      { level: "senior", answer: "Contracts reduce integration risk, but they do not replace workflow, resilience, or production monitoring tests." },
    ],
    mistakes: ["Treating contracts as full business-flow tests", "Ignoring backward compatibility"],
    followUpQuestions: ["Who owns a broken contract?", "How do you version optional fields?"],
    relatedTopics: ["OpenAPI", "schema evolution", "microservices"],
    practicalExample:
      "A checkout client publishes the response fields it consumes, and the pricing service verifies that contract on every change.",
    updatedAt: "2026-08-06",
  },
  {
    id: "q-browser-locators",
    slug: "resilient-browser-locators",
    title: "What makes a browser-test locator resilient?",
    category: "UI Automation",
    categorySlug: "ui-automation",
    tags: ["playwright", "selectors", "accessibility"],
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
    explanation:
      "Resilient locators express user-visible meaning and avoid coupling tests to implementation details such as generated classes or DOM depth.",
    interviewerGoal:
      "Assess whether the candidate prioritizes roles, labels, stable test IDs, and clear ownership of selectors.",
    expectedAnswer:
      "Prefer accessible roles and labels, use dedicated IDs when semantics are insufficient, and avoid brittle CSS or XPath chains.",
    alternativeAnswers: ["Semantic selectors", "Accessibility-first locators"],
    answerExamples: [
      { level: "junior", answer: "Use a role, label, or stable test ID instead of a long CSS selector." },
      { level: "middle", answer: "Choose selectors that match how users perceive the UI and fail clearly when semantics change." },
      { level: "senior", answer: "Treat locator strategy as a product contract shared by developers, testers, and accessibility requirements." },
    ],
    mistakes: ["Selecting by generated CSS classes", "Using nth-child for business elements"],
    followUpQuestions: ["When is a test ID appropriate?", "How do locators support accessibility?"],
    relatedTopics: ["Playwright", "accessibility", "page objects"],
    practicalExample:
      "Locate the submit action by button role and accessible name rather than by its position inside a form.",
    updatedAt: "2026-08-06",
  },
  {
    id: "q-risk-based-testing",
    slug: "risk-based-testing",
    title: "How do you prioritize testing when time is limited?",
    category: "Test Strategy",
    categorySlug: "test-strategy",
    tags: ["risk", "prioritization", "release"],
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
    explanation:
      "Risk-based testing allocates effort according to failure probability, user impact, change scope, detectability, and recovery cost.",
    interviewerGoal:
      "Evaluate whether the candidate can make transparent trade-offs instead of attempting uniform coverage.",
    expectedAnswer:
      "Explain a repeatable risk model, involve stakeholders, select matching test techniques, and revisit priorities as evidence changes.",
    alternativeAnswers: ["Impact-probability matrix", "Critical-path prioritization"],
    answerExamples: [
      { level: "junior", answer: "Test the most important and recently changed user flows first." },
      { level: "middle", answer: "Rank features by impact and likelihood, then cover critical risks with the fastest useful tests." },
      { level: "senior", answer: "Make risk assumptions explicit, connect them to observability and rollback options, and update them continuously." },
    ],
    mistakes: ["Equating risk with code coverage", "Ignoring operational recovery"],
    followUpQuestions: ["How do you quantify impact?", "When should a release be blocked?"],
    relatedTopics: ["release strategy", "exploratory testing", "observability"],
    practicalExample:
      "Prioritize payment authorization and data integrity over cosmetic regressions when validating an urgent checkout release.",
    updatedAt: "2026-08-06",
  },
  {
    id: "q-test-data-management",
    slug: "test-data-management",
    title: "How do you design reliable test data?",
    category: "Test Reliability",
    categorySlug: "test-reliability",
    tags: ["test-data", "isolation", "privacy"],
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
    explanation:
      "Reliable test data is isolated, minimal, reproducible, privacy-safe, and created close to the test that owns it.",
    interviewerGoal:
      "Check whether the candidate understands factories, cleanup, parallel execution, and production-data constraints.",
    expectedAnswer:
      "Describe deterministic setup, unique ownership, safe synthetic data, cleanup strategy, and support for parallel runs.",
    alternativeAnswers: ["Data factories", "Ephemeral fixtures"],
    answerExamples: [
      { level: "junior", answer: "Create only the data a test needs and clean it up afterward." },
      { level: "middle", answer: "Use factories with unique identifiers so tests can run independently and in parallel." },
      { level: "senior", answer: "Design data lifecycle, privacy controls, environment seeding, and observability as one reliability system." },
    ],
    mistakes: ["Sharing mutable fixtures between tests", "Copying sensitive production data"],
    followUpQuestions: ["How do you test migrations?", "When is database reset acceptable?"],
    relatedTopics: ["parallel tests", "privacy", "database testing"],
    practicalExample:
      "A test creates a uniquely named customer through an API factory and deletes it through a controlled teardown path.",
    updatedAt: "2026-08-06",
  },
] as const;

export const seedQuestions = validateQuestions(records);
