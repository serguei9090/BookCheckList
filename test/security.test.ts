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

test("index.html should have a Content Security Policy meta tag", () => {
  const htmlPath = resolve(import.meta.dir, "../index.html");
  const htmlContent = readFileSync(htmlPath, "utf-8");

  // Check for the presence of the meta tag
  const hasCSP = htmlContent.includes('<meta http-equiv="Content-Security-Policy" content="default-src \'self\'; script-src \'self\' \'unsafe-inline\'; style-src \'self\' \'unsafe-inline\'; img-src \'self\' data:; connect-src \'self\';" />');

  expect(hasCSP).toBe(true);
});
