"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

import type { Question, QuestionDifficulty } from "@/entities/question";
import { Card, CardContent, CardHeader, CardTitle, Input } from "@/shared/ui";

const difficultyOptions: readonly (QuestionDifficulty | "all")[] = [
  "all",
  "junior",
  "middle",
  "senior",
];

export function QuestionLibrary({ questions }: { questions: readonly Question[] }) {
  const [query, setQuery] = useState("");
  const [difficulty, setDifficulty] = useState<QuestionDifficulty | "all">("all");

  const filteredQuestions = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return questions.filter((question) => {
      const matchesDifficulty = difficulty === "all" || question.difficulty === difficulty;
      const searchableText = [question.title, question.category, ...question.tags]
        .join(" ")
        .toLowerCase();
      const matchesQuery =
        normalizedQuery.length === 0 || searchableText.includes(normalizedQuery);

      return matchesDifficulty && matchesQuery;
    });
  }, [difficulty, query, questions]);

  return (
    <div className="questionLibrary">
      <div className="questionFilters" aria-label="Question filters / Фильтры вопросов">
        <label className="searchField">
          <Search aria-hidden="true" size={18} />
          <span className="srOnly">Search questions / Поиск вопросов</span>
          <Input
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search topics / Искать темы"
            type="search"
            value={query}
          />
        </label>

        <label className="difficultyField">
          <span>Level / Уровень</span>
          <select
            onChange={(event) =>
              setDifficulty(event.target.value as QuestionDifficulty | "all")
            }
            value={difficulty}
          >
            {difficultyOptions.map((option) => (
              <option key={option} value={option}>
                {option === "all" ? "All / Все" : option}
              </option>
            ))}
          </select>
        </label>
      </div>

      <p className="resultCount" aria-live="polite">
        {filteredQuestions.length} of {questions.length} questions / вопросов
      </p>

      <div className="questionGrid">
        {filteredQuestions.map((question) => (
          <Card key={question.id}>
            <CardHeader>
              <span className="difficultyBadge">{question.difficulty}</span>
              <CardTitle>{question.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{question.explanation}</p>
              <div className="tagList" aria-label="Tags / Теги">
                {question.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <Link className="questionLink" href={`/questions/${question.slug}`}>
                Open question / Открыть вопрос →
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredQuestions.length === 0 ? (
        <div className="emptyState">
          <strong>No questions found / Вопросы не найдены</strong>
          <p>Change the search text or selected level.</p>
        </div>
      ) : null}
    </div>
  );
}
