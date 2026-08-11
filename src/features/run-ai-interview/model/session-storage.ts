import type { InterviewSession, InterviewSessionRepository } from "@/entities/interview-session";

export const interviewSessionStorageKey = "qa-interview-trainer:ai-interview-session:v1";
export const interviewSessionChangedEvent = "ai-interview-session:changed";

function isInterviewSession(value: unknown): value is InterviewSession {
  if (!value || typeof value !== "object") return false;
  const session = value as Partial<InterviewSession>;
  return (
    typeof session.id === "string" &&
    (session.status === "idle" || session.status === "running" || session.status === "completed") &&
    Boolean(session.config) &&
    Array.isArray(session.questionIds) &&
    Array.isArray(session.turns) &&
    typeof session.currentQuestionIndex === "number" &&
    typeof session.createdAt === "string" &&
    typeof session.updatedAt === "string"
  );
}

export const interviewSessionStorage: InterviewSessionRepository = {
  read(): InterviewSession | null {
    if (typeof window === "undefined") return null;

    try {
      const raw = window.localStorage.getItem(interviewSessionStorageKey);
      if (!raw) return null;
      const parsed: unknown = JSON.parse(raw);
      return isInterviewSession(parsed) ? parsed : null;
    } catch {
      return null;
    }
  },

  write(session: InterviewSession): void {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(interviewSessionStorageKey, JSON.stringify(session));
    window.dispatchEvent(new window.CustomEvent(interviewSessionChangedEvent));
  },

  clear(): void {
    if (typeof window === "undefined") return;
    window.localStorage.removeItem(interviewSessionStorageKey);
    window.dispatchEvent(new window.CustomEvent(interviewSessionChangedEvent));
  },
};
