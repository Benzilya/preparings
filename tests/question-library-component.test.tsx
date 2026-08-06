import assert from "node:assert/strict";
import { after, afterEach, before, test } from "node:test";

import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import globalJsdom from "global-jsdom";

import { seedQuestions } from "../content/questions/seed";
import { QuestionLibrary } from "../src/features/filter-questions/ui/question-library";

let cleanupDom: () => void;

before(() => {
  cleanupDom = globalJsdom(undefined, { url: "http://localhost/questions" });
});

afterEach(() => {
  cleanup();
  window.localStorage.clear();
});

after(() => cleanupDom());

test("Question Library filters questions by search and difficulty", async () => {
  const user = userEvent.setup();
  render(<QuestionLibrary questions={seedQuestions} />);

  await user.type(screen.getByLabelText(/Search questions/), "flaky");
  assert.ok(screen.getByText("How do you investigate and reduce flaky tests?"));
  assert.equal(screen.queryByText("What is the testing pyramid and when does it fail?"), null);

  await user.clear(screen.getByLabelText(/Search questions/));
  await user.selectOptions(screen.getByLabelText(/Level/), "junior");

  const resultCount = screen.getByText(/of 6 questions/);
  assert.match(resultCount.textContent ?? "", /^2 of 6/);
});

test("Question Library exposes an empty state and resets filters", async () => {
  const user = userEvent.setup();
  render(<QuestionLibrary questions={seedQuestions} />);

  await user.type(screen.getByLabelText(/Search questions/), "topic-that-does-not-exist");
  assert.ok(screen.getByText(/No questions found/));

  const resetButtons = screen.getAllByRole("button", { name: /Reset filters/ });
  await user.click(resetButtons.at(-1)!);

  assert.equal(screen.queryByText(/No questions found/), null);
  assert.ok(screen.getByText("What is the testing pyramid and when does it fail?"));
});
