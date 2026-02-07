import { test, expect, afterEach } from "bun:test";
import { render, cleanup } from "@testing-library/react";
import ProgressStats from "../../src/components/ProgressStats";

afterEach(() => {
  cleanup();
});

test("ProgressStats displays correct counts and percentage", () => {
  const { getByText } = render(<ProgressStats readCount={5} totalCount={10} />);

  expect(getByText("5 of 10 books read")).toBeDefined();
  expect(getByText("50%")).toBeDefined();
});

test("ProgressStats handles zero totalCount", () => {
  const { getByText } = render(<ProgressStats readCount={0} totalCount={0} />);

  expect(getByText("0 of 0 books read")).toBeDefined();
  expect(getByText("0%")).toBeDefined();
});

test("ProgressStats rounds percentage correctly", () => {
  const { getByText } = render(<ProgressStats readCount={1} totalCount={3} />);

  // 1/3 = 0.333... -> 33%
  expect(getByText("33%")).toBeDefined();
});

test("ProgressStats has correct aria attributes", () => {
  const { getByRole } = render(<ProgressStats readCount={2} totalCount={4} />);
  const progressBar = getByRole("progressbar");

  expect(progressBar.getAttribute("aria-valuenow")).toBe("50");
  expect(progressBar.getAttribute("aria-valuemin")).toBe("0");
  expect(progressBar.getAttribute("aria-valuemax")).toBe("100");
});
