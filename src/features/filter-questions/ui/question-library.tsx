"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import React, { useMemo, useState } from "react";

import {
  localizeQuestion,
  type LocalizedQuestion,
  type Question,
  type QuestionDifficulty,
} from "@/entities/question";
import type { QuestionProgressStatus } from "@/entities/progress";
import {
  getQuestionContentTranslations,
  getTranslations,
  useSettings,
} from "@/features/manage-settings";
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

function compareQuestions(
  left: LocalizedQuestion,
  right: LocalizedQuestion,
  sort: SortOption,
  locale: string,
): number {
  let result = 0;
  if (sort === "title") result = left.title.localeCompare(right.title, locale);
  if (sort === "updated") result = right.updatedAt.localeCompare(left.updatedAt);
  if (sort === "popularity") result = left.popularityRank - right.popularityRank;
  return result || left.slug.localeCompare(right.slug, "en");
}

export function QuestionLibrary({ questions }: { questions: readonly Question[] }) {
  const { records } = useQuestionProgress();
  const { language } = useSettings();
  const copy = getTranslations(language).questionLibrary;
  const contentCopy = getQuestionContentTranslations(language);
  const [query, setQuery] = useState("");
  const [difficulty, setDifficulty] = useState<QuestionDifficulty | "all">("all");
  const [category, setCategory] = useState("all");
  const [progress, setProgress] = useState<ProgressFilter>("all");
  const [sort, setSort] = useState<SortOption>("popularity");

  const localizedQuestions = useMemo(
    () => questions.map((question) => localizeQuestion(question, language)),
    [language, questions],
  );
  const categories = useMemo(() => {
    const entries = new Map<string, string>();
    for (const question of localizedQuestions) {
      entries.set(question.categorySlug, question.category);
    }
    return [...entries].toSorted((left, right) => left[1].localeCompare(right[1], language));
  }, [language, localizedQuestions]);
  const progressByQuestion = useMemo(
    () => new Map(records.map((record) => [record.questionId, record])),
    [records],
  );

  const statusLabel = (status: QuestionProgressStatus | undefined): string => {
    if (status === "learning") return copy.learning;
    if (status === "completed") return copy.completed;
    return copy.notStarted;
  };

  const filteredQuestions = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase(language);

    return localizedQuestions
      .filter((question) => {
        const record = progressByQuestion.get(question.id);
        const status = record?.status ?? "not-started";
        const matchesProgress =
          progress === "all" ||
          (progress === "favorites" ? record?.favorite === true : status === progress);
        const matchesDifficulty = difficulty === "all" || question.difficulty === difficulty;
        const matchesCategory = category === "all" || question.categorySlug === category;
        const searchableText = [
          question.title,
          question.category,
          ...question.tags.map((tag) => tag.label),
          question.explanation,
          question.interviewerGoal,
          question.expectedAnswer,
          ...question.alternativeAnswers,
          ...question.answerExamples.map((example) => example.answer),
          ...question.relatedTopics,
        ]
          .join(" ")
          .toLocaleLowerCase(language);

        return (
          matchesProgress &&
          matchesDifficulty &&
          matchesCategory &&
          (normalizedQuery.length === 0 || searchableText.includes(normalizedQuery))
        );
      })
      .toSorted((left, right) => compareQuestions(left, right, sort, language));
  }, [category, difficulty, language, localizedQuestions, progress, progressByQuestion, query, sort]);

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
                {option === "all" ? copy.all : contentCopy.difficulty[option]}
              </option>
            ))}
          </select>
        </label>
        <label className="filterField">
          <span>{copy.category}</span>
          <select onChange={(event) => setCategory(event.target.value)} value={category}>
            <option value="all">{copy.all}</option>
            {categories.map(([slug, label]) => (
              <option key={slug} value={slug}>
                {label}
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
                  <span className="difficultyBadge">
                    {contentCopy.difficulty[question.difficulty]}
                  </span>
                  <Link href={`/questions/categories/${question.categorySlug}`}>
                    {question.category}
                  </Link>
                </div>
                <CardTitle>{question.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{question.explanation}</p>
                <div className="questionState">
                  <span>{statusLabel(record?.status)}</span>
                  {record?.favorite ? <span>★ {copy.favorite}</span> : null}
                </div>
                <div className="tagList" aria-label={copy.tags}>
                  {question.tags.map((tag) => (
                    <span key={tag.key}>{tag.label}</span>
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
