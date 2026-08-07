import assert from "node:assert/strict";
import { after, before, test } from "node:test";

import { cleanup, fireEvent, render } from "@testing-library/react";
import globalJsdom from "global-jsdom";
import React from "react";

import { SettingsPage } from "../src/features/manage-settings/ui/settings-page";

let cleanupDom: () => void;

before(() => {
  cleanupDom = globalJsdom(undefined, { url: "http://localhost/settings" });
});

after(() => {
  cleanup();
  cleanupDom();
});

test("Settings page switches language and persists the preference", () => {
  window.localStorage.clear();
  const view = render(<SettingsPage />);

  const languageSelect = view.getByDisplayValue("Русский");
  fireEvent.change(languageSelect, { target: { value: "en" } });

  const stored = JSON.parse(
    window.localStorage.getItem("qa-interview-trainer:settings:v1") ?? "null",
  ) as { language?: string } | null;

  assert.equal(stored?.language, "en");
  assert.equal(document.documentElement.lang, "en");
  assert.equal(view.getByDisplayValue("English"), languageSelect);
});
