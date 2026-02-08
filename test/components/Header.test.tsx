import { test, expect, afterEach } from "bun:test";
import { render, cleanup } from "@testing-library/react";
import Header from "../../src/components/Header";

afterEach(() => {
  cleanup();
});

test("Header renders correctly", () => {
  render(<Header />);
  expect(screen.getByRole('heading', { name: "📚 Reading Tracker" })).toBeInTheDocument();
  expect(screen.getByText("Your personal library checklist")).toBeInTheDocument();
});
