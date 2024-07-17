import React, { useState, useEffect, useRef } from 'react';

function WalletCarousel() {
  const images = [
    './images/carrouseltest.png',
    './images/carrouseltest.png',
    './images/carrouseltest.png',
    './images/carrouseltest.png',
    './images/carrouseltest.png',
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef(null);

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
    if (currentIndex === images.length * 2 - 1) {
      setCurrentIndex(images.length);
    }
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length * 2 - 1 ? prevIndex : prevIndex + 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="wallet-carousel-container">
      <div
        className="wallet-carousel"
        style={{
          transform: `translateY(-${currentIndex * 9.5}%)`,
          transition: 'transform 1s ease'
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            className={`wallet-carousel-image ${index === currentIndex % images.length ? 'active' : 'inactive'}`}
            alt={`Slide ${index + 1}`}
          />
        ))}
        {images.map((src, index) => (
          <img
            key={index + images.length}
            src={src}
            className={`wallet-carousel-image ${index === currentIndex % images.length ? 'active' : 'inactive'}`}
            alt={`Slide ${index + 1}`}
          />
        ))}
      </div>
      <div className="carousel-indicators">
        {images.map((_, index) => (
          <span
            key={index}
            className={`indicator ${index === currentIndex % images.length ? 'active' : ''}`}
          ></span>
        ))}
      </div>
    </div>
  );
}

export default WalletCarousel;
