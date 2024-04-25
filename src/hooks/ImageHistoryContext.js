import React, { createContext, useState, useContext, useEffect } from 'react';

const ImageHistoryContext = createContext();

export const useImageHistory = () => useContext(ImageHistoryContext);

export const ImageHistoryProvider = ({ children }) => {
    const [imageHistory, setImageHistory] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isReplacementMode, setIsReplacementMode] = useState(false);
    const [activeComponent, setActiveComponent] = useState(null);
    const [componentImageUsage, setComponentImageUsage] = useState({}); // Tracks which component is using which image
    const [isFocused, setIsFocused] = useState(false); // To track if any image component is focused

    const addImageToHistory = (image) => {
        setImageHistory(prevHistory => [...prevHistory, image]);
    };

    const enterReplacementMode = (componentName) => {
        // console.log(`Entering replacement mode for: ${componentName}`);
        setActiveComponent(componentName);
        setIsReplacementMode(true);
    };
    const selectImage = (image) => {
        if (activeComponent) {
            // console.log(`Selecting image: ${image} for component: ${activeComponent}`);
            setSelectedImage(image);
            setIsReplacementMode(false);
            // Optionally update a map of which component is using which image
            setComponentImageUsage(prev => ({ ...prev, [activeComponent]: image }));
        } else {
            console.log("No active component set when trying to select an image.");
        }
    };
    
    
    

    const clearSelectedImage = () => {
        const updatedUsage = { ...componentImageUsage };
        delete updatedUsage[activeComponent]; // Remove the active component's image usage
        setComponentImageUsage(updatedUsage);
        setSelectedImage(null);
    };

    const setFocus = () => setIsFocused(true);
    const clearFocus = () => {
        setIsFocused(false);
        setSelectedImage(null); // Reset the selected image when focus is lost
    };

    
    return (
        <ImageHistoryContext.Provider value={{
            imageHistory,
            addImageToHistory,
            selectedImage,
            selectImage,
            enterReplacementMode,
            isReplacementMode,
            activeComponent,
            componentImageUsage,
            setSelectedImage,
            clearSelectedImage,
            clearFocus,
            setFocus
        }}>
            {children}
        </ImageHistoryContext.Provider>
    );
};
