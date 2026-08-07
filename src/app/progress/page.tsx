import { questionLibraryQuestions } from "@/../content/questions";
import { ProgressPage } from "@/features/track-question-progress";

export default function ProgressRoute() {
  return <ProgressPage questions={questionLibraryQuestions} />;
}
