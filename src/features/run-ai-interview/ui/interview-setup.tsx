"use client";

import { useMemo, useState } from "react";

import { questionLibraryQuestions } from "@/content/questions";
import { createInterviewSession } from "@/entities/interview-session";
import type { QuestionDifficulty, QuestionLanguage } from "@/entities/question";
import { localizeQuestion } from "@/entities/question";
import { useSettings } from "@/features/manage-settings";
import { Button, Card, CardContent, CardHeader, CardTitle } from "@/shared/ui";

import { getInterviewSetupCopy } from "../model/setup-copy";
import { interviewSessionStorage } from "../model/session-storage";

const questionCountOptions = [5, 10, 15] as const;
const durationOptions = [15, 30, 45] as const;

function createSessionId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `interview-${Date.now()}`;
}

export function InterviewSetup() {
  const { language: interfaceLanguage } = useSettings();
  const copy = getInterviewSetupCopy(interfaceLanguage);
  const [difficulty, setDifficulty] = useState<QuestionDifficulty>("middle");
  const [interviewLanguage, setInterviewLanguage] = useState<QuestionLanguage>(interfaceLanguage);
  const [categorySlug, setCategorySlug] = useState("all");
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [durationMinutes, setDurationMinutes] = useState<number>(30);
  const [preparedSessionId, setPreparedSessionId] = useState<string | null>(null);

  const categoryOptions = useMemo(() => {
    const bySlug = new Map<string, string>();
    for (const question of questionLibraryQuestions) {
      if (!bySlug.has(question.categorySlug)) {
        bySlug.set(
          question.categorySlug,
          localizeQuestion(question, interfaceLanguage).category,
        );
      }
    }
    return [...bySlug.entries()].sort((left, right) =>
      left[1].localeCompare(right[1], interfaceLanguage === "ru" ? "ru" : "en"),
    );
  }, [interfaceLanguage]);

  const eligibleQuestions = useMemo(
    () =>
      questionLibraryQuestions.filter(
        (question) =>
          question.difficulty === difficulty &&
          (categorySlug === "all" || question.categorySlug === categorySlug),
      ),
    [categorySlug, difficulty],
  );

  const canPrepare = eligibleQuestions.length >= questionCount;

  const prepareInterview = () => {
    if (!canPrepare) return;
    const now = new Date().toISOString();
    const session = createInterviewSession({
      id: createSessionId(),
      config: {
        language: interviewLanguage,
        difficulty,
        mode: "structured-adaptive",
        questionCount,
        categorySlugs: categorySlug === "all" ? [] : [categorySlug],
        durationMinutes,
      },
      questionIds: eligibleQuestions.map((question) => question.id),
      now,
    });

    interviewSessionStorage.write(session);
    setPreparedSessionId(session.id);
  };

  return (
    <section className="routePage" aria-labelledby="interview-title">
      <div className="routeHero">
        <p className="eyebrow">{copy.eyebrow}</p>
        <h1 id="interview-title">{copy.title}</h1>
        <p className="lead">{copy.lead}</p>
      </div>

      <div className="routeGrid">
        <Card>
          <CardHeader>
            <CardTitle>{copy.level}</CardTitle>
          </CardHeader>
          <CardContent>
            <label>
              <span>{copy.level}</span>
              <select
                aria-label={copy.level}
                value={difficulty}
                onChange={(event) => setDifficulty(event.target.value as QuestionDifficulty)}
              >
                <option value="junior">{copy.junior}</option>
                <option value="middle">{copy.middle}</option>
                <option value="senior">{copy.senior}</option>
              </select>
            </label>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{copy.language}</CardTitle>
          </CardHeader>
          <CardContent>
            <label>
              <span>{copy.language}</span>
              <select
                aria-label={copy.language}
                value={interviewLanguage}
                onChange={(event) => setInterviewLanguage(event.target.value as QuestionLanguage)}
              >
                <option value="ru">{copy.russian}</option>
                <option value="en">{copy.english}</option>
              </select>
            </label>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{copy.categories}</CardTitle>
          </CardHeader>
          <CardContent>
            <label>
              <span>{copy.categories}</span>
              <select
                aria-label={copy.categories}
                value={categorySlug}
                onChange={(event) => setCategorySlug(event.target.value)}
              >
                <option value="all">{copy.allCategories}</option>
                {categoryOptions.map(([slug, label]) => (
                  <option key={slug} value={slug}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{copy.questionCount}</CardTitle>
          </CardHeader>
          <CardContent>
            <label>
              <span>{copy.questionCount}</span>
              <select
                aria-label={copy.questionCount}
                value={questionCount}
                onChange={(event) => setQuestionCount(Number(event.target.value))}
              >
                {questionCountOptions.map((count) => (
                  <option key={count} value={count}>
                    {count}
                  </option>
                ))}
              </select>
            </label>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{copy.duration}</CardTitle>
          </CardHeader>
          <CardContent>
            <label>
              <span>{copy.duration}</span>
              <select
                aria-label={copy.duration}
                value={durationMinutes}
                onChange={(event) => setDurationMinutes(Number(event.target.value))}
              >
                {durationOptions.map((minutes) => (
                  <option key={minutes} value={minutes}>
                    {minutes} {copy.minutes}
                  </option>
                ))}
              </select>
            </label>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{copy.mode}</CardTitle>
          </CardHeader>
          <CardContent>
            <strong>{copy.adaptiveMode}</strong>
            <p>{copy.adaptiveHint}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{copy.summary}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            {copy.available}: <strong>{eligibleQuestions.length}</strong>
          </p>
          <p>
            {copy.selected}: <strong>{Math.min(questionCount, eligibleQuestions.length)}</strong>
          </p>
          {!canPrepare ? <p role="alert">{copy.insufficient}</p> : null}
          <Button disabled={!canPrepare} onClick={prepareInterview} variant="primary">
            {copy.start}
          </Button>
          {preparedSessionId ? (
            <div role="status">
              <strong>{copy.prepared}</strong>
              <p>{copy.preparedHint}</p>
            </div>
          ) : null}
        </CardContent>
      </Card>
    </section>
  );
}
