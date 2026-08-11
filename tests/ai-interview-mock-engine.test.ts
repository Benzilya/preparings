import assert from "node:assert/strict";
import test from "node:test";

import { questionLibraryQuestions } from "../content/questions";
import { localizeQuestion } from "../src/entities/question";
import { evaluateMockInterviewAnswer } from "../src/features/run-ai-interview/model/mock-engine";

const sourceQuestion = questionLibraryQuestions[0];
const question = localizeQuestion(sourceQuestion, "ru");

test("mock engine requests one follow-up for a weak answer", () => {
  const result = evaluateMockInterviewAnswer({
    question,
    answer: "Не знаю, возможно это связано с тестированием.",
    language: "ru",
    difficulty: "middle",
    isLastQuestion: false,
    followUpCount: 0,
  });

  assert.equal(result.feedback.decision, "follow-up");
  assert.ok(result.followUpPrompt);
  assert.ok(result.feedback.gaps.length > 0);
});

test("mock engine never asks a second follow-up for the same question", () => {
  const result = evaluateMockInterviewAnswer({
    question,
    answer: "Не знаю.",
    language: "ru",
    difficulty: "senior",
    isLastQuestion: false,
    followUpCount: 1,
  });

  assert.equal(result.feedback.decision, "next-question");
  assert.equal(result.followUpPrompt, undefined);
});

test("mock engine advances after a sufficiently detailed answer", () => {
  const result = evaluateMockInterviewAnswer({
    question,
    answer: `${question.expectedAnswer} ${question.tags.map((tag) => tag.label).join(" ")} ${question.relatedTopics.join(" ")}`,
    language: "ru",
    difficulty: "middle",
    isLastQuestion: false,
    followUpCount: 0,
  });

  assert.equal(result.feedback.decision, "next-question");
  assert.ok(result.feedback.score.total >= 52);
  assert.equal(result.followUpPrompt, undefined);
});

test("senior calibration is stricter than junior for the same answer", () => {
  const answer = `${question.expectedAnswer.split(" ").slice(0, 14).join(" ")} ${question.tags[0]?.label ?? ""}`;
  const junior = evaluateMockInterviewAnswer({
    question,
    answer,
    language: "ru",
    difficulty: "junior",
    isLastQuestion: false,
    followUpCount: 0,
  });
  const senior = evaluateMockInterviewAnswer({
    question,
    answer,
    language: "ru",
    difficulty: "senior",
    isLastQuestion: false,
    followUpCount: 0,
  });

  assert.ok(junior.feedback.score.depth >= senior.feedback.score.depth);
});

test("mock engine can complete the final question and keeps English feedback in English", () => {
  const englishQuestion = localizeQuestion(sourceQuestion, "en");
  const result = evaluateMockInterviewAnswer({
    question: englishQuestion,
    answer: `${englishQuestion.expectedAnswer} ${englishQuestion.tags.map((tag) => tag.label).join(" ")} ${englishQuestion.relatedTopics.join(" ")}`,
    language: "en",
    difficulty: "middle",
    isLastQuestion: true,
    followUpCount: 0,
  });

  assert.equal(result.feedback.decision, "complete");
  assert.match(result.feedback.summary, /answer/i);
  assert.doesNotMatch(result.feedback.summary, /ответ/i);
});
