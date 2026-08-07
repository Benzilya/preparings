import assert from "node:assert/strict";
import test from "node:test";

import { top100Questions } from "../content/questions/top100";
import { seedQuestions } from "../content/questions/seed";
import { localizeQuestion, validateQuestions } from "../src/entities/question";

const normalize = (value: string) =>
  value
    .toLocaleLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();

test("primary ranking contains exactly 100 unique questions with ranks 1 through 100", () => {
  assert.equal(top100Questions.length, 100);
  assert.deepEqual(
    top100Questions.map((question) => question.popularityRank),
    Array.from({ length: 100 }, (_, index) => index + 1),
  );
  assert.equal(new Set(top100Questions.map((question) => question.id)).size, 100);
  assert.equal(new Set(top100Questions.map((question) => question.slug)).size, 100);
  assert.equal(new Set(top100Questions.map((question) => question.popularityRank)).size, 100);
});

test("existing stable question identities remain in the top 100", () => {
  for (const existing of seedQuestions) {
    const ranked = top100Questions.find((question) => question.id === existing.id);
    assert.ok(ranked, `Missing existing question ${existing.id}`);
    assert.equal(ranked.slug, existing.slug);
    assert.equal(ranked.categorySlug, existing.categorySlug);
  }
});

test("all ranked questions pass validation and contain complete bilingual content", () => {
  assert.equal(validateQuestions(top100Questions).length, 100);
  for (const question of top100Questions) {
    assert.ok(question.title.ru && question.title.en);
    assert.ok(question.category.ru && question.category.en);
    assert.ok(question.explanation.ru && question.explanation.en);
    assert.ok(question.interviewerGoal.ru && question.interviewerGoal.en);
    assert.ok(question.expectedAnswer.ru && question.expectedAnswer.en);
    assert.equal(question.answerExamples.length, 3);
    assert.ok(question.ranking);
    assert.match(question.ranking.verifiedAt, /^\d{4}-\d{2}-\d{2}$/);
    assert.ok(question.sources.length >= 2);
    assert.equal(question.sourcesCount, question.sources.length);
    for (const source of question.sources) assert.ok(URL.canParse(source.url));
    for (const tag of question.tags) assert.match(tag.key, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
  }
});

test("titles have no exact or normalized duplicates in either language", () => {
  for (const language of ["ru", "en"] as const) {
    const titles = top100Questions.map((question) => normalize(question.title[language]));
    assert.equal(new Set(titles).size, 100);
  }
});

test("difficulty distribution remains suitable for a broad QA interview ranking", () => {
  const counts = { junior: 0, middle: 0, senior: 0 };
  for (const question of top100Questions) counts[question.difficulty] += 1;
  assert.ok(counts.junior >= 35 && counts.junior <= 55);
  assert.ok(counts.middle >= 30 && counts.middle <= 50);
  assert.ok(counts.senior >= 10 && counts.senior <= 25);
});

test("localized views expose only the selected language and preserve stable identity", () => {
  const question = top100Questions[50]!;
  const ru = localizeQuestion(question, "ru");
  const en = localizeQuestion(question, "en");
  assert.equal(ru.id, en.id);
  assert.equal(ru.slug, en.slug);
  assert.equal(ru.popularityRank, en.popularityRank);
  assert.notEqual(ru.title, en.title);
  assert.notEqual(ru.explanation, en.explanation);
});
