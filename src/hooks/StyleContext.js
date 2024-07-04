import React, { createContext, useContext, useState, useEffect } from 'react';

const StyleContext = createContext();

export const StyleProvider = ({ children }) => {
    const [styles, setStyles] = useState(() => JSON.parse(localStorage.getItem('styles')) || {});

    useEffect(() => {
        localStorage.setItem('styles', JSON.stringify(styles));
    }, [styles]);

    const updateStyle = (componentName, newStyle) => {
        setStyles(prevStyles => {
            const updatedComponentStyle = {
                ...prevStyles[componentName],
                ...newStyle
            };
            return {
                ...prevStyles,
                [componentName]: updatedComponentStyle
            };
        });
    };

    const getComponentStyle = (componentName) => {
        return styles[componentName] || {};
    };

    return (
        <StyleContext.Provider value={{ styles, updateStyle, getComponentStyle }}>
            {children}
        </StyleContext.Provider>
    );
};

export const useStyle = () => useContext(StyleContext);
