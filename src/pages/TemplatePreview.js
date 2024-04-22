import React from 'react';
import { useParams } from 'react-router-dom';
import TemplateFullText from '../templates/EditableDiv';
import TemplateImg_txt from '../templates/TemplateImg_txt';
import TemplateTest1 from '../templates/TemplateTest1';
import { Template2 } from '../templates';
import SSSProduct from '../templates/3s-Product';
import TemplatePreviewTopbar from '../components/website/TemplatePreviewTopbar';
import { useLocation } from 'react-router-dom';

const templateComponents = {
  TemplateFullText,
  TemplateImg_txt,
  TemplateTest1,
  Template2,
  SSSProduct,
};

const TemplatePreview = () => {
  let { templateName } = useParams();
  const location = useLocation();
  const selectedId = location.state?.selectedTemplateId || "";

  const handleTemplateSelect = (templateId) => {
    // Implement your logic here
    console.log(`Template selected: ${templateId}`);
  };

  const TemplateComponent = templateComponents[templateName];

  return (
    <div>
      <TemplatePreviewTopbar
        selectedTemplateId={selectedId}
        handleTemplateSelect={handleTemplateSelect}
        templateName={templateName}
      />
      {TemplateComponent ? <TemplateComponent /> : <p>Template not found.</p>}
    </div>
  );
};
export default TemplatePreview;
