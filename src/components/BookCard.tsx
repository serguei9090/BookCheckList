import React from 'react';
import type { Book } from '../types';

interface BookCardProps {
  book: Book;
  isRead: boolean;
  onToggleRead: (id: number) => void;
  isDownloaded: boolean;
  onToggleDownloaded: (id: number) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, isRead, onToggleRead, isDownloaded, onToggleDownloaded }) => {
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
      <div className="book-actions">
        <button
          onClick={() => onToggleRead(book.id)}
          className={`toggle-btn ${isRead ? 'read-btn' : 'unread-btn'}`}
          aria-pressed={isRead}
          aria-label={`Mark ${book.title} as ${isRead ? 'unread' : 'read'}`}
        >
          {isRead ? '✓ Read' : '○ Mark as Read'}
        </button>
        <button
          onClick={() => onToggleDownloaded(book.id)}
          className={`toggle-btn ${isDownloaded ? 'downloaded-btn' : 'not-downloaded-btn'}`}
          aria-pressed={isDownloaded}
          aria-label={`Mark ${book.title} as ${isDownloaded ? 'not downloaded' : 'downloaded'}`}
        >
          {isDownloaded ? '✓ Downloaded' : '○ Download'}
        </button>
      </div>
    </div>
  );
};

export default BookCard;
