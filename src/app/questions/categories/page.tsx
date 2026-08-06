import { seedQuestions } from "@/../content/questions/seed";
import { LocalizedCategoriesPage } from "@/features/manage-settings/ui/localized-question-surfaces";

const categories = Array.from(
  seedQuestions.reduce((map, question) => {
    const current = map.get(question.categorySlug) ?? {
      name: question.category,
      slug: question.categorySlug,
      count: 0,
    };
    map.set(question.categorySlug, { ...current, count: current.count + 1 });
    return map;
  }, new Map<string, { name: string; slug: string; count: number }>()),
  ([, category]) => category,
).toSorted((left, right) => left.name.localeCompare(right.name, "en"));

export default function QuestionCategoriesPage() {
  return <LocalizedCategoriesPage categories={categories} />;
}
