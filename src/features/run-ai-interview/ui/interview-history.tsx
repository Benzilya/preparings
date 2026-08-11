"use client";

import React, { useEffect, useState } from "react";

import { summarizeInterviewSessionScores } from "@/entities/interview-session";
import type { InterviewSession } from "@/entities/interview-session";
import type { QuestionLanguage } from "@/entities/question";
import { Button, Card, CardContent, CardHeader, CardTitle } from "@/shared/ui";

import { interviewHistoryChangedEvent, interviewHistoryStorage } from "../model/history-storage";
import { getInterviewResultsCopy } from "../model/results-copy";
import { InterviewResultSummary } from "./interview-result-summary";

export function InterviewHistory({ language }: { readonly language: QuestionLanguage }) {
  const copy = getInterviewResultsCopy(language);
  const [history, setHistory] = useState<InterviewSession[]>([]);
  const [selected, setSelected] = useState<InterviewSession | null>(null);

  useEffect(() => {
    const restore = () => setHistory(interviewHistoryStorage.read());
    restore();
    window.addEventListener(interviewHistoryChangedEvent, restore);
    return () => window.removeEventListener(interviewHistoryChangedEvent, restore);
  }, []);

  return (
    <section aria-labelledby="ai-interview-history-title">
      <Card>
        <CardHeader>
          <CardTitle>{copy.history}</CardTitle>
        </CardHeader>
        <CardContent>
          {history.length === 0 ? <p>{copy.historyEmpty}</p> : null}
          {history.map((session) => {
            const score = summarizeInterviewSessionScores(session);
            return (
              <article key={session.id}>
                <p>
                  <strong>{score.total}/100</strong> · {copy.level}: {session.config.difficulty} ·{" "}
                  {copy.questions}: {session.questionIds.length}
                </p>
                <p>
                  {copy.completedAt}:{" "}
                  {session.completedAt ? new Date(session.completedAt).toLocaleString() : "—"}
                </p>
                <Button onClick={() => setSelected(session)}>{copy.openResult}</Button>
              </article>
            );
          })}
          {history.length > 0 ? (
            <Button
              onClick={() => {
                interviewHistoryStorage.clear();
                setSelected(null);
              }}
            >
              {copy.clearHistory}
            </Button>
          ) : null}
        </CardContent>
      </Card>

      {selected ? (
        <div>
          <Button onClick={() => setSelected(null)}>{copy.closeResult}</Button>
          <InterviewResultSummary session={selected} />
        </div>
      ) : null}
    </section>
  );
}
