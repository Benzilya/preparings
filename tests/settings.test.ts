import assert from "node:assert/strict";
import { after, before, test } from "node:test";

import globalJsdom from "global-jsdom";

import {
  defaultSettings,
  readSettings,
  resetSettings,
  restoreSettings,
  writeSettings,
} from "../src/features/manage-settings/model/settings";

let cleanupDom: () => void;

before(() => {
  cleanupDom = globalJsdom(undefined, { url: "http://localhost/settings" });
});

after(() => cleanupDom());

test("settings persist and restore document attributes", () => {
  const settings = {
    language: "en" as const,
    catalogDensity: "compact" as const,
    showExplanations: false,
  };

  writeSettings(settings);
  assert.deepEqual(readSettings(), settings);

  document.documentElement.removeAttribute("data-catalog-density");
  document.documentElement.removeAttribute("data-show-explanations");
  document.documentElement.lang = "ru";

  assert.deepEqual(restoreSettings(), settings);
  assert.equal(document.documentElement.lang, "en");
  assert.equal(document.documentElement.dataset.catalogDensity, "compact");
  assert.equal(document.documentElement.dataset.showExplanations, "false");
});

test("invalid settings fall back and reset restores defaults", () => {
  window.localStorage.setItem("qa-interview-trainer:settings:v1", "{broken");
  assert.deepEqual(readSettings(), defaultSettings);

  writeSettings({ language: "en", catalogDensity: "compact", showExplanations: false });
  assert.deepEqual(resetSettings(), defaultSettings);
  assert.deepEqual(readSettings(), defaultSettings);
  assert.equal(document.documentElement.lang, defaultSettings.language);
});
