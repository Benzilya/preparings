import assert from "node:assert/strict";
import test from "node:test";

import { seedQuestions } from "../content/questions/seed";
import {
  QuestionValidationError,
  validateQuestion,
  validateQuestions,
} from "../src/entities/question/model/validate-question";

test("seed question collection passes runtime validation", () => {
  assert.equal(validateQuestions(seedQuestions).length, seedQuestions.length);
});

test("validateQuestion rejects malformed slugs and source URLs", () => {
  const base = seedQuestions[0];
  assert.ok(base);

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

  assert.throws(() => validateQuestions([base, { ...base, slug: "another-slug" }]), /Duplicate question id/);
  assert.throws(
    () => validateQuestions([base, { ...base, id: "another-id" }]),
    /Duplicate question slug/,
  );
});
