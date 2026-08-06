import assert from "node:assert/strict";
import { after, afterEach, before, test } from "node:test";

import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import globalJsdom from "global-jsdom";

import { QuestionProgressControls } from "../src/features/track-question-progress/ui/question-progress-controls";

let cleanupDom: () => void;

before(() => {
  cleanupDom = globalJsdom(undefined, { url: "http://localhost/questions/testing-pyramid" });
});

afterEach(() => {
  cleanup();
  window.localStorage.clear();
});

after(() => cleanupDom());

test("Question progress controls persist status and favorite state", async () => {
  const user = userEvent.setup();
  render(<QuestionProgressControls questionId="q-testing-pyramid" />);

  const status = screen.getByLabelText(/Question status/) as HTMLSelectElement;
  await user.selectOptions(status, "completed");
  await user.click(screen.getByRole("button", { name: /Add favorite/ }));

  await waitFor(() => {
    assert.equal(status.value, "completed");
    assert.ok(screen.getByRole("button", { name: /Favorite/ }));
  });

  const stored = window.localStorage.getItem("qa-interview-trainer:question-progress:v1");
  assert.ok(stored);
  assert.deepEqual(JSON.parse(stored), [
    {
      questionId: "q-testing-pyramid",
      status: "completed",
      favorite: true,
      updatedAt: JSON.parse(stored)[0].updatedAt,
    },
  ]);
});

test("Question progress controls restore an existing local record", async () => {
  window.localStorage.setItem(
    "qa-interview-trainer:question-progress:v1",
    JSON.stringify([
      {
        questionId: "q-flaky-tests",
        status: "learning",
        favorite: true,
        updatedAt: "2026-08-06T12:00:00.000Z",
      },
    ]),
  );

  render(<QuestionProgressControls questionId="q-flaky-tests" />);

  await waitFor(() => {
    assert.equal((screen.getByLabelText(/Question status/) as HTMLSelectElement).value, "learning");
    assert.ok(screen.getByRole("button", { name: /Favorite/ }));
  });
});
