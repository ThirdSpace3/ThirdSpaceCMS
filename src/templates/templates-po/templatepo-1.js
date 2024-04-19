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
              <li>
                <a href="" className="sss-product-navbar-links">
                  Testimonials
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
              <a href="" className="sss-product-navbar-links">
                Testimonials
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
          <h2 className="sss-product-features"></h2>
        </div>

        {/* ===TESTIMONIALS=== */}
        <div className="sss-product-testimonials"></div>

        {/* ===JOIN US=== */}
        <div className="sss-product-joinus"></div>

        {/* ===FOOTER=== */}
        <div className="sss-product-footer"></div>
      </div>
    </>
  );
};

export default TemplatePo1;
