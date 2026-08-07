import { notFound } from "next/navigation";

import { top100Questions } from "@/../content/questions/top100";
import { LocalizedCategoryPage } from "@/features/manage-settings/ui/localized-question-surfaces";

export function generateStaticParams() {
  return [...new Set(top100Questions.map((question) => question.categorySlug))].map(
    (categorySlug) => ({ categorySlug }),
  );
}

export default async function QuestionCategoryPage({
  params,
}: {
  params: Promise<{ categorySlug: string }>;
}) {
  const { categorySlug } = await params;
  const questions = top100Questions
    .filter((question) => question.categorySlug === categorySlug)
    .toSorted(
      (left, right) =>
        left.popularityRank - right.popularityRank || left.slug.localeCompare(right.slug, "en"),
    );
  if (questions.length === 0) notFound();
  return <LocalizedCategoryPage categoryName={questions[0]!.category} questions={questions} />;
}
