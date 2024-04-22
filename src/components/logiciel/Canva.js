import React from 'react';
import './Canva.css';
import '../Root.css';

// Import all template components
import TemplateFullText from '../../templates/TemplateFullText';
import TemplateImg_txt from '../../templates/TemplateImg_txt';
import Template2 from '../../templates/Template2';
import TemplateTest1 from '../../templates/TemplateTest1';
import SSSProduct from '../../templates/templates-po/3s-Product';

export default function Canva({ templateName, deviceSize, settings, handleSettingsChange, selectedElement, setSelectedElement, isPreviewMode }) {
  // Mapping of template names to components
  const templateComponents = {
    TemplateFullText,
    TemplateImg_txt,
    TemplateTest1,
    Template2,
    SSSProduct,
    // Add more templates here as needed
  };

  const FallbackTemplate = () => <div>Template not found.</div>;
  const SelectedTemplate = templateComponents[templateName] || FallbackTemplate;

  return (
    <div className='canva-wrapper'>
      <SelectedTemplate
        deviceSize={deviceSize}
        settings={settings}
        handleSettingsChange={handleSettingsChange}
        selectedElement={selectedElement}
        setSelectedElement={setSelectedElement}
        isPreviewMode={isPreviewMode}
      />
    </div>
  );
}
