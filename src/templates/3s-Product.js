import React, { useState } from "react";
import Navbar from "./TemplateComponents/3sProduct/3sproductNavbar";
import HeaderSection from "./TemplateComponents/3sProduct/3sProductHeader";
import PartnersSection from "./TemplateComponents/3sProduct/3sProductPartners";
import AboutSection from "./TemplateComponents/3sProduct/3sProductAbout";
import FeaturesSection from "./TemplateComponents/3sProduct/3sProductFeature";
import JoinUsSection from "./TemplateComponents/3sProduct/3sProductJoinUs";
import Footer from "./TemplateComponents/3sProduct/3sProductFooter";
import { useTemplateContext } from "../hooks/TemplateContext";

const SSSProduct = ({ selectElement, isPreviewMode, settings, handleSettingsChange, openImagePanel, imageHistory, selectedImage, setSelectedImage, setSelectedElement }) => {
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
    <div className="sss-product-container" onClick={isPreviewMode ? (e) => e.stopPropagation():true}>
      <Navbar
        isMenuOpen={isMenuOpen}
        toggleMenu={toggleMenu}
        menuToggleImg={menuToggleImg}
        style={settings}
        settings={settings}
        handleSettingsChange={handleSettingsChange}
        openImagePanel={openImagePanel}
        selectedImage={selectedImage} // Pass down the selectedImage prop
        setSelectedImage={setSelectedImage}
        selectElement={selectElement}
        setSelectedElement={setSelectedElement}
        isPreviewMode={isPreviewMode}
      />

      <HeaderSection
        style={settings}
        settings={settings}
        handleSettingsChange={handleSettingsChange}
        openImagePanel={openImagePanel}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        selectElement={selectElement}
        setSelectedElement={setSelectedElement}
        isPreviewMode={isPreviewMode}

      />

      <PartnersSection
        style={settings}
        settings={settings}
        handleSettingsChange={handleSettingsChange}
        openImagePanel={openImagePanel}
        selectedImage={selectedImage} // Pass down the selectedImage prop
        setSelectedImage={setSelectedImage}
        selectElement={selectElement}
        setSelectedElement={setSelectedElement}
        isPreviewMode={isPreviewMode}

      />
      <AboutSection
        style={settings}
        settings={settings}
        handleSettingsChange={handleSettingsChange}
        openImagePanel={openImagePanel}
        selectedImage={selectedImage} // Pass down the selectedImage prop
        setSelectedImage={setSelectedImage}
        selectElement={selectElement}
        setSelectedElement={setSelectedElement}
        isPreviewMode={isPreviewMode}


      />
      <FeaturesSection
        style={settings}
        settings={settings}
        handleSettingsChange={handleSettingsChange}
        openImagePanel={openImagePanel}
        selectedImage={selectedImage} // Pass down the selectedImage prop
        setSelectedImage={setSelectedImage}
        selectElement={selectElement}
        setSelectedElement={setSelectedElement}
        isPreviewMode={isPreviewMode}

      />
      <JoinUsSection
        style={settings}
        settings={settings}
        handleSettingsChange={handleSettingsChange}
        openImagePanel={openImagePanel}
        selectedImage={selectedImage} // Pass down the selectedImage prop
        setSelectedImage={setSelectedImage}
        selectElement={selectElement}
        setSelectedElement={setSelectedElement}
        isPreviewMode={isPreviewMode}

      />
      <Footer
        style={settings}
        settings={settings}
        handleSettingsChange={handleSettingsChange}
        openImagePanel={openImagePanel}
        selectedImage={selectedImage} // Pass down the selectedImage prop
        setSelectedImage={setSelectedImage}
        selectElement={selectElement}
        setSelectedElement={setSelectedElement}
        isPreviewMode={isPreviewMode}

      />
    </div>
  );
};

export default SSSProduct;
