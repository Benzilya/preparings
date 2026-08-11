import type { InterviewFeedback } from "@/entities/interview-session";
import type {
  LocalizedQuestion,
  QuestionDifficulty,
  QuestionLanguage,
} from "@/entities/question";

export interface InterviewEvaluationRequest {
  readonly question: LocalizedQuestion;
  readonly answer: string;
  readonly language: QuestionLanguage;
  readonly difficulty: QuestionDifficulty;
  readonly isLastQuestion: boolean;
  readonly followUpCount: number;
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

export function enforceAdaptiveDecisionLimit(
  evaluation: InterviewEvaluationApiResponse,
  input: Pick<InterviewEvaluationRequest, "followUpCount" | "isLastQuestion">,
): InterviewEvaluationApiResponse {
  if (evaluation.feedback.decision !== "follow-up" || input.followUpCount < 1) {
    return evaluation;
  }

  const decision = input.isLastQuestion ? "complete" : "next-question";
  return {
    feedback: {
      ...evaluation.feedback,
      decision,
    },
    followUpPrompt: undefined,
  };
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
    const evaluation = (await response.json()) as InterviewEvaluationApiResponse;
    return enforceAdaptiveDecisionLimit(evaluation, input);
  } catch {
    return null;
  }
}
