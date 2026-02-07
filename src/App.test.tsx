import { test, expect } from "bun:test";
import { render, screen } from "@testing-library/react";
import App from "./App";
import packageJson from "../package.json";

test("App renders Vite + React heading", () => {
  render(<App />);
  expect(screen.getByText("Vite + React")).toBeDefined();
});

test("package.json contains expected scripts", () => {
  expect(packageJson.scripts).toBeDefined();
  expect(packageJson.scripts.dev).toBe("vite");
  expect(packageJson.scripts.build).toBe("tsc -b && vite build");
  expect(packageJson.scripts.lint).toBe("eslint .");
  expect(packageJson.scripts.preview).toBe("vite preview");
});
