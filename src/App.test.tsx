import { test, expect } from "bun:test";
import { render } from "@testing-library/react";
import App from "./App";
import { readFileSync } from "fs";
import { join } from "path";

test("App renders Vite + React heading", () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Vite \+ React/i);
  expect(linkElement).toBeInTheDocument();
});

test("package.json contains expected scripts", () => {
  const packageJsonPath = join(import.meta.dir, "../package.json");
  const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf8"));
  expect(packageJson.scripts).toBeDefined();
  expect(packageJson.scripts.test).toBe("bun test");
});
