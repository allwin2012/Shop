import React from 'react';
import { ShoppingCart, X } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductDetailsModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({ product, isOpen, onClose }) => {
  const { addToCart } = useCart();
  
  if (!isOpen || !product) return null;
  
  const handleAddToCart = () => {
    addToCart(product);
    // Don't close the modal after adding to cart
  };
  
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div 
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity backdrop-blur-sm" 
          aria-hidden="true"
          onClick={onClose}
        ></div>

        {/* Modal panel */}
        <div className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:align-middle">
          <div className="absolute right-0 top-0 pr-4 pt-4">
            <button
              type="button"
              className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
              onClick={onClose}
            >
              <span className="sr-only">Close</span>
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 w-full text-center sm:ml-4 sm:mt-0 sm:text-left">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Product Image */}
                  <div className="overflow-hidden rounded-lg bg-gray-100">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  
                  {/* Product Details */}
                  <div className="flex flex-col">
                    <h3 className="text-2xl font-bold text-gray-900" id="modal-title">
                      {product.name}
                    </h3>
                    <p className="mt-2 text-sm text-gray-500">
                      <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                        {product.category}
                      </span>
                    </p>
                    
                    <div className="mt-4">
                      <p className="text-3xl font-bold text-gray-900">₹{product.price.toLocaleString('en-IN')}</p>
                    </div>
                    
                    <div className="mt-4 flex-grow">
                      <h4 className="text-sm font-medium text-gray-900">Description</h4>
                      <p className="mt-2 text-sm text-gray-500">
                        {product.description}
                      </p>
                    </div>
                    
                    <div className="mt-6">
                      <button
                        type="button"
                        className="w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 flex items-center justify-center"
                        onClick={handleAddToCart}
                      >
                        <ShoppingCart className="mr-2 -ml-1 h-5 w-5" aria-hidden="true" />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsModal;
