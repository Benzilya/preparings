import { notFound } from "next/navigation";

import { questionLibraryQuestions } from "@/../content/questions";
import { LocalizedQuestionDetails } from "@/features/manage-settings/ui/localized-question-surfaces";

export function generateStaticParams() {
  return questionLibraryQuestions.map((question) => ({ slug: question.slug }));
}

export default async function QuestionDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const question = questionLibraryQuestions.find((item) => item.slug === slug);
  if (!question) notFound();
  return <LocalizedQuestionDetails question={question} />;
}
