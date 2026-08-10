import type {
  InterviewFeedback,
  InterviewSession,
  InterviewSessionConfig,
  InterviewTurn,
  InterviewTurnKind,
} from "./types";

export interface CreateInterviewSessionInput {
  readonly id: string;
  readonly config: InterviewSessionConfig;
  readonly questionIds: readonly string[];
  readonly now: string;
}

export function createInterviewSession({
  id,
  config,
  questionIds,
  now,
}: CreateInterviewSessionInput): InterviewSession {
  if (questionIds.length === 0) {
    throw new Error("Interview session requires at least one question");
  }

  if (config.questionCount < 1 || config.questionCount > questionIds.length) {
    throw new Error("Interview question count must fit the selected question set");
  }

  return {
    id,
    status: "idle",
    config,
    questionIds: questionIds.slice(0, config.questionCount),
    turns: [],
    currentQuestionIndex: 0,
    createdAt: now,
    updatedAt: now,
  };
}

export function startInterviewSession(session: InterviewSession, now: string): InterviewSession {
  if (session.status !== "idle") return session;

  return {
    ...session,
    status: "running",
    startedAt: now,
    updatedAt: now,
  };
}

export function appendInterviewTurn(
  session: InterviewSession,
  input: {
    readonly id: string;
    readonly kind: InterviewTurnKind;
    readonly questionId: string;
    readonly prompt: string;
    readonly now: string;
  },
): InterviewSession {
  if (session.status !== "running") {
    throw new Error("Interview turns can only be added to a running session");
  }

  const turn: InterviewTurn = {
    id: input.id,
    kind: input.kind,
    questionId: input.questionId,
    prompt: input.prompt,
    createdAt: input.now,
  };

  return {
    ...session,
    turns: [...session.turns, turn],
    updatedAt: input.now,
  };
}

export function recordInterviewTurnAnswer(
  session: InterviewSession,
  input: {
    readonly turnId: string;
    readonly answer: string;
    readonly now: string;
  },
): InterviewSession {
  if (session.status !== "running") {
    throw new Error("Interview answers can only be recorded for a running session");
  }

  const answer = input.answer.trim();
  if (!answer) throw new Error("Interview answer cannot be empty");

  const turnIndex = session.turns.findIndex((turn) => turn.id === input.turnId);
  if (turnIndex < 0) throw new Error("Interview turn was not found");

  const existing = session.turns[turnIndex];
  if (existing.answer) throw new Error("Interview turn is already answered");

  const turns = [...session.turns];
  turns[turnIndex] = {
    ...existing,
    answer,
    answeredAt: input.now,
  };

  return {
    ...session,
    turns,
    updatedAt: input.now,
  };
}

export function advanceInterviewQuestion(session: InterviewSession, now: string): InterviewSession {
  if (session.status !== "running") {
    throw new Error("Interview can only advance while running");
  }

  const currentTurn = [...session.turns]
    .reverse()
    .find((turn) => turn.questionId === session.questionIds[session.currentQuestionIndex]);
  if (!currentTurn?.answer) {
    throw new Error("Current interview question must be answered before advancing");
  }

  const nextQuestionIndex = Math.min(
    session.currentQuestionIndex + 1,
    session.questionIds.length - 1,
  );

  return {
    ...session,
    currentQuestionIndex: nextQuestionIndex,
    updatedAt: now,
  };
}

export function answerInterviewTurn(
  session: InterviewSession,
  input: {
    readonly turnId: string;
    readonly answer: string;
    readonly feedback: InterviewFeedback;
    readonly now: string;
  },
): InterviewSession {
  if (session.status !== "running") {
    throw new Error("Interview answers can only be recorded for a running session");
  }

  const turnIndex = session.turns.findIndex((turn) => turn.id === input.turnId);
  if (turnIndex < 0) throw new Error("Interview turn was not found");

  const existing = session.turns[turnIndex];
  if (existing.answer) throw new Error("Interview turn is already answered");

  const turns = [...session.turns];
  turns[turnIndex] = {
    ...existing,
    answer: input.answer.trim(),
    feedback: input.feedback,
    answeredAt: input.now,
  };

  const shouldAdvance = input.feedback.decision === "next-question";
  const nextQuestionIndex = shouldAdvance
    ? Math.min(session.currentQuestionIndex + 1, session.questionIds.length - 1)
    : session.currentQuestionIndex;

  return {
    ...session,
    turns,
    currentQuestionIndex: nextQuestionIndex,
    updatedAt: input.now,
  };
}

export function completeInterviewSession(session: InterviewSession, now: string): InterviewSession {
  if (session.status === "completed") return session;

  return {
    ...session,
    status: "completed",
    completedAt: now,
    updatedAt: now,
  };
}
