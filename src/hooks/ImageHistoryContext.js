// ImageHistoryContext.js
import React, { createContext, useState, useContext } from 'react';

const ImageHistoryContext = createContext();

export const useImageHistory = () => useContext(ImageHistoryContext);

export const ImageHistoryProvider = ({ children }) => {
    const [imageHistory, setImageHistory] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);

    const addImageToHistory = (image) => {
        setImageHistory(prevHistory => [...prevHistory, image]);
    };

    const selectImage = (image) => {
        setSelectedImage(image);
    };

    // New function to deselect the current image
    const deselectImage = () => {
        setSelectedImage(null);
    };

    return (
        <ImageHistoryContext.Provider value={{ imageHistory, addImageToHistory, selectedImage, selectImage, deselectImage }}>
            {children}
        </ImageHistoryContext.Provider>
    );
};
