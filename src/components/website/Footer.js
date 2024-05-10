import "./Footer.css";
import "../Root.css";
import React from "react";

const Footer = () => {
  return (
    <footer>
      <div className="footer-top section">
        <div className="footer-column">
          <h3 className="footer-column-title">Product</h3>
          <ul className="footer-column-content">
            <li className="coming-soon">
              <a href="/#/products">Products</a>
            </li>
            <li className="coming-soon">
              <a href="/#/ressources">Resources</a>
            </li>
            <li className="coming-soon">
              <a href="/#/pricing">Pricing</a>
            </li>
            {/* <li><a href="#roadmap">Roadmap</a></li> */}
            {/* <li className="coming-soon"><a href="">Updates</a></li> */}
          </ul>
        </div>
        {/* <div className="footer-column">
                    <h3 className="footer-column-title">Community</h3>
                    <ul className="footer-column-content">
                        <li className="coming-soon"><a href="">About</a></li>
                        <li className="coming-soon"><a href="">Help Center</a></li>
                        <li className="coming-soon"><a href="">News</a></li>
                    </ul>
                </div> */}
        <div className="footer-column">
          <h3 className="footer-column-title">Legal</h3>
          <ul className="footer-column-content">
            <li className="coming-soon">
              <a href="/#/terms">
                Terms
              </a>
            </li>
            <li className="coming-soon">
              <a href="/#/privacy-policy">
                Privacy Policy
              </a>
            </li>
            {/* <li className="coming-soon"><a href="">Legal information</a></li> */}
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-credits">
          <img src="./images/3s-logo.png" alt="" />
          <p>&copy; 2024 Third Space. All rights reserved</p>
        </div>
        <div className="footer-socials">
          <a
            href="https://twitter.com/BuildWith3S"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="./images/logo-x-1.png" alt="Twitter" />
          </a>
          <a
            href="https://discord.gg/dked3DEngT"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="./images/logo-discord-1.png" alt="Discord" />
          </a>
          <a
            href="https://github.com/ThirdSpace3"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="./images/logo-github-1.png" alt="GitHub" />
          </a>
          <a
            href="https://www.linkedin.com/company/thirdspace-3/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="./images/logo-linkedin-1.png" alt="LinkedIn" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
