import { seedQuestions } from "@/../content/questions/seed";
import { ProgressPage } from "@/features/track-question-progress";

export default function ProgressRoute() {
  return <ProgressPage questions={seedQuestions} />;
}
