import React, { useState, useEffect, useCallback } from 'react';
import './Canva.css';
import '../Root.css';
import SSSProduct from '../../templates/3s-Product';
import SSSPortfolio from '../../templates/3s-Portfolio';

export default function Canva({ handleImageUpload, selectedProjectId, saveSettings, TemplateContent, setTemplateContent, selectedColor, setSelectedColor, logChange, templateName, deviceSize, settings, handleSettingsChange, selectedElement, setSelectedElement, selectElement, isPreviewMode, openImagePanel, imageHistory, selectedImage, setSelectedImage }) {

  const templateComponents = {
    SSSProduct,
    SSSPortfolio
  };

  const FallbackTemplate = () => <div>Template not found.</div>;
  const SelectedTemplate = templateComponents[templateName] || FallbackTemplate;

  const [canvasSize, setCanvasSize] = useState({ width: deviceSize, height: '100%' });

  useEffect(() => {
    setCanvasSize({ width: deviceSize, height: '100vh' });
  }, [deviceSize]);

  return (
    <div className='canva-wrapper' style={{ width: canvasSize.width, height: canvasSize.height, overflowY: 'auto' }}>
      <SelectedTemplate
        TemplateContent={TemplateContent}
        saveSettings={saveSettings}
        deviceSize={deviceSize}
        settings={settings}
        handleSettingsChange={handleSettingsChange}
        selectedElement={selectedElement}
        setSelectedElement={setSelectedElement}
        selectElement={selectElement}
        isPreviewMode={isPreviewMode}
        openImagePanel={openImagePanel}
        imageHistory={imageHistory}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        logChange={logChange}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
        setTemplateContent={setTemplateContent}
        selectedProjectId={selectedProjectId}
        handleImageUpload={handleImageUpload}  // Pass the image upload handler
      />
    </div>
  );
}
