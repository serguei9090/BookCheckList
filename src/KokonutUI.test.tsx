import { test, expect } from "bun:test";
import { render } from "@testing-library/react";
import App from "./App";
import { readFileSync } from "fs";
import { join } from "path";

test("global styling sets a light background color on the body", () => {
  // Inject global styles manually since jsdom/bun-test doesn't process CSS imports automatically
  const css = readFileSync(join(import.meta.dir, "index.css"), "utf8");
  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  render(<App />);
  // The background color is set on :root (html), not body, so check document.documentElement
  const styles = window.getComputedStyle(document.documentElement);
  expect(styles.backgroundColor).toBe("rgb(248, 248, 248)");
});
