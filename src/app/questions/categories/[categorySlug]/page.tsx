import Link from "next/link";
import { notFound } from "next/navigation";

import { seedQuestions } from "@/../content/questions/seed";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui";

export function generateStaticParams() {
  return [...new Set(seedQuestions.map((question) => question.categorySlug))].map(
    (categorySlug) => ({ categorySlug }),
  );
}

export default async function QuestionCategoryPage({
  params,
}: {
  params: Promise<{ categorySlug: string }>;
}) {
  const { categorySlug } = await params;
  const questions = seedQuestions
    .filter((question) => question.categorySlug === categorySlug)
    .toSorted(
      (left, right) =>
        left.popularityRank - right.popularityRank || left.slug.localeCompare(right.slug, "en"),
    );

  if (questions.length === 0) notFound();

  const categoryName = questions[0]?.category;

  return (
    <section className="routePage" aria-labelledby="category-title">
      <div className="routeHero">
        <Link className="backLink" href="/questions/categories">
          ← Categories / Категории
        </Link>
        <p className="eyebrow">Question category / Категория вопросов</p>
        <h1 id="category-title">{categoryName}</h1>
        <p className="lead">
          {questions.length} validated question{questions.length === 1 ? "" : "s"} ordered by
          popularity with a stable slug tie-breaker.
        </p>
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
              <Link className="questionLink" href={`/questions/${question.slug}`}>
                Open question / Открыть вопрос →
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
