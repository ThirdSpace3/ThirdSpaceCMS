// FeaturesSection.js
import React from 'react';
import '../../templates-po/feature.css'
const FeaturesSection = ({onClick}) => {
  return (
    <div className="sss-product-features" onClick={onClick}>
      <h2 className="sss-product-features-title">Essential apps that protect your documents</h2>
      <div className="sss-product-features-box">
        {/* Assuming static content, this could also be generated dynamically */}
        <div className="sss-product-features-box-top">
          <div className="sss-product-features-box-top-left">
            <h3 className="sss-product-features-box-top-left-title">End-to-end encrypted inbox and messages</h3>
            <p className="sss-product-features-box-top-left-text">
              Rorem ipsum dolor sit amet consectetur. Proin dignissim tortor mauris viverra sed volutpat mauris. Amet nisi amet commodo adipiscing ut imperdiet nunc.
            </p>
            <a href="" className="sss-product-features-box-top-left-cta">Join Us</a>
          </div>
          <div className="sss-product-features-box-top-right">
            <img
              src="./images/templates-img/3sproduct/3sproduct-feature-1.png"
              className="sss-product-features-box-top-right-img"
              alt="Feature 1"
            />
          </div>
        </div>
        <div className="sss-product-features-box-bottom">
          {/* Additional feature blocks can be added here similar to the structure above */}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
