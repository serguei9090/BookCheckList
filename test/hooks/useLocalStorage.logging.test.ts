import { test, expect, afterEach, beforeEach, mock } from "bun:test";
import { renderHook, cleanup } from "@testing-library/react";

// IMPORTANT: Import useLocalStorage inside tests or after mocking module
// However, imports are hoisted. So we must use dynamic import() or rely on bun's mock hoisting if available.
// Bun's mock.module is hoisted?

// Let's use beforeEach to set up mocks before importing?
// No, imports happen before tests run.

// Wait, if I mock module, subsequent imports use the mock.
// But if I import at top level, it might use the original if mock happens later.

// Bun docs say: "mock.module() ... must be called before the module is imported."

// So I cannot easily change the mock between tests in the same file if I import the module at the top level.

// I will split the tests into two files or use a single file where I verify the "default" behavior (no log) and another file where I force verify logging.

// Given I want to keep it simple, I will create two test files for logging verification.
// 1. useLocalStorage.logging.dev.test.ts (mocks isDev = true)
// 2. useLocalStorage.logging.prod.test.ts (mocks isDev = false)

// But wait, can I just run the tests?

// Let's create one file that verifies it DOES warn when isDev is mocked to true.
// The default behavior (false) is already tested implicitly (no unexpected console output in other tests).

// So I'll focus on proving that it CAN warn.

mock.module("../../src/utils/env", () => ({
  isDev: true,
}));

// Now import the hook
import useLocalStorage from "../../src/hooks/useLocalStorage";

// Mock console.warn
const originalWarn = console.warn;
const mockWarn = mock(() => {});

beforeEach(() => {
  console.warn = mockWarn;
  mockWarn.mockClear();
});

afterEach(() => {
  cleanup();
  console.warn = originalWarn;
});

test("useLocalStorage should warn when isDev is true and localStorage fails", () => {
  // Mock localStorage.getItem to throw by redefining window.localStorage
  const originalLocalStorage = window.localStorage;
  const mockStorage = {
    getItem: mock(() => {
      throw new Error("Storage full");
    }),
    setItem: mock(() => {}),
    removeItem: mock(() => {}),
    clear: mock(() => {}),
    key: mock(() => null),
    length: 0,
  } as unknown as Storage;

  Object.defineProperty(window, "localStorage", {
    value: mockStorage,
    writable: true,
  });

  try {
    renderHook(() => useLocalStorage("test-key", "default"));
    expect(mockWarn).toHaveBeenCalled();
  } finally {
    // Restore localStorage
    Object.defineProperty(window, "localStorage", {
      value: originalLocalStorage,
      writable: true,
    });
  }
});
