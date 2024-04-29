import React, { createContext, useContext, useState, useEffect } from 'react';

const StyleContext = createContext();

export const StyleProvider = ({ children }) => {
  const [style, setStyle] = useState(() => JSON.parse(localStorage.getItem('style')) || {});
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [selectedElement, setSelectedElement] = useState(null);
  const [settings, setSettings] = useState(() => JSON.parse(localStorage.getItem('settings')) || { textStyles: {} });

  useEffect(() => {
    localStorage.setItem('style', JSON.stringify(style));
  }, [style]);

  useEffect(() => {
    localStorage.setItem('settings', JSON.stringify(settings));
  }, [settings]);

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
    setSettings(prevSettings => {
      const updatedSettings = {
        ...prevSettings,
        textStyles: { ...prevSettings.textStyles, ...newSettings.textStyles },
        ...newSettings
      };
      return updatedSettings;
    });
  };

  const getComponentStyle = (componentName) => {
    return style[componentName] || {};
  };

  const resetStyle = (componentName = null) => {
    if (componentName) {
      setStyle(prevStyle => ({ ...prevStyle, [componentName]: {} }));
    } else {
      setStyle({});
    }
  };

  const applyGlobalStyles = (globalStyles) => {
    setStyle(prevStyle => ({ ...prevStyle, ...globalStyles }));
  };

  return (
    <StyleContext.Provider value={{
      style, 
      updateStyle, 
      getComponentStyle, 
      resetStyle, 
      applyGlobalStyles, 
      setSelectedComponent, 
      updateSettings
    }}>
      {children}
    </StyleContext.Provider>
  );
};

export const useStyle = () => useContext(StyleContext);
