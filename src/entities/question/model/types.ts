import type { InterfaceLanguage } from "@/features/manage-settings/model/settings";

export type QuestionDifficulty = "junior" | "middle" | "senior";

export interface LocalizedText {
  readonly ru: string;
  readonly en: string;
}

export interface LocalizedTag {
  readonly key: string;
  readonly label: LocalizedText;
}

export interface QuestionSource {
  readonly title: string;
  readonly url: string;
  readonly publisher?: string;
  readonly publishedAt?: string;
}

export interface InterviewAnswerExample {
  readonly level: QuestionDifficulty;
  readonly answer: LocalizedText;
}

export interface Question {
  readonly id: string;
  readonly slug: string;
  readonly title: LocalizedText;
  readonly category: LocalizedText;
  readonly categorySlug: string;
  readonly tags: readonly LocalizedTag[];
  readonly difficulty: QuestionDifficulty;
  readonly popularityRank: number;
  readonly sourcesCount: number;
  readonly sources: readonly QuestionSource[];
  readonly explanation: LocalizedText;
  readonly interviewerGoal: LocalizedText;
  readonly expectedAnswer: LocalizedText;
  readonly alternativeAnswers: readonly LocalizedText[];
  readonly answerExamples: readonly InterviewAnswerExample[];
  readonly mistakes: readonly LocalizedText[];
  readonly followUpQuestions: readonly LocalizedText[];
  readonly relatedTopics: readonly LocalizedText[];
  readonly practicalExample?: LocalizedText;
  readonly experienceExample?: LocalizedText;
  readonly updatedAt: string;
}

export interface LocalizedQuestion extends Omit<Question, "title" | "category" | "tags" | "explanation" | "interviewerGoal" | "expectedAnswer" | "alternativeAnswers" | "answerExamples" | "mistakes" | "followUpQuestions" | "relatedTopics" | "practicalExample" | "experienceExample"> {
  readonly title: string;
  readonly category: string;
  readonly tags: readonly { readonly key: string; readonly label: string }[];
  readonly explanation: string;
  readonly interviewerGoal: string;
  readonly expectedAnswer: string;
  readonly alternativeAnswers: readonly string[];
  readonly answerExamples: readonly { readonly level: QuestionDifficulty; readonly answer: string }[];
  readonly mistakes: readonly string[];
  readonly followUpQuestions: readonly string[];
  readonly relatedTopics: readonly string[];
  readonly practicalExample?: string;
  readonly experienceExample?: string;
}

export interface QuestionCategory {
  readonly name: LocalizedText;
  readonly slug: string;
  readonly questions: readonly Question[];
}

export function localizeText(text: LocalizedText, language: InterfaceLanguage): string {
  return text[language];
}

export function localizeQuestion(question: Question, language: InterfaceLanguage): LocalizedQuestion {
  return {
    ...question,
    title: localizeText(question.title, language),
    category: localizeText(question.category, language),
    tags: question.tags.map((tag) => ({ key: tag.key, label: localizeText(tag.label, language) })),
    explanation: localizeText(question.explanation, language),
    interviewerGoal: localizeText(question.interviewerGoal, language),
    expectedAnswer: localizeText(question.expectedAnswer, language),
    alternativeAnswers: question.alternativeAnswers.map((item) => localizeText(item, language)),
    answerExamples: question.answerExamples.map((item) => ({
      level: item.level,
      answer: localizeText(item.answer, language),
    })),
    mistakes: question.mistakes.map((item) => localizeText(item, language)),
    followUpQuestions: question.followUpQuestions.map((item) => localizeText(item, language)),
    relatedTopics: question.relatedTopics.map((item) => localizeText(item, language)),
    practicalExample: question.practicalExample
      ? localizeText(question.practicalExample, language)
      : undefined,
    experienceExample: question.experienceExample
      ? localizeText(question.experienceExample, language)
      : undefined,
  };
}
