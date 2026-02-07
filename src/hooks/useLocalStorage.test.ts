import { test, expect, afterEach } from "bun:test";
import { renderHook, act, cleanup } from "@testing-library/react";
import useLocalStorage from "./useLocalStorage";

afterEach(() => {
  cleanup();
  window.localStorage.clear();
});

test("useLocalStorage should initialize with default value", () => {
  const { result } = renderHook(() => useLocalStorage("test-key", "default"));
  expect(result.current[0]).toBe("default");
});

test("useLocalStorage should store and retrieve value", () => {
  const { result } = renderHook(() => useLocalStorage("test-key", "default"));

  act(() => {
    result.current[1]("new value");
  });

  expect(result.current[0]).toBe("new value");
  expect(window.localStorage.getItem("test-key")).toBe(JSON.stringify("new value"));
});

test("useLocalStorage should read existing value from localStorage", () => {
  window.localStorage.setItem("test-key", JSON.stringify("existing"));
  const { result } = renderHook(() => useLocalStorage("test-key", "default"));
  expect(result.current[0]).toBe("existing");
});
