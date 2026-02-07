import React from 'react';

interface CategoryFilterProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  categories: string[];
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
  categories
}) => {
  return (
    <div className="category-filter" role="tablist" aria-label="Book categories">
      <button
        role="tab"
        aria-selected={selectedCategory === 'All'}
        className={`filter-tab ${selectedCategory === 'All' ? 'active' : ''}`}
        onClick={() => onSelectCategory('All')}
      >
        All
      </button>
      {categories.map(cat => (
        <button
          key={cat}
          role="tab"
          aria-selected={selectedCategory === cat}
          className={`filter-tab ${selectedCategory === cat ? 'active' : ''}`}
          onClick={() => onSelectCategory(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
