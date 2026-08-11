import type { QuestionLanguage } from "@/entities/question";

const runnerCopy = {
  ru: {
    eyebrow: "AI-интервью",
    title: "Прохождение интервью",
    idleLead: "Сессия подготовлена. Начните, когда будете готовы отвечать без подсказок.",
    runningLead:
      "Отвечайте своими словами. Локальный адаптивный движок оценит ответ и решит, нужен ли уточняющий вопрос.",
    start: "Начать интервью",
    restartSetup: "Настроить заново",
    question: "Вопрос",
    of: "из",
    answerLabel: "Ваш ответ",
    answerPlaceholder: "Введите развёрнутый ответ…",
    saveAndContinue: "Оценить ответ",
    finish: "Оценить финальный ответ",
    history: "История ответов",
    noHistory: "Ответов пока нет.",
    saved: "Ответ оценён",
    completed: "Сессия завершена",
    completedHint:
      "Ответы и локальные оценки сохранены. На следующем этапе подключим реальную AI-модель через server-side API.",
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
      "Answer in your own words. The local adaptive engine will score the response and decide whether a follow-up is needed.",
    start: "Start interview",
    restartSetup: "Configure again",
    question: "Question",
    of: "of",
    answerLabel: "Your answer",
    answerPlaceholder: "Write a detailed answer…",
    saveAndContinue: "Evaluate answer",
    finish: "Evaluate final answer",
    history: "Answer history",
    noHistory: "No answers yet.",
    saved: "Answer evaluated",
    completed: "Session completed",
    completedHint:
      "Answers and local scores are saved. The next stage will connect the real AI model through a server-side API.",
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
