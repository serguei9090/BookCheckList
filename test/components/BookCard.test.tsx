import { test, expect, afterEach } from "bun:test";
import { render, cleanup, fireEvent } from "@testing-library/react";
import BookCard from "../../src/components/BookCard";
import type { Book } from "../../src/types";

afterEach(() => {
  cleanup();
});

const mockBook: Book = {
  id: 1,
  title: "Test Book",
  author: "Test Author",
  category: "Classics"
};

test("BookCard renders book information correctly", () => {
  const { getByText } = render(<BookCard book={mockBook} isRead={false} onToggleRead={() => {}} />);

  expect(getByText("Test Book")).toBeDefined();
  expect(getByText("by Test Author")).toBeDefined();
  expect(getByText("Classics")).toBeDefined();
});

test("BookCard shows correct read status button", () => {
  const { getByText, rerender } = render(<BookCard book={mockBook} isRead={false} onToggleRead={() => {}} />);
  expect(getByText("○ Mark as Read")).toBeDefined();

  rerender(<BookCard book={mockBook} isRead={true} onToggleRead={() => {}} />);
  expect(getByText("✓ Read")).toBeDefined();
});

test("BookCard calls onToggleRead when button is clicked", () => {
  let clickedId = -1;
  const handleToggle = (id: number) => { clickedId = id; };

  const { getByRole } = render(<BookCard book={mockBook} isRead={false} onToggleRead={handleToggle} />);

  fireEvent.click(getByRole("button"));
  expect(clickedId).toBe(1);
});
