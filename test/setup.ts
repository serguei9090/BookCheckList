import { mock } from "bun:test";

mock.module('/vite.svg', () => ({ default: 'vite-mock-url' }));
mock.module('./assets/react.svg', () => ({ default: 'react-mock-url' }));
