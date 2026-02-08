import { test, expect, afterEach } from "bun:test";
import { render, cleanup } from "@testing-library/react";
import App from "../src/App";
import { readFileSync } from "fs";
import { join } from "path";

afterEach(() => {
  cleanup();
});

test("App renders Reading Checklist heading", () => {
  const { getByText } = render(<App />);
  const headingElement = getByText(/Reading Checklist/i);
  expect(headingElement).toBeInTheDocument();
});

test("package.json contains expected scripts", () => {
  const packageJsonPath = join(import.meta.dir, "../package.json");
  const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf8"));
  expect(packageJson.scripts).toBeDefined();
  expect(packageJson.scripts.test).toBe("bun test");
});
