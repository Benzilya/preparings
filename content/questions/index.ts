import { validateQuestions } from "@/entities/question/model/validate-question";

import { superBaseQuestions } from "./super-base";
import { top100Questions } from "./top100";

export { superBaseQuestions } from "./super-base";
export { top100Questions } from "./top100";

export const questionLibraryQuestions = validateQuestions([
  ...top100Questions,
  ...superBaseQuestions,
]).toSorted(
  (left, right) =>
    left.popularityRank - right.popularityRank || left.slug.localeCompare(right.slug, "en"),
);
