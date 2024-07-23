import React, { useState, useEffect, useRef } from 'react';

function WalletCarousel() {
  const baseImages = [
    'https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageWebSite%2FPopup%2FtemplateCarrousel1.png?alt=media&token=456e566b-d63d-4807-ab51-e8fa76d31000',
    'https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageWebSite%2FPopup%2FtemplateCarrousel2.png?alt=media&token=3d52bd45-f264-468c-bc3e-1dbcd0a95dd6',
    'https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageWebSite%2FPopup%2FtemplateCarrousel3.png?alt=media&token=ce55484c-6b35-4be9-a8f4-055894f991a5',
    'https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageWebSite%2FPopup%2FtemplateCarrousel4.png?alt=media&token=088c0099-5222-43b6-b7f8-e3b537ab4c80',
    'https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageWebSite%2FPopup%2FtemplateCarrousel5.png?alt=media&token=3db3bc35-d0eb-49ed-89c9-b7e301f76d1f',
  ];

  // Duplicate images until we have 100 frames
  const images = [];
  while (images.length < 100) {
    images.push(...baseImages);
  }
  images.length = 100; // Ensure we have exactly 100 items

  const [currentIndex, setCurrentIndex] = useState(3);
  const timeoutRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const resetTimeout = setTimeout(() => {
      if (currentIndex === images.length - 1) {
        setCurrentIndex(0);
      }
    }, 5000);

    return () => {
      clearTimeout(resetTimeout);
    };
  }, [currentIndex, images.length]);

  const handleTransitionEnd = () => {
    if (currentIndex === images.length - 1) {
      setCurrentIndex(0);
    }
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const handleIndicatorClick = (index) => {
    let closestIndex = currentIndex;
    let closestDistance = images.length;

    // Find the closest duplicate
    for (let i = 0; i < images.length; i++) {
      if (i % baseImages.length === index) {
        const distance = Math.abs(currentIndex - i);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = i;
        }
      }
    }

    setCurrentIndex(closestIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="wallet-carousel-container" ref={containerRef}>
      <div
        className="wallet-carousel"
        style={{
          transform: `translateY(-${currentIndex * 1}%)`,
          transition: 'transform 0.5s ease'
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        {images.map((src, index) => (
          <img
            key={`${src}-${index}`}
            src={src}
            className={`wallet-carousel-image ${currentIndex === index ? 'active' : 'inactive'}`}
            alt={`Slide ${index + 1}`}
          />
        ))}
      </div>
      <div className="carousel-indicators">
        {baseImages.map((_, index) => (
          <span
            key={index}
            className={`indicator ${currentIndex % baseImages.length === index ? 'active' : ''}`}
            onClick={() => handleIndicatorClick(index)}
          ></span>
        ))}
      </div>
    </div>
  );
}

export default WalletCarousel;
