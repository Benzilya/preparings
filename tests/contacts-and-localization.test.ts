import assert from "node:assert/strict";
import { test } from "node:test";

import { getTranslations } from "../src/features/manage-settings/model/translations";
import { defaultSettings } from "../src/features/manage-settings/model/settings";
import { mainNavigation } from "../src/shared/config/navigation";
import { projectAuthor, projectContacts } from "../src/shared/config/project-author";

test("Russian is the interface default and English remains available", () => {
  assert.equal(defaultSettings.language, "ru");
  assert.equal(getTranslations("ru").contacts.title, "Связаться с автором проекта");
  assert.equal(getTranslations("en").contacts.title, "Contact the project author");
  assert.equal(
    getTranslations("ru").shell.switchToEnglish,
    "Переключить интерфейс на английский язык",
  );
  assert.equal(getTranslations("en").shell.switchToRussian, "Switch interface to Russian");
});

test("contacts page is available from primary navigation", () => {
  const contactsItem = mainNavigation.find((item) => item.href === "/contacts");
  assert.ok(contactsItem);
  assert.equal(contactsItem.labelRu, "Контакты");
  assert.equal(contactsItem.label, "Contacts");
});

test("author and contact links use the required destinations", () => {
  assert.equal(projectAuthor.displayName, "@benzilya");
  assert.equal(projectAuthor.githubUrl, "https://github.com/Benzilya");

  assert.deepEqual(
    projectContacts.map(({ kind, href }) => [kind, href]),
    [
      ["email", "mailto:hushrodak@yandex.ru"],
      ["phone", "tel:+79287766297"],
      ["telegram", "https://t.me/benzilya"],
      ["github", "https://github.com/Benzilya"],
      ["portfolio", "https://benzilya.github.io/"],
    ],
  );
});
