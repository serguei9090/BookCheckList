import { useState, useMemo, useCallback } from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import Header from './components/Header';
import ProgressStats from './components/ProgressStats';
import CategoryFilter from './components/CategoryFilter';
import BookCard from './components/BookCard';
import booksData from './data/books.json';
import type { Book } from './types';

function App() {
  const [readBookIds, setReadBookIds] = useLocalStorage<number[]>('readBookIds', []);
  const [downloadedBookIds, setDownloadedBookIds] = useLocalStorage<number[]>('downloadedBookIds', []);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const books: Book[] = booksData as Book[];

  const toggleRead = useCallback((id: number) => {
    setReadBookIds((prevIds) => {
      if (prevIds.includes(id)) {
        return prevIds.filter(bookId => bookId !== id);
      } else {
        return [...prevIds, id];
      }
    });
  }, [setReadBookIds]);

  const toggleDownloaded = useCallback((id: number) => {
    setDownloadedBookIds((prevIds) => {
      if (prevIds.includes(id)) {
        return prevIds.filter(bookId => bookId !== id);
      } else {
        return [...prevIds, id];
      }
    });
  }, [setDownloadedBookIds]);

  const categories = useMemo(() => Array.from(new Set(books.map(b => b.category))), [books]);

  // Filter logic
  const filteredBooks = selectedCategory === 'All'
    ? books
    : books.filter(b => b.category === selectedCategory);

  const readCount = readBookIds.length;
  const downloadedCount = downloadedBookIds.length;
  const totalCount = books.length;

  return (
    <div className="max-w-5xl mx-auto p-8 min-h-screen bg-stone-50 font-sans">
      <Header />

      <ProgressStats
        readCount={readCount}
        downloadedCount={downloadedCount}
        totalCount={totalCount}
      />

      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" role="list">
        {filteredBooks.map(book => (
          <BookCard
            key={book.id}
            book={book}
            isRead={readBookIds.includes(book.id)}
            onToggleRead={toggleRead}
            isDownloaded={downloadedBookIds.includes(book.id)}
            onToggleDownloaded={toggleDownloaded}
          />
        ))}
      </main>

      {filteredBooks.length === 0 && (
        <p className="text-center text-stone-500 mt-12 font-serif text-lg italic">
          No books found in this collection.
        </p>
      )}
    </div>
  );
}

export default App;
