// AboutSection.js
import React from 'react';
import '../../templates-po/about.css'
const AboutSection = ({onClick}) => {
  return (
    <div className="sss-product-about" onClick={onClick}>
      <div className="sss-product-about-header">
        <h2 className="sss-product-about-title">The best features to help you create all your projects</h2>
        <p className="sss-product-about-text">
          Apsum dolor sit amet consectetur. Aliquam elementum elementum in ultrices. Dui maecenas ut eros turpis ultrices metus morbi aliquet vel.
        </p>
      </div>
      <div className="sss-product-about-box">
        {/* Example items, you might want to make this dynamic based on props */}
        {[1, 2, 3, 4, 5, 6].map((num) => (
          <div key={num} className="sss-product-about-item">
            <img
              src={`./images/templates-img/3sproduct/3sproduct-about-${num}.png`}
              className="sss-product-about-item-img"
              alt={`Feature ${num}`}
            />
            <h3 className="sss-product-about-item-title">Feature Title {num}</h3>
            <p className="sss-product-about-item-text">
              Feature description here. It can vary depending on the feature number {num}.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutSection;
