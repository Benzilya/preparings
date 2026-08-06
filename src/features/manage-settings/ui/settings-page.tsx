"use client";

import { useEffect, useState } from "react";

import { clearQuestionProgress } from "@/features/track-question-progress/model/storage";

import {
  defaultSettings,
  readSettings,
  resetSettings,
  type UserSettings,
  writeSettings,
} from "../model/settings";

export function SettingsPage() {
  const [settings, setSettings] = useState<UserSettings>(defaultSettings);
  const [message, setMessage] = useState("");
  const [clearPending, setClearPending] = useState(false);

  useEffect(() => setSettings(readSettings()), []);

  const update = (next: UserSettings) => {
    setSettings(next);
    writeSettings(next);
    setMessage("Settings saved / Настройки сохранены");
  };

  const clearProgress = () => {
    clearQuestionProgress();
    setClearPending(false);
    setMessage("Local progress deleted / Локальный прогресс удалён");
  };

  return (
    <div className="settingsPage">
      <header className="routeHero">
        <p className="eyebrow">Settings / Настройки</p>
        <h1>Local preferences / Локальные параметры</h1>
        <p className="lead">
          Interface and catalog preferences are stored only in this browser and require no account.
        </p>
      </header>

      <section className="settingsPanel">
        <div>
          <p className="cardLabel">Interface / Интерфейс</p>
          <h2>Language and catalog display / Язык и отображение каталога</h2>
        </div>

        <label className="settingsField">
          <span>Interface language / Язык интерфейса</span>
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
          <span>Catalog density / Плотность каталога</span>
          <select
            onChange={(event) =>
              update({
                ...settings,
                catalogDensity: event.target.value as UserSettings["catalogDensity"],
              })
            }
            value={settings.catalogDensity}
          >
            <option value="comfortable">Comfortable / Комфортная</option>
            <option value="compact">Compact / Компактная</option>
          </select>
        </label>

        <label className="settingsToggle">
          <input
            checked={settings.showExplanations}
            onChange={(event) => update({ ...settings, showExplanations: event.target.checked })}
            type="checkbox"
          />
          <span>Show explanations in catalog cards / Показывать пояснения в карточках</span>
        </label>
      </section>

      <section className="settingsPanel">
        <div>
          <p className="cardLabel">Local data / Локальные данные</p>
          <h2>Reset browser data / Сброс данных браузера</h2>
          <p className="settingsHint">
            Export progress from the Progress page before deletion when you need a backup.
          </p>
        </div>

        <div className="settingsActions">
          <button
            onClick={() => {
              const next = resetSettings();
              setSettings(next);
              setMessage("Settings reset / Настройки сброшены");
            }}
            type="button"
          >
            Reset preferences / Сбросить настройки
          </button>
          {!clearPending ? (
            <button className="dangerAction" onClick={() => setClearPending(true)} type="button">
              Delete progress / Удалить прогресс
            </button>
          ) : (
            <div className="settingsConfirm" role="alert">
              <strong>Delete all local progress?</strong>
              <button onClick={() => setClearPending(false)} type="button">
                Cancel / Отмена
              </button>
              <button className="dangerAction" onClick={clearProgress} type="button">
                Confirm delete / Подтвердить
              </button>
            </div>
          )}
        </div>
      </section>

      {message ? <p role="status">{message}</p> : null}
    </div>
  );
}
