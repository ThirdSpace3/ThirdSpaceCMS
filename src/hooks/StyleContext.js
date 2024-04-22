import React, { createContext, useContext, useState } from 'react';

const StyleContext = createContext();

export const StyleProvider = ({ children }) => {
  const [style, setStyle] = useState({});
  const [selectedComponent, setSelectedComponent] = useState(null);

  const updateStyle = (newStyles) => {
    if (selectedComponent === 'SectionHero') {
      setStyle(prevStyles => ({ ...prevStyles, ...newStyles }));
    }
  };

  return (
    <StyleContext.Provider value={{ style, updateStyle, setSelectedComponent }}>
      {children}
    </StyleContext.Provider>
  );
};

export const useStyle = () => useContext(StyleContext);
