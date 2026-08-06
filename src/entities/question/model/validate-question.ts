import type {
  LocalizedTag,
  LocalizedText,
  Question,
  QuestionDifficulty,
  QuestionFrequencyTier,
} from "./types";

export class QuestionValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "QuestionValidationError";
  }
}

const difficulties = new Set<QuestionDifficulty>(["junior", "middle", "senior"]);
const frequencyTiers = new Set<QuestionFrequencyTier>([
  "very-common",
  "common",
  "frequent",
]);
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isLocalizedText(value: unknown): value is LocalizedText {
  if (!value || typeof value !== "object") return false;
  const text = value as Partial<LocalizedText>;
  return isNonEmptyString(text.ru) && isNonEmptyString(text.en);
}

function isLocalizedTag(value: unknown): value is LocalizedTag {
  if (!value || typeof value !== "object") return false;
  const tag = value as Partial<LocalizedTag>;
  return isNonEmptyString(tag.key) && slugPattern.test(tag.key) && isLocalizedText(tag.label);
}

function assertLocalizedTextArray(value: unknown, field: keyof Question): void {
  if (!Array.isArray(value) || value.length === 0 || !value.every(isLocalizedText)) {
    throw new QuestionValidationError(
      `Question field '${field}' must contain at least one complete ru/en text.`,
    );
  }
}

export function validateQuestion(value: unknown): Question {
  if (!value || typeof value !== "object") {
    throw new QuestionValidationError("Question must be an object.");
  }

  const question = value as Partial<Question>;
  for (const field of ["id", "slug", "categorySlug", "difficulty", "updatedAt"] as const) {
    if (!isNonEmptyString(question[field])) {
      throw new QuestionValidationError(`Question field '${field}' must be a non-empty string.`);
    }
  }

  for (const field of [
    "title",
    "category",
    "explanation",
    "interviewerGoal",
    "expectedAnswer",
  ] as const) {
    if (!isLocalizedText(question[field])) {
      throw new QuestionValidationError(`Question field '${field}' must contain ru and en text.`);
    }
  }

  if (
    !slugPattern.test(question.slug as string) ||
    !slugPattern.test(question.categorySlug as string)
  ) {
    throw new QuestionValidationError("Question and category slugs must use lowercase kebab-case.");
  }

  if (!difficulties.has(question.difficulty as QuestionDifficulty)) {
    throw new QuestionValidationError("Question difficulty must be junior, middle, or senior.");
  }

  if (
    !Array.isArray(question.tags) ||
    question.tags.length === 0 ||
    !question.tags.every(isLocalizedTag)
  ) {
    throw new QuestionValidationError(
      "Question tags must contain stable keys and complete ru/en labels.",
    );
  }

  for (const field of [
    "alternativeAnswers",
    "mistakes",
    "followUpQuestions",
    "relatedTopics",
  ] as const) {
    assertLocalizedTextArray(question[field], field);
  }

  if (!Array.isArray(question.answerExamples) || question.answerExamples.length === 0) {
    throw new QuestionValidationError("Question must contain answer examples.");
  }

  if (
    !question.answerExamples.every(
      (example) => example && difficulties.has(example.level) && isLocalizedText(example.answer),
    )
  ) {
    throw new QuestionValidationError(
      "Every answer example must have a valid level and complete ru/en answer.",
    );
  }

  if (question.practicalExample !== undefined && !isLocalizedText(question.practicalExample)) {
    throw new QuestionValidationError("Question practicalExample must contain ru and en text.");
  }
  if (question.experienceExample !== undefined && !isLocalizedText(question.experienceExample)) {
    throw new QuestionValidationError("Question experienceExample must contain ru and en text.");
  }

  if (!Array.isArray(question.sources) || question.sources.length === 0) {
    throw new QuestionValidationError("Question must contain at least one source.");
  }

  if (
    !question.sources.every(
      (source) =>
        source &&
        isNonEmptyString(source.title) &&
        isNonEmptyString(source.url) &&
        URL.canParse(source.url),
    )
  ) {
    throw new QuestionValidationError("Every source must contain a title and valid URL.");
  }

  if (!Number.isInteger(question.popularityRank) || (question.popularityRank as number) < 0) {
    throw new QuestionValidationError("Question popularityRank must be a non-negative integer.");
  }

  if (question.ranking !== undefined) {
    if (
      !frequencyTiers.has(question.ranking.frequencyTier) ||
      !isNonEmptyString(question.ranking.verifiedAt) ||
      Number.isNaN(Date.parse(question.ranking.verifiedAt)) ||
      !isLocalizedText(question.ranking.inclusionRationale)
    ) {
      throw new QuestionValidationError(
        "Question ranking must contain a valid frequency tier, verification date, and ru/en rationale.",
      );
    }
  }

  if (question.sourcesCount !== question.sources.length) {
    throw new QuestionValidationError("Question sourcesCount must match sources.length.");
  }

  if (Number.isNaN(Date.parse(question.updatedAt as string))) {
    throw new QuestionValidationError("Question updatedAt must be a valid date.");
  }

  return question as Question;
}

export function validateQuestions(values: readonly unknown[]): readonly Question[] {
  const ids = new Set<string>();
  const slugs = new Set<string>();

  return values.map((value) => {
    const question = validateQuestion(value);

    if (ids.has(question.id)) {
      throw new QuestionValidationError(`Duplicate question id '${question.id}'.`);
    }
    if (slugs.has(question.slug)) {
      throw new QuestionValidationError(`Duplicate question slug '${question.slug}'.`);
    }

    ids.add(question.id);
    slugs.add(question.slug);
    return question;
  });
}
