import React, { createContext, useContext, useState } from 'react';

const StyleContext = createContext();

export const StyleProvider = ({ children }) => {
  const [style, setStyle] = useState({});

  const updateStyle = (newStyles) => {
    setStyle(newStyles);
  };

  return (
    <StyleContext.Provider value={{ style, updateStyle }}>
      {children}
    </StyleContext.Provider>
  );
};

export const useStyle = () => useContext(StyleContext);
