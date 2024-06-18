// useAnalytics.js
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { analytics } from '../firebaseConfig'; // Ensure this path is correct

export default function useAnalytics() {
  const location = useLocation();

  useEffect(() => {
    // Log page view on path change
    const currentPath = location.pathname + location.search;
    // Firebase web analytics does not have 'setCurrentScreen' method; use 'logEvent' instead
    analytics.logEvent('page_view', { page_path: currentPath });
  }, [location]);
}