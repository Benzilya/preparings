import type { InterviewFeedback } from "@/entities/interview-session";
import type { LocalizedQuestion, QuestionLanguage } from "@/entities/question";

const stopWords = new Set([
  "and",
  "the",
  "for",
  "with",
  "that",
  "this",
  "from",
  "are",
  "как",
  "что",
  "это",
  "для",
  "или",
  "при",
  "его",
  "она",
  "они",
]);

function tokenize(value: string): string[] {
  return value
    .toLocaleLowerCase()
    .replace(/[^a-zа-яё0-9+#.-]+/giu, " ")
    .split(/\s+/)
    .filter((token) => token.length >= 3 && !stopWords.has(token));
}

function clamp(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function unique(values: readonly string[]): string[] {
  return [...new Set(values)];
}

export interface MockInterviewEvaluation {
  readonly feedback: InterviewFeedback;
  readonly followUpPrompt?: string;
}

export function evaluateMockInterviewAnswer({
  question,
  answer,
  language,
  isLastQuestion,
}: {
  readonly question: LocalizedQuestion;
  readonly answer: string;
  readonly language: QuestionLanguage;
  readonly isLastQuestion: boolean;
}): MockInterviewEvaluation {
  const answerTokens = new Set(tokenize(answer));
  const expectedTokens = unique([
    ...tokenize(question.expectedAnswer),
    ...question.tags.flatMap((tag) => tokenize(tag.label)),
    ...question.relatedTopics.flatMap(tokenize),
  ]).slice(0, 24);

  const matched = expectedTokens.filter((token) => answerTokens.has(token));
  const coverage = expectedTokens.length === 0 ? 0 : matched.length / expectedTokens.length;
  const wordCount = answer.trim().split(/\s+/).filter(Boolean).length;

  const correctness = clamp(35 + coverage * 65);
  const completeness = clamp(20 + coverage * 70 + Math.min(wordCount, 80) / 8);
  const clarity = clamp(35 + Math.min(wordCount, 60) * 0.8);
  const depth = clamp(15 + coverage * 60 + Math.min(wordCount, 100) * 0.25);
  const total = clamp(correctness * 0.35 + completeness * 0.3 + clarity * 0.2 + depth * 0.15);

  const strong = total >= 72;
  const weak = total < 48;
  const decision = isLastQuestion && !weak ? "complete" : weak ? "follow-up" : "next-question";

  const strengths = matched
    .slice(0, 3)
    .map((token) =>
      language === "ru"
        ? `Упомянут важный аспект: ${token}.`
        : `Covered an important aspect: ${token}.`,
    );
  if (strengths.length === 0) {
    strengths.push(
      language === "ru"
        ? "Ответ дан по существу и может быть уточнён дальше."
        : "The answer addresses the question and can be refined further.",
    );
  }

  const missing = expectedTokens.filter((token) => !answerTokens.has(token)).slice(0, 3);
  const gaps = missing.map((token) =>
    language === "ru" ? `Можно раскрыть аспект: ${token}.` : `Consider covering: ${token}.`,
  );

  const summary =
    language === "ru"
      ? strong
        ? "Ответ достаточно полный для перехода дальше."
        : weak
          ? "Ответ требует уточнения: ключевые аспекты раскрыты недостаточно."
          : "Ответ в целом верный, но его можно сделать полнее и глубже."
      : strong
        ? "The answer is sufficiently complete to move forward."
        : weak
          ? "The answer needs clarification because key aspects are underdeveloped."
          : "The answer is generally sound but can be more complete and deeper.";

  const followUpPrompt =
    decision === "follow-up"
      ? (question.followUpQuestions[0] ??
        (language === "ru"
          ? "Раскройте ответ подробнее и приведите практический пример."
          : "Expand your answer and add a practical example."))
      : undefined;

  return {
    feedback: {
      score: { correctness, completeness, clarity, depth, total },
      strengths,
      gaps,
      summary,
      decision,
    },
    followUpPrompt,
  };
}
