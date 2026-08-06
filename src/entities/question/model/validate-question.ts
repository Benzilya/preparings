import type { Question, QuestionDifficulty } from "./types";

export class QuestionValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "QuestionValidationError";
  }
}

const difficulties = new Set<QuestionDifficulty>(["junior", "middle", "senior"]);
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function assertNonEmptyStringArray(value: unknown, field: keyof Question): void {
  if (!Array.isArray(value) || value.length === 0 || !value.every(isNonEmptyString)) {
    throw new QuestionValidationError(
      `Question field '${field}' must contain at least one non-empty string.`,
    );
  }
}

export function validateQuestion(value: unknown): Question {
  if (!value || typeof value !== "object") {
    throw new QuestionValidationError("Question must be an object.");
  }

  const question = value as Partial<Question>;
  const requiredStrings: Array<keyof Question> = [
    "id",
    "slug",
    "title",
    "category",
    "categorySlug",
    "difficulty",
    "explanation",
    "interviewerGoal",
    "expectedAnswer",
    "updatedAt",
  ];

  for (const field of requiredStrings) {
    if (!isNonEmptyString(question[field])) {
      throw new QuestionValidationError(`Question field '${field}' must be a non-empty string.`);
    }
  }

  if (!slugPattern.test(question.slug as string) || !slugPattern.test(question.categorySlug as string)) {
    throw new QuestionValidationError("Question and category slugs must use lowercase kebab-case.");
  }

  if (!difficulties.has(question.difficulty as QuestionDifficulty)) {
    throw new QuestionValidationError("Question difficulty must be junior, middle, or senior.");
  }

  for (const field of [
    "tags",
    "alternativeAnswers",
    "mistakes",
    "followUpQuestions",
    "relatedTopics",
  ] as const) {
    assertNonEmptyStringArray(question[field], field);
  }

  if (!Array.isArray(question.answerExamples) || question.answerExamples.length === 0) {
    throw new QuestionValidationError("Question must contain answer examples.");
  }

  if (
    !question.answerExamples.every(
      (example) =>
        example &&
        difficulties.has(example.level) &&
        isNonEmptyString(example.answer),
    )
  ) {
    throw new QuestionValidationError("Every answer example must have a valid level and answer.");
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
