import type { QuestionLanguage } from "@/entities/question";

const setupCopy = {
  ru: {
    eyebrow: "AI-интервью",
    title: "Настройте адаптивное QA-интервью.",
    lead: "Выберите уровень, темы и длительность. Сессия будет собрана из существующей базы вопросов и сохранена локально в браузере.",
    level: "Уровень",
    language: "Язык интервью",
    categories: "Темы",
    allCategories: "Все темы",
    questionCount: "Количество вопросов",
    duration: "Длительность",
    minutes: "мин",
    mode: "Режим",
    adaptiveMode: "Структурированное + адаптивное",
    adaptiveHint:
      "Интервью идёт по выбранному плану, но уточняющие вопросы зависят от качества ваших ответов.",
    summary: "Параметры сессии",
    available: "Доступно вопросов",
    selected: "Будет выбрано",
    start: "Подготовить интервью",
    prepared: "Сессия подготовлена",
    preparedHint:
      "Настройки и список вопросов сохранены локально. На следующем этапе подключим экран прохождения интервью.",
    insufficient:
      "Для выбранных параметров недостаточно вопросов. Уменьшите количество или расширьте темы.",
    russian: "Русский",
    english: "English",
    junior: "Junior",
    middle: "Middle",
    senior: "Senior",
  },
  en: {
    eyebrow: "AI Interview",
    title: "Configure an adaptive QA interview.",
    lead: "Choose the level, topics, and duration. The session will use the existing question library and stay local in your browser.",
    level: "Level",
    language: "Interview language",
    categories: "Topics",
    allCategories: "All topics",
    questionCount: "Question count",
    duration: "Duration",
    minutes: "min",
    mode: "Mode",
    adaptiveMode: "Structured + adaptive",
    adaptiveHint:
      "The interview follows a selected plan while follow-up questions adapt to the quality of your answers.",
    summary: "Session settings",
    available: "Questions available",
    selected: "Questions selected",
    start: "Prepare interview",
    prepared: "Session prepared",
    preparedHint:
      "The settings and question list are saved locally. The next stage will add the live interview screen.",
    insufficient:
      "There are not enough questions for these settings. Reduce the count or broaden the topics.",
    russian: "Russian",
    english: "English",
    junior: "Junior",
    middle: "Middle",
    senior: "Senior",
  },
} as const;

export function getInterviewSetupCopy(language: QuestionLanguage) {
  return setupCopy[language];
}
