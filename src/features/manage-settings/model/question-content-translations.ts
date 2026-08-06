import type { QuestionDifficulty } from "@/entities/question";

import type { InterfaceLanguage } from "./settings";

const questionContentDictionary = {
  ru: {
    library: {
      eyebrow: "База вопросов",
      title: "Изучайте проверенную базу знаний QA.",
      lead: "Ищите вопросы по теме или тегу, фильтруйте их по уровню собеседования и открывайте полные ответы с источниками.",
    },
    difficulty: {
      junior: "Начальный",
      middle: "Средний",
      senior: "Продвинутый",
    },
  },
  en: {
    library: {
      eyebrow: "Question Library",
      title: "Explore validated QA knowledge.",
      lead: "Search by topic or tag, filter by interview level, and open complete answers with sources.",
    },
    difficulty: {
      junior: "Junior",
      middle: "Middle",
      senior: "Senior",
    },
  },
} as const satisfies Record<
  InterfaceLanguage,
  {
    readonly library: { readonly eyebrow: string; readonly title: string; readonly lead: string };
    readonly difficulty: Record<QuestionDifficulty, string>;
  }
>;

export function getQuestionContentTranslations(language: InterfaceLanguage) {
  return questionContentDictionary[language];
}
