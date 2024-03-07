import React, { createContext, useContext, useState } from 'react';

const StyleContext = createContext();

export const useStyle = () => useContext(StyleContext);

export const StyleProvider = ({ children }) => {
    const [style, setStyle] = useState({});

    const updateStyle = (newStyle) => {
        setStyle(newStyle);
    };

    return (
        <StyleContext.Provider value={{ style, updateStyle }}>
            {children}
        </StyleContext.Provider>
    );
};
