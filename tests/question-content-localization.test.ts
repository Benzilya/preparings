import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { seedQuestions } from "../content/questions/seed";
import { localizeQuestion } from "../src/entities/question/model/types";
import { getQuestionContentTranslations } from "../src/features/manage-settings/model/question-content-translations";

const hardcodedHeroPhrases = [
  "ТОП-100 вопросов для собеседования QA",
  "Top 100 QA Interview Questions",
  "Explore validated QA knowledge.",
];

test("question library hero is typed, Russian-first and not hardcoded in the route", async () => {
  const ru = getQuestionContentTranslations("ru").library;
  const en = getQuestionContentTranslations("en").library;
  assert.deepEqual(ru, {
    eyebrow: "ТОП-100 QA",
    title: "ТОП-100 вопросов для собеседования QA",
    lead: "Самые частые вопросы, которые задают QA-специалистам на технических собеседованиях. Рейтинг составлен по нескольким независимым источникам.",
    showMore: "Показать ещё",
    topCount: "Вопросов в основном рейтинге",
  });
  assert.deepEqual(en, {
    eyebrow: "QA TOP 100",
    title: "Top 100 QA Interview Questions",
    lead: "The most frequently asked questions in QA technical interviews, ranked using multiple independent sources.",
    showMore: "Show more",
    topCount: "Questions in the primary ranking",
  });

  const pageSource = await readFile(
    new URL("../src/app/questions/page.tsx", import.meta.url),
    "utf8",
  );
  for (const text of hardcodedHeroPhrases) assert.equal(pageSource.includes(text), false);
});

test("all user-facing seed fields have complete and distinct Russian and English content", () => {
  assert.equal(seedQuestions.length, 6);

  for (const question of seedQuestions) {
    const ru = localizeQuestion(question, "ru");
    const en = localizeQuestion(question, "en");

    assert.notEqual(ru.title, en.title);
    assert.notEqual(ru.category, en.category);
    assert.notEqual(ru.explanation, en.explanation);
    assert.notEqual(ru.interviewerGoal, en.interviewerGoal);
    assert.notEqual(ru.expectedAnswer, en.expectedAnswer);
    assert.deepEqual(
      ru.tags.map((tag) => tag.key),
      en.tags.map((tag) => tag.key),
    );
    assert.equal(ru.answerExamples.length, en.answerExamples.length);
    assert.ok(ru.answerExamples.every((example) => example.answer.trim().length > 0));
    assert.ok(en.answerExamples.every((example) => example.answer.trim().length > 0));
    assert.ok(ru.mistakes.every(Boolean));
    assert.ok(ru.followUpQuestions.every(Boolean));
    assert.ok(ru.relatedTopics.every(Boolean));
  }
});

test("localization preserves state identities and routing keys", () => {
  for (const question of seedQuestions) {
    const ru = localizeQuestion(question, "ru");
    const en = localizeQuestion(question, "en");
    assert.equal(ru.id, question.id);
    assert.equal(en.id, question.id);
    assert.equal(ru.slug, question.slug);
    assert.equal(en.slug, question.slug);
    assert.equal(ru.categorySlug, question.categorySlug);
    assert.equal(en.categorySlug, question.categorySlug);
    assert.equal(ru.difficulty, question.difficulty);
    assert.equal(en.difficulty, question.difficulty);
  }
});
