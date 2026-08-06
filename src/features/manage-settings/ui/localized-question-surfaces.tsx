"use client";

import { ExternalLink } from "lucide-react";
import Link from "next/link";

import {
  localizeQuestion,
  localizeText,
  type LocalizedText,
  type Question,
} from "@/entities/question";
import { QuestionProgressControls } from "@/features/track-question-progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui";

import { getQuestionContentTranslations } from "../model/question-content-translations";
import { getTranslations } from "../model/translations";
import { useSettings } from "../model/use-settings";

export interface QuestionCategorySummary {
  readonly name: LocalizedText;
  readonly slug: string;
  readonly count: number;
}

export function LocalizedCategoriesPage({ categories }: { categories: readonly QuestionCategorySummary[] }) {
  const { language } = useSettings();
  const copy = getTranslations(language).categories;
  const localizedCategories = categories
    .map((category) => ({ ...category, label: localizeText(category.name, language) }))
    .toSorted((left, right) => left.label.localeCompare(right.label, language));

  return (
    <section className="routePage" aria-labelledby="categories-title">
      <div className="routeHero">
        <p className="eyebrow">{copy.eyebrow}</p>
        <h1 id="categories-title">{copy.title}</h1>
        <p className="lead">{copy.lead}</p>
      </div>
      <div className="questionGrid">
        {localizedCategories.map((category) => (
          <Card key={category.slug}>
            <CardHeader><CardTitle>{category.label}</CardTitle></CardHeader>
            <CardContent>
              <p>{category.count} {category.count === 1 ? copy.question : copy.questions}</p>
              <Link className="questionLink" href={`/questions/categories/${category.slug}`}>{copy.openCategory}</Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

export function LocalizedCategoryPage({ questions, categoryName }: { questions: readonly Question[]; categoryName: LocalizedText }) {
  const { language } = useSettings();
  const copy = getTranslations(language).categories;
  const contentCopy = getQuestionContentTranslations(language);
  const localizedQuestions = questions.map((question) => localizeQuestion(question, language));

  return (
    <section className="routePage" aria-labelledby="category-title">
      <div className="routeHero">
        <Link className="backLink" href="/questions/categories">← {copy.back}</Link>
        <p className="eyebrow">{copy.categoryEyebrow}</p>
        <h1 id="category-title">{localizeText(categoryName, language)}</h1>
        <p className="lead">{copy.orderedLead(questions.length)}</p>
      </div>
      <div className="questionGrid">
        {localizedQuestions.map((question) => (
          <Card key={question.id}>
            <CardHeader>
              <span className="difficultyBadge">{contentCopy.difficulty[question.difficulty]}</span>
              <CardTitle>{question.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{question.explanation}</p>
              <Link className="questionLink" href={`/questions/${question.slug}`}>{copy.openQuestion}</Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

export function LocalizedQuestionDetails({ question }: { question: Question }) {
  const { language } = useSettings();
  const copy = getTranslations(language).questionDetails;
  const contentCopy = getQuestionContentTranslations(language);
  const localized = localizeQuestion(question, language);

  return (
    <article className="questionDetails">
      <Link className="backLink" href="/questions">← {copy.back}</Link>
      <header className="questionDetailsHeader">
        <div className="questionMeta">
          <span>{localized.category}</span>
          <span>{contentCopy.difficulty[localized.difficulty]}</span>
        </div>
        <h1>{localized.title}</h1>
        <p className="lead">{localized.explanation}</p>
      </header>
      <QuestionProgressControls questionId={localized.id} />
      <section className="detailSection"><h2>{copy.interviewerGoal}</h2><p>{localized.interviewerGoal}</p></section>
      <section className="detailSection"><h2>{copy.expectedAnswer}</h2><p>{localized.expectedAnswer}</p></section>
      <section className="detailSection">
        <h2>{copy.examples}</h2>
        <div className="answerExampleGrid">
          {localized.answerExamples.map((example) => (
            <div className="answerExample" key={example.level}>
              <strong>{contentCopy.difficulty[example.level]}</strong><p>{example.answer}</p>
            </div>
          ))}
        </div>
      </section>
      <div className="detailColumns">
        <section className="detailSection"><h2>{copy.mistakes}</h2><ul>{localized.mistakes.map((mistake) => <li key={mistake}>{mistake}</li>)}</ul></section>
        <section className="detailSection"><h2>{copy.followUps}</h2><ul>{localized.followUpQuestions.map((followUp) => <li key={followUp}>{followUp}</li>)}</ul></section>
      </div>
      {localized.practicalExample ? <section className="detailSection detailHighlight"><h2>{copy.practicalExample}</h2><p>{localized.practicalExample}</p></section> : null}
      <section className="detailSection">
        <h2>{copy.sources}</h2>
        <ul className="sourceList">{localized.sources.map((source) => <li key={source.url}><a href={source.url} rel="noreferrer" target="_blank">{source.title}<ExternalLink aria-hidden="true" size={14} /></a></li>)}</ul>
      </section>
    </article>
  );
}
