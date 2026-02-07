import { test, expect, afterEach } from "bun:test";
import { render, cleanup } from "@testing-library/react";
import ProgressStats from "../../src/components/ProgressStats";

afterEach(() => {
  cleanup();
});

test("ProgressStats displays correct counts and percentage", () => {
  const { getByText } = render(<ProgressStats readCount={5} downloadedCount={3} totalCount={10} />);

  expect(getByText("5 of 10 books read")).toBeDefined();
  expect(getByText("50%")).toBeDefined();

  expect(getByText("3 of 10 books downloaded")).toBeDefined();
  expect(getByText("30%")).toBeDefined();
});

test("ProgressStats handles zero totalCount", () => {
  const { getByText, getAllByText } = render(<ProgressStats readCount={0} downloadedCount={0} totalCount={0} />);

  expect(getByText("0 of 0 books read")).toBeDefined();
  expect(getByText("0 of 0 books downloaded")).toBeDefined();
  // There might be two "0%" elements
  const zeros = getAllByText("0%");
  expect(zeros.length).toBeGreaterThan(0);
});

test("ProgressStats rounds percentage correctly", () => {
  const { getByText, getAllByText } = render(<ProgressStats readCount={1} downloadedCount={1} totalCount={3} />);

  // 1/3 = 0.333... -> 33%
  const thirtyThrees = getAllByText("33%");
  expect(thirtyThrees.length).toBeGreaterThan(0);
});

test("ProgressStats has correct aria attributes", () => {
  const { getAllByRole } = render(<ProgressStats readCount={2} downloadedCount={2} totalCount={4} />);
  const progressBars = getAllByRole("progressbar");

  expect(progressBars.length).toBe(2);

  progressBars.forEach(bar => {
    expect(bar.getAttribute("aria-valuenow")).toBe("50");
    expect(bar.getAttribute("aria-valuemin")).toBe("0");
    expect(bar.getAttribute("aria-valuemax")).toBe("100");
  });
});
