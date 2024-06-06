import React from 'react';
import '../css/contact.css';

const SSSPortfolioContact = () => {
  return (
    <div className="portfolio-contact" id="contact">
      <div className='portfolio-contact-content'>
        <h2>Contact</h2>
        <p>I'm currently looking to join a cross-functional team that values improving people's lives through accessible design. Have a project in mind? Let's connect.</p>
        <a href="mailto:emailaddress@site.com">emailaddress@site.com</a>
        <div className="social-links">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <i className="bi bi-twitter"></i>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <i className="fa bi-linkedin"></i>
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">
            <i className="bi bi-github"></i>
          </a>
        </div>
      </div>
      <footer className="portfolio-footer">
        <p>Copyright © SSS Portfolio | Designed by<b>Portfolio Master</b> | Powered by <b>Third-Space</b></p>
      </footer>
    </div>
  );
};

export default SSSPortfolioContact;
