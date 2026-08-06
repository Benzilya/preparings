import assert from "node:assert/strict";
import { test } from "node:test";

import nextConfig from "../next.config";

test("Next.js disables the framework signature header", () => {
  assert.equal(nextConfig.poweredByHeader, false);
});

test("all routes receive the baseline security headers", async () => {
  assert.equal(typeof nextConfig.headers, "function");

  const rules = await nextConfig.headers!();
  const globalRule = rules.find((rule) => rule.source === "/:path*");

  assert.ok(globalRule);

  const headers = new Map(globalRule.headers.map((header) => [header.key, header.value]));

  assert.equal(headers.get("X-Content-Type-Options"), "nosniff");
  assert.equal(headers.get("Referrer-Policy"), "strict-origin-when-cross-origin");
  assert.equal(headers.get("X-Frame-Options"), "DENY");
  assert.equal(headers.get("Permissions-Policy"), "camera=(), microphone=(), geolocation=()");
  assert.equal(headers.get("Cross-Origin-Opener-Policy"), "same-origin");
});
