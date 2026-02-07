import { test, expect } from "bun:test";
import { readFileSync } from "fs";
import { join } from "path";

test("global styling imports Tailwind CSS", () => {
  const css = readFileSync(join(import.meta.dir, "../src/index.css"), "utf8");
  expect(css).toContain('@import "tailwindcss";');
});
