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
  console.log('selectElement prop in SSSProduct:', selectElement);

  
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
  // console.log("Rendering Navbar with settings:", settings['navbar']);  // Adjust this based on actual state structure
  // console.log("Current settings state:", settings);

  return (
    <div className="sss-product-container">
<Navbar
  isMenuOpen={isMenuOpen}
  toggleMenu={toggleMenu}
  menuToggleImg={menuToggleImg}
  onClick={() => selectElement('navbar')}
  style={settings.navbar}
  settings={settings}
  selectElement={selectElement} // Add this line
  handleSettingsChange={handleSettingsChange}
/>



    <HeaderSection onClick={() => selectElement('header')} style={settings.header} settings={settings} selectElement={selectElement}/>
      <PartnersSection onClick={() => selectElement('partners')} style={settings['partners']} selectElement={selectElement} />
      <AboutSection onClick={() => selectElement('about')} style={settings['about']} selectElement={selectElement}/>
      <FeaturesSection onClick={() => selectElement('features')} style={settings['features']} selectElement={selectElement}/>
      <JoinUsSection onClick={() => selectElement('joinus')} style={settings['joinus']} selectElement={selectElement}/>
      <Footer onClick={() => selectElement('footer')} style={settings['footer']} selectElement={selectElement}/>
    </div>
  );
};

export default SSSProduct;
