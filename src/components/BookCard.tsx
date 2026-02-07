import React from 'react';
import type { Book } from '../types';

interface BookCardProps {
  book: Book;
  isRead: boolean;
  onToggleRead: (id: number) => void;
}

const getCategoryStyles = (category: string) => {
  switch (category.toLowerCase()) {
    case 'classics':
      return 'bg-amber-100 text-amber-800';
    case 'contemporary':
      return 'bg-rose-100 text-rose-800';
    case 'thrillers':
      return 'bg-slate-200 text-slate-700';
    default:
      return 'bg-stone-100 text-stone-600';
  }
};

const BookCard: React.FC<BookCardProps> = ({ book, isRead, onToggleRead }) => {
  return (
    <div
      className={`bg-white rounded-xl p-6 shadow-sm border transition-all duration-200 flex flex-col justify-between hover:-translate-y-1 hover:shadow-md hover:border-amber-300 ${
        isRead ? 'border-emerald-200 bg-stone-50/50' : 'border-stone-200'
      }`}
      role="article"
      aria-label={`Book card for ${book.title}`}
    >
      <div className="mb-4">
        <h3 className="text-xl font-bold mb-1 text-stone-900 leading-tight font-serif">{book.title}</h3>
        <p className="text-stone-500 mb-4 text-sm font-medium">by {book.author}</p>
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-2 ${getCategoryStyles(book.category)}`}>
          {book.category}
        </span>
      </div>
      <button
        onClick={() => onToggleRead(book.id)}
        className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors ${
          isRead
            ? 'bg-emerald-50 text-emerald-600 border border-emerald-200 hover:bg-emerald-100'
            : 'bg-stone-900 text-white hover:bg-stone-700 shadow-sm'
        }`}
        aria-pressed={isRead}
        aria-label={`Mark ${book.title} as ${isRead ? 'unread' : 'read'}`}
      >
        {isRead ? (
          <>
            <span className="text-emerald-500">✓</span> Read
          </>
        ) : (
          '○ Mark as Read'
        )}
      </button>
    </div>
  );
};

export default BookCard;
