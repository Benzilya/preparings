import type { QuestionLanguage } from "@/entities/question";

const runnerCopy = {
  ru: {
    eyebrow: "AI-интервью",
    title: "Прохождение интервью",
    idleLead: "Сессия подготовлена. Начните, когда будете готовы отвечать без подсказок.",
    runningLead:
      "Отвечайте своими словами. На следующем этапе ответы будет оценивать адаптивный движок.",
    start: "Начать интервью",
    restartSetup: "Настроить заново",
    question: "Вопрос",
    of: "из",
    answerLabel: "Ваш ответ",
    answerPlaceholder: "Введите развёрнутый ответ…",
    saveAndContinue: "Сохранить ответ и продолжить",
    finish: "Завершить интервью",
    history: "История ответов",
    noHistory: "Ответов пока нет.",
    saved: "Ответ сохранён",
    completed: "Сессия завершена",
    completedHint:
      "Ответы сохранены локально. На следующих этапах добавим оценку и итоговый отчёт.",
    missingSession: "Подготовленная сессия не найдена.",
    backToSetup: "Вернуться к настройке",
    progress: "Прогресс интервью",
  },
  en: {
    eyebrow: "AI Interview",
    title: "Interview session",
    idleLead: "The session is prepared. Start when you are ready to answer without hints.",
    runningLead:
      "Answer in your own words. The adaptive engine will evaluate responses in the next stage.",
    start: "Start interview",
    restartSetup: "Configure again",
    question: "Question",
    of: "of",
    answerLabel: "Your answer",
    answerPlaceholder: "Write a detailed answer…",
    saveAndContinue: "Save answer and continue",
    finish: "Finish interview",
    history: "Answer history",
    noHistory: "No answers yet.",
    saved: "Answer saved",
    completed: "Session completed",
    completedHint:
      "Answers are saved locally. Scoring and the final report will be added in the next stages.",
    missingSession: "Prepared session was not found.",
    backToSetup: "Back to setup",
    progress: "Interview progress",
  },
} as const;

export function getInterviewRunnerCopy(language: QuestionLanguage) {
  return runnerCopy[language];
}
