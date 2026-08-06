import assert from "node:assert/strict";
import { test } from "node:test";

import { getTranslations } from "../src/features/manage-settings/model/translations";

function collectShape(value: unknown, prefix = ""): string[] {
  if (typeof value === "function") return [`${prefix}:function`];
  if (Array.isArray(value)) return [`${prefix}:array`];
  if (!value || typeof value !== "object") return [`${prefix}:${typeof value}`];

  return Object.entries(value as Record<string, unknown>)
    .flatMap(([key, nestedValue]) => collectShape(nestedValue, prefix ? `${prefix}.${key}` : key))
    .toSorted();
}

function collectStrings(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(collectStrings);
  if (!value || typeof value !== "object") return [];
  return Object.values(value as Record<string, unknown>).flatMap(collectStrings);
}

test("English and Russian dictionaries expose the same typed surface", () => {
  assert.deepEqual(collectShape(getTranslations("en")), collectShape(getTranslations("ru")));
});

test("interface dictionaries do not contain empty user-facing strings", () => {
  for (const language of ["en", "ru"] as const) {
    const strings = collectStrings(getTranslations(language));
    assert.ok(strings.length > 0);
    assert.equal(strings.every((value) => value.trim().length > 0), true);
  }
});

test("locale metadata matches the selected interface language", () => {
  assert.equal(getTranslations("en").progress.locale, "en-US");
  assert.equal(getTranslations("ru").progress.locale, "ru-RU");
});
