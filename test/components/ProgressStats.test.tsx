import { test, expect, afterEach } from "bun:test";
import { render, cleanup } from "@testing-library/react";
import ProgressStats from "../../src/components/ProgressStats";

afterEach(() => {
  cleanup();
});

test("ProgressStats displays correct counts and percentage", () => {
  const { getByText } = render(<ProgressStats readCount={5} downloadedCount={2} totalCount={10} />);

  expect(getByText("5")).toBeDefined();
  expect(getByText(/of 10 books read/)).toBeDefined();

  expect(getByText("2")).toBeDefined();
  expect(getByText(/of 10 books downloaded/)).toBeDefined();

  expect(getByText("50%")).toBeDefined();
  expect(getByText("20%")).toBeDefined();
});

test("ProgressStats handles zero totalCount", () => {
  const { getAllByText, getByText } = render(<ProgressStats readCount={0} downloadedCount={0} totalCount={0} />);

  expect(getAllByText("0")).toBeDefined();
  expect(getByText(/of 0 books read/)).toBeDefined();
  expect(getByText(/of 0 books downloaded/)).toBeDefined();
  expect(getAllByText("0%")).toHaveLength(2);
});

test("ProgressStats rounds percentage correctly", () => {
  // 1/3 = 33%, 2/3 = 67%
  const { getByText } = render(<ProgressStats readCount={1} downloadedCount={2} totalCount={3} />);

  expect(getByText("33%")).toBeDefined();
  expect(getByText("67%")).toBeDefined();
});

test("ProgressStats has correct aria attributes", () => {
  const { getByLabelText } = render(<ProgressStats readCount={2} downloadedCount={1} totalCount={4} />);

  const readBar = getByLabelText("Reading progress bar");
  expect(readBar.getAttribute("aria-valuenow")).toBe("50");

  const downloadBar = getByLabelText("Downloading progress bar");
  expect(downloadBar.getAttribute("aria-valuenow")).toBe("25");
});
