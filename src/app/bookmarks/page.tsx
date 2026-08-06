import { seedQuestions } from "@/../content/questions/seed";
import { FavoriteQuestionsPage } from "@/features/track-question-progress";

export default function BookmarksPage() {
  return <FavoriteQuestionsPage questions={seedQuestions} />;
}
