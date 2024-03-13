import React, { useState, useEffect } from 'react';
import { useImageHistory } from '../../../hooks/ImageHistoryContext';

// Define your default image path for all slots
const defaultImage = '/images/template-test.png'; // Adjust the path as needed

const defaultImages = {
  slot1: defaultImage,
  // Add more slots if needed, using the same or different default images
};

const ImageSlots = ({ styles, imageHistory }) => {
  const { deselectImage, selectedImage } = useImageHistory();
  const [imageSlots, setImageSlots] = useState(defaultImages); // Initialize with the default image for each slot

  const applySelectedImageToSlot = (slotKey) => {
    if (selectedImage) {
      setImageSlots((prevSlots) => ({
        ...prevSlots,
        [slotKey]: selectedImage,
      }));
      deselectImage();
    }
  };

  useEffect(() => {
    // Implement any logic for updating images based on history or other criteria
  }, [imageHistory]);

  return (
    <>
      {Object.entries(imageSlots).map(([slotKey, src], index) => (
        <div key={slotKey} onClick={() => applySelectedImageToSlot(slotKey)}>
          {/* The src attribute might need to be adjusted based on how you handle public assets in your project */}
          <img src={src} alt={`Slot ${index}`} style={styles.image} />
        </div>
      ))}
    </>
  );
};

export default ImageSlots;
