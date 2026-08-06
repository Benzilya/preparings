"use client";

import Link from "next/link";
import { ChangeEvent, useMemo, useState } from "react";

import type { Question } from "@/entities/question";

import { summarizeProgress } from "../model/storage";
import { useQuestionProgress } from "../model/use-question-progress";

const resetConfirmationText = "DELETE";

function getDateKey(value: string): string {
  return new Date(value).toISOString().slice(0, 10);
}

function formatActivityDate(value: string): string {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${value}T00:00:00`));
}

export function ProgressPage({ questions }: { questions: readonly Question[] }) {
  const { records, reset, exportJson, importJson } = useQuestionProgress();
  const [message, setMessage] = useState("");
  const [resetPending, setResetPending] = useState(false);
  const [resetConfirmation, setResetConfirmation] = useState("");
  const summary = summarizeProgress(questions.length, records);

  const recordsByQuestion = useMemo(
    () => new Map(records.map((record) => [record.questionId, record])),
    [records],
  );

  const categoryStats = useMemo(() => {
    return [...new Set(questions.map((question) => question.category))]
      .map((category) => {
        const categoryQuestions = questions.filter((question) => question.category === category);
        const completed = categoryQuestions.filter(
          (question) => recordsByQuestion.get(question.id)?.status === "completed",
        ).length;
        const learning = categoryQuestions.filter(
          (question) => recordsByQuestion.get(question.id)?.status === "learning",
        ).length;
        return { category, total: categoryQuestions.length, completed, learning };
      })
      .toSorted((left, right) => left.category.localeCompare(right.category, "en"));
  }, [questions, recordsByQuestion]);

  const activityGroups = useMemo(() => {
    const groups = new Map<
      string,
      Array<{ record: (typeof records)[number]; question: Question }>
    >();

    records
      .toSorted((left, right) => right.updatedAt.localeCompare(left.updatedAt))
      .forEach((record) => {
        const question = questions.find((item) => item.id === record.questionId);
        if (!question) return;
        const dateKey = getDateKey(record.updatedAt);
        const items = groups.get(dateKey) ?? [];
        items.push({ record, question });
        groups.set(dateKey, items);
      });

    return [...groups.entries()].slice(0, 7);
  }, [questions, records]);

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
      setMessage("Progress imported / Прогресс импортирован");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Import failed / Ошибка импорта");
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
    setMessage("Progress reset / Прогресс сброшен");
  };

  const completion =
    questions.length === 0 ? 0 : Math.round((summary.completed / questions.length) * 100);

  return (
    <div className="progressPage">
      <header className="routeHero">
        <p className="eyebrow">Progress / Прогресс</p>
        <h1>Your preparation data / Данные подготовки</h1>
        <p className="lead">
          Local, private statistics grouped by category, plus recent activity and portable backups.
        </p>
      </header>

      <section className="metrics" aria-label="Progress summary / Сводка прогресса">
        <article className="metric">
          <strong>{completion}%</strong>
          <span>Completed / Завершено</span>
        </article>
        <article className="metric">
          <strong>{summary.learning}</strong>
          <span>Learning / Изучается</span>
        </article>
        <article className="metric">
          <strong>{summary.favorites}</strong>
          <span>Favorites / Избранное</span>
        </article>
      </section>

      <section className="progressPanel">
        <div className="progressPanelHeader">
          <div>
            <p className="cardLabel">Backup / Резервная копия</p>
            <h2>Import and export / Импорт и экспорт</h2>
          </div>
          <div className="progressActions">
            <button onClick={downloadProgress} type="button">
              Export JSON / Экспорт
            </button>
            <label className="progressImport">
              Import JSON / Импорт
              <input accept="application/json,.json" onChange={handleImport} type="file" />
            </label>
            {!resetPending ? (
              <button onClick={() => setResetPending(true)} type="button">
                Reset / Сбросить
              </button>
            ) : null}
          </div>
        </div>

        {resetPending ? (
          <div className="resetConfirmation" role="alert">
            <div>
              <strong>Delete all local progress? / Удалить весь локальный прогресс?</strong>
              <p>
                Type <code>{resetConfirmationText}</code> to confirm. This cannot be undone unless
                you exported a backup.
              </p>
              <label className="resetConfirmationField">
                <span>Confirmation / Подтверждение</span>
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
                Cancel / Отмена
              </button>
              <button
                className="dangerAction"
                disabled={resetConfirmation !== resetConfirmationText}
                onClick={confirmReset}
                type="button"
              >
                Delete progress / Удалить
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
            <p className="cardLabel">Categories / Категории</p>
            <h2>Coverage by topic / Покрытие по темам</h2>
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
                    {item.completed} completed · {item.learning} learning · {item.total} total
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
            <p className="cardLabel">Activity / Активность</p>
            <h2>History by date / История по датам</h2>
          </div>
        </div>
        {activityGroups.length ? (
          <div className="activityGroups">
            {activityGroups.map(([date, items]) => (
              <section className="activityGroup" key={date}>
                <h3>{formatActivityDate(date)}</h3>
                <div className="recentProgressList">
                  {items.map(({ record, question }) => (
                    <Link href={`/questions/${question.slug}`} key={record.questionId}>
                      <strong>{question.title}</strong>
                      <span>
                        {record.status}
                        {record.favorite ? " · favorite" : ""} ·{" "}
                        {new Date(record.updatedAt).toLocaleTimeString("ru-RU", {
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
          <p className="progressEmpty">No activity yet / Активности пока нет</p>
        )}
      </section>
    </div>
  );
}
