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
    <div
      className="sticky top-0 z-10 flex flex-wrap justify-center gap-3 py-4 mb-8 backdrop-blur-md bg-stone-50/90 border-b border-stone-200/50 transition-all"
      role="tablist"
      aria-label="Book categories"
    >
      <button
        role="tab"
        aria-selected={selectedCategory === 'All'}
        className={`px-6 py-2 rounded-full font-sans text-sm font-medium transition-all duration-300 ${
          selectedCategory === 'All'
            ? 'bg-stone-800 text-white shadow-md transform scale-105'
            : 'bg-transparent text-stone-500 hover:bg-stone-200 hover:text-stone-900'
        }`}
        onClick={() => onSelectCategory('All')}
      >
        All
      </button>
      {categories.map(cat => (
        <button
          key={cat}
          role="tab"
          aria-selected={selectedCategory === cat}
          className={`px-6 py-2 rounded-full font-sans text-sm font-medium transition-all duration-300 ${
            selectedCategory === cat
              ? 'bg-stone-800 text-white shadow-md transform scale-105'
              : 'bg-transparent text-stone-500 hover:bg-stone-200 hover:text-stone-900'
          }`}
          onClick={() => onSelectCategory(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
