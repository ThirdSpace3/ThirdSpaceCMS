import React, { useState, useEffect, useRef } from 'react';
import './CarouselPortfolio.css';

// Définissez vos données pour chaque carte ici
const cards = [
  {
    id: 1,
    image: 'https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageWebSite%2FAgencyPage%2Fportfolio-victor.png?alt=media&token=74cfc8da-dde1-4046-b0a3-d9bdf13ae123',
    title: 'Portfolio Victor Bisch',
    description: 'Explore the Minecraft-inspired, responsive portfolio of a talented UX/UI/dev student, showcasing their innovative projects.',
    link: 'https://portfoliovictor.com/eng/index.html',
  },
  {
    id: 2,
    image: 'https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageWebSite%2FAgencyPage%2Fportfolio-idem.png?alt=media&token=7bdbb902-1547-431b-a278-eda654c97585',
    title: 'Idem Automatisme',
    description: 'Experience the expertise of an industrial automation and electricity company through their informative website, highlighting their completed projects and services.',
    link: 'https://www.idem-automatisme.fr/',
  },
  {
    id: 3,
    image: 'https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageWebSite%2FAgencyPage%2Fportfolio-nolann.png?alt=media&token=db701faa-fb5f-4c53-8325-3ff8f8261e41',
    title: 'Portfolio Nolann Gerbault',
    description: "Discover the professional journey of a communication student through a Clash Royale-themed portfolio, creatively adapted for PC format.",
    link: 'https://nolanncorp.com/',
  },
  {
    id: 4,
    image: 'https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageWebSite%2FAgencyPage%2Fportfolio-smm.png?alt=media&token=45df2c56-e51e-4bdf-8d3f-b19d40935572',
    title: 'Self Mad Man',
    description: "Dive into the world of a student-developed casual mobile game with a visually engaging website, offering insights and captivating visuals.",
    link: 'https://selfmadman.fr/',
  },
];

const CarouselPortfolio = () => {
  const [index, setIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);
  const ref = useRef();
  const [isHovering, setIsHovering] = useState(false);

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
    setIsTransitioning(true);
    setIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const prevSlide = () => {
    setIsTransitioning(true);
    setIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
  };

  useEffect(() => {
    setIsTransitioning(false);
  }, [index]);

  useEffect(() => {
    const handleResize = () => {
      ref.current.style.width = `${cards.length * 410}px`;
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  

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
    transition: isTransitioning ? `transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)` : 'none',
  }}
  ref={ref}
          
        >
{[...Array(15).fill(cards).flat()].map((card, i) => (
              <div key={i} className="carousel-item">
              <div className='carousel-item-img-box'>
                <img className='carousel-item-img' src={card.image} alt="Third Space 3S Agency Web Agency Affordable Latest Trends" />
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
