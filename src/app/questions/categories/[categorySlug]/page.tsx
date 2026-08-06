import { notFound } from "next/navigation";

import { seedQuestions } from "@/../content/questions/seed";
import { LocalizedCategoryPage } from "@/features/manage-settings/ui/localized-question-surfaces";

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

  return <LocalizedCategoryPage categoryName={questions[0]?.category ?? ""} questions={questions} />;
}
