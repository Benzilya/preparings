import assert from "node:assert/strict";
import test from "node:test";

import {
  answerInterviewTurn,
  appendInterviewTurn,
  completeInterviewSession,
  createInterviewSession,
  startInterviewSession,
  type InterviewFeedback,
} from "../src/entities/interview-session";

const config = {
  language: "ru" as const,
  difficulty: "middle" as const,
  mode: "structured-adaptive" as const,
  questionCount: 2,
  categorySlugs: ["api"],
  durationMinutes: 20,
};

const feedback: InterviewFeedback = {
  score: {
    correctness: 85,
    completeness: 70,
    clarity: 90,
    depth: 65,
    total: 78,
  },
  strengths: ["Корректно объяснена основная идея"],
  gaps: ["Не упомянут негативный сценарий"],
  summary: "Ответ верный, но его можно углубить.",
  decision: "next-question",
};

test("creates a stable idle interview session from selected question ids", () => {
  const session = createInterviewSession({
    id: "session-1",
    config,
    questionIds: ["question-1", "question-2", "question-3"],
    now: "2026-08-11T00:00:00.000Z",
  });

  assert.equal(session.status, "idle");
  assert.deepEqual(session.questionIds, ["question-1", "question-2"]);
  assert.equal(session.currentQuestionIndex, 0);
  assert.deepEqual(session.turns, []);
});

test("runs the interview lifecycle without changing stable question ids", () => {
  const idle = createInterviewSession({
    id: "session-2",
    config,
    questionIds: ["question-1", "question-2"],
    now: "2026-08-11T00:00:00.000Z",
  });
  const running = startInterviewSession(idle, "2026-08-11T00:01:00.000Z");
  const withTurn = appendInterviewTurn(running, {
    id: "turn-1",
    kind: "question",
    questionId: "question-1",
    prompt: "Что такое REST?",
    now: "2026-08-11T00:02:00.000Z",
  });
  const answered = answerInterviewTurn(withTurn, {
    turnId: "turn-1",
    answer: "REST — архитектурный стиль.",
    feedback,
    now: "2026-08-11T00:03:00.000Z",
  });
  const completed = completeInterviewSession(answered, "2026-08-11T00:10:00.000Z");

  assert.equal(running.status, "running");
  assert.equal(answered.turns[0]?.questionId, "question-1");
  assert.equal(answered.turns[0]?.feedback?.score.total, 78);
  assert.equal(answered.currentQuestionIndex, 1);
  assert.equal(completed.status, "completed");
  assert.equal(completed.completedAt, "2026-08-11T00:10:00.000Z");
});

test("keeps the same question index when adaptive feedback requests a follow-up", () => {
  const running = startInterviewSession(
    createInterviewSession({
      id: "session-3",
      config,
      questionIds: ["question-1", "question-2"],
      now: "2026-08-11T00:00:00.000Z",
    }),
    "2026-08-11T00:01:00.000Z",
  );
  const withTurn = appendInterviewTurn(running, {
    id: "turn-1",
    kind: "question",
    questionId: "question-1",
    prompt: "Объясните HTTP status codes.",
    now: "2026-08-11T00:02:00.000Z",
  });
  const answered = answerInterviewTurn(withTurn, {
    turnId: "turn-1",
    answer: "2xx — успешные ответы.",
    feedback: { ...feedback, decision: "follow-up" },
    now: "2026-08-11T00:03:00.000Z",
  });

  assert.equal(answered.currentQuestionIndex, 0);
});

test("rejects invalid empty interview sessions", () => {
  assert.throws(
    () =>
      createInterviewSession({
        id: "session-empty",
        config: { ...config, questionCount: 1 },
        questionIds: [],
        now: "2026-08-11T00:00:00.000Z",
      }),
    /at least one question/,
  );
});
