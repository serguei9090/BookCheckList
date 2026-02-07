import { test, expect, afterEach, jest } from "bun:test";
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
  const { getByText } = render(
    <BookCard
      book={mockBook}
      isRead={false}
      onToggleRead={() => {}}
      isDownloaded={false}
      onToggleDownloaded={() => {}}
    />
  );

  expect(getByText("Test Book")).toBeDefined();
  expect(getByText("by Test Author")).toBeDefined();
  expect(getByText("Classics")).toBeDefined();
});

test("BookCard shows correct read status button", () => {
  const { getByText, rerender } = render(
    <BookCard
      book={mockBook}
      isRead={false}
      onToggleRead={() => {}}
      isDownloaded={false}
      onToggleDownloaded={() => {}}
    />
  );
  expect(getByText("○ Mark as Read")).toBeDefined();

  rerender(
    <BookCard
      book={mockBook}
      isRead={true}
      onToggleRead={() => {}}
      isDownloaded={false}
      onToggleDownloaded={() => {}}
    />
  );
  expect(getByText("✓ Read")).toBeDefined();
});

test("BookCard shows correct downloaded status button", () => {
  const { getByText, rerender } = render(
    <BookCard
      book={mockBook}
      isRead={false}
      onToggleRead={() => {}}
      isDownloaded={false}
      onToggleDownloaded={() => {}}
    />
  );
  expect(getByText("○ Download")).toBeDefined();

  rerender(
    <BookCard
      book={mockBook}
      isRead={false}
      onToggleRead={() => {}}
      isDownloaded={true}
      onToggleDownloaded={() => {}}
    />
  );
  expect(getByText("✓ Downloaded")).toBeDefined();
});

test("BookCard calls onToggleRead when read button is clicked", () => {
  const handleToggle = jest.fn();

  const { getByText } = render(
    <BookCard
      book={mockBook}
      isRead={false}
      onToggleRead={handleToggle}
      isDownloaded={false}
      onToggleDownloaded={() => {}}
    />
  );

  fireEvent.click(getByText("○ Mark as Read"));
  expect(handleToggle).toHaveBeenCalledWith(1);
});

test("BookCard calls onToggleDownloaded when download button is clicked", () => {
  const handleToggle = jest.fn();

  const { getByText } = render(
    <BookCard
      book={mockBook}
      isRead={false}
      onToggleRead={() => {}}
      isDownloaded={false}
      onToggleDownloaded={handleToggle}
    />
  );

  fireEvent.click(getByText("○ Download"));
  expect(handleToggle).toHaveBeenCalledWith(1);
});
