import { test, expect } from "bun:test";

test("document.body should be defined in jsdom environment", () => {
  expect(document.body).toBeDefined();
});
