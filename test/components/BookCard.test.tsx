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

const defaultProps = {
  book: mockBook,
  isRead: false,
  onToggleRead: () => {},
  isDownloaded: false,
  onToggleDownloaded: () => {}
};

test("BookCard renders book information correctly", () => {
  const { getByText } = render(<BookCard {...defaultProps} />);

  expect(getByText("Test Book")).toBeDefined();
  expect(getByText("by Test Author")).toBeDefined();
  expect(getByText("Classics")).toBeDefined();
});

test("BookCard shows correct read status button", () => {
  const { getByRole, rerender } = render(<BookCard {...defaultProps} />);
  // Matches "Mark Test Book as read"
  expect(getByRole("button", { name: /Mark .* as read/i })).toBeDefined();

  rerender(<BookCard {...defaultProps} isRead={true} />);
  // Matches "Mark Test Book as unread"
  expect(getByRole("button", { name: /Mark .* as unread/i })).toBeDefined();
});

test("BookCard shows correct download status button", () => {
  const { getByRole, rerender } = render(<BookCard {...defaultProps} />);
  // Matches "Mark Test Book as downloaded"
  expect(getByRole("button", { name: /Mark .* as downloaded/i })).toBeDefined();

  rerender(<BookCard {...defaultProps} isDownloaded={true} />);
  // Matches "Mark Test Book as not downloaded"
  expect(getByRole("button", { name: /Mark .* as not downloaded/i })).toBeDefined();
});

test("BookCard calls onToggleRead when read button is clicked", () => {
  let clickedId = -1;
  const handleToggle = (id: number) => { clickedId = id; };

  const { getByRole } = render(<BookCard {...defaultProps} onToggleRead={handleToggle} />);

  fireEvent.click(getByRole("button", { name: /Mark .* as read/i }));
  expect(clickedId).toBe(1);
});

test("BookCard calls onToggleDownloaded when download button is clicked", () => {
  let clickedId = -1;
  const handleToggle = (id: number) => { clickedId = id; };

  const { getByRole } = render(<BookCard {...defaultProps} onToggleDownloaded={handleToggle} />);

  fireEvent.click(getByRole("button", { name: /Mark .* as downloaded/i }));
  expect(clickedId).toBe(1);
});
