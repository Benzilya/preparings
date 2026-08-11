import type { InterviewFeedback } from "@/entities/interview-session";
import type { LocalizedQuestion, QuestionLanguage } from "@/entities/question";

export interface InterviewEvaluationRequest {
  readonly question: LocalizedQuestion;
  readonly answer: string;
  readonly language: QuestionLanguage;
  readonly isLastQuestion: boolean;
}

export interface InterviewEvaluationResult {
  readonly feedback: InterviewFeedback;
  readonly followUpPrompt?: string;
  readonly source: "openai" | "mock";
}

export interface InterviewEvaluationApiResponse {
  readonly feedback: InterviewFeedback;
  readonly followUpPrompt?: string;
}

export async function evaluateInterviewAnswerWithApi(
  input: InterviewEvaluationRequest,
): Promise<InterviewEvaluationApiResponse | null> {
  try {
    const response = await fetch("/api/interview/evaluate", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(input),
    });

    if (!response.ok) return null;
    return (await response.json()) as InterviewEvaluationApiResponse;
  } catch {
    return null;
  }
}
