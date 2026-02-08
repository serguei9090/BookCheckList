import { test, expect, afterEach, mock } from "bun:test";
import { render, cleanup, fireEvent } from "@testing-library/react";
import CategoryFilter from "../../src/components/CategoryFilter";

afterEach(() => {
  cleanup();
});

test("CategoryFilter renders all categories including 'All'", () => {
  const categories = ["Fiction", "Non-Fiction", "Sci-Fi"];
  const { getByText } = render(
    <CategoryFilter
      selectedCategory="All"
      onSelectCategory={() => {}}
      categories={categories}
    />
  );

  expect(getByText("All")).toBeDefined();
  categories.forEach((cat) => {
    expect(getByText(cat)).toBeDefined();
  });
});

test("CategoryFilter highlights the selected category", () => {
  const categories = ["Fiction", "Non-Fiction"];
  const { getByText, rerender } = render(
    <CategoryFilter
      selectedCategory="All"
      onSelectCategory={() => {}}
      categories={categories}
    />
  );

  const allButton = getByText("All");
  const fictionButton = getByText("Fiction");

  expect(allButton.getAttribute("aria-selected")).toBe("true");
  expect(fictionButton.getAttribute("aria-selected")).toBe("false");

  // Optional: Check for visual indication via class presence (e.g., bg-stone-800)
  // expect(allButton.className).toContain("bg-stone-800");

  rerender(
    <CategoryFilter
      selectedCategory="Fiction"
      onSelectCategory={() => {}}
      categories={categories}
    />
  );

  const allButtonAfter = getByText("All");
  const fictionButtonAfter = getByText("Fiction");

  expect(allButtonAfter.getAttribute("aria-selected")).toBe("false");
  expect(fictionButtonAfter.getAttribute("aria-selected")).toBe("true");
});

test("CategoryFilter calls onSelectCategory when a category is clicked", () => {
  const categories = ["Fiction", "Non-Fiction"];
  const handleSelect = mock(() => {});

  const { getByText } = render(
    <CategoryFilter
      selectedCategory="All"
      onSelectCategory={handleSelect}
      categories={categories}
    />
  );

  fireEvent.click(getByText("Fiction"));
  expect(handleSelect).toHaveBeenCalledWith("Fiction");

  fireEvent.click(getByText("All"));
  expect(handleSelect).toHaveBeenCalledWith("All");
});
