import { expect, test } from "bun:test";
import { readFileSync } from "fs";
import { resolve } from "path";

test("index.html should have a Referrer Policy meta tag", () => {
  const htmlPath = resolve(import.meta.dir, "../index.html");
  const htmlContent = readFileSync(htmlPath, "utf-8");

  // Check for the presence of the meta tag
  const hasReferrerPolicy = htmlContent.includes('<meta name="referrer" content="strict-origin-when-cross-origin" />');

  expect(hasReferrerPolicy).toBe(true);
});
