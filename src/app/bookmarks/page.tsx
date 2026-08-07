import { questionLibraryQuestions } from "@/../content/questions";
import { FavoriteQuestionsPage } from "@/features/track-question-progress";

export default function BookmarksPage() {
  return <FavoriteQuestionsPage questions={questionLibraryQuestions} />;
}
