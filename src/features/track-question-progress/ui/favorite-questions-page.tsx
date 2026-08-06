"use client";

import { Heart } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

import type { Question } from "@/entities/question";

import { useQuestionProgress } from "../model/use-question-progress";

export function FavoriteQuestionsPage({ questions }: { questions: readonly Question[] }) {
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

  return (
    <div className="favoritesPage">
      <header className="routeHero">
        <p className="eyebrow">Favorites / Избранное</p>
        <h1>Saved questions / Сохранённые вопросы</h1>
        <p className="lead">
          Your locally saved shortlist for focused review. Data remains in this browser.
        </p>
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
                <span className="progressStatusBadge">
                  {progress?.status ?? "not-started"}
                </span>
                <Link className="questionLink" href={`/questions/${question.slug}`}>
                  Open question / Открыть вопрос →
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <section className="progressPanel progressEmptyState">
          <Heart aria-hidden="true" size={28} />
          <h2>No favorites yet / Избранного пока нет</h2>
          <p>Mark useful questions in the library or on a question page.</p>
          <Link className="button" href="/questions">
            Open Question Library / Открыть базу вопросов
          </Link>
        </section>
      )}
    </div>
  );
}
