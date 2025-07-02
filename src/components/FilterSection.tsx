import React from 'react';
import { ArrowUpDown, ChevronDown } from 'lucide-react';
import { SortOption } from '../types';

interface FilterSectionProps {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  sortOption: SortOption;
  setSortOption: (option: SortOption) => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  sortOption,
  setSortOption,
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center gap-4">
      <div className="relative">
        <label htmlFor="category-select" className="block text-sm font-medium text-gray-700 mb-1">
          Category
        </label>
        <div className="relative">
          <select
            id="category-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-lg bg-white/70 backdrop-blur-sm transition-all"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <ChevronDown size={16} className="text-gray-500" />
          </div>
        </div>
      </div>

      <div className="relative">
        <label htmlFor="sort-select" className="block text-sm font-medium text-gray-700 mb-1">
          Sort By
        </label>
        <div className="relative">
          <select
            id="sort-select"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value as SortOption)}
            className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-lg bg-white/70 backdrop-blur-sm transition-all"
          >
            <option value="default">Default</option>
            <option value="price-low-high">Price: Low to High</option>
            <option value="price-high-low">Price: High to Low</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <ArrowUpDown size={16} className="text-gray-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
