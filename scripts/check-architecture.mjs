import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

const sourceRoot = path.resolve("src");
const layerOrder = ["shared", "entities", "features", "widgets", "app"];
const sourceExtensions = new Set([".ts", ".tsx", ".js", ".jsx"]);
const importPattern = /from\s+["']@\/(shared|entities|features|widgets|app)(?:\/[^"']*)?["']/g;

async function collectFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const target = path.join(directory, entry.name);
      return entry.isDirectory() ? collectFiles(target) : [target];
    }),
  );

  return files.flat().filter((file) => sourceExtensions.has(path.extname(file)));
}

const violations = [];

for (const file of await collectFiles(sourceRoot)) {
  const relative = path.relative(sourceRoot, file);
  const sourceLayer = relative.split(path.sep)[0];
  const sourceIndex = layerOrder.indexOf(sourceLayer);

  if (sourceIndex === -1) continue;

  const contents = await readFile(file, "utf8");

  for (const match of contents.matchAll(importPattern)) {
    const targetLayer = match[1];
    const targetIndex = layerOrder.indexOf(targetLayer);

    if (targetIndex > sourceIndex) {
      violations.push(`${relative}: ${sourceLayer} must not import ${targetLayer}`);
    }
  }
}

if (violations.length > 0) {
  console.error("Architecture boundary violations:\n" + violations.join("\n"));
  process.exit(1);
}

console.log("Architecture boundaries are valid.");
