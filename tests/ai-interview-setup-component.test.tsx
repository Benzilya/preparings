import assert from "node:assert/strict";
import test from "node:test";

import globalJsdom from "global-jsdom";
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";

import { interviewSessionStorageKey } from "@/features/run-ai-interview";

async function renderSetup() {
  const cleanupDom = globalJsdom(undefined, { url: "http://localhost/interview" });
  window.localStorage.clear();
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  const { InterviewSetup } = await import("@/features/run-ai-interview");

  await act(async () => {
    root.render(React.createElement(InterviewSetup));
  });

  return {
    container,
    cleanup() {
      act(() => root.unmount());
      container.remove();
      cleanupDom();
    },
  };
}

function selectByLabel(container: HTMLElement, label: string): HTMLSelectElement {
  const element = [...container.querySelectorAll("select")].find(
    (select) => select.getAttribute("aria-label") === label,
  );
  assert.ok(element instanceof HTMLSelectElement, `select not found: ${label}`);
  return element;
}

test("AI interview setup is Russian-first and persists a real session", async () => {
  const view = await renderSetup();
  try {
    assert.match(view.container.textContent ?? "", /Настройте адаптивное QA-интервью/);
    assert.match(view.container.textContent ?? "", /Структурированное \+ адаптивное/);

    const count = selectByLabel(view.container, "Количество вопросов");
    await act(async () => {
      count.value = "5";
      count.dispatchEvent(new window.Event("change", { bubbles: true }));
    });

    const button = [...view.container.querySelectorAll("button")].find((item) =>
      item.textContent?.includes("Подготовить интервью"),
    );
    assert.ok(button instanceof HTMLButtonElement);
    assert.equal(button.disabled, false);

    await act(async () => {
      button.click();
    });

    const raw = window.localStorage.getItem(interviewSessionStorageKey);
    assert.ok(raw);
    const session = JSON.parse(raw) as {
      status: string;
      config: { language: string; difficulty: string; questionCount: number; mode: string };
      questionIds: string[];
    };
    assert.equal(session.status, "idle");
    assert.equal(session.config.language, "ru");
    assert.equal(session.config.difficulty, "middle");
    assert.equal(session.config.questionCount, 5);
    assert.equal(session.config.mode, "structured-adaptive");
    assert.equal(session.questionIds.length, 5);
    assert.match(view.container.textContent ?? "", /Сессия подготовлена/);
  } finally {
    view.cleanup();
  }
});

test("AI interview setup follows saved English interface language", async () => {
  const cleanupDom = globalJsdom(undefined, { url: "http://localhost/interview" });
  try {
    window.localStorage.setItem(
      "qa-interview-trainer:settings:v1",
      JSON.stringify({ language: "en", catalogDensity: "comfortable", showExplanations: true }),
    );
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);
    const { InterviewSetup } = await import("@/features/run-ai-interview");

    await act(async () => {
      root.render(React.createElement(InterviewSetup));
    });

    assert.match(container.textContent ?? "", /Configure an adaptive QA interview/);
    assert.match(container.textContent ?? "", /Structured \+ adaptive/);
    assert.equal(selectByLabel(container, "Interview language").value, "en");
    act(() => root.unmount());
    container.remove();
  } finally {
    cleanupDom();
  }
});
