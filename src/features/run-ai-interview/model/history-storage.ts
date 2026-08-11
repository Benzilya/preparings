import type { InterviewSession } from "@/entities/interview-session";

export const interviewHistoryStorageKey = "qa-interview-trainer:ai-interview-history:v1";
export const interviewHistoryChangedEvent = "ai-interview-history:changed";

const historyLimit = 20;

function isCompletedSession(value: unknown): value is InterviewSession {
  if (!value || typeof value !== "object") return false;
  const session = value as Partial<InterviewSession>;
  return (
    typeof session.id === "string" &&
    session.status === "completed" &&
    Boolean(session.config) &&
    Array.isArray(session.questionIds) &&
    Array.isArray(session.turns) &&
    typeof session.completedAt === "string" &&
    typeof session.createdAt === "string" &&
    typeof session.updatedAt === "string"
  );
}

function parseHistory(raw: string | null): InterviewSession[] {
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter(isCompletedSession)
      .sort((left, right) =>
        (right.completedAt ?? right.updatedAt).localeCompare(left.completedAt ?? left.updatedAt),
      );
  } catch {
    return [];
  }
}

export const interviewHistoryStorage = {
  read(): InterviewSession[] {
    if (typeof window === "undefined") return [];
    return parseHistory(window.localStorage.getItem(interviewHistoryStorageKey));
  },

  save(session: InterviewSession): void {
    if (typeof window === "undefined" || session.status !== "completed") return;
    const existing = this.read().filter((item) => item.id !== session.id);
    const next = [session, ...existing].slice(0, historyLimit);
    window.localStorage.setItem(interviewHistoryStorageKey, JSON.stringify(next));
    window.dispatchEvent(new window.CustomEvent(interviewHistoryChangedEvent));
  },

  clear(): void {
    if (typeof window === "undefined") return;
    window.localStorage.removeItem(interviewHistoryStorageKey);
    window.dispatchEvent(new window.CustomEvent(interviewHistoryChangedEvent));
  },
};
