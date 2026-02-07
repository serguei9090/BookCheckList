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
      className={`book-card ${isRead ? 'completed' : ''}`}
      role="article"
      aria-label={`Book card for ${book.title}`}
    >
      <div className="checkbox-container">
        <button
          onClick={() => onToggleRead(book.id)}
          className={`custom-checkbox ${isRead ? 'checked' : ''}`}
          aria-pressed={isRead}
          aria-label={`Mark ${book.title} as ${isRead ? 'unread' : 'read'}`}
        >
          {isRead && (
            <svg className="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          )}
        </button>
      </div>

      <div className="book-content">
        <span className="category-label">{book.category}</span>
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">{book.author}</p>
      </div>

      <div className="book-description">
        <svg className="info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="16" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
        <p style={{ margin: 0 }}>{book.description}</p>
      </div>
    </div>
  );
};

export default BookCard;
