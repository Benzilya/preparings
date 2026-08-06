import type {
  ProgressSummary,
  QuestionProgressRecord,
  QuestionProgressStatus,
} from "@/entities/progress";

const storageKey = "qa-interview-trainer:question-progress:v1";

function isStatus(value: unknown): value is QuestionProgressStatus {
  return value === "not-started" || value === "learning" || value === "completed";
}

function isRecord(value: unknown): value is QuestionProgressRecord {
  if (!value || typeof value !== "object") return false;
  const record = value as Partial<QuestionProgressRecord>;

  return (
    typeof record.questionId === "string" &&
    isStatus(record.status) &&
    typeof record.favorite === "boolean" &&
    typeof record.updatedAt === "string"
  );
}

export function readQuestionProgress(): readonly QuestionProgressRecord[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(isRecord) : [];
  } catch {
    return [];
  }
}

export function writeQuestionProgress(records: readonly QuestionProgressRecord[]): void {
  window.localStorage.setItem(storageKey, JSON.stringify(records));
  window.dispatchEvent(new CustomEvent("question-progress:changed"));
}

export function upsertQuestionProgress(
  questionId: string,
  patch: Partial<Pick<QuestionProgressRecord, "favorite" | "status">>,
): readonly QuestionProgressRecord[] {
  const records = readQuestionProgress();
  const existing = records.find((record) => record.questionId === questionId);
  const next: QuestionProgressRecord = {
    questionId,
    favorite: patch.favorite ?? existing?.favorite ?? false,
    status: patch.status ?? existing?.status ?? "not-started",
    updatedAt: new Date().toISOString(),
  };
  const updated = [...records.filter((record) => record.questionId !== questionId), next];
  writeQuestionProgress(updated);
  return updated;
}

export function summarizeProgress(
  total: number,
  records: readonly QuestionProgressRecord[],
): ProgressSummary {
  return {
    total,
    learning: records.filter((record) => record.status === "learning").length,
    completed: records.filter((record) => record.status === "completed").length,
    favorites: records.filter((record) => record.favorite).length,
  };
}
