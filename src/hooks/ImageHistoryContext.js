import React, { createContext, useState, useContext } from 'react';

const ImageHistoryContext = createContext();

export const useImageHistory = () => useContext(ImageHistoryContext);

export const ImageHistoryProvider = ({ children }) => {
    const [imageHistory, setImageHistory] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isReplacementMode, setIsReplacementMode] = useState(false);

    const addImageToHistory = (image) => {
        setImageHistory(prevHistory => [...prevHistory, image]);
    };

    const selectImage = (image) => {
        if (isReplacementMode) {
            setSelectedImage(image);
            setIsReplacementMode(false); // Exit replacement mode
        } else {
            setSelectedImage(image);
        }
    };

    const enterReplacementMode = () => {
        setIsReplacementMode(true);
    };

    return (
        <ImageHistoryContext.Provider value={{
            imageHistory,
            addImageToHistory,
            selectedImage,
            selectImage,
            enterReplacementMode,
            isReplacementMode
        }}>
            {children}
        </ImageHistoryContext.Provider>
    );
};
