import type { InterfaceLanguage } from "./settings";

const dictionary = {
  en: {
    shell: {
      primaryNavigation: "Primary navigation",
      home: "QA Interview Trainer — home",
      workspace: "Workspace",
      preparation: "Interview preparation",
      openSearch: "Open search",
      search: "Search",
    },
    questionLibrary: {
      filters: "Question filters",
      searchLabel: "Search questions",
      searchPlaceholder: "Search topics",
      level: "Level",
      category: "Category",
      progress: "Progress",
      sort: "Sort",
      all: "All",
      notStarted: "Not started",
      learning: "Learning",
      completed: "Completed",
      favorites: "Favorites",
      popularity: "Popularity",
      recentlyUpdated: "Recently updated",
      title: "Title",
      questions: "questions",
      reset: "Reset filters",
      favorite: "Favorite",
      tags: "Tags",
      openQuestion: "Open question →",
      emptyTitle: "No questions found",
      emptyBody: "Change the filters or reset the library.",
    },
  },
  ru: {
    shell: {
      primaryNavigation: "Основная навигация",
      home: "QA Interview Trainer — главная",
      workspace: "Рабочее пространство",
      preparation: "Подготовка к интервью",
      openSearch: "Открыть поиск",
      search: "Поиск",
    },
    questionLibrary: {
      filters: "Фильтры вопросов",
      searchLabel: "Поиск вопросов",
      searchPlaceholder: "Искать темы",
      level: "Уровень",
      category: "Категория",
      progress: "Прогресс",
      sort: "Сортировка",
      all: "Все",
      notStarted: "Не начато",
      learning: "Изучается",
      completed: "Завершено",
      favorites: "Избранное",
      popularity: "Популярность",
      recentlyUpdated: "Недавно обновлённые",
      title: "Название",
      questions: "вопросов",
      reset: "Сбросить фильтры",
      favorite: "Избранное",
      tags: "Теги",
      openQuestion: "Открыть вопрос →",
      emptyTitle: "Вопросы не найдены",
      emptyBody: "Измените параметры или сбросьте фильтры.",
    },
  },
} as const;

export type InterfaceTranslations = (typeof dictionary)[InterfaceLanguage];

export function getTranslations(language: InterfaceLanguage): InterfaceTranslations {
  return dictionary[language];
}
