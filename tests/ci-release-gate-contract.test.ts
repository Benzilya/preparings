import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const packageJsonPath = new URL("../package.json", import.meta.url);
const qualityWorkflowPath = new URL("../.github/workflows/quality.yml", import.meta.url);

test("package manifest remains valid and pins the release package manager", async () => {
  const source = await readFile(packageJsonPath, "utf8");
  const manifest = JSON.parse(source) as { packageManager?: string };

  assert.equal(manifest.packageManager, "pnpm@10.15.0");
});

test("quality workflow keeps the frozen-install release gate", async () => {
  const workflow = await readFile(qualityWorkflowPath, "utf8");

  assert.match(workflow, /actions\/checkout@v5/);
  assert.match(workflow, /github\.event\.pull_request\.head\.sha \|\| github\.sha/);
  assert.match(workflow, /corepack prepare pnpm@10\.15\.0 --activate/);
  assert.match(workflow, /pnpm install --frozen-lockfile/);
  assert.doesNotMatch(workflow, /pnpm\/action-setup/);
});
