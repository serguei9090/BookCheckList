import { test, expect } from "bun:test";
import { render } from "@testing-library/react";
import App from "./App"; // Assuming App is where global styles might be applied or imported.

test("global styling sets a light background color on the body", () => {
  render(<App />);
  // Check if the body element has a specific background color applied
  // This test will fail initially because the styles are not yet implemented.
  expect(document.body).toHaveStyle("background-color: rgb(248, 248, 248)"); // Corresponds to #f8f8f8
});
