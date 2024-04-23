// PartnersSection.js
import React from 'react';

const PartnersSection = ({onClick}) => {
  return (
    <div className="sss-product-partners" onClick={onClick}>
      <h2 className="sss-product-partners-title">
        Trusted by teams at over 1,000 of the world's leading organizations
      </h2>
      <div className="sss-product-partners-box">
        {/* Assuming a static list of images, dynamically rendered content could also be considered */}
        {[1, 2, 3, 4, 5, 6, 7].map((num) => (
          <img
            key={num}
            src={`./images/templates-img/3sproduct/3sproduct-partners-${num}.png`}
            className="sss-product-partners-box-img"
            alt={`Partner ${num}`}
          />
        ))}
      </div>
    </div>
  );
};

export default PartnersSection;
