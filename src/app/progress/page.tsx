import { top100Questions } from "@/../content/questions/top100";
import { ProgressPage } from "@/features/track-question-progress";

export default function ProgressRoute() {
  return <ProgressPage questions={top100Questions} />;
}
