import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import SSSProduct from '../templates/3s-Product';
import SSSPortfolio from '../templates/3s-Portfolio';
import TemplatePreviewTopbar from '../components/website/TemplatePreviewTopbar';
import { useLocation } from 'react-router-dom';
import '../components/Root.css'

const templateComponents = {
  SSSProduct,
  SSSPortfolio,
};

const TemplatePreview = () => {
  const { templateName } = useParams();
  const location = useLocation();
  const selectedId = location.state?.selectedTemplateId || "";
  const [isPreviewMode, setIsPreviewMode] = useState(true);
  const [templateContent, setTemplateContent] = useState({});

  const TemplateComponent = templateComponents[templateName];

  return (
    <div >
      <TemplatePreviewTopbar
        selectedTemplateId={selectedId}
        templateName={templateName}
        isPreviewMode={isPreviewMode}
      />
      <div className='hover-cancel' >
      {TemplateComponent ? (
        <TemplateComponent 
          setTemplateContent={setTemplateContent}
          isPreviewMode={isPreviewMode}
          // Pass other necessary props here
        />
      ) : (
        <p>Template not found.</p>
      )}
      </div>
    </div>
  );
};

export default TemplatePreview;
