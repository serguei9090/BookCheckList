import { test, expect, afterEach } from "bun:test";
import { render, cleanup, fireEvent } from "@testing-library/react";
import BookCard from "./BookCard";
import type { Book } from "../types";

afterEach(() => {
  cleanup();
});

const mockBook: Book = {
  id: 1,
  title: "Test Book",
  author: "Test Author",
  category: "Classics",
  description: "Test Description"
};

test("BookCard renders book information correctly", () => {
  const { getByText } = render(<BookCard book={mockBook} isRead={false} onToggleRead={() => {}} />);

  expect(getByText("Test Book")).toBeDefined();
  expect(getByText("Test Author")).toBeDefined();
  expect(getByText("Classics")).toBeDefined();
  expect(getByText("Test Description")).toBeDefined();
});

test("BookCard shows correct read status button", () => {
  // Checkbox is now an icon-only button, verify by aria-label or pressed state
  const { getByRole, rerender } = render(<BookCard book={mockBook} isRead={false} onToggleRead={() => {}} />);

  const button = getByRole("button", { name: /Mark Test Book as read/i });
  expect(button).toBeDefined();
  expect(button.getAttribute("aria-pressed")).toBe("false");

  rerender(<BookCard book={mockBook} isRead={true} onToggleRead={() => {}} />);
  const readButton = getByRole("button", { name: /Mark Test Book as unread/i });
  expect(readButton.getAttribute("aria-pressed")).toBe("true");
});

test("BookCard calls onToggleRead when button is clicked", () => {
  let clickedId = -1;
  const handleToggle = (id: number) => { clickedId = id; };

  const { getByRole } = render(<BookCard book={mockBook} isRead={false} onToggleRead={handleToggle} />);

  fireEvent.click(getByRole("button"));
  expect(clickedId).toBe(1);
});
