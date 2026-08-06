import { notFound } from "next/navigation";

import { seedQuestions } from "@/../content/questions/seed";
import { LocalizedQuestionDetails } from "@/features/manage-settings/ui/localized-question-surfaces";

export function generateStaticParams() {
  return seedQuestions.map((question) => ({ slug: question.slug }));
}

export default async function QuestionDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const question = seedQuestions.find((item) => item.slug === slug);

  if (!question) notFound();

  return <LocalizedQuestionDetails question={question} />;
}
