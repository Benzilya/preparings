import assert from "node:assert/strict";
import test from "node:test";
import globalJsdom from "global-jsdom";

import { createInterviewSession } from "../src/entities/interview-session";
import {
  interviewSessionChangedEvent,
  interviewSessionStorage,
  interviewSessionStorageKey,
} from "../src/features/run-ai-interview";

test("persists restores and clears the current AI interview session", () => {
  const cleanup = globalJsdom(undefined, { url: "http://localhost" });

  try {
    const session = createInterviewSession({
      id: "session-storage",
      config: {
        language: "en",
        difficulty: "senior",
        mode: "structured-adaptive",
        questionCount: 1,
        categorySlugs: ["api"],
      },
      questionIds: ["question-42"],
      now: "2026-08-11T00:00:00.000Z",
    });
    let changeEvents = 0;
    window.addEventListener(interviewSessionChangedEvent, () => {
      changeEvents += 1;
    });

    interviewSessionStorage.write(session);

    assert.equal(window.localStorage.getItem(interviewSessionStorageKey) !== null, true);
    assert.deepEqual(interviewSessionStorage.read(), session);

    interviewSessionStorage.clear();

    assert.equal(interviewSessionStorage.read(), null);
    assert.equal(changeEvents, 2);
  } finally {
    cleanup();
  }
});

test("returns null for invalid or corrupted stored interview data", () => {
  const cleanup = globalJsdom(undefined, { url: "http://localhost" });

  try {
    window.localStorage.setItem(interviewSessionStorageKey, "not-json");
    assert.equal(interviewSessionStorage.read(), null);

    window.localStorage.setItem(interviewSessionStorageKey, JSON.stringify({ status: "running" }));
    assert.equal(interviewSessionStorage.read(), null);
  } finally {
    cleanup();
  }
});
