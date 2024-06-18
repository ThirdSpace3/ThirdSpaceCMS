import "./About.css";
import "../../Root.css";
import React from "react";

function About() {
  return (
    <section className="about-section section">
      <div className="about-header">
        <p className="section-label">About</p>
        <h2 className="section-title">Innovative Minds Behind Third Space</h2>
        <p className="section-text">
          A passionate team revolutionizing Web 3 with no-code tools for all
          your projects
        </p>
        <button className="purple-btn">See our values</button>
      </div>

      <div className="about-content">
        <img className="about-content-img" src="./images/about-img.png"></img>
        <a href="#/3s-agency" className="about-content-link-container">
          <div className="about-content-link-box">
            <div className="about-content-link-top">
              <p className="about-content-link-top-text">Need help on a project?</p>
              <div className="about-content-link-top-row">
                <img
                  className="about-content-link-top-row-img"
                  src="./images/section-label-sparkle.png"
                ></img>
                <p className="about-content-link-top-row-text">Go to 3S Agency</p>
              </div>
            </div>
            <div className="about-content-link-bottom">
              <div className="about-content-link-bottom-box"></div>
              <p className="about-content-link-bottom-text">
                Discover 3S Agency, our web agency that provide Web2 & Web3
                services!
              </p>
            </div>
          </div>
        </a>
      </div>
    </section>
  );
}

export default About;
