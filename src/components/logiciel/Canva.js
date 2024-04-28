import React, { useState, useEffect } from 'react';
import './Canva.css';
import '../Root.css';
import TemplateFullText from '../../templates/EditableDiv';
import TemplateImg_txt from '../../templates/TemplateImg_txt';
import Template2 from '../../templates/Template2';
import TemplateTest1 from '../../templates/TemplateTest1';
import SSSProduct from '../../templates/3s-Product';
import { useImageHistory } from '../../hooks/ImageHistoryContext';
import { TemplateProvider, useTemplateContext} from '../../hooks/TemplateContext';

export default function Canva({ templateName, deviceSize, settings, handleSettingsChange, selectedElement, setSelectedElement, selectElement, isPreviewMode, openImagePanel, imageHistory, selectedImage, setSelectedImage }) {
  const templateComponents = {
    TemplateFullText,
    TemplateImg_txt,
    Template2,
    TemplateTest1,
    SSSProduct,
  };

  const FallbackTemplate = () => <div>Template not found.</div>;
  const SelectedTemplate = templateComponents[templateName] || FallbackTemplate;

  const [canvasSize, setCanvasSize] = useState({ width: deviceSize, height: '100%' });

  useEffect(() => {
    setCanvasSize({ width: deviceSize, height: '100vh' });
  }, [deviceSize]);
  // console.log('selectElement prop in Canva:', selectElement);

  return (
    <TemplateProvider>

    <div className='canva-wrapper' style={{ width: canvasSize.width, height: canvasSize.height, overflowY: 'auto' }}>
      <SelectedTemplate
        deviceSize={deviceSize}
        settings={settings}
        handleSettingsChange={handleSettingsChange}
        selectedElement={selectedElement}
        setSelectedElement={setSelectedElement}
        selectElement={selectElement}
        isPreviewMode={isPreviewMode}
        openImagePanel={openImagePanel}
        imageHistory={imageHistory}
        selectedImage={selectedImage} // Pass down the selectedImage prop
        setSelectedImage={setSelectedImage}
      />
    </div>
    </TemplateProvider>

  );
}
