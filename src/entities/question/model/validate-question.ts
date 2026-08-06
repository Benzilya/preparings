import type { Question } from "./types";

export class QuestionValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "QuestionValidationError";
  }
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
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

  if (!Array.isArray(question.tags) || question.tags.length === 0) {
    throw new QuestionValidationError("Question must contain at least one tag.");
  }

  if (!Array.isArray(question.sources) || question.sources.length === 0) {
    throw new QuestionValidationError("Question must contain at least one source.");
  }

  if (typeof question.popularityRank !== "number" || question.popularityRank < 0) {
    throw new QuestionValidationError("Question popularityRank must be a non-negative number.");
  }

  if (question.sourcesCount !== question.sources.length) {
    throw new QuestionValidationError("Question sourcesCount must match sources.length.");
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
