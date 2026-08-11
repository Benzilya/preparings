import type { QuestionLanguage } from "@/entities/question";

const resultsCopy = {
  ru: {
    title: "Результат интервью",
    average: "Средний балл",
    correctness: "Корректность",
    completeness: "Полнота",
    clarity: "Ясность",
    depth: "Глубина",
    answers: "Ответы и оценки",
    history: "История AI-интервью",
    historyEmpty: "Завершённых интервью пока нет.",
    openResult: "Открыть результат",
    closeResult: "Закрыть результат",
    clearHistory: "Очистить историю",
    completedAt: "Завершено",
    level: "Уровень",
    questions: "Вопросов",
  },
  en: {
    title: "Interview result",
    average: "Average score",
    correctness: "Correctness",
    completeness: "Completeness",
    clarity: "Clarity",
    depth: "Depth",
    answers: "Answers and scores",
    history: "AI interview history",
    historyEmpty: "No completed interviews yet.",
    openResult: "Open result",
    closeResult: "Close result",
    clearHistory: "Clear history",
    completedAt: "Completed",
    level: "Level",
    questions: "Questions",
  },
} as const;

export function getInterviewResultsCopy(language: QuestionLanguage) {
  return resultsCopy[language];
}
