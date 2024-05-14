import React, { createContext, useContext, useState, useEffect } from 'react';

const StyleContext = createContext();

export const StyleProvider = ({ children }) => {
  const [style, setStyle] = useState(() => JSON.parse(localStorage.getItem('style')) || {});
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [selectedElement, setSelectedElement] = useState(null);
  // const [settings, setSettings] = useState(() => JSON.parse(localStorage.getItem('settings')) || { textStyles: {} });

  useEffect(() => {
    localStorage.setItem('style', JSON.stringify(style));
    console.log(style);
  }, [style]);

  // useEffect(() => {
  //   localStorage.setItem('settings', JSON.stringify(settings));
  //   console.log(style);

  // }, [settings]);

  const updateStyle = (componentName, newStyle) => {
    setStyle(prevStyle => {
        const updatedComponentStyle = {
            ...prevStyle[componentName],
            ...newStyle
        };

        // Direct DOM manipulation for instant update
        const element = document.getElementById(componentName);
        if (element) {
            Object.keys(newStyle).forEach(key => {
                element.style[key] = newStyle[key];
            });
        }

        return {
            ...prevStyle,
            [componentName]: updatedComponentStyle
        };
    });
    console.log(`Styles updated for ${componentName}:`, newStyle);
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
  // const updateSettings = (newSettings) => {
  //   setSettings(prevSettings => {
  //     const updatedSettings = {
  //       ...prevSettings,
  //       textStyles: { ...prevSettings.textStyles, ...newSettings.textStyles },
  //       ...newSettings
  //     };
  //     return updatedSettings;
  //   });
  // };



  return (
    <StyleContext.Provider value={{
      style, 
      updateStyle, 
      getComponentStyle, 
      resetStyle, 
      applyGlobalStyles, 
      setSelectedComponent, 
    }}>
      {children}
    </StyleContext.Provider>
  );
};

export const useStyle = () => useContext(StyleContext);
