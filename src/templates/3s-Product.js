import React, { useState } from "react";
import Navbar from "./TemplateComponents/3sProduct/3sproductNavbar";
import HeaderSection from "./TemplateComponents/3sProduct/3sProductHeader";
import PartnersSection from "./TemplateComponents/3sProduct/3sProductPartners";
import AboutSection from "./TemplateComponents/3sProduct/3sProductAbout";
import FeaturesSection from "./TemplateComponents/3sProduct/3sProductFeature";
import JoinUsSection from "./TemplateComponents/3sProduct/3sProductJoinUs";
import Footer from "./TemplateComponents/3sProduct/3sProductFooter";

const SSSProduct = ({ selectElement, isPreviewMode, settings, handleSettingsChange, openImagePanel,  imageHistory, selectedImage, setSelectedImage }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [menuToggleImg, setMenuToggleImg] = useState("./images/templates-img/3sproduct/3sproduct-menu-open.png");

  const toggleMenu = (event) => {
    event.preventDefault();
    setMenuOpen(prevState => !prevState);
    setMenuToggleImg(prevState =>
      prevState === "./images/templates-img/3sproduct/3sproduct-menu-open.png"
        ? "./images/templates-img/3sproduct/3sproduct-menu-close.png"
        : "./images/templates-img/3sproduct/3sproduct-menu-open.png"
    );
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
  };

  return (
    <div className="sss-product-container">
      <Navbar
isMenuOpen={isMenuOpen}
toggleMenu={toggleMenu}
menuToggleImg={menuToggleImg}
onClick={() => selectElement('navbar')}
style={settings.navbar}
settings={settings}
handleSettingsChange={handleSettingsChange}
openImagePanel={openImagePanel}
selectedImage={selectedImage} // Pass down the selectedImage prop
setSelectedImage={setSelectedImage}
selectElement={selectElement}
/>
      <HeaderSection
        onClick={() => selectElement('header')}
        style={settings.header}
        settings={settings}
        handleSettingsChange={handleSettingsChange}
        openImagePanel={openImagePanel}
      />
      <PartnersSection
        onClick={() => selectElement('partners')}
        style={settings.partners}
        handleSettingsChange={handleSettingsChange}
        openImagePanel={openImagePanel}
      />
      <AboutSection
        onClick={() => selectElement('about')}
        style={settings.about}
        handleSettingsChange={handleSettingsChange}
        openImagePanel={openImagePanel}
        selectedImage={selectedImage} // Pass down the selectedImage prop
setSelectedImage={setSelectedImage}

        
      />
      <FeaturesSection
        onClick={() => selectElement('features')}
        style={settings.features}
        handleSettingsChange={handleSettingsChange}
        openImagePanel={openImagePanel}
      />
      <JoinUsSection
        onClick={() => selectElement('joinus')}
        style={settings.joinus}
        handleSettingsChange={handleSettingsChange}
        openImagePanel={openImagePanel}
      />
      <Footer
        onClick={() => selectElement('footer')}
        style={settings.footer}
        handleSettingsChange={handleSettingsChange}
        openImagePanel={openImagePanel}
      />
    </div>
  );
};

export default SSSProduct;
