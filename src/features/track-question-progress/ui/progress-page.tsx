"use client";

import Link from "next/link";
import React, { ChangeEvent, useMemo, useState } from "react";

import { localizeQuestion, type Question } from "@/entities/question";
import { getTranslations, useSettings } from "@/features/manage-settings";

import { summarizeProgress } from "../model/storage";
import { useQuestionProgress } from "../model/use-question-progress";

const resetConfirmationText = "DELETE";

function getDateKey(value: string): string {
  return new Date(value).toISOString().slice(0, 10);
}

export function ProgressPage({ questions }: { questions: readonly Question[] }) {
  const { language } = useSettings();
  const copy = getTranslations(language).progress;
  const statusCopy = getTranslations(language).questionLibrary;
  const { records, reset, exportJson, importJson } = useQuestionProgress();
  const [message, setMessage] = useState("");
  const [resetPending, setResetPending] = useState(false);
  const [resetConfirmation, setResetConfirmation] = useState("");
  const summary = summarizeProgress(questions.length, records);
  const localizedQuestions = useMemo(
    () => questions.map((question) => localizeQuestion(question, language)),
    [language, questions],
  );

  const recordsByQuestion = useMemo(
    () => new Map(records.map((record) => [record.questionId, record])),
    [records],
  );

  const categoryStats = useMemo(() => {
    const categories = new Map<
      string,
      { category: string; total: number; completed: number; learning: number }
    >();
    for (const question of localizedQuestions) {
      const current = categories.get(question.categorySlug) ?? {
        category: question.category,
        total: 0,
        completed: 0,
        learning: 0,
      };
      const status = recordsByQuestion.get(question.id)?.status;
      categories.set(question.categorySlug, {
        ...current,
        total: current.total + 1,
        completed: current.completed + (status === "completed" ? 1 : 0),
        learning: current.learning + (status === "learning" ? 1 : 0),
      });
    }
    return [...categories.values()].toSorted((left, right) =>
      left.category.localeCompare(right.category, language),
    );
  }, [language, localizedQuestions, recordsByQuestion]);

  const activityGroups = useMemo(() => {
    const questionsById = new Map(localizedQuestions.map((question) => [question.id, question]));
    const groups = new Map<
      string,
      Array<{ record: (typeof records)[number]; question: (typeof localizedQuestions)[number] }>
    >();
    records
      .toSorted((left, right) => right.updatedAt.localeCompare(left.updatedAt))
      .forEach((record) => {
        const question = questionsById.get(record.questionId);
        if (!question) return;
        const dateKey = getDateKey(record.updatedAt);
        groups.set(dateKey, [...(groups.get(dateKey) ?? []), { record, question }]);
      });
    return [...groups.entries()].slice(0, 7);
  }, [localizedQuestions, records]);

  const formatDate = (value: string) =>
    new Intl.DateTimeFormat(copy.locale, {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(`${value}T00:00:00`));

  const statusLabel = (status: string) => {
    if (status === "learning") return statusCopy.learning;
    if (status === "completed") return statusCopy.completed;
    return statusCopy.notStarted;
  };

  const downloadProgress = () => {
    const blob = new Blob([exportJson()], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "qa-interview-trainer-progress.json";
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      importJson(await file.text());
      setResetPending(false);
      setResetConfirmation("");
      setMessage(copy.imported);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : copy.importFailed);
    } finally {
      event.target.value = "";
    }
  };

  const cancelReset = () => {
    setResetPending(false);
    setResetConfirmation("");
  };

  const confirmReset = () => {
    if (resetConfirmation !== resetConfirmationText) return;
    reset();
    cancelReset();
    setMessage(copy.resetDone);
  };

  const completion =
    questions.length === 0 ? 0 : Math.round((summary.completed / questions.length) * 100);

  return (
    <div className="progressPage">
      <header className="routeHero">
        <p className="eyebrow">{copy.eyebrow}</p>
        <h1>{copy.title}</h1>
        <p className="lead">{copy.lead}</p>
      </header>

      <section className="metrics" aria-label={copy.summary}>
        <article className="metric">
          <strong>{completion}%</strong>
          <span>{copy.completed}</span>
        </article>
        <article className="metric">
          <strong>{summary.learning}</strong>
          <span>{copy.learning}</span>
        </article>
        <article className="metric">
          <strong>{summary.favorites}</strong>
          <span>{copy.favorites}</span>
        </article>
      </section>

      <section className="progressPanel">
        <div className="progressPanelHeader">
          <div>
            <p className="cardLabel">{copy.backup}</p>
            <h2>{copy.importExport}</h2>
          </div>
          <div className="progressActions">
            <button onClick={downloadProgress} type="button">
              {copy.exportJson}
            </button>
            <label className="progressImport">
              {copy.importJson}
              <input accept="application/json,.json" onChange={handleImport} type="file" />
            </label>
            {!resetPending ? (
              <button onClick={() => setResetPending(true)} type="button">
                {copy.reset}
              </button>
            ) : null}
          </div>
        </div>
        {resetPending ? (
          <div className="resetConfirmation" role="alert">
            <div>
              <strong>{copy.deleteTitle}</strong>
              <p>{copy.deleteHint}</p>
              <label className="resetConfirmationField">
                <span>{copy.confirmation}</span>
                <input
                  autoComplete="off"
                  onChange={(event) => setResetConfirmation(event.target.value)}
                  placeholder={resetConfirmationText}
                  value={resetConfirmation}
                />
              </label>
            </div>
            <div className="progressActions">
              <button onClick={cancelReset} type="button">
                {copy.cancel}
              </button>
              <button
                className="dangerAction"
                disabled={resetConfirmation !== resetConfirmationText}
                onClick={confirmReset}
                type="button"
              >
                {copy.deleteProgress}
              </button>
            </div>
          </div>
        ) : null}
        {message ? (
          <p className="progressMessage" role="status">
            {message}
          </p>
        ) : null}
      </section>

      <section className="progressPanel">
        <div className="progressPanelHeader">
          <div>
            <p className="cardLabel">{copy.categories}</p>
            <h2>{copy.coverage}</h2>
          </div>
        </div>
        <div className="categoryProgressList">
          {categoryStats.map((item) => {
            const percent = Math.round((item.completed / item.total) * 100);
            return (
              <article className="categoryProgressItem" key={item.category}>
                <div>
                  <strong>{item.category}</strong>
                  <span>
                    {item.completed} {copy.completedShort} · {item.learning} {copy.learningShort} ·{" "}
                    {item.total} {copy.totalShort}
                  </span>
                </div>
                <div className="progressBar" aria-label={`${item.category}: ${percent}%`}>
                  <span style={{ width: `${percent}%` }} />
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="progressPanel">
        <div className="progressPanelHeader">
          <div>
            <p className="cardLabel">{copy.activity}</p>
            <h2>{copy.history}</h2>
          </div>
        </div>
        {activityGroups.length ? (
          <div className="activityGroups">
            {activityGroups.map(([date, items]) => (
              <section className="activityGroup" key={date}>
                <h3>{formatDate(date)}</h3>
                <div className="recentProgressList">
                  {items.map(({ record, question }) => (
                    <Link href={`/questions/${question.slug}`} key={record.questionId}>
                      <strong>{question.title}</strong>
                      <span>
                        {statusLabel(record.status)}
                        {record.favorite ? ` · ${copy.favorite}` : ""} ·{" "}
                        {new Date(record.updatedAt).toLocaleTimeString(copy.locale, {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <p className="progressEmpty">{copy.noActivity}</p>
        )}
      </section>
    </div>
  );
}
