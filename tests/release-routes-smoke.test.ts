import assert from "node:assert/strict";
import { access } from "node:fs/promises";
import { test } from "node:test";

import { mainNavigation, utilityNavigation } from "../src/shared/config/navigation";

const releaseRoutes = [
  ["/", "src/app/page.tsx"],
  ["/questions", "src/app/questions/page.tsx"],
  ["/questions/categories", "src/app/questions/categories/page.tsx"],
  ["/progress", "src/app/progress/page.tsx"],
  ["/bookmarks", "src/app/bookmarks/page.tsx"],
  ["/settings", "src/app/settings/page.tsx"],
] as const;

test("Release 1.0 public routes have App Router entry points", async () => {
  await Promise.all(
    releaseRoutes.map(async ([route, filePath]) => {
      await assert.doesNotReject(access(filePath), `${route} must resolve to ${filePath}`);
    }),
  );
});

test("primary Release 1.0 routes remain discoverable from navigation", () => {
  const navigationHrefs = new Set(
    [...mainNavigation, ...utilityNavigation].map((navigationItem) => navigationItem.href),
  );

  for (const route of ["/", "/questions", "/progress", "/bookmarks", "/settings"]) {
    assert.equal(navigationHrefs.has(route), true, `${route} must remain available in navigation`);
  }
});

test("navigation hrefs are unique and absolute", () => {
  const hrefs = [...mainNavigation, ...utilityNavigation].map(
    (navigationItem) => navigationItem.href,
  );

  assert.equal(new Set(hrefs).size, hrefs.length);
  assert.equal(
    hrefs.every((href) => href.startsWith("/")),
    true,
  );
});
