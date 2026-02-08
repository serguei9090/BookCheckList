import React from 'react';
import type { Book } from '../types';

interface BookCardProps {
  book: Book;
  isRead: boolean;
  onToggleRead: (id: number) => void;
  isDownloaded: boolean;
  onToggleDownloaded: (id: number) => void;
}

const getCategoryStyles = (category: string) => {
  switch (category.toLowerCase()) {
    case 'classics':
      return 'bg-amber-100 text-amber-900 border border-amber-200/50';
    case 'contemporary':
      return 'bg-rose-50 text-rose-900 border border-rose-100';
    case 'thrillers':
      return 'bg-stone-100 text-stone-800 border border-stone-200';
    default:
      return 'bg-stone-50 text-stone-600 border border-stone-200';
  }
};

const BookCard: React.FC<BookCardProps> = ({ book, isRead, onToggleRead, isDownloaded, onToggleDownloaded }) => {
  return (
    <div
      className={`bg-white rounded-2xl p-6 shadow-sm border transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 hover:shadow-xl hover:border-amber-300/50 ${
        isRead ? 'grayscale opacity-60 border-stone-200' : 'border-stone-200'
      }`}
      role="article"
      aria-label={`Book card for ${book.title}`}
    >
      <div className="mb-4">
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-3 ${getCategoryStyles(book.category)}`}>
          {book.category}
        </span>
        <h3 className="text-2xl font-bold mb-2 text-stone-900 leading-tight font-serif tracking-tight">{book.title}</h3>
        <p className="text-stone-500 mb-6 text-sm font-sans font-medium italic">by {book.author}</p>
      </div>

      <div className="flex flex-col gap-3 mt-auto">
        <button
          onClick={() => onToggleRead(book.id)}
          className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-200 border ${
            isRead
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200 shadow-inner'
              : 'bg-stone-900 text-white border-stone-900 shadow-md hover:shadow-lg hover:bg-stone-800'
          }`}
          aria-pressed={isRead}
          aria-label={`Mark ${book.title} as ${isRead ? 'unread' : 'read'}`}
        >
          {isRead ? (
            <>
              <span className="text-emerald-600">✓</span> Completed
            </>
          ) : (
            'Mark as Read'
          )}
        </button>

        <button
          onClick={() => onToggleDownloaded(book.id)}
          className={`w-full py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all duration-200 border ${
            isDownloaded
              ? 'bg-sky-50 text-sky-700 border-sky-200 shadow-inner'
              : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50 hover:border-stone-300 hover:text-stone-900'
          }`}
          aria-pressed={isDownloaded}
          aria-label={`Mark ${book.title} as ${isDownloaded ? 'not downloaded' : 'downloaded'}`}
        >
          {isDownloaded ? (
            <>
              <span className="text-sky-600">✓</span> In Library
            </>
          ) : (
            'Add to Library'
          )}
        </button>
      </div>
    </div>
  );
};

export default React.memo(BookCard);
