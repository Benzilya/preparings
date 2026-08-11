"use client";

import React from "react";

import { summarizeInterviewSessionScores } from "@/entities/interview-session";
import type { InterviewSession } from "@/entities/interview-session";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui";

import { getInterviewResultsCopy } from "../model/results-copy";

export function InterviewResultSummary({ session }: { readonly session: InterviewSession }) {
  const copy = getInterviewResultsCopy(session.config.language);
  const score = summarizeInterviewSessionScores(session);
  const completedAt = session.completedAt ? new Date(session.completedAt).toLocaleString() : "—";

  return (
    <Card>
      <CardHeader>
        <CardTitle>{copy.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>
          {copy.average}: <strong>{score.total}/100</strong>
        </p>
        <ul>
          <li>
            {copy.correctness}: {score.correctness}/100
          </li>
          <li>
            {copy.completeness}: {score.completeness}/100
          </li>
          <li>
            {copy.clarity}: {score.clarity}/100
          </li>
          <li>
            {copy.depth}: {score.depth}/100
          </li>
        </ul>
        <p>
          {copy.level}: <strong>{session.config.difficulty}</strong> · {copy.questions}:{" "}
          <strong>{session.questionIds.length}</strong>
        </p>
        <p>
          {copy.completedAt}: {completedAt}
        </p>
        <strong>{copy.answers}</strong>
        {session.turns
          .filter((turn) => Boolean(turn.answer))
          .map((turn) => (
            <article key={turn.id}>
              <p>
                <strong>{turn.prompt}</strong>
              </p>
              <p>{turn.answer}</p>
              {turn.feedback ? <p>{turn.feedback.score.total}/100 — {turn.feedback.summary}</p> : null}
            </article>
          ))}
      </CardContent>
    </Card>
  );
}
