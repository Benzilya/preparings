import { validateQuestions } from "@/entities/question/model/validate-question";

const records = [
  {
    id: "q-testing-pyramid",
    slug: "testing-pyramid",
    title: "What is the testing pyramid and when does it fail?",
    category: "Test Strategy",
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
] as const;

export const seedQuestions = validateQuestions(records);
