import { validateQuestions } from "@/entities/question/model/validate-question";

import { superBaseQuestions } from "./super-base";
import { top100Questions } from "./top100";

export { superBaseQuestions } from "./super-base";
export { top100Questions } from "./top100";

const top100Ids = new Set(top100Questions.map((question) => question.id));
const top100Slugs = new Set(top100Questions.map((question) => question.slug));

export const supplementalQuestions = superBaseQuestions.filter(
  (question) => !top100Ids.has(question.id) && !top100Slugs.has(question.slug),
);

export const questionLibraryQuestions = validateQuestions([
  ...top100Questions,
  ...supplementalQuestions,
]).toSorted(
  (left, right) =>
    left.popularityRank - right.popularityRank || left.slug.localeCompare(right.slug, "en"),
);
