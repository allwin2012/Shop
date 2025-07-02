import React, { ReactNode, useState, useEffect } from 'react';
import { Menu, ShoppingBag, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Cart from './Cart';
import { useNavigate } from '../hooks/useNavigate';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { totalItems, setIsCartOpen } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCheckoutPage, setIsCheckoutPage] = useState(false);
  
  useEffect(() => {
    // Check if we're on the checkout page using URL search param or sessionStorage
    const isCheckout = window.location.search.includes('checkout=true') || 
                       sessionStorage.getItem('showCheckout') === 'true';
    setIsCheckoutPage(isCheckout);
    
    // Restore scroll position when returning from checkout
    const savedPosition = sessionStorage.getItem('scrollPosition');
    if (savedPosition && !isCheckout) {
      window.scrollTo(0, parseInt(savedPosition));
      sessionStorage.removeItem('scrollPosition');
    }
    
    // Listen for navigation events to update checkout state
    const handleNavigation = () => {
      const isCheckoutNow = window.location.search.includes('checkout=true') || 
                           sessionStorage.getItem('showCheckout') === 'true';
      setIsCheckoutPage(isCheckoutNow);
    };
    
    window.addEventListener('checkoutNavigation', handleNavigation);
    window.addEventListener('popstate', handleNavigation);
    
    return () => {
      window.removeEventListener('checkoutNavigation', handleNavigation);
      window.removeEventListener('popstate', handleNavigation);
    };
  }, []);

  const categories = [
    { name: 'Home', href: '#', current: true },
    { name: 'Electronics', href: '#', current: false },
    { name: 'Clothing', href: '#', current: false },
    { name: 'Footwear', href: '#', current: false },
    { name: 'Home', href: '#', current: false },
    { name: 'Accessories', href: '#', current: false },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="sticky top-0 z-10 bg-white/90 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <ShoppingBag className="h-8 w-8 text-indigo-600" />
              <h1 className="ml-2 text-2xl font-bold text-gray-800">ShopSpot India</h1>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {categories.map((category) => (
                <a 
                  key={category.name}
                  href={category.href} 
                  className={`text-base font-medium transition-colors ${
                    category.current 
                      ? 'text-indigo-600 border-b-2 border-indigo-600' 
                      : 'text-gray-600 hover:text-indigo-600'
                  }`}
                >
                  {category.name}
                </a>
              ))}
            </nav>
            
            <div className="flex items-center space-x-4">
              {/* Cart button */}
              <button 
                className="relative bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition-colors"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingBag className="h-5 w-5 text-gray-600" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {totalItems}
                  </span>
                )}
              </button>
              
              {/* Mobile menu button */}
              <button 
                className="bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition-colors md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="h-5 w-5 text-gray-600" />
                ) : (
                  <Menu className="h-5 w-5 text-gray-600" />
                )}
              </button>
            </div>
          </div>
          
          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 py-3 border-t border-gray-200">
              <div className="flex flex-col space-y-3">
                {categories.map((category) => (
                  <a 
                    key={category.name}
                    href={category.href} 
                    className={`text-base font-medium transition-colors ${
                      category.current 
                        ? 'text-indigo-600' 
                        : 'text-gray-600 hover:text-indigo-600'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {category.name}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {children}
      </main>

      <Cart />

      <footer className="bg-gray-800 text-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">ShopSpot</h3>
              <p className="text-gray-400 text-sm">
                Your one-stop shop for the latest products with great deals and discounts.
              </p>
            </div>
            <div>
              <h4 className="text-md font-semibold mb-4">Shop</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">New Arrivals</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Best Sellers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Discounts</a></li>
                <li><a href="#" className="hover:text-white transition-colors">All Products</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-md font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-md font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Email: info@shopspot.com</li>
                <li>Phone: +1 (555) 123-4567</li>
                <li>Address: 123 Commerce St, City, Country</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-sm text-gray-400 text-center">
            <p>© {new Date().getFullYear()} ShopSpot. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
