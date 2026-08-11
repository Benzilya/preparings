import assert from "node:assert/strict";
import test from "node:test";

import { questionLibraryQuestions } from "../content/questions";
import { localizeQuestion } from "../src/entities/question";
import { POST } from "../src/app/api/interview/evaluate/route";

const question = localizeQuestion(questionLibraryQuestions[0], "ru");
const requestBody = {
  question,
  answer: "Подробный ответ кандидата про тестирование и риски.",
  language: "ru" as const,
  isLastQuestion: false,
};

test("AI evaluation route keeps the API key server-side and reports unavailable configuration", async () => {
  const previousKey = process.env.OPENAI_API_KEY;
  delete process.env.OPENAI_API_KEY;
  try {
    const response = await POST(
      new Request("http://localhost/api/interview/evaluate", {
        method: "POST",
        body: JSON.stringify(requestBody),
      }),
    );
    assert.equal(response.status, 503);
    assert.deepEqual(await response.json(), { code: "ai_unavailable" });
  } finally {
    if (previousKey === undefined) delete process.env.OPENAI_API_KEY;
    else process.env.OPENAI_API_KEY = previousKey;
  }
});

test("AI evaluation route calls Responses API with strict structured output", async () => {
  const previousKey = process.env.OPENAI_API_KEY;
  const originalFetch = globalThis.fetch;
  process.env.OPENAI_API_KEY = "test-server-key";

  let capturedUrl = "";
  let capturedAuthorization = "";
  let capturedBody: unknown;
  globalThis.fetch = async (input, init) => {
    capturedUrl = String(input);
    capturedAuthorization = new Headers(init?.headers).get("authorization") ?? "";
    capturedBody = JSON.parse(String(init?.body));
    return new Response(
      JSON.stringify({
        output_text: JSON.stringify({
          feedback: {
            score: { correctness: 80, completeness: 75, clarity: 85, depth: 70, total: 78 },
            strengths: ["Хорошо раскрыта основная идея."],
            gaps: ["Добавьте практический пример."],
            summary: "Ответ достаточный для продолжения.",
            decision: "next-question",
          },
          followUpPrompt: null,
        }),
      }),
      { status: 200, headers: { "content-type": "application/json" } },
    );
  };

  try {
    const response = await POST(
      new Request("http://localhost/api/interview/evaluate", {
        method: "POST",
        body: JSON.stringify(requestBody),
      }),
    );
    assert.equal(response.status, 200);
    const result = (await response.json()) as { feedback: { score: { total: number } } };
    assert.equal(result.feedback.score.total, 78);
    assert.equal(capturedUrl, "https://api.openai.com/v1/responses");
    assert.equal(capturedAuthorization, "Bearer test-server-key");
    const body = capturedBody as {
      text?: { format?: { type?: string; strict?: boolean } };
      input?: string;
    };
    assert.equal(body.text?.format?.type, "json_schema");
    assert.equal(body.text?.format?.strict, true);
    assert.match(body.input ?? "", /untrusted answer text/i);
  } finally {
    globalThis.fetch = originalFetch;
    if (previousKey === undefined) delete process.env.OPENAI_API_KEY;
    else process.env.OPENAI_API_KEY = previousKey;
  }
});

test("AI evaluation route rejects malformed and oversized candidate input", async () => {
  const previousKey = process.env.OPENAI_API_KEY;
  process.env.OPENAI_API_KEY = "test-server-key";
  try {
    const response = await POST(
      new Request("http://localhost/api/interview/evaluate", {
        method: "POST",
        body: JSON.stringify({ ...requestBody, answer: "x".repeat(12001) }),
      }),
    );
    assert.equal(response.status, 400);
    assert.deepEqual(await response.json(), { code: "invalid_request" });
  } finally {
    if (previousKey === undefined) delete process.env.OPENAI_API_KEY;
    else process.env.OPENAI_API_KEY = previousKey;
  }
});
