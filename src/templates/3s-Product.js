import React, { useState, useEffect, useRef } from "react";
import Navbar from "./TemplateComponents/3sProduct/components/3sproductNavbar";
import HeaderSection from "./TemplateComponents/3sProduct/components/3sProductHeader";
import PartnersSection from "./TemplateComponents/3sProduct/components/3sProductPartners";
import AboutSection from "./TemplateComponents/3sProduct/components/3sProductAbout";
import FeaturesSection from "./TemplateComponents/3sProduct/components/3sProductFeature";
import JoinUsSection from "./TemplateComponents/3sProduct/components/3sProductJoinUs";
import Footer from "./TemplateComponents/3sProduct/components/3sProductFooter";
import { fetchComponentData } from "../hooks/Fetchprojects";

const SSSProduct = ({
  TemplateContent,
  saveSettings,
  setTemplateContent,
  selectedColor,
  setSelectedColor,
  logChange,
  selectElement,
  isPreviewMode,
  settings,
  handleSettingsChange,
  openImagePanel,
  selectedImage,
  setSelectedImage,
  setSelectedElement,
  selectedProjectId,
  handleImageUpload,
}) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [menuToggleImg, setMenuToggleImg] = useState("./images/templates-img/3sproduct/3sproduct-menu-open.png");

  const headerRef = useRef(null);
  const partnersRef = useRef(null);
  const aboutRef = useRef(null);
  const featuresRef = useRef(null);
  const joinUsRef = useRef(null);
  const footerRef = useRef(null);

  const toggleMenu = (event) => {
    event.preventDefault();
    setMenuOpen((prevState) => !prevState);
    setMenuToggleImg((prevState) =>
      prevState === "./images/templates-img/3sproduct/3sproduct-menu-open.png"
        ? "./images/templates-img/3sproduct/3sproduct-menu-close.png"
        : "./images/templates-img/3sproduct/3sproduct-menu-open.png"
    );
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
  };

  useEffect(() => {
    if (selectedProjectId) {
      const fetchData = async () => {
        const walletId = sessionStorage.getItem("userAccount");
        const navbarData = await fetchComponentData(walletId, selectedProjectId, 'navbar');
        const headerData = await fetchComponentData(walletId, selectedProjectId, 'header');
        const partnersData = await fetchComponentData(walletId, selectedProjectId, 'partners');
        const aboutData = await fetchComponentData(walletId, selectedProjectId, 'aboutSection');
        const featuresData = await fetchComponentData(walletId, selectedProjectId, 'featureSection');
        const joinUsData = await fetchComponentData(walletId, selectedProjectId, 'joinUsSection');
        const footerData = await fetchComponentData(walletId, selectedProjectId, 'footerSection');

        if (walletId) {
          try {
            console.log('Fetching component data for project:', selectedProjectId);

            setTemplateContent({
              navbar: navbarData || {},
              header: headerData || {},
              partners: partnersData || {},
              aboutSection: aboutData || {},
              featureSection: featuresData || {},
              joinUsSection: joinUsData || {},
              footerSection: footerData || {},
            });
          } catch (error) {
            console.error('Error fetching component data:', error);
            setTemplateContent({
              navbar: navbarData || {},
              header: headerData || {},
              partners: partnersData || {},
              aboutSection: aboutData || {},
              featureSection: featuresData || {},
              joinUsSection: joinUsData || {},
              footerSection: footerData || {},
            });
          }
        }
      };

      fetchData();
    }
  }, [selectedProjectId, setTemplateContent]);

  const handleComponentClick = (event, identifier) => {
    if (!isPreviewMode) {
      event.preventDefault();
      event.stopPropagation();
      setSelectedElement(identifier);
    }
  };

  const handleContentChange = (section, content) => {
    setTemplateContent((prevContent) => ({
      ...prevContent,
      [section]: content,
    }));
  };

  console.log("product:" + selectedProjectId);

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
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        selectElement={selectElement}
        setSelectedElement={setSelectedElement}
        logChange={logChange}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
        onContentChange={(content) => handleContentChange('navbar', content)}
        handleImageUpload={handleImageUpload}
        sections={{
          header: headerRef,
          partners: partnersRef,
          about: aboutRef,
          features: featuresRef,
          joinUs: joinUsRef,
          footer: footerRef,
        }}
      />

      <HeaderSection
        saveSettings={saveSettings}
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
        onContentChange={(content) => handleContentChange('header', content)}
        isPreviewMode={isPreviewMode}
        selectedProjectId={selectedProjectId}
        handleImageUpload={handleImageUpload}
      />

      <PartnersSection
        saveSettings={saveSettings}
        ref={partnersRef}
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
        onContentChange={(content) => handleContentChange('partners', content)}
        isPreviewMode={isPreviewMode}
      />

      <AboutSection
        saveSettings={saveSettings}
        ref={aboutRef}
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
        onContentChange={(content) => handleContentChange('aboutSection', content)}
        isPreviewMode={isPreviewMode}
      />

      <FeaturesSection
        saveSettings={saveSettings}
        ref={featuresRef}
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
        onContentChange={(content) => handleContentChange('featureSection', content)}
        isPreviewMode={isPreviewMode}
      />

      <JoinUsSection
        saveSettings={saveSettings}
        ref={joinUsRef}
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
        onContentChange={(content) => handleContentChange('joinUsSection', content)}
        isPreviewMode={isPreviewMode}
      />

      <Footer
        saveSettings={saveSettings}
        ref={footerRef}
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
        onContentChange={(content) => handleContentChange('footerSection', content)}
        isPreviewMode={isPreviewMode}
        handleImageUpload={handleImageUpload}
      />
    </div>
  );
};

export default SSSProduct;
