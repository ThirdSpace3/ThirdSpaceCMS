import React, { useState } from "react";
import { Link } from "react-router-dom"; // This is assuming you want SPA style navigation.
import "./templatepo-1.css";

const TemplatePo1 = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [bodyOverflow, setBodyOverflow] = useState("auto");
  const [menuToggleImg, setMenuToggleImg] = useState(
    "./images/templates-img/3sproduct/3sproduct-menu-open.png"
  );
  const toggleMenu = (event) => {
    event.preventDefault();
    setMenuOpen((prevState) => !prevState);
    setMenuToggleImg((prevState) =>
      prevState === "./images/templates-img/3sproduct/3sproduct-menu-open.png"
        ? "./images/templates-img/3sproduct/3sproduct-menu-close.png"
        : "./images/templates-img/3sproduct/3sproduct-menu-open.png"
    );
    setBodyOverflow((prevState) => (prevState === "auto" ? "hidden" : "auto"));
    document.body.style.overflow = bodyOverflow;
  };

  return (
    <>
      <div className="sss-product-container">
        {/* ===NAVBAR=== */}
        <div className="sss-product-navbar-container">
          <nav className="sss-product-navbar-navbar">
            <img
              src="./images/templates-img/3sproduct/3sproduct-logo.png"
              className="sss-product-navbar-logo"
            />
            <ul className="sss-product-navbar-links-box">
              <li>
                <a href="" className="sss-product-navbar-links">
                  Home
                </a>
              </li>
              <li>
                <a href="" className="sss-product-navbar-links">
                  About
                </a>
              </li>
              <li>
                <a href="" className="sss-product-navbar-links">
                  Features
                </a>
              </li>
            </ul>
            <a href="" className="sss-product-navbar-cta">
              Join Us
            </a>
            <img
              src={menuToggleImg}
              className="sss-product-navbar-mobile-toggle"
              onClick={toggleMenu}
            />
          </nav>
          <ul
            className={`sss-product-navbar-mobile-links-box ${
              isMenuOpen ? "show" : "hide"
            }`}
          >
            <li>
              <a href="" className="sss-product-navbar-links">
                Home
              </a>
            </li>
            <li>
              <a href="" className="sss-product-navbar-links">
                About
              </a>
            </li>
            <li>
              <a href="" className="sss-product-navbar-links">
                Features
              </a>
            </li>

            <li>
              <a href="" className="sss-product-navbar-mobile-cta">
                Join Us
              </a>
            </li>
          </ul>
        </div>
        {/* ===HERO=== */}
        <div className="sss-product-hero">
          <h1 className="sss-product-hero-title">
            A CRM dashboard for engineering teams
          </h1>
          <p className="sss-product-hero-text">
            Rorem ipsum dolor sit amet consectetur. Gravida convallis orci
            ultrices non. Ultricies tempor at ut cursus mi. Aliquam sed amet
            vitae orci ac penatibus consectetur.
          </p>
          <a href="" className="sss-product-hero-cta">
            Join Us
          </a>
          <img
            src="./images/templates-img/3sproduct/3sproduct-hero.png"
            className="sss-product-hero-img"
          />
        </div>

        {/* ===PARTNERS=== */}
        <div className="sss-product-partners">
          <h2 className="sss-product-partners-title">
            Trusted by teams at over 1,000 of the world's leading organizations
          </h2>
          <div className="sss-product-partners-box">
            <img
              src="./images/templates-img/3sproduct/3sproduct-partners-1.png"
              className="sss-product-partners-box-img"
            />
            <img
              src="./images/templates-img/3sproduct/3sproduct-partners-2.png"
              className="sss-product-partners-box-img"
            />
            <img
              src="./images/templates-img/3sproduct/3sproduct-partners-3.png"
              className="sss-product-partners-box-img"
            />
            <img
              src="./images/templates-img/3sproduct/3sproduct-partners-4.png"
              className="sss-product-partners-box-img"
            />
            <img
              src="./images/templates-img/3sproduct/3sproduct-partners-5.png"
              className="sss-product-partners-box-img"
            />
            <img
              src="./images/templates-img/3sproduct/3sproduct-partners-6.png"
              className="sss-product-partners-box-img"
            />
            <img
              src="./images/templates-img/3sproduct/3sproduct-partners-7.png"
              className="sss-product-partners-box-img"
            />
          </div>
        </div>

        {/* ===ABOUT=== */}
        <div className="sss-product-about">
          <div className="sss-product-about-header">
            <h2 className="sss-product-about-title">
              Powerful features to help you manage all your leads
            </h2>
            <p className="sss-product-about-text">
              Apsum dolor sit amet consectetur. Aliquam elementum elementum in
              ultrices. Dui maecenas ut eros turpis ultrices metus morbi aliquet
              vel.
            </p>
          </div>
          <div className="sss-product-about-box">
            <div className="sss-product-about-item">
              <img
                src="./images/templates-img/3sproduct/3sproduct-about-1.png"
                className="sss-product-about-item-img"
              />
              <h3 className="sss-product-about-item-title">User information</h3>
              <p className="sss-product-about-item-text">
                Borem ipsum dolor sit amet consectetur. Turpis tristique nulla
                posuere et amet arcu dictum ultricies convallis.
              </p>
            </div>
            <div className="sss-product-about-item">
              <img
                src="./images/templates-img/3sproduct/3sproduct-about-2.png"
                className="sss-product-about-item-img"
              />
              <h3 className="sss-product-about-item-title">Deal tracking</h3>
              <p className="sss-product-about-item-text">
                Worem ipsum dolor sit amet consectetur. Turpis tristique nulla
                posuere et amet arcu dictum ultricies convallis.
              </p>
            </div>
            <div className="sss-product-about-item">
              <img
                src="./images/templates-img/3sproduct/3sproduct-about-3.png"
                className="sss-product-about-item-img"
              />
              <h3 className="sss-product-about-item-title">
                Pipeline management
              </h3>
              <p className="sss-product-about-item-text">
                Dorem ipsum dolor sit amet consectetur. Turpis tristique nulla
                posuere et amet arcu dictum ultricies convallis.
              </p>
            </div>
            <div className="sss-product-about-item">
              <img
                src="./images/templates-img/3sproduct/3sproduct-about-4.png"
                className="sss-product-about-item-img"
              />
              <h3 className="sss-product-about-item-title">
                Reporting dashboard
              </h3>
              <p className="sss-product-about-item-text">
                Yarem ipsum dolor sit amet consectetur. Turpis tristique nulla
                posuere et amet arcu dictum ultricies convallis.
              </p>
            </div>
            <div className="sss-product-about-item">
              <img
                src="./images/templates-img/3sproduct/3sproduct-about-5.png"
                className="sss-product-about-item-img"
              />
              <h3 className="sss-product-about-item-title">
                Meeting scheduling
              </h3>
              <p className="sss-product-about-item-text">
                Bem ipsum dolor sit amet consectetur. Turpis tristique nulla
                posuere et amet arcu dictum ultricies convallis.
              </p>
            </div>
            <div className="sss-product-about-item">
              <img
                src="./images/templates-img/3sproduct/3sproduct-about-6.png"
                className="sss-product-about-item-img"
              />
              <h3 className="sss-product-about-item-title">Email tracking</h3>
              <p className="sss-product-about-item-text">
                Keem ipsum dolor sit amet consectetur. Turpis tristique nulla
                posuere et amet arcu dictum ultricies convallis.
              </p>
            </div>
          </div>
        </div>

        {/* ===FEATURES=== */}
        <div className="sss-product-features">
          <h2 className="sss-product-features-title">
            Essential apps that protect your documents
          </h2>
          <div className="sss-product-features-box">
            <div className="sss-product-features-box-top">
              <div className="sss-product-features-box-top-left">
                <h3 className="sss-product-features-box-top-left-title">
                  End-to-end encrypted inbox and messages
                </h3>
                <p className="sss-product-features-box-top-left-text">
                  Rorem ipsum dolor sit amet consectetur. Proin dignissim tortor
                  mauris viverra sed volutpat mauris. Amet nisi amet commodo
                  adipiscing ut imperdiet nunc.
                </p>
                <a href="" className="sss-product-features-box-top-left-cta">
                  Join Us
                </a>
              </div>
              <div className="sss-product-features-box-top-right">
                <img
                  src="./images/templates-img/3sproduct/3sproduct-feature-1.png"
                  className="sss-product-features-box-top-right-img"
                />
              </div>
            </div>
            <div className="sss-product-features-box-bottom">
              <div className="sss-product-features-box-bottom-left">
                <img
                  src="./images/templates-img/3sproduct/3sproduct-feature-2.png"
                  className="sss-product-features-box-bottom-left-img"
                />
                <h3 className="sss-product-features-box-bottom-left-title">
                  Mobile applications
                </h3>
                <p className="sss-product-features-box-bottom-left-text">
                  Prem ipsum dolor sit amet consectetur. Viverra sed dignissim
                  risus aliquet condimentum. Vulputate varius feugiat egestas
                  congue{" "}
                </p>
              </div>
              <div className="sss-product-features-box-bottom-right">
                <h3 className="sss-product-features-box-bottom-right-title">
                  Upload, share, and preview any file
                </h3>
                <p className="sss-product-features-box-bottom-right-text">
                  Tellus et adipiscing sit sit mauris pharetra bibendum. Ligula
                  massa netus nulla ultricies purus.
                </p>
                <img
                  src="./images/templates-img/3sproduct/3sproduct-feature-3.png"
                  className="sss-product-features-box-bottom-right-img"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ===JOIN US=== */}
        <div className="sss-product-joinus">
          <img
            src="./images/templates-img/3sproduct/3sproduct-joinus-1.png"
            className="sss-product-joinus-logo"
          />
          <h2 className="sss-product-joinus-title">Join the community</h2>
          <p className="sss-product-joinus-text">
            Join our 400,000+ person community and contribute to a more private
            and decentralized internet. Start for free.
          </p>
          <a href="" className="sss-product-joinus-cta">
            Join Discord
          </a>
        </div>

        {/* ===FOOTER=== */}
        <div className="sss-product-footer">
          <div className="sss-product-footer-top">
            <img
              src="./images/templates-img/3sproduct/3sproduct-logo.png"
              className="sss-product-footer-top-logo"
            />
            <ul className="sss-product-footer-top-links-box">
              <li>
                <a href="" className="sss-product-footer-top-links">
                  Home
                </a>
              </li>
              <li>
                <a href="" className="sss-product-footer-top-links">
                  About
                </a>
              </li>
              <li>
                <a href="" className="sss-product-footer-top-links">
                  Features
                </a>
              </li>
            </ul>
            <div className="sss-product-footer-top-rs">
              <a
                href="https://twitter.com/BuildWith3S"
                target="_blank"
                className="sss-product-footer-top-rs-item"
              >
                <img
                  src="./images/templates-img/3sproduct/3sproduct-footer-1.png"
                  className="sss-product-footer-top-rs-img"
                />
              </a>
              <a
                href="https://www.linkedin.com/company/thirdspace-3/"
                target="_blank"
                className="sss-product-footer-top-rs-item"
              >
                <img
                  src="./images/templates-img/3sproduct/3sproduct-footer-4.png"
                  className="sss-product-footer-top-rs-img"
                />
              </a>
            </div>
          </div>
          <div className="sss-product-footer-bottom">
            <hr className="sss-product-footer-bottom-hr" />
            <p className="sss-product-footer-bottom-text">
              Copyright © 3S.Product | Designed inspired by{" "}
              <span>
                <a href="https://webocean.io/" target="_blank">
                  Webocean LTD
                </a>
              </span>{" "}
              - Powered by Third Space
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TemplatePo1;
