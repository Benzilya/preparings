"use client";

import Link from "next/link";

import { top100Questions } from "@/../content/questions/top100";
import { getTranslations, useSettings } from "@/features/manage-settings";
import { ProgressDashboard } from "@/features/track-question-progress";

export default function HomePage() {
  const { language } = useSettings();
  const copy = getTranslations(language).dashboard;

  return (
    <div className="dashboardPage">
      <section className="dashboardHero" aria-labelledby="dashboard-title">
        <div>
          <p className="eyebrow">{copy.eyebrow}</p>
          <h1 id="dashboard-title">{copy.title}</h1>
          <p className="lead">{copy.lead}</p>
        </div>
        <Link className="button buttonPrimary" href="/questions">
          {copy.openLibrary}
        </Link>
      </section>
      <ProgressDashboard totalQuestions={top100Questions.length} />
      <section className="moduleGrid" aria-label={copy.modulesLabel}>
        {copy.modules.map(([eyebrow, title, description]) => (
          <article className="card" key={eyebrow}>
            <p className="cardLabel">{eyebrow}</p>
            <h2>{title}</h2>
            <p>{description}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
