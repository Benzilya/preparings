import assert from "node:assert/strict";
import test from "node:test";

import globalJsdom from "global-jsdom";
import React, { act } from "react";
import { createRoot } from "react-dom/client";

import { questionLibraryQuestions } from "../content/questions";
import { createInterviewSession } from "../src/entities/interview-session";
import { localizeQuestion } from "../src/entities/question";
import { interviewSessionStorageKey } from "../src/features/run-ai-interview";

test("interview experience restores a prepared session and starts the live runner", async () => {
  const cleanupDom = globalJsdom(undefined, { url: "http://localhost/interview" });
  try {
    const selectedQuestions = questionLibraryQuestions.slice(0, 2);
    const prepared = createInterviewSession({
      id: "restored-session",
      config: {
        language: "ru",
        difficulty: selectedQuestions[0]!.difficulty,
        mode: "structured-adaptive",
        questionCount: 2,
        categorySlugs: [],
        durationMinutes: 15,
      },
      questionIds: selectedQuestions.map((question) => question.id),
      now: "2026-08-11T00:00:00.000Z",
    });
    window.localStorage.setItem(interviewSessionStorageKey, JSON.stringify(prepared));

    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);
    const { InterviewExperience } = await import("../src/features/run-ai-interview");

    await act(async () => {
      root.render(React.createElement(InterviewExperience));
    });

    await act(async () => Promise.resolve());

    const firstTitle = localizeQuestion(selectedQuestions[0]!, "ru").title;
    assert.match(container.textContent ?? "", /Прохождение интервью/);
    assert.match(
      container.textContent ?? "",
      new RegExp(firstTitle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")),
    );
    assert.match(container.textContent ?? "", /Вопрос 1 из 2/);

    const startButton = [...container.querySelectorAll("button")].find((button) =>
      button.textContent?.includes("Начать интервью"),
    );
    assert.ok(startButton instanceof HTMLButtonElement);

    await act(async () => {
      startButton.click();
    });

    const stored = JSON.parse(
      window.localStorage.getItem(interviewSessionStorageKey) ?? "null",
    ) as {
      status: string;
      turns: { questionId: string }[];
    };
    assert.equal(stored.status, "running");
    assert.equal(stored.turns[0]?.questionId, selectedQuestions[0]!.id);
    assert.ok(container.querySelector("textarea"));

    act(() => root.unmount());
    container.remove();
  } finally {
    cleanupDom();
  }
});
