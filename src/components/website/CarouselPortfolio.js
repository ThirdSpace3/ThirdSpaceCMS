import React, { useState, useEffect, useRef } from 'react';
import './CarouselPortfolio.css';

// Définissez vos données pour chaque carte ici
const cards = [
  {
    id: 1,
    image: 'images/portfolio-victor.png',
    title: 'Portfolio Victor Bisch',
    description: 'Lorem ipsum dolor sit amet. Ut aperiam iste et ratione officiis et aliquam omnis aut optio dolore sit ratione quis',
    link: 'https://portfoliovictor.com/eng/index.html',
  },
  {
    id: 2,
    image: 'images/portfolio-idem.png',
    title: 'Idem Automatisme',
    description: 'Lorem ipsum dolor sit amet. Ut aperiam iste et ratione officiis et aliquam omnis aut optio dolore sit ratione quis',
    link: 'https://www.idem-automatisme.fr/',
  },
  {
    id: 3,
    image: 'images/portfolio-nolann.png',
    title: 'Portfolio Nolann Gerbault',
    description: 'Lorem ipsum dolor sit amet. Ut aperiam iste et ratione officiis et aliquam omnis aut optio dolore sit ratione quis',
    link: 'https://nolanncorp.com/',
  },
  {
    id: 4,
    image: 'images/portfolio-smm.png',
    title: 'Self Mad Man',
    description: 'Lorem ipsum dolor sit amet. Ut aperiam iste et ratione officiis et aliquam omnis aut optio dolore sit ratione quis',
    link: 'https://selfmadman.fr/',
  },
];

const CarouselPortfolio = () => {
  const [index, setIndex] = useState(cards.length);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);
  const ref = useRef();

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX - touchEndX > 100) {
      nextSlide();
    } else if (touchEndX - touchStartX > 100) {
      prevSlide();
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  const nextSlide = () => {
    setIndex((prevIndex) => prevIndex + 1);
  };

  const prevSlide = () => {
    setIndex((prevIndex) => prevIndex - 1);
  };

  useEffect(() => {
    if (index === cards.length * 2) {
      setTimeout(() => {
        setIsTransitioning(false);
        setIndex(cards.length);
      }, 500);
    } else if (index === 0) {
      setTimeout(() => {
        setIsTransitioning(false);
        setIndex(cards.length);
      }, 500);
    } else {
      setIsTransitioning(true);
    }
  }, [index]);

  return (
    <div
      className="carousel-container"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <p className='carousel-subtitle'>Portfolio</p>
      <div className='carousel-title-box'>
        <h2 className="carousel-title">Explore our latest projects</h2>
        <div className="buttons">
          <button className="arrow" onClick={prevSlide}><i className="bi bi-chevron-left"></i></button>
          <button className="arrow" onClick={nextSlide}><i className="bi bi-chevron-right"></i></button>
        </div>
      </div>

      <div className="carousel">
        <div
          className="carousel-inner"
          style={{
            transform: `translateX(-${index * 410}px)`,
            transition: isTransitioning ? 'transform 0.5s ease-in-out' : 'none',
          }}
          ref={ref}
        >
          {[...cards, ...cards, ...cards].map((card, i) => (
            <div key={card.id} className="carousel-item">
              <div className='carousel-item-img-box'>
                <img className='carousel-item-img' src={card.image} alt={`Image ${card.id}`} />
              </div>
              <div className='carousel-item-box'>
                <h3 className='carousel-item-title'>{card.title}</h3>
                <p className='carousel-item-text'>{card.description}</p>
                <a className='carousel-item-button' href={card.link} target='_blank' rel='noopener noreferrer'>Go to website <i className="bi bi-arrow-right"></i></a>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default CarouselPortfolio;
