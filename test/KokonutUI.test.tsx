import { test, expect } from "bun:test";
import { readFileSync } from "fs";
import { join } from "path";

test("global styling configuration includes Tailwind and base styles", () => {
  const css = readFileSync(join(import.meta.dir, "../src/index.css"), "utf8");

  // Verify Tailwind import
  expect(css).toContain('@import "tailwindcss";');

  // Verify body background color configuration
  // We look for 'bg-stone-50' usage in the body rule
  expect(css).toContain('body');
  expect(css).toContain('bg-stone-50');
});
