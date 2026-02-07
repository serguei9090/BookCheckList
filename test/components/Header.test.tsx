import { test, expect, afterEach } from "bun:test";
import { render, cleanup } from "@testing-library/react";
import Header from "../../src/components/Header";

afterEach(() => {
  cleanup();
});

test("Header renders correctly", () => {
  const { getByText } = render(<Header />);
  expect(getByText("📚 Reading Tracker")).toBeDefined();
  expect(getByText("Your personal library checklist")).toBeDefined();
});
