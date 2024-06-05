import React, { useState, useEffect, useRef } from "react";
import Navbar from "./TemplateComponents/3sProduct/components/3sproductNavbar";
import HeaderSection from "./TemplateComponents/3sProduct/components/3sProductHeader";
import PartnersSection from "./TemplateComponents/3sProduct/components/3sProductPartners";
import AboutSection from "./TemplateComponents/3sProduct/components/3sProductAbout";
import FeaturesSection from "./TemplateComponents/3sProduct/components/3sProductFeature";
import JoinUsSection from "./TemplateComponents/3sProduct/components/3sProductJoinUs";
import Footer from "./TemplateComponents/3sProduct/components/3sProductFooter";
import fetchProjects from "../hooks/Fetchprojects";

const SSSProduct = ({ saveSettings, setTemplateContent, selectedColor, setSelectedColor, logChange, selectElement, isPreviewMode, settings, handleSettingsChange, openImagePanel, imageHistory, selectedImage, setSelectedImage, setSelectedElement, selectedProjectId }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [menuToggleImg, setMenuToggleImg] = useState("./images/templates-img/3sproduct/3sproduct-menu-open.png");
  const [navbarContent, setNavbarContent] = useState({});
  const [headerContent, setHeaderContent] = useState({});
  const [partnersContent, setPartnersContent] = useState({});
  const [aboutSection, setAboutSection] = useState({});
  const [featureSection, setFeatureSection] = useState({});
  const [joinUsSection, setJoinUsSection] = useState({});
  const [footerSection, setFooterSection] = useState({});

  const headerRef = useRef(null);
  const partnersRef = useRef(null);
  const aboutRef = useRef(null);
  const featuresRef = useRef(null);
  const joinUsRef = useRef(null);
  const footerRef = useRef(null);

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
    if (selectedProjectId) {
      const fetchData = async () => {
        const walletId = sessionStorage.getItem("userAccount");
        if (walletId) {
          const navbarData = await fetchProjects(walletId, selectedProjectId, 'navbar');
          const headerData = await fetchProjects(walletId, selectedProjectId, 'header');
          const partnersData = await fetchProjects(walletId, selectedProjectId, 'partners');
          const aboutData = await fetchProjects(walletId, selectedProjectId, 'aboutSection');
          const featuresData = await fetchProjects(walletId, selectedProjectId, 'featureSection');
          const joinUsData = await fetchProjects(walletId, selectedProjectId, 'joinUsSection');
          const footerData = await fetchProjects(walletId, selectedProjectId, 'footerSection');

          setNavbarContent(navbarData || {});
          setHeaderContent(headerData || {});
          setPartnersContent(partnersData || {});
          setAboutSection(aboutData || {});
          setFeatureSection(featuresData || {});
          setJoinUsSection(joinUsData || {});
          setFooterSection(footerData || {});
        }
      };

      fetchData();
    }
  }, [selectedProjectId]);

  useEffect(() => {
    setTemplateContent({
      navbar: navbarContent,
      header: headerContent,
      partners: partnersContent,
      aboutSection: aboutSection,
      featureSection: featureSection,
      joinUsSection: joinUsSection,
      footerSection: footerSection,
    });
  }, [navbarContent, headerContent, partnersContent, aboutSection, featureSection, joinUsSection, footerSection, setTemplateContent]);

  const handleComponentClick = (event, identifier) => {
    if (!isPreviewMode) {
      event.preventDefault();
      event.stopPropagation();
      setSelectedElement(identifier);
    }
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
        onContentChange={setNavbarContent}
        sections={{
          header: headerRef,
          partners: partnersRef,
          about: aboutRef,
          features: featuresRef,
          joinUs: joinUsRef,
          footer: footerRef
        }}
      />

      <HeaderSection
        saveSettings={saveSettings}
        ref={headerRef}
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
        onContentChange={setHeaderContent}
        isPreviewMode={isPreviewMode}
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
        onContentChange={setPartnersContent}
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
        onContentChange={setAboutSection}
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
        onContentChange={setFeatureSection}
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
        onContentChange={setJoinUsSection}
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
        onContentChange={setFooterSection}
        isPreviewMode={isPreviewMode}
      />
    </div>
  );
};

export default SSSProduct;
