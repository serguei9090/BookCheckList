import { useState, useMemo } from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import Header from './components/Header';
import ProgressStats from './components/ProgressStats';
import CategoryFilter from './components/CategoryFilter';
import BookCard from './components/BookCard';
import booksData from './data/books.json';
import type { Book } from './types';
import './components/components.css';

function App() {
  const [readBookIds, setReadBookIds] = useLocalStorage<number[]>('readBookIds', []);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const books: Book[] = booksData as Book[];

  const toggleRead = (id: number) => {
    setReadBookIds((prevIds) => {
      if (prevIds.includes(id)) {
        return prevIds.filter(bookId => bookId !== id);
      } else {
        return [...prevIds, id];
      }
    });
  };

  const categories = useMemo(() => Array.from(new Set(books.map(b => b.category))), [books]);

  // Filter logic
  const filteredBooks = selectedCategory === 'All'
    ? books
    : books.filter(b => b.category === selectedCategory);

  const readCount = readBookIds.length;
  const totalCount = books.length;

  return (
    <div className="app-container">
      <Header />

      <ProgressStats
        readCount={readCount}
        totalCount={totalCount}
      />

      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <main className="book-list" role="list">
        {filteredBooks.map(book => (
          <BookCard
            key={book.id}
            book={book}
            isRead={readBookIds.includes(book.id)}
            onToggleRead={toggleRead}
          />
        ))}
      </main>

      {filteredBooks.length === 0 && (
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '2rem' }}>
          No books found in this category.
        </p>
      )}
    </div>
  );
}

export default App;
