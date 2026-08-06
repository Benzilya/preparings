import assert from "node:assert/strict";
import { after, afterEach, before, test } from "node:test";

import { act, cleanup, render, screen } from "@testing-library/react";
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
  const { unmount } = render(<LocalizedQuestionDetails question={firstQuestion} />);
  assert.ok(screen.getByText(firstQuestion.title.ru));
  assert.ok(screen.getByText(firstQuestion.interviewerGoal.ru));
  assert.ok(screen.getByText(firstQuestion.expectedAnswer.ru));
  assert.ok(screen.getByText(firstQuestion.alternativeAnswers[0]!.ru));
  assert.ok(screen.getByText(firstQuestion.relatedTopics[0]!.ru));
  assert.equal(screen.queryByText(firstQuestion.title.en), null);
  unmount();

  render(
    <LocalizedCategoryPage categoryName={firstQuestion.category} questions={[firstQuestion]} />,
  );
  assert.ok(screen.getByRole("heading", { name: firstQuestion.category.ru }));
  assert.ok(screen.getByText(firstQuestion.title.ru));
  assert.equal(screen.queryByText(firstQuestion.title.en), null);
});

test("detail surface switches to English without reload", async () => {
  render(<LocalizedQuestionDetails question={firstQuestion} />);
  act(() => {
    writeSettings({ language: "en", catalogDensity: "comfortable", showExplanations: true });
  });

  assert.ok(await screen.findByText(firstQuestion.title.en));
  assert.ok(screen.getByText(firstQuestion.expectedAnswer.en));
  assert.equal(screen.queryByText(firstQuestion.title.ru), null);
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

  const { unmount } = render(<FavoriteQuestionsPage questions={seedQuestions} />);
  assert.ok(screen.getByText(firstQuestion.title.ru));
  assert.ok(screen.getByText(firstQuestion.category.ru));
  unmount();

  render(<ProgressPage questions={seedQuestions} />);
  assert.ok(screen.getByText(firstQuestion.category.ru));
  assert.ok(screen.getByText(firstQuestion.title.ru));
  assert.equal(screen.queryByText(firstQuestion.title.en), null);
});
