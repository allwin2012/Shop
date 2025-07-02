import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  onOpenDetails: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onOpenDetails }) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
  };
  
  return (
    <div 
      className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1 cursor-pointer"
      onClick={() => onOpenDetails(product)}
    >
      <div className="relative overflow-hidden h-64">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      <div className="p-4 flex-grow flex flex-col">
        <div className="mb-2 flex items-start justify-between">
          <h3 className="text-lg font-medium text-gray-800 line-clamp-2">{product.name}</h3>
        </div>
        
        <div className="flex-grow">
          <p className="text-gray-500 text-sm line-clamp-2 mb-2">{product.description}</p>
          <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full mb-2">{product.category}</span>
        </div>
        
        <div className="mt-2 flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">₹{product.price.toLocaleString('en-IN')}</span>
          <button 
            className="flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-lg transition-colors duration-200"
            onClick={handleAddToCart}
          >
            <ShoppingCart size={16} className="mr-1" />
            <span className="text-sm">Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
