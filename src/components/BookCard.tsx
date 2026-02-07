import React from 'react';
import type { Book } from '../types';

interface BookCardProps {
  book: Book;
  isRead: boolean;
  onToggleRead: (id: number) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, isRead, onToggleRead }) => {
  return (
    <div
      className={`book-card ${isRead ? 'read' : ''}`}
      role="article"
      aria-label={`Book card for ${book.title}`}
    >
      <div className="book-info">
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">by {book.author}</p>
        <span className={`category-badge ${book.category.toLowerCase()}`}>
          {book.category}
        </span>
      </div>
      <button
        onClick={() => onToggleRead(book.id)}
        className={`toggle-btn ${isRead ? 'read-btn' : 'unread-btn'}`}
        aria-pressed={isRead}
        aria-label={`Mark ${book.title} as ${isRead ? 'unread' : 'read'}`}
      >
        {isRead ? '✓ Read' : '○ Mark as Read'}
      </button>
    </div>
  );
};

export default React.memo(BookCard);
