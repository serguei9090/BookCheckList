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
    <div className="flex flex-wrap justify-center gap-2 mb-8" role="tablist" aria-label="Book categories">
      <button
        role="tab"
        aria-selected={selectedCategory === 'All'}
        className={`px-5 py-2 rounded-full font-medium transition-all duration-200 border ${
          selectedCategory === 'All'
            ? 'bg-stone-800 text-white border-stone-800 shadow-md'
            : 'bg-white text-stone-500 border-stone-200 hover:bg-stone-100 hover:text-stone-800 hover:border-stone-300'
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
          className={`px-5 py-2 rounded-full font-medium transition-all duration-200 border ${
            selectedCategory === cat
              ? 'bg-stone-800 text-white border-stone-800 shadow-md'
              : 'bg-white text-stone-500 border-stone-200 hover:bg-stone-100 hover:text-stone-800 hover:border-stone-300'
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
