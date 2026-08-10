import type { QuestionDifficulty, QuestionLanguage } from "@/entities/question";

export type InterviewSessionStatus = "idle" | "running" | "completed";
export type InterviewMode = "structured-adaptive";
export type InterviewTurnKind = "question" | "follow-up";
export type InterviewDecision = "follow-up" | "next-question" | "complete";

export interface InterviewSessionConfig {
  readonly language: QuestionLanguage;
  readonly difficulty: QuestionDifficulty;
  readonly mode: InterviewMode;
  readonly questionCount: number;
  readonly categorySlugs: readonly string[];
  readonly durationMinutes?: number;
}

export interface InterviewScore {
  readonly correctness: number;
  readonly completeness: number;
  readonly clarity: number;
  readonly depth: number;
  readonly total: number;
}

export interface InterviewFeedback {
  readonly score: InterviewScore;
  readonly strengths: readonly string[];
  readonly gaps: readonly string[];
  readonly summary: string;
  readonly decision: InterviewDecision;
}

export interface InterviewTurn {
  readonly id: string;
  readonly kind: InterviewTurnKind;
  readonly questionId: string;
  readonly prompt: string;
  readonly answer?: string;
  readonly feedback?: InterviewFeedback;
  readonly createdAt: string;
  readonly answeredAt?: string;
}

export interface InterviewSession {
  readonly id: string;
  readonly status: InterviewSessionStatus;
  readonly config: InterviewSessionConfig;
  readonly questionIds: readonly string[];
  readonly turns: readonly InterviewTurn[];
  readonly currentQuestionIndex: number;
  readonly startedAt?: string;
  readonly completedAt?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface InterviewSessionRepository {
  read(): InterviewSession | null;
  write(session: InterviewSession): void;
  clear(): void;
}
