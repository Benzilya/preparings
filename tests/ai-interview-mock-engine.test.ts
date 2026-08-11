import assert from "node:assert/strict";
import test from "node:test";

import { questionLibraryQuestions } from "../content/questions";
import { localizeQuestion } from "../src/entities/question";
import { evaluateMockInterviewAnswer } from "../src/features/run-ai-interview/model/mock-engine";

const sourceQuestion = questionLibraryQuestions[0];
const question = localizeQuestion(sourceQuestion, "ru");

test("mock engine requests a follow-up for a weak answer", () => {
  const result = evaluateMockInterviewAnswer({
    question,
    answer: "Не знаю, возможно это связано с тестированием.",
    language: "ru",
    isLastQuestion: false,
  });

  assert.equal(result.feedback.decision, "follow-up");
  assert.ok(result.feedback.score.total < 48);
  assert.ok(result.followUpPrompt);
  assert.ok(result.feedback.gaps.length > 0);
});

test("mock engine advances after a sufficiently detailed answer", () => {
  const result = evaluateMockInterviewAnswer({
    question,
    answer: `${question.expectedAnswer} ${question.tags.map((tag) => tag.label).join(" ")} ${question.relatedTopics.join(" ")}`,
    language: "ru",
    isLastQuestion: false,
  });

  assert.equal(result.feedback.decision, "next-question");
  assert.ok(result.feedback.score.total >= 48);
  assert.equal(result.followUpPrompt, undefined);
});

test("mock engine can complete the final question and keeps English feedback in English", () => {
  const englishQuestion = localizeQuestion(sourceQuestion, "en");
  const result = evaluateMockInterviewAnswer({
    question: englishQuestion,
    answer: `${englishQuestion.expectedAnswer} ${englishQuestion.tags.map((tag) => tag.label).join(" ")} ${englishQuestion.relatedTopics.join(" ")}`,
    language: "en",
    isLastQuestion: true,
  });

  assert.equal(result.feedback.decision, "complete");
  assert.match(result.feedback.summary, /answer/i);
  assert.doesNotMatch(result.feedback.summary, /ответ/i);
});
