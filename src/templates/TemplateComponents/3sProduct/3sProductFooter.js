// Footer.js
import React from 'react';

const Footer = () => {
  return (
    <div className="sss-product-footer">
      <div className="sss-product-footer-top">
        <img
          src="./images/templates-img/3sproduct/3sproduct-logo.png"
          className="sss-product-footer-top-logo"
          alt="Footer Logo"
        />
        {/* Footer content here */}
      </div>
      <div className="sss-product-footer-bottom">
        <hr className="sss-product-footer-bottom-hr" />
        <p className="sss-product-footer-bottom-text">
          Copyright © 3S.Product | Designed inspired by
          <span>
            <a href="https://webocean.io/" target="_blank" rel="noopener noreferrer">Webocean LTD</a>
          </span> - Powered by Third Space
        </p>
      </div>
    </div>
  );
};

export default Footer;
