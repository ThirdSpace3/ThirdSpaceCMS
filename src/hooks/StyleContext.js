import React, { createContext, useContext, useState } from 'react';

const StyleContext = createContext();

export const StyleProvider = ({ children }) => {
  const [style, setStyle] = useState({});
  const [selectedComponent, setSelectedComponent] = useState(null);

  const updateStyle = (selectedElement, newStyle) => {
    console.log(`updateStyle called with newStyle:`, newStyle);

    setStyle((prevStyle) => ({
      ...prevStyle,
      [selectedElement]: { ...prevStyle[selectedElement], ...newStyle },
    }));
  };
  

  return (
    <StyleContext.Provider value={{ style, updateStyle, setSelectedComponent }}>
      {children}
    </StyleContext.Provider>
  );
};

export const useStyle = () => useContext(StyleContext);
