"use client";

import { useCallback, useEffect, useState } from "react";

import type { UserSettings } from "./settings";
import {
  defaultSettings,
  readSettings,
  restoreSettings,
  settingsChangedEvent,
} from "./settings";

export function useSettings(): UserSettings {
  const [settings, setSettings] = useState<UserSettings>(defaultSettings);
  const refresh = useCallback(() => setSettings(readSettings()), []);

  useEffect(() => {
    setSettings(restoreSettings());
    window.addEventListener(settingsChangedEvent, refresh);
    window.addEventListener("storage", refresh);

    return () => {
      window.removeEventListener(settingsChangedEvent, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, [refresh]);

  return settings;
}
