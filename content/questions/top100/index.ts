import { validateQuestions } from "@/entities/question/model/validate-question";
import type { Question, QuestionFrequencyTier, QuestionSource } from "@/entities/question";

import { seedQuestions } from "../seed";
import { rankingSources } from "../create-ranked-question";
import { top100Batch007025 } from "./batch-007-025";
import { top100Batch026045 } from "./batch-026-045";
import { top100Batch046065 } from "./batch-046-065";
import { top100Batch066085 } from "./batch-066-085";
import { top100Batch086100 } from "./batch-086-100";

const verifiedAt = "2026-08-07";
const evidenceByRank: Record<number, { frequencyTier: QuestionFrequencyTier; source: QuestionSource }> = {
  1: { frequencyTier: "very-common", source: rankingSources.katalon },
  2: { frequencyTier: "very-common", source: rankingSources.softwaretestpilot },
  3: { frequencyTier: "very-common", source: rankingSources.qodex },
  4: { frequencyTier: "very-common", source: rankingSources.threadqa },
  5: { frequencyTier: "very-common", source: rankingSources.techprep },
  6: { frequencyTier: "very-common", source: rankingSources.enigma },
};

const rankedLegacyQuestions: readonly Question[] = seedQuestions.map((question) => {
  const evidence = evidenceByRank[question.popularityRank];
  if (!evidence) return question;
  const sources = question.sources.some((source) => source.url === evidence.source.url)
    ? question.sources
    : [...question.sources, evidence.source];
  return {
    ...question,
    ranking: {
      frequencyTier: evidence.frequencyTier,
      verifiedAt,
      inclusionRationale: {
        ru: "Существующий вопрос сохранён с прежним ID и slug; тема регулярно повторяется в независимых интервью-подборках и остаётся частью основного рейтинга.",
        en: "The existing question retains its original ID and slug; the topic recurs across independent interview collections and remains in the primary ranking.",
      },
    },
    sources,
    sourcesCount: sources.length,
  };
});

export const top100Questions = validateQuestions([
  ...rankedLegacyQuestions,
  ...top100Batch007025,
  ...top100Batch026045,
  ...top100Batch046065,
  ...top100Batch066085,
  ...top100Batch086100,
]).toSorted((left, right) => left.popularityRank - right.popularityRank);

if (top100Questions.length !== 100) {
  throw new Error(`Top 100 ranking must contain exactly 100 questions; received ${top100Questions.length}.`);
}
