import type { InterfaceLanguage } from "./settings";

export interface SettingsTranslations {
  readonly eyebrow: string;
  readonly title: string;
  readonly lead: string;
  readonly interface: string;
  readonly displayTitle: string;
  readonly language: string;
  readonly density: string;
  readonly comfortable: string;
  readonly compact: string;
  readonly explanations: string;
  readonly localData: string;
  readonly resetData: string;
  readonly backupHint: string;
  readonly resetPreferences: string;
  readonly deleteProgress: string;
  readonly deleteTitle: string;
  readonly cancel: string;
  readonly confirmDelete: string;
  readonly saved: string;
  readonly resetDone: string;
  readonly progressDeleted: string;
}

const settingsDictionary = {
  en: {
    eyebrow: "Settings",
    title: "Interface and local data",
    lead: "Choose how the catalog is displayed and manage preferences stored in this browser.",
    interface: "Interface",
    displayTitle: "Display preferences",
    language: "Language",
    density: "Catalog density",
    comfortable: "Comfortable",
    compact: "Compact",
    explanations: "Show explanations in the catalog",
    localData: "Local data",
    resetData: "Reset preferences and progress",
    backupHint: "Export progress before deleting local data if you may need to restore it later.",
    resetPreferences: "Reset preferences",
    deleteProgress: "Delete progress",
    deleteTitle: "Delete all local progress?",
    cancel: "Cancel",
    confirmDelete: "Delete progress",
    saved: "Settings saved",
    resetDone: "Preferences reset",
    progressDeleted: "Local progress deleted",
  },
  ru: {
    eyebrow: "Настройки",
    title: "Интерфейс и локальные данные",
    lead: "Настройте отображение каталога и управляйте предпочтениями, сохранёнными в этом браузере.",
    interface: "Интерфейс",
    displayTitle: "Параметры отображения",
    language: "Язык",
    density: "Плотность каталога",
    comfortable: "Комфортная",
    compact: "Компактная",
    explanations: "Показывать объяснения в каталоге",
    localData: "Локальные данные",
    resetData: "Сброс настроек и прогресса",
    backupHint:
      "Перед удалением локальных данных экспортируйте прогресс, если он может понадобиться для восстановления.",
    resetPreferences: "Сбросить настройки",
    deleteProgress: "Удалить прогресс",
    deleteTitle: "Удалить весь локальный прогресс?",
    cancel: "Отмена",
    confirmDelete: "Удалить прогресс",
    saved: "Настройки сохранены",
    resetDone: "Настройки сброшены",
    progressDeleted: "Локальный прогресс удалён",
  },
} as const satisfies Record<InterfaceLanguage, SettingsTranslations>;

export function getSettingsTranslations(language: InterfaceLanguage): SettingsTranslations {
  return settingsDictionary[language];
}
