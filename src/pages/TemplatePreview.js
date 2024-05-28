import React from 'react';
import { useParams } from 'react-router-dom';
import SSSProduct from '../templates/3s-Product';
import SSSPortfolio from '../templates/3s-Portfolio';
import TemplatePreviewTopbar from '../components/website/TemplatePreviewTopbar';
import { useLocation } from 'react-router-dom';

const templateComponents = {
  SSSProduct,
  SSSPortfolio,
};

const TemplatePreview = () => {
  let { templateName } = useParams();
  const location = useLocation();
  const selectedId = location.state?.selectedTemplateId || "";
  const [isPreviewMode, setIsPreviewMode] = React.useState(true);  // Assume preview mode is enabled

  const TemplateComponent = templateComponents[templateName];

  return (
    <div>
      <TemplatePreviewTopbar
        selectedTemplateId={selectedId}
        templateName={templateName}
        isPreviewMode={isPreviewMode}
      />
      {TemplateComponent ? <TemplateComponent isPreviewMode={isPreviewMode} /> : <p>Template not found.</p>}
    </div>
  );
};

export default TemplatePreview;
