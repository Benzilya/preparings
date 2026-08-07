import { notFound } from "next/navigation";

import { top100Questions } from "@/../content/questions/top100";
import { LocalizedQuestionDetails } from "@/features/manage-settings/ui/localized-question-surfaces";

export function generateStaticParams() {
  return top100Questions.map((question) => ({ slug: question.slug }));
}

export default async function QuestionDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const question = top100Questions.find((item) => item.slug === slug);
  if (!question) notFound();
  return <LocalizedQuestionDetails question={question} />;
}
