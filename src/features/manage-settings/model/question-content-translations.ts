import type { QuestionDifficulty } from "@/entities/question";

import type { InterfaceLanguage } from "./settings";

const questionContentDictionary = {
  ru: {
    library: {
      eyebrow: "База вопросов QA",
      title: "Изучайте проверенную базу знаний QA.",
      lead: "Ищите вопросы по теме или тегу, фильтруйте их по уровню собеседования и открывайте полные ответы с источниками.",
      showMore: "Показать ещё",
      topCount: "Всего вопросов в библиотеке",
    },
    difficulty: {
      junior: "Начальный",
      middle: "Средний",
      senior: "Продвинутый",
    },
    details: {
      alternativeAnswers: "Альтернативные формулировки",
      relatedTopics: "Связанные темы",
      experienceExample: "Пример из практики",
    },
  },
  en: {
    library: {
      eyebrow: "QA Question Library",
      title: "Explore the validated QA knowledge base.",
      lead: "Search questions by topic or tag, filter them by interview level, and open complete answers with sources.",
      showMore: "Show more",
      topCount: "Total questions in the library",
    },
    difficulty: {
      junior: "Junior",
      middle: "Middle",
      senior: "Senior",
    },
    details: {
      alternativeAnswers: "Alternative formulations",
      relatedTopics: "Related topics",
      experienceExample: "Experience example",
    },
  },
} as const satisfies Record<
  InterfaceLanguage,
  {
    readonly library: {
      readonly eyebrow: string;
      readonly title: string;
      readonly lead: string;
      readonly showMore: string;
      readonly topCount: string;
    };
    readonly difficulty: Record<QuestionDifficulty, string>;
    readonly details: {
      readonly alternativeAnswers: string;
      readonly relatedTopics: string;
      readonly experienceExample: string;
    };
  }
>;

export function getQuestionContentTranslations(language: InterfaceLanguage) {
  return questionContentDictionary[language];
}
