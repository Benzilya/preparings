import type { QuestionLanguage } from "@/entities/question";

const runnerCopy = {
  ru: {
    eyebrow: "AI-интервью",
    title: "Прохождение интервью",
    idleLead: "Сессия подготовлена. Начните, когда будете готовы отвечать без подсказок.",
    runningLead:
      "Отвечайте своими словами. При настроенном API ответ оценит AI; без ключа автоматически используется локальный адаптивный движок.",
    start: "Начать интервью",
    restartSetup: "Настроить заново",
    question: "Вопрос",
    of: "из",
    answerLabel: "Ваш ответ",
    answerPlaceholder: "Введите развёрнутый ответ…",
    saveAndContinue: "Оценить ответ",
    finish: "Оценить финальный ответ",
    evaluating: "Оцениваем ответ…",
    aiEvaluated: "Ответ оценён AI",
    mockEvaluated: "AI недоступен — использована локальная оценка",
    history: "История ответов",
    noHistory: "Ответов пока нет.",
    saved: "Ответ оценён",
    completed: "Сессия завершена",
    completedHint:
      "Ответы и оценки сохранены. При наличии OPENAI_API_KEY используется server-side AI; локальный движок остаётся безопасным резервным режимом.",
    missingSession: "Подготовленная сессия не найдена.",
    backToSetup: "Вернуться к настройке",
    progress: "Прогресс интервью",
    feedback: "Оценка ответа",
    totalScore: "Итоговый балл",
    strengths: "Сильные стороны",
    gaps: "Что улучшить",
    followUp: "Уточняющий вопрос",
  },
  en: {
    eyebrow: "AI Interview",
    title: "Interview session",
    idleLead: "The session is prepared. Start when you are ready to answer without hints.",
    runningLead:
      "Answer in your own words. With the API configured, AI evaluates the response; without a key the local adaptive engine is used automatically.",
    start: "Start interview",
    restartSetup: "Configure again",
    question: "Question",
    of: "of",
    answerLabel: "Your answer",
    answerPlaceholder: "Write a detailed answer…",
    saveAndContinue: "Evaluate answer",
    finish: "Evaluate final answer",
    evaluating: "Evaluating answer…",
    aiEvaluated: "Answer evaluated by AI",
    mockEvaluated: "AI unavailable — local evaluation used",
    history: "Answer history",
    noHistory: "No answers yet.",
    saved: "Answer evaluated",
    completed: "Session completed",
    completedHint:
      "Answers and scores are saved. With OPENAI_API_KEY configured, server-side AI is used; the local engine remains a safe fallback.",
    missingSession: "Prepared session was not found.",
    backToSetup: "Back to setup",
    progress: "Interview progress",
    feedback: "Answer feedback",
    totalScore: "Total score",
    strengths: "Strengths",
    gaps: "What to improve",
    followUp: "Follow-up question",
  },
} as const;

export function getInterviewRunnerCopy(language: QuestionLanguage) {
  return runnerCopy[language];
}
