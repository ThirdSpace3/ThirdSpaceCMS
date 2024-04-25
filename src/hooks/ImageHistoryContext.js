import React, { createContext, useState, useContext } from 'react';

const ImageHistoryContext = createContext();

export const useImageHistory = () => useContext(ImageHistoryContext);

export const ImageHistoryProvider = ({ children }) => {
    const [imageHistory, setImageHistory] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isReplacementMode, setIsReplacementMode] = useState(false);
    const [activeComponent, setActiveComponent] = useState(null);

    const addImageToHistory = (image) => {
        setImageHistory(prevHistory => [...prevHistory, image]);
    };

    const enterReplacementMode = (componentName) => {
        setIsReplacementMode(true);
        setActiveComponent(componentName);
    };

    const selectImage = (image) => {
        if (isReplacementMode && activeComponent) {
            setSelectedImage(image);
            setIsReplacementMode(false);
            setActiveComponent(null); // Reset the active component after selection
        }
    };

    return (
        <ImageHistoryContext.Provider value={{
            imageHistory,
            addImageToHistory,
            selectedImage,
            selectImage,
            enterReplacementMode,
            isReplacementMode,
            activeComponent
        }}>
            {children}
        </ImageHistoryContext.Provider>
    );
};
