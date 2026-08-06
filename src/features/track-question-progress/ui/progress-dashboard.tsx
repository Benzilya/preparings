"use client";

import Link from "next/link";

import { getTranslations, useSettings } from "@/features/manage-settings";

import { summarizeProgress } from "../model/storage";
import { useQuestionProgress } from "../model/use-question-progress";

export function ProgressDashboard({ totalQuestions }: { totalQuestions: number }) {
  const { language } = useSettings();
  const copy = getTranslations(language).dashboard;
  const { records, reset, exportJson } = useQuestionProgress();
  const summary = summarizeProgress(totalQuestions, records);
  const completion =
    totalQuestions === 0 ? 0 : Math.round((summary.completed / totalQuestions) * 100);

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
          <p className="eyebrow">{copy.localProgress}</p>
          <h2 id="progress-title">{copy.snapshot}</h2>
        </div>
        <div className="progressActions">
          <button onClick={downloadProgress} type="button">
            {copy.export}
          </button>
          <button onClick={reset} type="button">
            {copy.reset}
          </button>
        </div>
      </div>

      <div className="metrics">
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
      </div>

      <Link className="button" href="/questions">
        {copy.openLibrary}
      </Link>
    </section>
  );
}
