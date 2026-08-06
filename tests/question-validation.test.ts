import assert from "node:assert/strict";
import test from "node:test";

import { seedQuestions } from "../content/questions/seed";
import { localizeQuestion } from "../src/entities/question/model/types";
import {
  QuestionValidationError,
  validateQuestion,
  validateQuestions,
} from "../src/entities/question/model/validate-question";

const expectedIdentity = [
  ["q-testing-pyramid", "testing-pyramid"],
  ["q-flaky-tests", "flaky-tests-investigation"],
  ["q-api-contract-testing", "api-contract-testing"],
  ["q-browser-locators", "resilient-browser-locators"],
  ["q-risk-based-testing", "risk-based-testing"],
  ["q-test-data-management", "test-data-management"],
] as const;

test("all six bilingual seed questions pass runtime validation", () => {
  assert.equal(validateQuestions(seedQuestions).length, 6);
  assert.deepEqual(seedQuestions.map(({ id, slug }) => [id, slug]), expectedIdentity);

  for (const question of seedQuestions) {
    const ru = localizeQuestion(question, "ru");
    const en = localizeQuestion(question, "en");
    assert.notEqual(ru.title, en.title);
    assert.ok(ru.explanation.length > 20);
    assert.ok(en.explanation.length > 20);
    assert.equal(ru.answerExamples.length, 3);
    assert.equal(en.answerExamples.length, 3);
    assert.deepEqual(ru.sources, en.sources);
  }
});

test("validateQuestion rejects incomplete locales, malformed slugs and source URLs", () => {
  const base = seedQuestions[0];
  assert.ok(base);

  assert.throws(
    () => validateQuestion({ ...base, title: { ru: base.title.ru, en: "" } }),
    /must contain ru and en text/,
  );
  assert.throws(
    () => validateQuestion({ ...base, slug: "Invalid Slug" }),
    QuestionValidationError,
  );
  assert.throws(
    () =>
      validateQuestion({
        ...base,
        sources: [{ ...base.sources[0], url: "not-a-url" }],
      }),
    /valid URL/,
  );
});

test("validateQuestions rejects duplicate ids and slugs", () => {
  const base = seedQuestions[0];
  assert.ok(base);

  assert.throws(
    () => validateQuestions([base, { ...base, slug: "another-slug" }]),
    /Duplicate question id/,
  );
  assert.throws(
    () => validateQuestions([base, { ...base, id: "another-id" }]),
    /Duplicate question slug/,
  );
});
