import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import Checkout from './pages/Checkout.tsx'
import { CartProvider } from './context/CartContext'

// Get the root element
const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error('Root element not found');
  throw new Error('Root element not found');
}

// Create a root
const root = createRoot(rootElement);

// Function to determine which page to show
const renderApp = () => {
  // Check if we should show checkout page
  const showCheckout = window.location.search.includes('checkout=true') || 
                      sessionStorage.getItem('showCheckout') === 'true';
  
  // Render the appropriate component
  root.render(
    <StrictMode>
      <CartProvider>
        {showCheckout ? <Checkout /> : <App />}
      </CartProvider>
    </StrictMode>
  );
};

// Initial render
renderApp();

// Listen for navigation events
window.addEventListener('checkoutNavigation', () => {
  console.log('Navigation event received');
  renderApp();
});

// Handle browser back/forward buttons
window.addEventListener('popstate', () => {
  // If the back button is pressed, update checkout state accordingly
  const isCheckout = window.location.search.includes('checkout=true');
  if (!isCheckout) {
    sessionStorage.removeItem('showCheckout');
  } else {
    sessionStorage.setItem('showCheckout', 'true');
  }
  renderApp();
});
