import React, { useState, useEffect } from "react";
// import "./templates-po/templatepo-1.css";
import Navbar from "./TemplateComponents/3sProduct/3sproductNavbar";
import HeaderSection from "./TemplateComponents/3sProduct/3sProductHeader";
import PartnersSection from "./TemplateComponents/3sProduct/3sProductPartners";
import AboutSection from "./TemplateComponents/3sProduct/3sProductAbout";
import FeaturesSection from "./TemplateComponents/3sProduct/3sProductFeature";
import JoinUsSection from "./TemplateComponents/3sProduct/3sProductJoinUs";
import Footer from "./TemplateComponents/3sProduct/3sProductFooter";

const SSSProduct = ({ selectElement, isPreviewMode, settings, handleSettingsChange, selectedElement }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [menuToggleImg, setMenuToggleImg] = useState("./images/templates-img/3sproduct/3sproduct-menu-open.png");
  const updateCSSVariables = (settings) => {
    const root = document.documentElement;
    root.style.setProperty('--background-color', settings.backgroundColor || '#200627');
    root.style.setProperty('--navbar-border-color', settings.navbarBorderColor || '#151934');
    root.style.setProperty('--primary-btn-bg', settings.primaryBtnBg || '#7214ff');
  };
  
  useEffect(() => {
    updateCSSVariables(settings);
  }, [settings]);
  
  const toggleMenu = (event) => {
    event.preventDefault();
    setMenuOpen(prevState => !prevState);
    setMenuToggleImg(prevState =>
      prevState === "./images/templates-img/3sproduct/3sproduct-menu-open.png"
        ? "./images/templates-img/3sproduct/3sproduct-menu-close.png"
        : "./images/templates-img/3sproduct/3sproduct-menu-open.png"
    );
    document.body.style.overflow = isMenuOpen ? "auto" : "hidden";
  };
  console.log("Rendering Navbar with settings:", settings['navbar']);  // Adjust this based on actual state structure
  console.log("Current settings state:", settings);

  return (
    <div className="sss-product-container">
      <Navbar
        isMenuOpen={isMenuOpen}
        toggleMenu={toggleMenu}
        menuToggleImg={menuToggleImg}
        onClick={() => selectElement('navbar')}
        style={settings.navbar}      />

      <HeaderSection onClick={() => selectElement('header')} style={settings['header']} />
      <PartnersSection onClick={() => selectElement('partners')} style={settings['partners']} />
      <AboutSection onClick={() => selectElement('about')} style={settings['about']} />
      <FeaturesSection onClick={() => selectElement('features')} style={settings['features']} />
      <JoinUsSection onClick={() => selectElement('joinUs')} style={settings['joinUs']} />
      <Footer onClick={() => selectElement('footer')} style={settings['footer']} />
    </div>
  );
};

export default SSSProduct;
