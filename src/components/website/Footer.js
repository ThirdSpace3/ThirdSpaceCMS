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
          <img src="https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageWebSite%2F3s-logo.png?alt=media&token=8a69bcce-2e9f-463e-8cba-f4c2fec1a904" alt="" />
          <p>&copy; 2024 Third Space. All rights reserved</p>
        </div>
        <div className="footer-socials">
          <a
            href="https://twitter.com/BuildWith3S"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageWebSite%2Flogo-x-1.png?alt=media&token=c33893d3-a364-4efb-ad34-95a9e3512180" alt="Twitter" />
          </a>
          <a
            href="https://discord.gg/dked3DEngT"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageWebSite%2Flogo-discord-1.png?alt=media&token=e4217e64-8ce7-466e-a29c-c097508e506b" alt="Discord" />
          </a>
          <a
            href="https://github.com/ThirdSpace3"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageWebSite%2Flogo-github-1.png?alt=media&token=3106bbc4-90c3-41e5-ae43-53990f8e1130" alt="GitHub" />
          </a>
          <a
            href="https://www.linkedin.com/company/thirdspace-3/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageWebSite%2Flogo-linkedin-1.png?alt=media&token=4718e96e-fed3-4c50-a8cf-bc83534706fb" alt="LinkedIn" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
