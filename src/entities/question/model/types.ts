export type QuestionDifficulty = "junior" | "middle" | "senior";

export interface QuestionSource {
  readonly title: string;
  readonly url: string;
  readonly publisher?: string;
  readonly publishedAt?: string;
}

export interface InterviewAnswerExample {
  readonly level: QuestionDifficulty;
  readonly answer: string;
}

export interface Question {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly category: string;
  readonly categorySlug: string;
  readonly tags: readonly string[];
  readonly difficulty: QuestionDifficulty;
  readonly popularityRank: number;
  readonly sourcesCount: number;
  readonly sources: readonly QuestionSource[];
  readonly explanation: string;
  readonly interviewerGoal: string;
  readonly expectedAnswer: string;
  readonly alternativeAnswers: readonly string[];
  readonly answerExamples: readonly InterviewAnswerExample[];
  readonly mistakes: readonly string[];
  readonly followUpQuestions: readonly string[];
  readonly relatedTopics: readonly string[];
  readonly practicalExample?: string;
  readonly experienceExample?: string;
  readonly updatedAt: string;
}

export interface QuestionCategory {
  readonly name: string;
  readonly slug: string;
  readonly questions: readonly Question[];
}
