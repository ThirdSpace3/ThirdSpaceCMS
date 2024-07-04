// AnalyticsWrapper.js
import React from 'react';
import useAnalytics from './usaAnalytics';

const AnalyticsWrapper = ({ children }) => {
  useAnalytics();
  return <>{children}</>; // Simply renders the children components
};

export default AnalyticsWrapper;
