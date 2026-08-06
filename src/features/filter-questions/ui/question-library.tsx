"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import React, { useMemo, useState } from "react";

import type { Question, QuestionDifficulty } from "@/entities/question";
import type { QuestionProgressStatus } from "@/entities/progress";
import { getTranslations, useSettings } from "@/features/manage-settings";
import { useQuestionProgress } from "@/features/track-question-progress";
import { Card, CardContent, CardHeader, CardTitle, Input } from "@/shared/ui";

const difficultyOptions: readonly (QuestionDifficulty | "all")[] = [
  "all",
  "junior",
  "middle",
  "senior",
];

type SortOption = "popularity" | "updated" | "title";
type ProgressFilter = QuestionProgressStatus | "all" | "favorites";

function compareQuestions(left: Question, right: Question, sort: SortOption): number {
  let result = 0;
  if (sort === "title") result = left.title.localeCompare(right.title, "en");
  if (sort === "updated") result = right.updatedAt.localeCompare(left.updatedAt);
  if (sort === "popularity") result = left.popularityRank - right.popularityRank;
  return result || left.slug.localeCompare(right.slug, "en");
}

export function QuestionLibrary({ questions }: { questions: readonly Question[] }) {
  const { records } = useQuestionProgress();
  const { language } = useSettings();
  const copy = getTranslations(language).questionLibrary;
  const [query, setQuery] = useState("");
  const [difficulty, setDifficulty] = useState<QuestionDifficulty | "all">("all");
  const [category, setCategory] = useState("all");
  const [progress, setProgress] = useState<ProgressFilter>("all");
  const [sort, setSort] = useState<SortOption>("popularity");

  const categories = useMemo(
    () => ["all", ...new Set(questions.map((question) => question.category))].toSorted(),
    [questions],
  );
  const progressByQuestion = useMemo(
    () => new Map(records.map((record) => [record.questionId, record])),
    [records],
  );

  const filteredQuestions = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return questions
      .filter((question) => {
        const record = progressByQuestion.get(question.id);
        const status = record?.status ?? "not-started";
        const matchesProgress =
          progress === "all" ||
          (progress === "favorites" ? record?.favorite === true : status === progress);
        const matchesDifficulty = difficulty === "all" || question.difficulty === difficulty;
        const matchesCategory = category === "all" || question.category === category;
        const searchableText = [question.title, question.category, ...question.tags]
          .join(" ")
          .toLowerCase();
        const matchesQuery =
          normalizedQuery.length === 0 || searchableText.includes(normalizedQuery);

        return matchesProgress && matchesDifficulty && matchesCategory && matchesQuery;
      })
      .toSorted((left, right) => compareQuestions(left, right, sort));
  }, [category, difficulty, progress, progressByQuestion, query, questions, sort]);

  const resetFilters = () => {
    setQuery("");
    setDifficulty("all");
    setCategory("all");
    setProgress("all");
    setSort("popularity");
  };

  return (
    <div className="questionLibrary">
      <div className="questionFilters" aria-label={copy.filters}>
        <label className="searchField">
          <Search aria-hidden="true" size={18} />
          <span className="srOnly">{copy.searchLabel}</span>
          <Input
            onChange={(event) => setQuery(event.target.value)}
            placeholder={copy.searchPlaceholder}
            type="search"
            value={query}
          />
        </label>

        <label className="filterField">
          <span>{copy.level}</span>
          <select
            onChange={(event) => setDifficulty(event.target.value as QuestionDifficulty | "all")}
            value={difficulty}
          >
            {difficultyOptions.map((option) => (
              <option key={option} value={option}>
                {option === "all" ? copy.all : option}
              </option>
            ))}
          </select>
        </label>
        <label className="filterField">
          <span>{copy.category}</span>
          <select onChange={(event) => setCategory(event.target.value)} value={category}>
            {categories.map((option) => (
              <option key={option} value={option}>
                {option === "all" ? copy.all : option}
              </option>
            ))}
          </select>
        </label>
        <label className="filterField">
          <span>{copy.progress}</span>
          <select
            onChange={(event) => setProgress(event.target.value as ProgressFilter)}
            value={progress}
          >
            <option value="all">{copy.all}</option>
            <option value="not-started">{copy.notStarted}</option>
            <option value="learning">{copy.learning}</option>
            <option value="completed">{copy.completed}</option>
            <option value="favorites">{copy.favorites}</option>
          </select>
        </label>
        <label className="filterField">
          <span>{copy.sort}</span>
          <select onChange={(event) => setSort(event.target.value as SortOption)} value={sort}>
            <option value="popularity">{copy.popularity}</option>
            <option value="updated">{copy.recentlyUpdated}</option>
            <option value="title">{copy.title}</option>
          </select>
        </label>
      </div>

      <div className="questionResultsBar">
        <p className="resultCount" aria-live="polite">
          {filteredQuestions.length} / {questions.length} {copy.questions}
        </p>
        <button className="resetFilters" onClick={resetFilters} type="button">
          {copy.reset}
        </button>
      </div>

      <div className="questionGrid">
        {filteredQuestions.map((question) => {
          const record = progressByQuestion.get(question.id);
          return (
            <Card key={question.id}>
              <CardHeader>
                <div className="questionCardMeta">
                  <span className="difficultyBadge">{question.difficulty}</span>
                  <Link href={`/questions/categories/${question.categorySlug}`}>
                    {question.category}
                  </Link>
                </div>
                <CardTitle>{question.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{question.explanation}</p>
                <div className="questionState">
                  <span>{record?.status ?? copy.notStarted}</span>
                  {record?.favorite ? <span>★ {copy.favorite}</span> : null}
                </div>
                <div className="tagList" aria-label={copy.tags}>
                  {question.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <Link className="questionLink" href={`/questions/${question.slug}`}>
                  {copy.openQuestion}
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredQuestions.length === 0 ? (
        <div className="emptyState">
          <strong>{copy.emptyTitle}</strong>
          <p>{copy.emptyBody}</p>
          <button className="resetFilters" onClick={resetFilters} type="button">
            {copy.reset}
          </button>
        </div>
      ) : null}
    </div>
  );
}
