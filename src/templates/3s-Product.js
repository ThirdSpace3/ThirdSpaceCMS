import React, { useState, useEffect } from "react";
import Navbar from "./TemplateComponents/3sProduct/3sproductNavbar";
import HeaderSection from "./TemplateComponents/3sProduct/3sProductHeader";
import PartnersSection from "./TemplateComponents/3sProduct/3sProductPartners";
import AboutSection from "./TemplateComponents/3sProduct/3sProductAbout";
import FeaturesSection from "./TemplateComponents/3sProduct/3sProductFeature";
import JoinUsSection from "./TemplateComponents/3sProduct/3sProductJoinUs";
import Footer from "./TemplateComponents/3sProduct/3sProductFooter";

const SSSProduct = ({ setTemplateContent, selectedColor, setSelectedColor, logChange, selectElement, isPreviewMode, settings, handleSettingsChange, openImagePanel, imageHistory, selectedImage, setSelectedImage, setSelectedElement }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [menuToggleImg, setMenuToggleImg] = useState("./images/templates-img/3sproduct/3sproduct-menu-open.png");
  const [navbarContent, setNavbarContent] = useState({});
  const [headerContent, setHeaderContent] = useState({});

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

  useEffect(() => {
    setTemplateContent({
      navbar: navbarContent,
      header: headerContent
    });
  }, [navbarContent, headerContent, setTemplateContent]);
  return (
    <div className="sss-product-container">
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
        logChange={logChange}
        selectedColor={selectedColor} 
        setSelectedColor={setSelectedColor}
        onContentChange={(newContent) => setNavbarContent(newContent)}

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
        selectedColor={selectedColor} 
        setSelectedColor={setSelectedColor}
        onContentChange={(newContent) => setHeaderContent(newContent)}


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
        selectedColor={selectedColor} 
        setSelectedColor={setSelectedColor}

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
        selectedColor={selectedColor} 
        setSelectedColor={setSelectedColor}


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
        selectedColor={selectedColor} 
        setSelectedColor={setSelectedColor}

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
        selectedColor={selectedColor} 
        setSelectedColor={setSelectedColor}

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
        selectedColor={selectedColor} 
        setSelectedColor={setSelectedColor}

      />
    </div>
  );
};

export default SSSProduct;
