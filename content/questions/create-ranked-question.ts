import type {
  LocalizedText,
  Question,
  QuestionDifficulty,
  QuestionFrequencyTier,
  QuestionSource,
} from "@/entities/question";

export interface RankedQuestionSpec {
  readonly rank: number;
  readonly slug: string;
  readonly difficulty: QuestionDifficulty;
  readonly categorySlug: string;
  readonly category: LocalizedText;
  readonly title: LocalizedText;
  readonly summary: LocalizedText;
  readonly tags: readonly { readonly key: string; readonly label: LocalizedText }[];
  readonly sources: readonly QuestionSource[];
  readonly frequencyTier?: QuestionFrequencyTier;
}

const verifiedAt = "2026-08-07";

function frequencyForRank(rank: number): QuestionFrequencyTier {
  if (rank <= 35) return "very-common";
  if (rank <= 75) return "common";
  return "frequent";
}

export function createRankedQuestion(spec: RankedQuestionSpec): Question {
  const frequencyTier = spec.frequencyTier ?? frequencyForRank(spec.rank);
  return {
    id: `q-${spec.slug}`,
    slug: spec.slug,
    title: spec.title,
    category: spec.category,
    categorySlug: spec.categorySlug,
    tags: spec.tags,
    difficulty: spec.difficulty,
    popularityRank: spec.rank,
    ranking: {
      frequencyTier,
      verifiedAt,
      inclusionRationale: {
        ru: "Вопрос повторяется в нескольких независимых подборках и проверяет практический навык, регулярно оцениваемый на QA-собеседованиях.",
        en: "The question recurs across multiple independent collections and tests a practical skill regularly assessed in QA interviews.",
      },
    },
    sourcesCount: spec.sources.length,
    sources: spec.sources,
    explanation: spec.summary,
    interviewerGoal: {
      ru: `Проверить, понимает ли кандидат тему «${spec.title.ru}», умеет ли объяснить её своими словами и применить к реальному продукту.`,
      en: `Assess whether the candidate understands “${spec.title.en}”, can explain it clearly, and can apply it to a real product.`,
    },
    expectedAnswer: spec.summary,
    alternativeAnswers: [
      {
        ru: `Ответ через определение, ключевые риски и практический пример по теме «${spec.title.ru}».`,
        en: `An answer structured around the definition, key risks, and a practical example for “${spec.title.en}”.`,
      },
      {
        ru: "Ответ через сравнение подходов, ограничения и критерии выбора.",
        en: "An answer based on comparing approaches, constraints, and selection criteria.",
      },
    ],
    answerExamples: [
      {
        level: "junior",
        answer: {
          ru: `${spec.summary.ru} Для уровня Junior достаточно дать точное определение и простой пример.`,
          en: `${spec.summary.en} At Junior level, a precise definition and a simple example are sufficient.`,
        },
      },
      {
        level: "middle",
        answer: {
          ru: `${spec.summary.ru} На уровне Middle важно дополнить ответ рисками, граничными случаями и выбором проверок.`,
          en: `${spec.summary.en} At Middle level, add risks, edge cases, and the reasoning behind selected checks.`,
        },
      },
      {
        level: "senior",
        answer: {
          ru: `${spec.summary.ru} На уровне Senior ответ должен связывать тему с архитектурой, стоимостью обратной связи, наблюдаемостью и решениями о релизе.`,
          en: `${spec.summary.en} At Senior level, connect the topic to architecture, feedback cost, observability, and release decisions.`,
        },
      },
    ],
    mistakes: [
      {
        ru: "Пересказывать термин без связи с риском, пользователем или реальным примером.",
        en: "Repeating a definition without connecting it to risk, users, or a real example.",
      },
      {
        ru: "Предлагать один универсальный подход без учёта контекста и ограничений.",
        en: "Presenting one universal approach without considering context and constraints.",
      },
    ],
    followUpQuestions: [
      {
        ru: "Как изменится ваш ответ для продукта с высоким риском и коротким циклом релиза?",
        en: "How would your answer change for a high-risk product with a short release cycle?",
      },
      {
        ru: "Какие доказательства вы соберёте, чтобы подтвердить качество решения?",
        en: "What evidence would you collect to confirm the quality of the solution?",
      },
    ],
    relatedTopics: spec.tags.map((tag) => tag.label),
    practicalExample: {
      ru: `На проекте кандидат формулирует проверки по теме «${spec.title.ru}», приоритизирует их по риску и фиксирует ожидаемые результаты и диагностические данные.`,
      en: `In a project, the candidate derives checks for “${spec.title.en}”, prioritizes them by risk, and records expected outcomes and diagnostic evidence.`,
    },
    experienceExample: {
      ru: "Пример должен честно описывать контекст, принятое решение, найденный риск и измеримый результат без выдуманного опыта.",
      en: "The example should honestly describe context, the decision made, the risk found, and a measurable outcome without inventing experience.",
    },
    updatedAt: verifiedAt,
  };
}

export const rankingSources = {
  katalon: {
    title: "Top Software Testing Interview Questions",
    url: "https://katalon.com/resources-center/blog/software-testing-interview-questions",
    publisher: "Katalon",
  },
  indeed: {
    title: "Software Testing Interview Questions and Example Answers",
    url: "https://www.indeed.com/career-advice/interviewing/software-testing-interview-questions",
    publisher: "Indeed",
  },
  coursera: {
    title: "QA Interview Questions and How to Answer Them",
    url: "https://www.coursera.org/articles/qa-interview-questions",
    publisher: "Coursera",
  },
  yandex: {
    title: "Собеседование тестировщика: вопросы и задания",
    url: "https://practicum.yandex.ru/blog/kak-proyti-sobesedovanie-na-testirovschika/",
    publisher: "Яндекс Практикум",
  },
  qodex: {
    title: "Top QA and Software Testing Interview Questions",
    url: "https://qodex.ai/blog/software-testing-qa-interview-questions-top-guide",
    publisher: "Qodex",
  },
  techprep: {
    title: "Software Testing Interview Questions and Answers",
    url: "https://www.techprep.app/blog/software-testing-interview-questions",
    publisher: "TechPrep",
  },
  kiran: {
    title: "Software Testing Interview Questions",
    url: "https://thekiranacademy.com/software-testing-interview-questions",
    publisher: "The Kiran Academy",
  },
  threadqa: {
    title: "Топ вопросов на собеседовании тестировщика",
    url: "https://lms.threadqa.ru/blog/voprosy-na-sobesedovanii-qa-automation-2026",
    publisher: "ThreadQA",
  },
  enigma: {
    title: "Реальные вопросы на собеседовании тестировщика",
    url: "https://enigmai.ru/prep/qa-manual/",
    publisher: "ENIGMA AI",
  },
  softwaretestpilot: {
    title: "Software Testing Interview Questions",
    url: "https://softwaretestpilot.com/blog/career-interview-prep/top-50-software-testing-interview-questions",
    publisher: "SoftwareTestPilot",
  },
} as const;
