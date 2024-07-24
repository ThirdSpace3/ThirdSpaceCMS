import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(sessionStorage.getItem('isLoggedIn') === 'true');
  const [walletId, setWalletId] = useState(sessionStorage.getItem('userAccount'));

  useEffect(() => {
    sessionStorage.setItem('isLoggedIn', isLoggedIn);
    sessionStorage.setItem('userAccount', walletId);
  }, [isLoggedIn, walletId]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, walletId, setWalletId }}>
      {children}
    </AuthContext.Provider>
  );
};
