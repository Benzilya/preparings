export type QuestionProgressStatus = "not-started" | "learning" | "completed";

export interface QuestionProgressRecord {
  readonly questionId: string;
  readonly status: QuestionProgressStatus;
  readonly favorite: boolean;
  readonly updatedAt: string;
}

export interface ProgressSummary {
  readonly total: number;
  readonly learning: number;
  readonly completed: number;
  readonly favorites: number;
}
