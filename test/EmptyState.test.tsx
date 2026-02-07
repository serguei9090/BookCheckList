import { test, expect, afterEach } from 'bun:test';
import { render, cleanup } from '@testing-library/react';
import App from '../src/App';

afterEach(() => {
  cleanup();
});

test('App renders empty state message when no books are provided', () => {
  const { getByText } = render(<App initialBooks={[]} />);
  const message = getByText('No books found in this category.');
  expect(message).toBeInTheDocument();
  // Check for class name
  expect(message.className).toContain('empty-state-message');
});
