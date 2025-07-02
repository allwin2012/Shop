import React from 'react';
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Cart: React.FC = () => {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    isCartOpen, 
    setIsCartOpen,
    totalItems,
    totalPrice
  } = useCart();

  if (!isCartOpen) return null;

  const handleProceedToCheckout = () => {
    try {
      // Save the current scroll position
      sessionStorage.setItem('scrollPosition', window.scrollY.toString());
      // Set checkout flag
      sessionStorage.setItem('showCheckout', 'true');
      // Update URL
      window.history.pushState({}, '', window.location.pathname + '?checkout=true');
      // Close cart
      setIsCartOpen(false);
      // Trigger re-render with a small delay to ensure cart is closed first
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('checkoutNavigation'));
        console.log('Navigated to checkout page');
      }, 50);
    } catch (error) {
      console.error('Error navigating to checkout:', error);
      // Fallback direct navigation
      window.location.href = window.location.pathname + '?checkout=true';
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />
      
      {/* Cart panel */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md transform bg-white shadow-xl transition-transform duration-300 sm:w-96">
        <div className="flex h-full flex-col">
          {/* Cart header */}
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white px-4 py-4">
            <h2 className="text-lg font-medium text-gray-900 flex items-center">
              <ShoppingBag className="mr-2 h-5 w-5 text-indigo-600" />
              Your Cart
              <span className="ml-2 rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-800">
                {totalItems} items
              </span>
            </h2>
            <button
              type="button"
              className="rounded-md bg-white p-1 text-gray-400 hover:text-gray-500"
              onClick={() => setIsCartOpen(false)}
            >
              <span className="sr-only">Close</span>
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Cart items */}
          <div className="flex-1 overflow-y-auto px-4 py-4">
            {cartItems.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center">
                <ShoppingBag className="h-16 w-16 text-gray-300" />
                <h3 className="mt-4 text-lg font-medium text-gray-900">Your cart is empty</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Start shopping to add items to your cart.
                </p>
                <button
                  type="button"
                  className="mt-6 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                  onClick={() => setIsCartOpen(false)}
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <li key={item.id} className="flex py-4">
                    <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3 className="line-clamp-1">{item.name}</h3>
                          <p className="ml-4">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500 line-clamp-1">{item.category}</p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="flex items-center border border-gray-300 rounded-md">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 text-gray-500 hover:text-gray-700"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="px-2 text-gray-900 w-8 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 text-gray-500 hover:text-gray-700"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <button
                          type="button"
                          className="text-indigo-600 hover:text-indigo-500 flex items-center"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 size={16} className="mr-1" />
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Cart footer */}
          {cartItems.length > 0 && (
            <div className="border-t border-gray-200 px-4 py-4 sm:px-6">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>₹{totalPrice.toLocaleString('en-IN')}</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500">
                Shipping and taxes calculated at checkout.
              </p>
              <div className="mt-4">
                <button
                  type="button"
                  className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={handleProceedToCheckout}
                >
                  Proceed to Checkout
                </button>
              </div>
              <div className="mt-4 flex justify-center text-sm text-gray-500">
                <p>
                  or{' '}
                  <button
                    type="button"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                    onClick={() => setIsCartOpen(false)}
                  >
                    Continue Shopping
                    <span aria-hidden="true"> &rarr;</span>
                  </button>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
