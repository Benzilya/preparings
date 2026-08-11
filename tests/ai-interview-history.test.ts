import assert from "node:assert/strict";
import test from "node:test";

import globalJsdom from "global-jsdom";

import type { InterviewSession } from "../src/entities/interview-session";
import {
  interviewHistoryStorage,
  interviewHistoryStorageKey,
} from "../src/features/run-ai-interview/model/history-storage";

function completedSession(id: string, completedAt: string): InterviewSession {
  return {
    id,
    status: "completed",
    config: {
      language: "ru",
      difficulty: "middle",
      mode: "structured-adaptive",
      questionCount: 1,
      categorySlugs: [],
    },
    questionIds: ["q-1"],
    currentQuestionIndex: 0,
    createdAt: completedAt,
    updatedAt: completedAt,
    completedAt,
    turns: [],
  };
}

test("completed interviews are persisted, deduplicated and sorted newest first", () => {
  const cleanup = globalJsdom(undefined, { url: "http://localhost" });
  try {
    window.localStorage.clear();
    interviewHistoryStorage.save(completedSession("older", "2026-08-11T00:00:00.000Z"));
    interviewHistoryStorage.save(completedSession("newer", "2026-08-11T01:00:00.000Z"));
    interviewHistoryStorage.save(completedSession("older", "2026-08-11T02:00:00.000Z"));

    const history = interviewHistoryStorage.read();
    assert.deepEqual(
      history.map((session) => session.id),
      ["older", "newer"],
    );
    assert.equal(history[0]?.completedAt, "2026-08-11T02:00:00.000Z");
  } finally {
    cleanup();
  }
});

test("history ignores corrupted payloads and can be cleared independently", () => {
  const cleanup = globalJsdom(undefined, { url: "http://localhost" });
  try {
    window.localStorage.setItem(interviewHistoryStorageKey, "not-json");
    assert.deepEqual(interviewHistoryStorage.read(), []);

    interviewHistoryStorage.save(completedSession("session", "2026-08-11T00:00:00.000Z"));
    assert.equal(interviewHistoryStorage.read().length, 1);
    interviewHistoryStorage.clear();
    assert.deepEqual(interviewHistoryStorage.read(), []);
  } finally {
    cleanup();
  }
});
