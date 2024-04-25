import React, { createContext, useContext, useState } from 'react';

const StyleContext = createContext();

export const StyleProvider = ({ children }) => {
  const [style, setStyle] = useState({});
  const [selectedComponent, setSelectedComponent] = useState(null);

  const updateStyle = (selectedElement, newStyle) => {
    // console.log(`updateStyle called with newStyle:`, newStyle);

    setStyle((prevStyle) => ({
      ...prevStyle,
      [selectedElement]: { ...prevStyle[selectedElement], ...newStyle },
    }));
  };

  const getComponentStyle = (component) => {
    return style[component] || {};
  };

  return (
    <StyleContext.Provider value={{ style, updateStyle, setSelectedComponent, getComponentStyle }}>
      {children}
    </StyleContext.Provider>
  );
};


export const useStyle = () => useContext(StyleContext);
