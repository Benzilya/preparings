import type { QuestionDifficulty } from "@/entities/question";

import type { InterfaceLanguage } from "./settings";

const questionContentDictionary = {
  ru: {
    library: {
      eyebrow: "ТОП-100 QA",
      title: "ТОП-100 вопросов для собеседования QA",
      lead: "Самые частые вопросы, которые задают QA-специалистам на технических собеседованиях. Рейтинг составлен по нескольким независимым источникам.",
      showMore: "Показать ещё",
      topCount: "Вопросов в основном рейтинге",
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
      eyebrow: "QA TOP 100",
      title: "Top 100 QA Interview Questions",
      lead: "The most frequently asked questions in QA technical interviews, ranked using multiple independent sources.",
      showMore: "Show more",
      topCount: "Questions in the primary ranking",
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
