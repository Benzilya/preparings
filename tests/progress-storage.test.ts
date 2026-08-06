import assert from "node:assert/strict";
import test from "node:test";

import {
  parseQuestionProgress,
  summarizeProgress,
} from "../src/features/track-question-progress/model/storage";

const validRecord = {
  questionId: "q-api-contract-testing",
  status: "learning" as const,
  favorite: true,
  updatedAt: "2026-08-06T10:00:00.000Z",
};

test("parseQuestionProgress accepts version 1 and sorts records", () => {
  const records = parseQuestionProgress(
    JSON.stringify({
      version: 1,
      records: [validRecord, { ...validRecord, questionId: "q-browser-locators" }],
    }),
  );

  assert.deepEqual(
    records.map((record) => record.questionId),
    ["q-api-contract-testing", "q-browser-locators"],
  );
});

test("parseQuestionProgress keeps the latest duplicate record", () => {
  const records = parseQuestionProgress(
    JSON.stringify({
      version: 1,
      records: [
        validRecord,
        {
          ...validRecord,
          status: "completed",
          favorite: false,
          updatedAt: "2026-08-06T11:00:00.000Z",
        },
      ],
    }),
  );

  assert.equal(records.length, 1);
  assert.equal(records[0]?.status, "completed");
  assert.equal(records[0]?.favorite, false);
});

test("parseQuestionProgress rejects malformed and unsupported payloads", () => {
  assert.throws(() => parseQuestionProgress("not json"), /not valid JSON/);
  assert.throws(
    () => parseQuestionProgress(JSON.stringify({ version: 2, records: [] })),
    /Unsupported progress file format/,
  );
  assert.throws(
    () =>
      parseQuestionProgress(
        JSON.stringify({ version: 1, records: [{ ...validRecord, status: "unknown" }] }),
      ),
    /invalid records/,
  );
});

test("summarizeProgress counts learning, completed, and favorites", () => {
  const summary = summarizeProgress(4, [
    validRecord,
    {
      ...validRecord,
      questionId: "q-testing-pyramid",
      status: "completed",
      favorite: false,
    },
  ]);

  assert.deepEqual(summary, { total: 4, learning: 1, completed: 1, favorites: 1 });
});
