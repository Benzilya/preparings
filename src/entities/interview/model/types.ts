import type { QuestionDifficulty } from "@/entities/question/model/types";

export type InterviewMode = "quick" | "full" | "company";
export type InterviewStatus = "draft" | "active" | "completed" | "cancelled";

export interface InterviewScore {
  readonly technicalAccuracy: number;
  readonly completeness: number;
  readonly communication: number;
  readonly confidence: number;
  readonly practicalExperience: number;
  readonly overall: number;
  readonly rationale: string;
}

export interface InterviewAnswer {
  readonly questionId: string;
  readonly answer: string;
  readonly score?: InterviewScore;
  readonly answeredAt: string;
}

export interface InterviewSession {
  readonly id: string;
  readonly mode: InterviewMode;
  readonly status: InterviewStatus;
  readonly difficulty: QuestionDifficulty;
  readonly company?: string;
  readonly questionIds: readonly string[];
  readonly answers: readonly InterviewAnswer[];
  readonly startedAt?: string;
  readonly completedAt?: string;
}

export interface InterviewResult {
  readonly sessionId: string;
  readonly overallScore: number;
  readonly strengths: readonly string[];
  readonly weaknesses: readonly string[];
  readonly missedConcepts: readonly string[];
  readonly recommendedTopics: readonly string[];
  readonly studyPlanId?: string;
}
