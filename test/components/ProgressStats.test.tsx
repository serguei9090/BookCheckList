import { test, expect, afterEach } from "bun:test";
import { render, cleanup } from "@testing-library/react";
import ProgressStats from "../../src/components/ProgressStats";

afterEach(() => {
  cleanup();
});

test("ProgressStats displays correct counts and percentage", () => {
  const { getByText, getAllByText } = render(<ProgressStats readCount={5} downloadedCount={2} totalCount={10} />);

  expect(getByText("5")).toBeDefined();
  expect(getAllByText(/of 10/)).toHaveLength(2);
  expect(getByText("Books Read")).toBeDefined();

  expect(getByText("2")).toBeDefined();
  expect(getByText("Books Collected")).toBeDefined();

  expect(getByText("50%")).toBeDefined();
  expect(getByText("20%")).toBeDefined();
});

test("ProgressStats handles zero totalCount", () => {
  const { getAllByText } = render(<ProgressStats readCount={0} downloadedCount={0} totalCount={0} />);

  // Depending on how exactly "0" is rendered (in text node or mixed), getAllByText("0") usually works for exact matches or partial if regex.
  // Here we check if the counts 0 appear.
  const zeros = getAllByText("0");
  expect(zeros.length).toBeGreaterThan(0);

  expect(getAllByText(/of 0/)).toHaveLength(2);
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
