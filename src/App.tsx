import { useState, useEffect, useMemo } from 'react';
import './index.css';
import { Product, SortOption } from './types';
import { products, categories } from './data/products';
import Layout from './components/Layout';
import SearchBar from './components/SearchBar';
import FilterSection from './components/FilterSection';
import ProductGrid from './components/ProductGrid';
import { useCart } from './context/CartContext';

export function App() {
  // State for filtering and sorting
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('default');
  const [isLoading, setIsLoading] = useState(true);
  
  // Access cart context
  const cart = useCart();

  // Google Fonts
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Debug navigation state
  useEffect(() => {
    console.log('App component mounted');
    // Check if we're supposed to be on the checkout page
    const isCheckout = window.location.search.includes('checkout=true') || 
                       sessionStorage.getItem('showCheckout') === 'true';
    if (isCheckout) {
      console.log('Should be on checkout page');
    }
  }, []);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Filter by search term
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        
        // Filter by category
        const matchesCategory = selectedCategory === '' || product.category === selectedCategory;
        
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        // Sort by price
        if (sortOption === 'price-low-high') {
          return a.price - b.price;
        } else if (sortOption === 'price-high-low') {
          return b.price - a.price;
        }
        // Default sorting (by id)
        return a.id - b.id;
      });
  }, [searchTerm, selectedCategory, sortOption, products]);

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Shop Our Products</h1>
        <p className="text-gray-600">Browse our latest collection of high-quality products.</p>
      </div>

      <div className="bg-white/50 backdrop-blur-md shadow-sm rounded-xl p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-end gap-4">
          <div className="flex-grow">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </div>
          <div className="w-full md:w-auto">
            <FilterSection 
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              sortOption={sortOption}
              setSortOption={setSortOption}
            />
          </div>
        </div>
      </div>

      <div className="mb-4 flex justify-between items-center">
        <p className="text-gray-600">{filteredProducts.length} products found</p>
        {selectedCategory && (
          <button 
            onClick={() => setSelectedCategory('')}
            className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center"
          >
            Clear category filter
          </button>
        )}
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
        </div>
      ) : (
        <ProductGrid products={filteredProducts} />
      )}
    </Layout>
  );
}

export default App;
