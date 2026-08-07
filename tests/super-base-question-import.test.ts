import assert from "node:assert/strict";
import { test } from "node:test";

import { questionLibraryQuestions, superBaseQuestions, top100Questions } from "../content/questions";
import { localizeQuestion } from "../src/entities/question/model/types";

const sourceUrl =
  "https://docs.google.com/document/d/10nQ6BofwVIFsmUFxgN0Yt4eMg3u2m79W1esdiTbkstY/edit?pli=1&tab=t.0#heading=h.vd25lm2hsry9";

test("study-note import extends but does not rewrite the TOP-100 ranking", () => {
  assert.equal(top100Questions.length, 100);
  assert.equal(superBaseQuestions.length, 28);
  assert.equal(questionLibraryQuestions.length, 128);
  assert.equal(questionLibraryQuestions[0]?.popularityRank, 1);
  assert.equal(questionLibraryQuestions.at(-1)?.popularityRank, 128);

  const ids = new Set(questionLibraryQuestions.map((question) => question.id));
  const slugs = new Set(questionLibraryQuestions.map((question) => question.slug));
  assert.equal(ids.size, 128);
  assert.equal(slugs.size, 128);
});

test("every imported question contains complete Russian and English visible content", () => {
  for (const question of superBaseQuestions) {
    assert.ok(question.title.ru.trim());
    assert.ok(question.title.en.trim());
    assert.ok(question.category.ru.trim());
    assert.ok(question.category.en.trim());
    assert.ok(question.explanation.ru.trim());
    assert.ok(question.explanation.en.trim());
    assert.ok(question.expectedAnswer.ru.trim());
    assert.ok(question.expectedAnswer.en.trim());
    assert.ok(question.tags.every((tag) => tag.label.ru.trim() && tag.label.en.trim()));
    assert.ok(question.sources.some((source) => source.url === sourceUrl));
  }
});

test("imported topics can be resolved independently in Russian and English", () => {
  const browserQuestion = superBaseQuestions.find(
    (question) => question.slug === "what-happens-when-opening-a-website",
  );
  assert.ok(browserQuestion);

  const ru = localizeQuestion(browserQuestion, "ru");
  const en = localizeQuestion(browserQuestion, "en");

  assert.match(ru.title, /Что происходит/);
  assert.match(ru.explanation, /DNS/);
  assert.match(en.title, /What happens/);
  assert.match(en.explanation, /TCP/);
  assert.notEqual(ru.title, en.title);
});

test("stable supplemental ids and slugs are derived from topic slugs", () => {
  for (const question of superBaseQuestions) {
    assert.equal(question.id, `q-${question.slug}`);
    assert.ok(question.popularityRank > 100);
  }
});
