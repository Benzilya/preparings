"use client";

import { Heart } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

import type { Question } from "@/entities/question";
import { getTranslations, useSettings } from "@/features/manage-settings";

import { useQuestionProgress } from "../model/use-question-progress";

export function FavoriteQuestionsPage({ questions }: { questions: readonly Question[] }) {
  const { language } = useSettings();
  const copy = getTranslations(language).favorites;
  const progressCopy = getTranslations(language).questionLibrary;
  const { records } = useQuestionProgress();

  const favorites = useMemo(() => {
    const recordsByQuestion = new Map(records.map((record) => [record.questionId, record]));

    return questions
      .filter((question) => recordsByQuestion.get(question.id)?.favorite)
      .map((question) => ({ question, progress: recordsByQuestion.get(question.id) }))
      .toSorted((left, right) => {
        const updated = (right.progress?.updatedAt ?? "").localeCompare(
          left.progress?.updatedAt ?? "",
        );
        return updated || left.question.slug.localeCompare(right.question.slug, "en");
      });
  }, [questions, records]);

  const statusLabel = (status: string | undefined) => {
    if (status === "learning") return progressCopy.learning;
    if (status === "completed") return progressCopy.completed;
    return progressCopy.notStarted;
  };

  return (
    <div className="favoritesPage">
      <header className="routeHero">
        <p className="eyebrow">{copy.eyebrow}</p>
        <h1>{copy.title}</h1>
        <p className="lead">{copy.lead}</p>
      </header>

      {favorites.length ? (
        <div className="favoriteQuestionGrid">
          {favorites.map(({ progress, question }) => (
            <article className="favoriteQuestionCard" key={question.id}>
              <div className="favoriteQuestionMeta">
                <Heart aria-hidden="true" fill="currentColor" size={16} />
                <span>{question.category}</span>
                <span>{question.difficulty}</span>
              </div>
              <h2>{question.title}</h2>
              <p>{question.explanation}</p>
              <div className="favoriteQuestionFooter">
                <span className="progressStatusBadge">{statusLabel(progress?.status)}</span>
                <Link className="questionLink" href={`/questions/${question.slug}`}>
                  {copy.openQuestion}
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <section className="progressPanel progressEmptyState">
          <Heart aria-hidden="true" size={28} />
          <h2>{copy.emptyTitle}</h2>
          <p>{copy.emptyBody}</p>
          <Link className="button" href="/questions">
            {copy.openLibrary}
          </Link>
        </section>
      )}
    </div>
  );
}
