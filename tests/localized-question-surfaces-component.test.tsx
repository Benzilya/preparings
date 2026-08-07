import assert from "node:assert/strict";
import { after, afterEach, before, test } from "node:test";

import { act, cleanup, render } from "@testing-library/react";
import globalJsdom from "global-jsdom";
import React from "react";

import { seedQuestions } from "../content/questions/seed";
import { writeSettings } from "../src/features/manage-settings/model/settings";
import {
  LocalizedCategoryPage,
  LocalizedQuestionDetails,
} from "../src/features/manage-settings/ui/localized-question-surfaces";
import { writeQuestionProgress } from "../src/features/track-question-progress/model/storage";
import { FavoriteQuestionsPage } from "../src/features/track-question-progress/ui/favorite-questions-page";
import { ProgressPage } from "../src/features/track-question-progress/ui/progress-page";

let cleanupDom: () => void;
const firstQuestion = seedQuestions[0]!;

before(() => {
  cleanupDom = globalJsdom(undefined, { url: "http://localhost/questions" });
});

afterEach(() => {
  cleanup();
  window.localStorage.clear();
  document.documentElement.lang = "ru";
});

after(() => cleanupDom());

test("detail and category surfaces render complete Russian question content", () => {
  const detail = render(<LocalizedQuestionDetails question={firstQuestion} />);
  assert.ok(detail.getByText(firstQuestion.title.ru));
  assert.ok(detail.getByText(firstQuestion.interviewerGoal.ru));
  assert.ok(detail.getByText(firstQuestion.expectedAnswer.ru));
  assert.ok(detail.getByText(firstQuestion.alternativeAnswers[0]!.ru));
  assert.ok(detail.getByText(firstQuestion.relatedTopics[0]!.ru));
  assert.equal(detail.queryByText(firstQuestion.title.en), null);
  detail.unmount();

  const category = render(
    <LocalizedCategoryPage categoryName={firstQuestion.category} questions={[firstQuestion]} />,
  );
  assert.ok(category.getByRole("heading", { name: firstQuestion.category.ru }));
  assert.ok(category.getByText(firstQuestion.title.ru));
  assert.equal(category.queryByText(firstQuestion.title.en), null);
});

test("detail surface switches to English without reload", async () => {
  const view = render(<LocalizedQuestionDetails question={firstQuestion} />);
  act(() => {
    writeSettings({ language: "en", catalogDensity: "comfortable", showExplanations: true });
  });

  assert.ok(await view.findByText(firstQuestion.title.en));
  assert.ok(view.getByText(firstQuestion.expectedAnswer.en));
  assert.equal(view.queryByText(firstQuestion.title.ru), null);
});

test("favorites and progress retain question state while localizing visible text", () => {
  writeQuestionProgress([
    {
      questionId: firstQuestion.id,
      status: "learning",
      favorite: true,
      updatedAt: "2026-08-06T12:00:00.000Z",
    },
  ]);

  const favorites = render(<FavoriteQuestionsPage questions={seedQuestions} />);
  assert.ok(favorites.getByText(firstQuestion.title.ru));
  assert.ok(favorites.getByText(firstQuestion.category.ru));
  favorites.unmount();

  const progress = render(<ProgressPage questions={seedQuestions} />);
  assert.ok(progress.getByText(firstQuestion.category.ru));
  assert.ok(progress.getByText(firstQuestion.title.ru));
  assert.equal(progress.queryByText(firstQuestion.title.en), null);
});
