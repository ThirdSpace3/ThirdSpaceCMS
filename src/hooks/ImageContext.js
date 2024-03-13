import React, { createContext, useContext, useState } from 'react';

const ImageContext = createContext();

export const useImages = () => useContext(ImageContext);

export const ImageProvider = ({ children }) => {
  const [images, setImages] = useState([]);

  const addImage = (image) => {
    setImages((prevImages) => [...prevImages, image]);
  };

  return (
    <ImageContext.Provider value={{ images, addImage }}>
      {children}
    </ImageContext.Provider>
  );
};
