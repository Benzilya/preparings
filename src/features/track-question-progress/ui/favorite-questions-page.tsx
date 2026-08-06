"use client";

import Link from "next/link";
import { Heart } from "lucide-react";

import type { Question } from "@/entities/question";

import { useQuestionProgress } from "../model/use-question-progress";

export function FavoriteQuestionsPage({ questions }: { questions: readonly Question[] }) {
  const { records } = useQuestionProgress();
  const favoriteIds = new Set(records.filter((record) => record.favorite).map((record) => record.questionId));
  const favorites = questions.filter((question) => favoriteIds.has(question.id));

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
          {favorites.map((question) => (
            <article className="favoriteQuestionCard" key={question.id}>
              <div className="favoriteQuestionMeta">
                <Heart aria-hidden="true" fill="currentColor" size={16} />
                <span>{question.category}</span>
                <span>{question.difficulty}</span>
              </div>
              <h2>{question.title}</h2>
              <p>{question.explanation}</p>
              <Link className="questionLink" href={`/questions/${question.slug}`}>
                Open question / Открыть вопрос →
              </Link>
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
