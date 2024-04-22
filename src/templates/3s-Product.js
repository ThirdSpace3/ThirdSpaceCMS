import React, { useState } from "react";
import { Link } from "react-router-dom"; // This is assuming you want SPA style navigation.
import "./templates-po/templatepo-1.css";
import Navbar from "./TemplateComponents/3sProduct/3sproductNavbar";
import HeaderSection from "./TemplateComponents/3sProduct/3sProductHeader";
import PartnersSection from "./TemplateComponents/3sProduct/3sProductPartners";
import AboutSection from "./TemplateComponents/3sProduct/3sProductAbout";
import FeaturesSection from "./TemplateComponents/3sProduct/3sProductFeature";
import JoinUsSection from "./TemplateComponents/3sProduct/3sProductJoinUs";
import Footer from "./TemplateComponents/3sProduct/3sProductFooter";



const SSSProduct = () => {
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
        <Navbar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} menuToggleImg={menuToggleImg} />
        <HeaderSection />

        {/* ===PARTNERS=== */}
        <PartnersSection />

        {/* ===ABOUT=== */}
        <AboutSection /> 
        {/* ===FEATURES=== */}

        <FeaturesSection />

        {/* ===JOIN US=== */}

        <JoinUsSection />

        {/* ===FOOTER=== */}
        <Footer />

      </div>
    </>
  );
};

export default SSSProduct;
