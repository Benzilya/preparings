"use client";

import React, { useMemo, useState } from "react";

import { questionLibraryQuestions } from "@/../content/questions";
import {
  answerInterviewTurn,
  appendInterviewTurn,
  completeInterviewSession,
  startInterviewSession,
} from "@/entities/interview-session";
import type { InterviewSession } from "@/entities/interview-session";
import { localizeQuestion } from "@/entities/question";
import { Button, Card, CardContent, CardHeader, CardTitle } from "@/shared/ui";

import { evaluateMockInterviewAnswer } from "../model/mock-engine";
import { getInterviewRunnerCopy } from "../model/runner-copy";
import { interviewSessionStorage } from "../model/session-storage";

function createTurnId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `turn-${Date.now()}`;
}

function resolveQuestion(questionId: string) {
  return questionLibraryQuestions.find((question) => question.id === questionId) ?? null;
}

export function InterviewRunner({
  session,
  onSessionChange,
  onReset,
}: {
  readonly session: InterviewSession;
  readonly onSessionChange: (session: InterviewSession) => void;
  readonly onReset: () => void;
}) {
  const copy = getInterviewRunnerCopy(session.config.language);
  const [answer, setAnswer] = useState("");
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const currentQuestionId = session.questionIds[session.currentQuestionIndex];
  const currentQuestion = useMemo(() => resolveQuestion(currentQuestionId), [currentQuestionId]);
  const localizedQuestion = currentQuestion
    ? localizeQuestion(currentQuestion, session.config.language)
    : null;
  const answeredTurns = session.turns.filter((turn) => Boolean(turn.answer));
  const progressPercent =
    session.status === "completed"
      ? 100
      : Math.round((session.currentQuestionIndex / session.questionIds.length) * 100);
  const currentTurn = [...session.turns]
    .reverse()
    .find((turn) => turn.questionId === currentQuestionId && !turn.answer);
  const latestFeedback = [...answeredTurns].reverse().find((turn) => turn.feedback)?.feedback;

  const persist = (nextSession: InterviewSession) => {
    interviewSessionStorage.write(nextSession);
    onSessionChange(nextSession);
  };

  const start = () => {
    if (!localizedQuestion) return;
    const now = new Date().toISOString();
    const started = startInterviewSession(session, now);
    const withFirstTurn = appendInterviewTurn(started, {
      id: createTurnId(),
      kind: "question",
      questionId: currentQuestionId,
      prompt: localizedQuestion.title,
      now,
    });
    persist(withFirstTurn);
  };

  const submitAnswer = () => {
    if (!currentTurn || !answer.trim() || !localizedQuestion) return;
    const now = new Date().toISOString();
    const isLastQuestion = session.currentQuestionIndex >= session.questionIds.length - 1;
    const evaluation = evaluateMockInterviewAnswer({
      question: localizedQuestion,
      answer,
      language: session.config.language,
      isLastQuestion,
    });
    const answered = answerInterviewTurn(session, {
      turnId: currentTurn.id,
      answer,
      feedback: evaluation.feedback,
      now,
    });

    if (evaluation.feedback.decision === "complete") {
      const completed = completeInterviewSession(answered, now);
      persist(completed);
      setAnswer("");
      setStatusMessage(copy.completed);
      return;
    }

    if (evaluation.feedback.decision === "follow-up") {
      const withFollowUp = appendInterviewTurn(answered, {
        id: createTurnId(),
        kind: "follow-up",
        questionId: currentQuestionId,
        prompt: evaluation.followUpPrompt ?? copy.followUp,
        now,
      });
      persist(withFollowUp);
      setAnswer("");
      setStatusMessage(copy.saved);
      return;
    }

    const nextQuestionId = answered.questionIds[answered.currentQuestionIndex];
    const nextQuestion = resolveQuestion(nextQuestionId);
    if (!nextQuestion) return;
    const localizedNextQuestion = localizeQuestion(nextQuestion, session.config.language);
    const withNextTurn = appendInterviewTurn(answered, {
      id: createTurnId(),
      kind: "question",
      questionId: nextQuestionId,
      prompt: localizedNextQuestion.title,
      now,
    });

    persist(withNextTurn);
    setAnswer("");
    setStatusMessage(copy.saved);
  };

  if (!localizedQuestion) {
    return (
      <Card>
        <CardContent>
          <p role="alert">{copy.missingSession}</p>
          <Button onClick={onReset}>{copy.backToSetup}</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <section className="routePage" aria-labelledby="interview-runner-title">
      <div className="routeHero">
        <p className="eyebrow">{copy.eyebrow}</p>
        <h1 id="interview-runner-title">{copy.title}</h1>
        <p className="lead">{session.status === "idle" ? copy.idleLead : copy.runningLead}</p>
        <p aria-label={copy.progress}>
          {copy.question} {session.currentQuestionIndex + 1} {copy.of} {session.questionIds.length}{" "}
          · <strong>{progressPercent}%</strong>
        </p>
      </div>

      {session.status === "idle" ? (
        <Card>
          <CardHeader>
            <CardTitle>{localizedQuestion.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={start} variant="primary">
              {copy.start}
            </Button>
            <Button onClick={onReset}>{copy.restartSetup}</Button>
          </CardContent>
        </Card>
      ) : null}

      {session.status === "running" && currentTurn ? (
        <Card>
          <CardHeader>
            <CardTitle>{currentTurn.prompt}</CardTitle>
          </CardHeader>
          <CardContent>
            <label>
              <span>{copy.answerLabel}</span>
              <textarea
                aria-label={copy.answerLabel}
                placeholder={copy.answerPlaceholder}
                value={answer}
                onChange={(event) => setAnswer(event.target.value)}
                rows={8}
              />
            </label>
            <Button disabled={!answer.trim()} onClick={submitAnswer} variant="primary">
              {session.currentQuestionIndex === session.questionIds.length - 1
                ? copy.finish
                : copy.saveAndContinue}
            </Button>
            {statusMessage ? <p role="status">{statusMessage}</p> : null}
          </CardContent>
        </Card>
      ) : null}

      {latestFeedback ? (
        <Card>
          <CardHeader>
            <CardTitle>{copy.feedback}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              {copy.totalScore}: <strong>{latestFeedback.score.total}/100</strong>
            </p>
            <p>{latestFeedback.summary}</p>
            <strong>{copy.strengths}</strong>
            <ul>
              {latestFeedback.strengths.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            {latestFeedback.gaps.length > 0 ? (
              <>
                <strong>{copy.gaps}</strong>
                <ul>
                  {latestFeedback.gaps.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </>
            ) : null}
          </CardContent>
        </Card>
      ) : null}

      {session.status === "completed" ? (
        <Card>
          <CardHeader>
            <CardTitle>{copy.completed}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{copy.completedHint}</p>
            <Button onClick={onReset}>{copy.restartSetup}</Button>
          </CardContent>
        </Card>
      ) : null}

      <Card>
        <CardHeader>
          <CardTitle>{copy.history}</CardTitle>
        </CardHeader>
        <CardContent>
          {answeredTurns.length === 0 ? <p>{copy.noHistory}</p> : null}
          {answeredTurns.map((turn) => (
            <article key={turn.id}>
              <strong>{turn.prompt}</strong>
              <p>{turn.answer}</p>
              {turn.feedback ? (
                <p>
                  {copy.totalScore}: {turn.feedback.score.total}/100
                </p>
              ) : null}
            </article>
          ))}
        </CardContent>
      </Card>
    </section>
  );
}
