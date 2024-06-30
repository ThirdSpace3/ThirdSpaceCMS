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
        {/* <a href="/#/about" className="purple-btn">See our values</a> */}
      </div>

      <div className="about-content">
        <img className="about-content-img" src="https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageWebSite%2Fabout-img.png?alt=media&token=16000a0e-668f-4ef0-bb35-43334d74a827" alt='third space builder web 3 no-code tools web3 platform'></img>
        <a href="/#/3s-agency" className="about-content-link-container">
          <div className="about-content-link-box">
            <div className="about-content-link-top">
              <p className="about-content-link-top-text">Need help on a project?</p>
              <div className="about-content-link-top-row">
                <img
                  className="about-content-link-top-row-img"
                  alt='third space builder web 3 no-code tools web3 platform'
                  src="https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageWebSite%2Fsection-label-sparkle.png?alt=media&token=31fc9546-13f5-41a3-bc87-783242a39d4e"
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
