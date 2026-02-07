import { test, expect } from "bun:test";
import { render, fireEvent, act } from "@testing-library/react";
import React, { useState, useMemo } from "react";

// Generate a large dataset to amplify performance differences
const generateBooks = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    title: `Book ${i}`,
    author: `Author ${i}`,
    category: `Category ${i % 50}` // 50 unique categories
  }));
};

// Use a large enough dataset to make the difference significant
const largeBooks = generateBooks(20000);

function UnoptimizedComponent({ books, updateTrigger }: { books: any[], updateTrigger: number }) {
  const start = performance.now();
  // Expensive calculation on every render
  const categories = Array.from(new Set(books.map((b: any) => b.category)));
  const end = performance.now();

  (global as any).unoptimizedTime += (end - start);

  return <div data-testid="unoptimized-cats">{categories.length}</div>;
}

function OptimizedComponent({ books, updateTrigger }: { books: any[], updateTrigger: number }) {
  const start = performance.now();
  // Optimized calculation
  const categories = useMemo(() => {
    return Array.from(new Set(books.map((b: any) => b.category)));
  }, [books]);
  const end = performance.now();

  (global as any).optimizedTime += (end - start);

  return <div data-testid="optimized-cats">{categories.length}</div>;
}

function Wrapper({ Component }: { Component: any }) {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button data-testid="update-btn" onClick={() => setCount(c => c + 1)}>Update</button>
      <Component books={largeBooks} updateTrigger={count} />
    </div>
  );
}

test("Benchmark: Unoptimized vs Optimized category calculation", async () => {
  (global as any).unoptimizedTime = 0;
  (global as any).optimizedTime = 0;

  // --- Test Unoptimized ---
  const { unmount: unmountUnopt, getByTestId: getUnoptBtn } = render(<Wrapper Component={UnoptimizedComponent} />);

  const unoptBtn = getUnoptBtn("update-btn");
  // Trigger 20 re-renders
  for (let i = 0; i < 20; i++) {
    await act(async () => {
      fireEvent.click(unoptBtn);
    });
  }
  unmountUnopt();

  // --- Test Optimized ---
  const { unmount: unmountOpt, getByTestId: getOptBtn } = render(<Wrapper Component={OptimizedComponent} />);

  const optBtn = getOptBtn("update-btn");
  // Trigger 20 re-renders
  for (let i = 0; i < 20; i++) {
    await act(async () => {
      fireEvent.click(optBtn);
    });
  }
  unmountOpt();

  console.log(`\n---------------------------------------------------`);
  console.log(`Unoptimized Total Time (20 re-renders): ${(global as any).unoptimizedTime.toFixed(2)}ms`);
  console.log(`Optimized Total Time (20 re-renders): ${(global as any).optimizedTime.toFixed(2)}ms`);

  if ((global as any).optimizedTime > 0) {
      console.log(`Improvement: ${((global as any).unoptimizedTime / (global as any).optimizedTime).toFixed(1)}x faster`);
  } else {
      console.log(`Improvement: Infinite (0ms vs ${(global as any).unoptimizedTime.toFixed(2)}ms)`);
  }
  console.log(`---------------------------------------------------\n`);

  // We expect optimized version to be faster
  // Note: Initial render of optimized version still costs time, but re-renders should be near 0
  expect((global as any).optimizedTime).toBeLessThan((global as any).unoptimizedTime);
});
