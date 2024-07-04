import React, { useState, useEffect, useRef } from "react";
import Navbar from "./TemplateComponents/3sProduct/components/3sproductNavbar";
import HeaderSection from "./TemplateComponents/3sProduct/components/3sProductHeader";
import PartnersSection from "./TemplateComponents/3sProduct/components/3sProductPartners";
import AboutSection from "./TemplateComponents/3sProduct/components/3sProductAbout";
import FeaturesSection from "./TemplateComponents/3sProduct/components/3sProductFeature";
import JoinUsSection from "./TemplateComponents/3sProduct/components/3sProductJoinUs";
import Footer from "./TemplateComponents/3sProduct/components/3sProductFooter";
import { fetchComponentData } from "../hooks/Fetchprojects";
import ErrorBoundary from '../hooks/ErrorBoundary';

const SSSProduct = ({
  TemplateContent = {},
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
    const fetchData = async () => {
      if (selectedProjectId) {
        const walletId = sessionStorage.getItem("userAccount");
        const [navbarData, headerData, partnersData, aboutData, featuresData, joinUsData, footerData] = await Promise.all([
          fetchComponentData(walletId, selectedProjectId, 'navbar'),
          fetchComponentData(walletId, selectedProjectId, 'header'),
          fetchComponentData(walletId, selectedProjectId, 'partners'),
          fetchComponentData(walletId, selectedProjectId, 'aboutSection'),
          fetchComponentData(walletId, selectedProjectId, 'featureSection'),
          fetchComponentData(walletId, selectedProjectId, 'joinUsSection'),
          fetchComponentData(walletId, selectedProjectId, 'footerSection')
        ]);

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
    };

    fetchData();
  }, [selectedProjectId, setTemplateContent]);

  const handleContentChange = (section, content) => {
    setTemplateContent(prev => ({
      ...prev,
      [section]: content,
    }));
  };

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
        navbarData={TemplateContent.navbar || {}}
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
        headerData={TemplateContent.header || {}}
      />

      <ErrorBoundary>
        <PartnersSection
          openImagePanel={openImagePanel}
          setSelectedElement={setSelectedElement}
          onContentChange={(content) => handleContentChange('partners', content)}
          handleImageUpload={handleImageUpload}
          selectedProjectId={selectedProjectId}
          partnersData={TemplateContent.partners || {}}
        />
      </ErrorBoundary>

      <ErrorBoundary>
        <AboutSection
          handleSettingsChange={handleSettingsChange}
          settings={settings}
          openImagePanel={openImagePanel}
          setSelectedElement={setSelectedElement}
          setSelectedColor={setSelectedColor}
          onContentChange={(content) => handleContentChange('aboutSection', content)}
          handleImageUpload={handleImageUpload}
          selectedProjectId={selectedProjectId}
          aboutData={TemplateContent.aboutSection || {}}
        />
      </ErrorBoundary>

      <FeaturesSection
        handleSettingsChange={handleSettingsChange}
        setSelectedElement={setSelectedElement}
        style={settings}
        settings={settings}
        openImagePanel={openImagePanel}
        setSelectedColor={setSelectedColor}
        onContentChange={(content) => handleContentChange('featureSection', content)}
        handleImageUpload={handleImageUpload}
        selectedProjectId={selectedProjectId}
        featuresData={TemplateContent.featureSection || {}}
      />

      <JoinUsSection
        setSelectedElement={setSelectedElement}
        openImagePanel={openImagePanel}
        setSelectedColor={setSelectedColor}
        onContentChange={(content) => handleContentChange('joinUsSection', content)}
        handleImageUpload={handleImageUpload}
        selectedProjectId={selectedProjectId}
        joinUsData={TemplateContent.joinUsSection || {}}
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
        footerData={TemplateContent.footerSection || {}}
      />
    </div>
  );
};

export default SSSProduct;
