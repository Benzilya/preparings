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

type SortOption = "popularity" | "updated" | "title";

export function QuestionLibrary({ questions }: { questions: readonly Question[] }) {
  const [query, setQuery] = useState("");
  const [difficulty, setDifficulty] = useState<QuestionDifficulty | "all">("all");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState<SortOption>("popularity");

  const categories = useMemo(
    () => ["all", ...new Set(questions.map((question) => question.category))],
    [questions],
  );

  const filteredQuestions = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return questions
      .filter((question) => {
        const matchesDifficulty = difficulty === "all" || question.difficulty === difficulty;
        const matchesCategory = category === "all" || question.category === category;
        const searchableText = [question.title, question.category, ...question.tags]
          .join(" ")
          .toLowerCase();
        const matchesQuery =
          normalizedQuery.length === 0 || searchableText.includes(normalizedQuery);

        return matchesDifficulty && matchesCategory && matchesQuery;
      })
      .toSorted((left, right) => {
        if (sort === "title") return left.title.localeCompare(right.title);
        if (sort === "updated") return right.updatedAt.localeCompare(left.updatedAt);
        return left.popularityRank - right.popularityRank;
      });
  }, [category, difficulty, query, questions, sort]);

  const resetFilters = () => {
    setQuery("");
    setDifficulty("all");
    setCategory("all");
    setSort("popularity");
  };

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

        <label className="filterField">
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

        <label className="filterField">
          <span>Category / Категория</span>
          <select onChange={(event) => setCategory(event.target.value)} value={category}>
            {categories.map((option) => (
              <option key={option} value={option}>
                {option === "all" ? "All / Все" : option}
              </option>
            ))}
          </select>
        </label>

        <label className="filterField">
          <span>Sort / Сортировка</span>
          <select onChange={(event) => setSort(event.target.value as SortOption)} value={sort}>
            <option value="popularity">Popularity / Популярность</option>
            <option value="updated">Recently updated / Обновлённые</option>
            <option value="title">Title / Название</option>
          </select>
        </label>
      </div>

      <div className="questionResultsBar">
        <p className="resultCount" aria-live="polite">
          {filteredQuestions.length} of {questions.length} questions / вопросов
        </p>
        <button className="resetFilters" onClick={resetFilters} type="button">
          Reset filters / Сбросить
        </button>
      </div>

      <div className="questionGrid">
        {filteredQuestions.map((question) => (
          <Card key={question.id}>
            <CardHeader>
              <div className="questionCardMeta">
                <span className="difficultyBadge">{question.difficulty}</span>
                <span>{question.category}</span>
              </div>
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
          <p>Change the filters or reset the library.</p>
          <button className="resetFilters" onClick={resetFilters} type="button">
            Reset filters / Сбросить
          </button>
        </div>
      ) : null}
    </div>
  );
}
