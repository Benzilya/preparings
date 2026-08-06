import type {
  ProgressSummary,
  QuestionProgressRecord,
  QuestionProgressStatus,
} from "@/entities/progress";

const storageKey = "qa-interview-trainer:question-progress:v1";
const changedEvent = "question-progress:changed";

function isStatus(value: unknown): value is QuestionProgressStatus {
  return value === "not-started" || value === "learning" || value === "completed";
}

function isRecord(value: unknown): value is QuestionProgressRecord {
  if (!value || typeof value !== "object") return false;
  const record = value as Partial<QuestionProgressRecord>;

  return (
    typeof record.questionId === "string" &&
    record.questionId.length > 0 &&
    isStatus(record.status) &&
    typeof record.favorite === "boolean" &&
    typeof record.updatedAt === "string" &&
    !Number.isNaN(Date.parse(record.updatedAt))
  );
}

function normalizeRecords(
  records: readonly QuestionProgressRecord[],
): readonly QuestionProgressRecord[] {
  const latestByQuestion = new Map<string, QuestionProgressRecord>();

  for (const record of records) {
    const existing = latestByQuestion.get(record.questionId);
    if (!existing || record.updatedAt.localeCompare(existing.updatedAt) >= 0) {
      latestByQuestion.set(record.questionId, record);
    }
  }

  return [...latestByQuestion.values()].toSorted((left, right) =>
    left.questionId.localeCompare(right.questionId, "en"),
  );
}

export function parseQuestionProgress(raw: string): readonly QuestionProgressRecord[] {
  let parsed: unknown;

  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error("Progress file is not valid JSON.");
  }

  if (!parsed || typeof parsed !== "object") {
    throw new Error("Progress file must contain an object.");
  }

  const payload = parsed as { version?: unknown; records?: unknown };
  if (payload.version !== 1 || !Array.isArray(payload.records)) {
    throw new Error("Unsupported progress file format.");
  }

  const records = payload.records.filter(isRecord);
  if (records.length !== payload.records.length) {
    throw new Error("Progress file contains invalid records.");
  }

  return normalizeRecords(records);
}

function notifyProgressChanged(): void {
  window.dispatchEvent(new CustomEvent(changedEvent));
}

export function readQuestionProgress(): readonly QuestionProgressRecord[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? normalizeRecords(parsed.filter(isRecord)) : [];
  } catch {
    return [];
  }
}

export function writeQuestionProgress(records: readonly QuestionProgressRecord[]): void {
  window.localStorage.setItem(storageKey, JSON.stringify(normalizeRecords(records)));
  notifyProgressChanged();
}

export function clearQuestionProgress(): void {
  window.localStorage.removeItem(storageKey);
  notifyProgressChanged();
}

export function exportQuestionProgress(): string {
  return JSON.stringify(
    {
      version: 1,
      exportedAt: new Date().toISOString(),
      records: readQuestionProgress(),
    },
    null,
    2,
  );
}

export function importQuestionProgress(raw: string): readonly QuestionProgressRecord[] {
  const normalized = parseQuestionProgress(raw);
  writeQuestionProgress(normalized);
  return normalized;
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
  return normalizeRecords(updated);
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
