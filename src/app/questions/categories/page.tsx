import { questionLibraryQuestions } from "@/../content/questions";
import type { LocalizedText } from "@/entities/question";
import { LocalizedCategoriesPage } from "@/features/manage-settings/ui/localized-question-surfaces";

const categories = Array.from(
  questionLibraryQuestions.reduce((map, question) => {
    const current = map.get(question.categorySlug) ?? {
      name: question.category,
      slug: question.categorySlug,
      count: 0,
    };
    map.set(question.categorySlug, { ...current, count: current.count + 1 });
    return map;
  }, new Map<string, { name: LocalizedText; slug: string; count: number }>()),
  ([, category]) => category,
).toSorted((left, right) => left.slug.localeCompare(right.slug, "en"));

export default function QuestionCategoriesPage() {
  return <LocalizedCategoriesPage categories={categories} />;
}
