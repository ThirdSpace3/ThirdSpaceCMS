import React, { createContext, useContext, useState } from 'react';

const TemplateContext = createContext();

export const useTemplateContext = () => useContext(TemplateContext);

export const TemplateProvider = ({ children }) => {
    const [selectedElement, setSelectedElement] = useState(null);
    const [settings, setSettings] = useState({});
  
    const handleSettingsChange = (newSettings) => {
      setSettings(newSettings);
    };
  
    const value = {
      settings,
      handleSettingsChange,
      selectedElement,
      setSelectedElement,
    };
  
    return (
      <TemplateContext.Provider value={value}>
        {children}
      </TemplateContext.Provider>
    );
  };
  