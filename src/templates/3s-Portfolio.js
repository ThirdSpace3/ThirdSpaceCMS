import React, { useState } from 'react';
import SSSPortfolioHeader from './TemplateComponents/3sPortfolio/component/3sPortfolioHeader';
import SSSPortfolioAbout from './TemplateComponents/3sPortfolio/component/3sPortfolioAbout';
import SSSPortfolioContact from './TemplateComponents/3sPortfolio/component/3sPortfolioContact';
import SSSPortfolioExperience from './TemplateComponents/3sPortfolio/component/3sPortfolioExperience';
import SSSPortfolioProjects from './TemplateComponents/3sPortfolio/component/3sPortfolioProjects';

const SSSPortfolio = ({ setTemplateContent, selectedColor, setSelectedColor, logChange, selectElement, isPreviewMode, settings, handleSettingsChange, openImagePanel, imageHistory, selectedImage, setSelectedImage, setSelectedElement }) => {
  const [headerContent, setHeaderContent] = useState({});
  
  return (
    <div className="portfolio-container">
      <SSSPortfolioHeader
        setSelectedElement={setSelectedElement}
        onContentChange={setHeaderContent}
        openImagePanel={openImagePanel}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
      />
      <SSSPortfolioAbout />
      <SSSPortfolioExperience />
      <SSSPortfolioProjects />
      <SSSPortfolioContact />
    </div>
  );
};

export default SSSPortfolio;
