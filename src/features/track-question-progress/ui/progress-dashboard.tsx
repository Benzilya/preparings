"use client";

import Link from "next/link";

import { summarizeProgress } from "../model/storage";
import { useQuestionProgress } from "../model/use-question-progress";

export function ProgressDashboard({ totalQuestions }: { totalQuestions: number }) {
  const { records, reset, exportJson } = useQuestionProgress();
  const summary = summarizeProgress(totalQuestions, records);
  const completion = totalQuestions === 0 ? 0 : Math.round((summary.completed / totalQuestions) * 100);

  const downloadProgress = () => {
    const blob = new Blob([exportJson()], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "qa-interview-trainer-progress.json";
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="progressDashboard" aria-labelledby="progress-title">
      <div className="progressDashboardHeader">
        <div>
          <p className="eyebrow">Local progress / Локальный прогресс</p>
          <h2 id="progress-title">Your preparation snapshot / Сводка подготовки</h2>
        </div>
        <div className="progressActions">
          <button onClick={downloadProgress} type="button">Export / Экспорт</button>
          <button onClick={reset} type="button">Reset / Сбросить</button>
        </div>
      </div>

      <div className="metrics">
        <article className="metric"><strong>{completion}%</strong><span>Completed / Завершено</span></article>
        <article className="metric"><strong>{summary.learning}</strong><span>Learning / Изучается</span></article>
        <article className="metric"><strong>{summary.favorites}</strong><span>Favorites / Избранное</span></article>
      </div>

      <Link className="button" href="/questions">Open Question Library / Открыть базу вопросов</Link>
    </section>
  );
}
