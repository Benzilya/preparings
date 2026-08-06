import Link from "next/link";

import { seedQuestions } from "@/../content/questions/seed";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui";

const categories = Array.from(
  seedQuestions.reduce((map, question) => {
    const current = map.get(question.categorySlug) ?? {
      name: question.category,
      slug: question.categorySlug,
      count: 0,
    };

    map.set(question.categorySlug, { ...current, count: current.count + 1 });
    return map;
  }, new Map<string, { name: string; slug: string; count: number }>()),
  ([, category]) => category,
).toSorted((left, right) => left.name.localeCompare(right.name, "en"));

export default function QuestionCategoriesPage() {
  return (
    <section className="routePage" aria-labelledby="categories-title">
      <div className="routeHero">
        <p className="eyebrow">Categories / Категории</p>
        <h1 id="categories-title">Browse QA knowledge by domain.</h1>
        <p className="lead">
          Each category has a stable slug and a deterministic list of validated questions.
        </p>
      </div>

      <div className="questionGrid">
        {categories.map((category) => (
          <Card key={category.slug}>
            <CardHeader>
              <CardTitle>{category.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                {category.count} question{category.count === 1 ? "" : "s"} / вопросов
              </p>
              <Link className="questionLink" href={`/questions/categories/${category.slug}`}>
                Open category / Открыть категорию →
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
