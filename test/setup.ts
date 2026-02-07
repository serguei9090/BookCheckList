import { mock, afterEach } from "bun:test";
import { JSDOM } from "jsdom";
import * as matchers from "@testing-library/jest-dom/matchers";
import { expect } from "bun:test";
import { cleanup } from "@testing-library/react";

expect.extend(matchers);

const dom = new JSDOM("<!doctype html><html><body></body></html>");
global.document = dom.window.document;
global.window = dom.window as unknown as Window & typeof globalThis;
global.navigator = dom.window.navigator;
global.Element = dom.window.Element;
global.Node = dom.window.Node;

afterEach(() => {
  cleanup();
});

mock.module('/vite.svg', () => ({ default: 'vite-mock-url' }));
mock.module('./assets/react.svg', () => ({ default: 'react-mock-url' }));
