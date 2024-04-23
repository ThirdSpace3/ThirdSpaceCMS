// HeroSection.js
import React from 'react';

const HeaderSection = ({onClick}) => {
    return (
        <div className="sss-product-hero" onClick={onClick}>
          <h1 className="sss-product-hero-title">The first user-friendly website builder</h1>
          <p className="sss-product-hero-text">
            Rorem ipsum dolor sit amet consectetur. Gravida convallis orci ultrices non. Ultricies tempor at ut cursus mi. Aliquam sed amet vitae orci ac penatibus consectetur.
          </p>
          <a href="/join-us" className="sss-product-hero-cta">Join Us</a>
          <img
            src="./images/templates-img/3sproduct/3sproduct-hero.png"
            className="sss-product-hero-img"
            alt="Hero"
          />
        </div>
      );
    };

export default HeaderSection;
