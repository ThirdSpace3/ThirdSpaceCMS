import React, { createContext, useState, useContext, useEffect } from 'react';

const ImageHistoryContext = createContext();

export const useImageHistory = () => useContext(ImageHistoryContext);

const localStorageKey = 'imageHistoryAppState';

export const ImageHistoryProvider = ({ children }) => {
    // Initial state setup from local storage
    const initialState = JSON.parse(localStorage.getItem(localStorageKey)) || {
        imageHistory: [],
        componentImageUsage: {}
    };

    const [imageHistory, setImageHistory] = useState(initialState.imageHistory);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isReplacementMode, setIsReplacementMode] = useState(false);
    const [activeComponent, setActiveComponent] = useState(null);
    const [componentImageUsage, setComponentImageUsage] = useState(initialState.componentImageUsage);
    const [isFocused, setIsFocused] = useState(false); // To track if any image component is focused

    // Effect to update local storage when imageHistory or componentImageUsage changes
    useEffect(() => {
        const stateToSave = {
            imageHistory,
            componentImageUsage
        };
        localStorage.setItem(localStorageKey, JSON.stringify(stateToSave));
    }, [imageHistory, componentImageUsage]);

    const addImageToHistory = (image) => {
        setImageHistory(prevHistory => [...prevHistory, image]);
    };

    const removeImageFromHistory = (hash) => {
        setImageHistory(prevHistory => prevHistory.filter(image => image.hash !== hash));
        setComponentImageUsage(prevUsage => {
            const updatedUsage = { ...prevUsage };
            Object.keys(updatedUsage).forEach(key => {
                if (updatedUsage[key].hash === hash) {
                    delete updatedUsage[key];
                }
            });
            return updatedUsage;
        });
    };

    const enterReplacementMode = (componentName) => {
        setActiveComponent(componentName);
        setIsReplacementMode(true);
    };

    const selectImage = (image) => {
        if (activeComponent) {
            setSelectedImage(image);
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
            setImageHistory, // Ensure setImageHistory is included
            addImageToHistory,
            removeImageFromHistory,
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
