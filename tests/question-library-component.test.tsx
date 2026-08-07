import assert from "node:assert/strict";
import { after, afterEach, before, test } from "node:test";

import { act, cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import globalJsdom from "global-jsdom";
import React from "react";

import { seedQuestions } from "../content/questions/seed";
import { QuestionLibrary } from "../src/features/filter-questions/ui/question-library";
import { writeSettings } from "../src/features/manage-settings/model/settings";

let cleanupDom: () => void;

before(() => {
  cleanupDom = globalJsdom(undefined, { url: "http://localhost/questions" });
});

afterEach(async () => {
  cleanup();
  await new Promise((resolve) => setTimeout(resolve, 0));
  window.localStorage.clear();
  document.documentElement.lang = "ru";
});

after(() => cleanupDom());

test("Question Library uses Russian by default and searches Russian content", () => {
  const view = render(<QuestionLibrary questions={seedQuestions} />);

  const search = view.getByLabelText("Поиск вопросов");
  fireEvent.input(search, { target: { value: "нестабильные" } });
  assert.ok(view.getByText("Как исследовать и сокращать нестабильные тесты?"));
  assert.equal(view.queryByText("What is the testing pyramid and when does it fail?"), null);

  fireEvent.input(search, { target: { value: "" } });
  fireEvent.change(view.getByLabelText("Уровень"), { target: { value: "junior" } });
  assert.match(view.getByText(/1 \/ 1 \/ 6 вопросов/).textContent ?? "", /^1 \/ 1 \/ 6/);
});

test("Question Library switches to English without reload and searches English content", async () => {
  const view = render(<QuestionLibrary questions={seedQuestions} />);

  act(() => {
    writeSettings({ language: "en", catalogDensity: "comfortable", showExplanations: true });
  });

  const search = await view.findByLabelText("Search questions");
  fireEvent.input(search, { target: { value: "contract tests" } });
  assert.ok(view.getByText("How do contract tests protect service integrations?"));
  assert.equal(view.queryByText("Как контрактные тесты защищают интеграции сервисов?"), null);
});

test("Question Library exposes a localized empty state and resets filters", async () => {
  const view = render(<QuestionLibrary questions={seedQuestions} />);

  fireEvent.input(view.getByLabelText("Поиск вопросов"), {
    target: { value: "несуществующая-тема" },
  });

  await waitFor(() => {
    assert.ok(view.getByText("Вопросы не найдены"));
  });

  const resetButtons = view.getAllByRole("button", { name: "Сбросить фильтры" });
  fireEvent.click(resetButtons.at(-1)!);

  await waitFor(() => {
    assert.equal(view.queryByText("Вопросы не найдены"), null);
    assert.ok(view.getByText("Что такое пирамида тестирования и когда она не работает?"));
  });
});
