"use client";

import { ExternalLink } from "lucide-react";
import Link from "next/link";

import type { Question } from "@/entities/question";
import { QuestionProgressControls } from "@/features/track-question-progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui";

import { getTranslations } from "../model/translations";
import { useSettings } from "../model/use-settings";

export interface QuestionCategorySummary {
  readonly name: string;
  readonly slug: string;
  readonly count: number;
}

export function LocalizedCategoriesPage({ categories }: { categories: readonly QuestionCategorySummary[] }) {
  const { language } = useSettings();
  const copy = getTranslations(language).categories;

  return (
    <section className="routePage" aria-labelledby="categories-title">
      <div className="routeHero">
        <p className="eyebrow">{copy.eyebrow}</p>
        <h1 id="categories-title">{copy.title}</h1>
        <p className="lead">{copy.lead}</p>
      </div>
      <div className="questionGrid">
        {categories.map((category) => (
          <Card key={category.slug}>
            <CardHeader><CardTitle>{category.name}</CardTitle></CardHeader>
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

export function LocalizedCategoryPage({ questions, categoryName }: { questions: readonly Question[]; categoryName: string }) {
  const { language } = useSettings();
  const copy = getTranslations(language).categories;

  return (
    <section className="routePage" aria-labelledby="category-title">
      <div className="routeHero">
        <Link className="backLink" href="/questions/categories">← {copy.back}</Link>
        <p className="eyebrow">{copy.categoryEyebrow}</p>
        <h1 id="category-title">{categoryName}</h1>
        <p className="lead">{copy.orderedLead(questions.length)}</p>
      </div>
      <div className="questionGrid">
        {questions.map((question) => (
          <Card key={question.id}>
            <CardHeader>
              <span className="difficultyBadge">{question.difficulty}</span>
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

  return (
    <article className="questionDetails">
      <Link className="backLink" href="/questions">← {copy.back}</Link>
      <header className="questionDetailsHeader">
        <div className="questionMeta"><span>{question.category}</span><span>{question.difficulty}</span></div>
        <h1>{question.title}</h1>
        <p className="lead">{question.explanation}</p>
      </header>
      <QuestionProgressControls questionId={question.id} />
      <section className="detailSection"><h2>{copy.interviewerGoal}</h2><p>{question.interviewerGoal}</p></section>
      <section className="detailSection"><h2>{copy.expectedAnswer}</h2><p>{question.expectedAnswer}</p></section>
      <section className="detailSection">
        <h2>{copy.examples}</h2>
        <div className="answerExampleGrid">{question.answerExamples.map((example) => <div className="answerExample" key={example.level}><strong>{example.level}</strong><p>{example.answer}</p></div>)}</div>
      </section>
      <div className="detailColumns">
        <section className="detailSection"><h2>{copy.mistakes}</h2><ul>{question.mistakes.map((mistake) => <li key={mistake}>{mistake}</li>)}</ul></section>
        <section className="detailSection"><h2>{copy.followUps}</h2><ul>{question.followUpQuestions.map((followUp) => <li key={followUp}>{followUp}</li>)}</ul></section>
      </div>
      {question.practicalExample ? <section className="detailSection detailHighlight"><h2>{copy.practicalExample}</h2><p>{question.practicalExample}</p></section> : null}
      <section className="detailSection">
        <h2>{copy.sources}</h2>
        <ul className="sourceList">{question.sources.map((source) => <li key={source.url}><a href={source.url} rel="noreferrer" target="_blank">{source.title}<ExternalLink aria-hidden="true" size={14} /></a></li>)}</ul>
      </section>
    </article>
  );
}
