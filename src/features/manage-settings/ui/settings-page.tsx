"use client";

import { useEffect, useState } from "react";

import { clearQuestionProgress } from "@/features/track-question-progress/model/storage";

import {
  defaultSettings,
  getTranslations,
  readSettings,
  resetSettings,
  type UserSettings,
  writeSettings,
} from "../model/settings";

export function SettingsPage() {
  const [settings, setSettings] = useState<UserSettings>(defaultSettings);
  const [message, setMessage] = useState("");
  const [clearPending, setClearPending] = useState(false);
  const translations = getTranslations(settings.language).settings;

  useEffect(() => setSettings(readSettings()), []);

  const update = (next: UserSettings) => {
    setSettings(next);
    writeSettings(next);
    setMessage(getTranslations(next.language).settings.saved);
  };

  const clearProgress = () => {
    clearQuestionProgress();
    setClearPending(false);
    setMessage(translations.progressDeleted);
  };

  return (
    <div className="settingsPage">
      <header className="routeHero">
        <p className="eyebrow">{translations.eyebrow}</p>
        <h1>{translations.title}</h1>
        <p className="lead">{translations.lead}</p>
      </header>

      <section className="settingsPanel">
        <div>
          <p className="cardLabel">{translations.interface}</p>
          <h2>{translations.displayTitle}</h2>
        </div>

        <label className="settingsField">
          <span>{translations.language}</span>
          <select
            onChange={(event) =>
              update({ ...settings, language: event.target.value as UserSettings["language"] })
            }
            value={settings.language}
          >
            <option value="ru">Русский</option>
            <option value="en">English</option>
          </select>
        </label>

        <label className="settingsField">
          <span>{translations.density}</span>
          <select
            onChange={(event) =>
              update({
                ...settings,
                catalogDensity: event.target.value as UserSettings["catalogDensity"],
              })
            }
            value={settings.catalogDensity}
          >
            <option value="comfortable">{translations.comfortable}</option>
            <option value="compact">{translations.compact}</option>
          </select>
        </label>

        <label className="settingsToggle">
          <input
            checked={settings.showExplanations}
            onChange={(event) => update({ ...settings, showExplanations: event.target.checked })}
            type="checkbox"
          />
          <span>{translations.explanations}</span>
        </label>
      </section>

      <section className="settingsPanel">
        <div>
          <p className="cardLabel">{translations.localData}</p>
          <h2>{translations.resetData}</h2>
          <p className="settingsHint">{translations.backupHint}</p>
        </div>

        <div className="settingsActions">
          <button
            onClick={() => {
              const next = resetSettings();
              setSettings(next);
              setMessage(getTranslations(next.language).settings.resetDone);
            }}
            type="button"
          >
            {translations.resetPreferences}
          </button>
          {!clearPending ? (
            <button className="dangerAction" onClick={() => setClearPending(true)} type="button">
              {translations.deleteProgress}
            </button>
          ) : (
            <div className="settingsConfirm" role="alert">
              <strong>{translations.deleteTitle}</strong>
              <button onClick={() => setClearPending(false)} type="button">
                {translations.cancel}
              </button>
              <button className="dangerAction" onClick={clearProgress} type="button">
                {translations.confirmDelete}
              </button>
            </div>
          )}
        </div>
      </section>

      {message ? <p role="status">{message}</p> : null}
    </div>
  );
}
