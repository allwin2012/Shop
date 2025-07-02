import { useCallback } from 'react';

export const useNavigate = () => {
  const navigateTo = useCallback((path: string) => {
    try {
      if (path === '/') {
        // Navigate to home page
        console.log('Navigating to home page');
        // Remove checkout flag
        sessionStorage.removeItem('showCheckout');
        // Update URL to remove query params
        const newUrl = window.location.pathname;
        window.history.pushState({}, '', newUrl);
        // Dispatch navigation event to trigger re-render
        window.dispatchEvent(new CustomEvent('checkoutNavigation'));
      } else if (path === '/checkout') {
        // Navigate to checkout page
        console.log('Navigating to checkout page');
        // Save scroll position for later
        sessionStorage.setItem('scrollPosition', window.scrollY.toString());
        // Set checkout flag
        sessionStorage.setItem('showCheckout', 'true');
        // Update URL with checkout param
        const newUrl = window.location.pathname + '?checkout=true';
        window.history.pushState({}, '', newUrl);
        // Dispatch navigation event to trigger re-render
        window.dispatchEvent(new CustomEvent('checkoutNavigation'));
      }
    } catch (error) {
      console.error('Navigation error:', error);
      // Fallback direct navigation in case of error
      if (path === '/') {
        window.location.href = window.location.pathname;
      } else if (path === '/checkout') {
        window.location.href = window.location.pathname + '?checkout=true';
      }
    }
  }, []);

  return { navigateTo };
};

export default useNavigate;
