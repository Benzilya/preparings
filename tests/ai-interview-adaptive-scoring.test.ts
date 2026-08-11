import assert from "node:assert/strict";
import test from "node:test";

import type { InterviewSession } from "../src/entities/interview-session";
import { summarizeInterviewSessionScores } from "../src/entities/interview-session";
import { enforceAdaptiveDecisionLimit } from "../src/features/run-ai-interview/model/ai-evaluation";

const session: InterviewSession = {
  id: "session-score-test",
  status: "running",
  config: {
    language: "ru",
    difficulty: "middle",
    mode: "structured-adaptive",
    questionCount: 2,
    categorySlugs: [],
  },
  questionIds: ["q-1", "q-2"],
  currentQuestionIndex: 1,
  createdAt: "2026-08-11T00:00:00.000Z",
  updatedAt: "2026-08-11T00:02:00.000Z",
  turns: [
    {
      id: "turn-1",
      kind: "question",
      questionId: "q-1",
      prompt: "Question 1",
      answer: "Answer 1",
      createdAt: "2026-08-11T00:00:00.000Z",
      answeredAt: "2026-08-11T00:01:00.000Z",
      feedback: {
        score: { correctness: 80, completeness: 60, clarity: 70, depth: 50, total: 65 },
        strengths: [],
        gaps: [],
        summary: "ok",
        decision: "next-question",
      },
    },
    {
      id: "turn-2",
      kind: "question",
      questionId: "q-2",
      prompt: "Question 2",
      answer: "Answer 2",
      createdAt: "2026-08-11T00:01:00.000Z",
      answeredAt: "2026-08-11T00:02:00.000Z",
      feedback: {
        score: { correctness: 60, completeness: 80, clarity: 90, depth: 70, total: 75 },
        strengths: [],
        gaps: [],
        summary: "ok",
        decision: "next-question",
      },
    },
  ],
};

test("session scoring averages every evaluated turn", () => {
  assert.deepEqual(summarizeInterviewSessionScores(session), {
    answeredTurns: 2,
    total: 70,
    correctness: 70,
    completeness: 70,
    clarity: 80,
    depth: 60,
  });
});

test("adaptive guard prevents a provider from asking a second follow-up", () => {
  const evaluation = enforceAdaptiveDecisionLimit(
    {
      feedback: {
        score: { correctness: 30, completeness: 30, clarity: 40, depth: 20, total: 30 },
        strengths: [],
        gaps: ["Missing detail"],
        summary: "Weak answer",
        decision: "follow-up",
      },
      followUpPrompt: "Another follow-up",
    },
    { followUpCount: 1, isLastQuestion: false },
  );

  assert.equal(evaluation.feedback.decision, "next-question");
  assert.equal(evaluation.followUpPrompt, undefined);
});

test("adaptive guard completes the final question after the follow-up allowance is exhausted", () => {
  const evaluation = enforceAdaptiveDecisionLimit(
    {
      feedback: {
        score: { correctness: 30, completeness: 30, clarity: 40, depth: 20, total: 30 },
        strengths: [],
        gaps: ["Missing detail"],
        summary: "Weak answer",
        decision: "follow-up",
      },
      followUpPrompt: "Another follow-up",
    },
    { followUpCount: 1, isLastQuestion: true },
  );

  assert.equal(evaluation.feedback.decision, "complete");
  assert.equal(evaluation.followUpPrompt, undefined);
});
