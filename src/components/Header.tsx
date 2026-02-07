import React from 'react';

interface HeaderProps {
  onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  return (
    <header className="app-header">
      <div className="app-header-left">
        <h1>📚 Reading Checklist</h1>
        <p>Tracking my 2024-2026 curated library.</p>
      </div>
      <div className="search-bar">
        <svg
          className="search-icon"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input
          type="text"
          placeholder="Search title or author..."
          className="search-input"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
    </header>
  );
};

export default Header;
