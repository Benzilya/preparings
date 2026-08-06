export type InterfaceLanguage = "ru" | "en";
export type CatalogDensity = "comfortable" | "compact";

export interface UserSettings {
  readonly language: InterfaceLanguage;
  readonly catalogDensity: CatalogDensity;
  readonly showExplanations: boolean;
}

const storageKey = "qa-interview-trainer:settings:v1";

export const defaultSettings: UserSettings = {
  language: "ru",
  catalogDensity: "comfortable",
  showExplanations: true,
};

function isSettings(value: unknown): value is UserSettings {
  if (!value || typeof value !== "object") return false;
  const settings = value as Partial<UserSettings>;
  return (
    (settings.language === "ru" || settings.language === "en") &&
    (settings.catalogDensity === "comfortable" || settings.catalogDensity === "compact") &&
    typeof settings.showExplanations === "boolean"
  );
}

export function readSettings(): UserSettings {
  if (typeof window === "undefined") return defaultSettings;
  try {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) return defaultSettings;
    const parsed: unknown = JSON.parse(raw);
    return isSettings(parsed) ? parsed : defaultSettings;
  } catch {
    return defaultSettings;
  }
}

export function writeSettings(settings: UserSettings): void {
  window.localStorage.setItem(storageKey, JSON.stringify(settings));
  document.documentElement.lang = settings.language;
  document.documentElement.dataset.catalogDensity = settings.catalogDensity;
  document.documentElement.dataset.showExplanations = String(settings.showExplanations);
  window.dispatchEvent(new CustomEvent("user-settings:changed"));
}

export function resetSettings(): UserSettings {
  window.localStorage.removeItem(storageKey);
  writeSettings(defaultSettings);
  return defaultSettings;
}
