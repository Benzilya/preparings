"use client";

import { questionLibraryQuestions } from "@/../content/questions";
import { QuestionLibrary } from "@/features/filter-questions";
import { getQuestionContentTranslations, useSettings } from "@/features/manage-settings";

export default function QuestionsPage() {
  const { language } = useSettings();
  const copy = getQuestionContentTranslations(language).library;

  return (
    <section className="routePage" aria-labelledby="questions-title">
      <div className="routeHero">
        <p className="eyebrow">{copy.eyebrow}</p>
        <h1 id="questions-title">{copy.title}</h1>
        <p className="lead">{copy.lead}</p>
        <p className="resultCount">
          {copy.topCount}: <strong>{questionLibraryQuestions.length}</strong>
        </p>
      </div>

      <QuestionLibrary questions={questionLibraryQuestions} />
    </section>
  );
}
