import { test, expect, afterEach } from "bun:test";
import { render, cleanup } from "@testing-library/react";
import Header from "../../src/components/Header";

afterEach(() => {
  cleanup();
});

test("Header renders correct title and subtitle", () => {
  const { getByRole, getByText } = render(<Header />);

  const heading = getByRole("heading", { level: 1 });
  expect(heading.textContent).toContain("Reading Checklist");

  const subtitle = getByText("Your personal library collection");
  expect(subtitle).toBeDefined();
});

test("Header has correct class name", () => {
  const { container } = render(<Header />);
  const headerElement = container.querySelector("header");
  expect(headerElement?.className).toBe("text-center mb-12");
});
