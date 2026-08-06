import { top100Questions } from "@/../content/questions/top100";
import { FavoriteQuestionsPage } from "@/features/track-question-progress";

export default function BookmarksPage() {
  return <FavoriteQuestionsPage questions={top100Questions} />;
}
