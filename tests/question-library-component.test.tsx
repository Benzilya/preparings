import assert from "node:assert/strict";
import { after, afterEach, before, test } from "node:test";

import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import globalJsdom from "global-jsdom";
import React from "react";

import { seedQuestions } from "../content/questions/seed";
import { writeSettings } from "../src/features/manage-settings/model/settings";
import { QuestionLibrary } from "../src/features/filter-questions/ui/question-library";

let cleanupDom: () => void;

before(() => {
  cleanupDom = globalJsdom(undefined, { url: "http://localhost/questions" });
});

afterEach(() => {
  cleanup();
  window.localStorage.clear();
  document.documentElement.lang = "ru";
});

after(() => cleanupDom());

test("Question Library uses Russian by default and searches Russian content", async () => {
  const user = userEvent.setup({ document: window.document });
  render(<QuestionLibrary questions={seedQuestions} />);

  const search = screen.getByLabelText("Поиск вопросов");
  await user.type(search, "нестабильные");
  assert.ok(screen.getByText("Как исследовать и сокращать нестабильные тесты?"));
  assert.equal(screen.queryByText("What is the testing pyramid and when does it fail?"), null);

  await user.clear(search);
  await user.selectOptions(screen.getByLabelText("Уровень"), "junior");
  assert.match(screen.getByText(/1 \/ 6 вопросов/).textContent ?? "", /^1 \/ 6/);
});

test("Question Library switches to English without reload and searches English content", async () => {
  const user = userEvent.setup({ document: window.document });
  render(<QuestionLibrary questions={seedQuestions} />);

  writeSettings({ language: "en", catalogDensity: "comfortable", showExplanations: true });

  const search = await screen.findByLabelText("Search questions");
  await user.type(search, "contract tests");
  assert.ok(screen.getByText("How do contract tests protect service integrations?"));
  assert.equal(screen.queryByText("Как контрактные тесты защищают интеграции сервисов?"), null);
});

test("Question Library exposes a localized empty state and resets filters", async () => {
  const user = userEvent.setup({ document: window.document });
  render(<QuestionLibrary questions={seedQuestions} />);

  await user.type(screen.getByLabelText("Поиск вопросов"), "несуществующая-тема");
  assert.ok(screen.getByText("Вопросы не найдены"));

  const resetButtons = screen.getAllByRole("button", { name: "Сбросить фильтры" });
  await user.click(resetButtons.at(-1)!);

  assert.equal(screen.queryByText("Вопросы не найдены"), null);
  assert.ok(screen.getByText("Что такое пирамида тестирования и когда она не работает?"));
});
