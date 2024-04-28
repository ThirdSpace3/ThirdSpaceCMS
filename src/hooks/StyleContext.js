import React, { createContext, useContext, useState, useEffect } from 'react';

const StyleContext = createContext();

export const StyleProvider = ({ children }) => {
  const [style, setStyle] = useState({});
const [selectedComponent, setSelectedComponent] = useState(null);
  const [selectedElement, setSelectedElement] = useState(null);  // Ensure this is managed correctly
  const [settings, setSettings] = useState({ textStyles: {} });




  const updateStyle = (componentName, newStyle) => {
    setStyle(prevStyle => {
        const updatedStyle = {
            ...prevStyle,
            [componentName]: { ...prevStyle[componentName], ...newStyle }
        };
        return updatedStyle;
    });
};

  
  const updateSettings = (newSettings) => {
    setSettings(prevSettings => ({
      ...prevSettings,
      textStyles: { ...prevSettings.textStyles, ...newSettings.textStyles },
      ...newSettings
    }));
  };
  
  
  

  // Get the current style for a component
  const getComponentStyle = (componentName) => {
    return style[componentName] || {};
  };

  // Reset styles for a component or all components
  const resetStyle = (componentName = null) => {
    if (componentName) {
      setStyle(prevStyle => ({ ...prevStyle, [componentName]: {} }));
    } else {
      setStyle({});
    }
  };

  // Apply global style updates; useful for theming or large-scale style changes
  const applyGlobalStyles = (globalStyles) => {
    setStyle(prevStyle => ({ ...prevStyle, ...globalStyles }));
  };

  return (
    <StyleContext.Provider value={{ style, updateStyle, getComponentStyle, resetStyle, applyGlobalStyles, setSelectedComponent, updateSettings  }}>
      {children}
    </StyleContext.Provider>
  );
};

export const useStyle = () => useContext(StyleContext);
