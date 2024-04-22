import React from 'react';
import { useParams } from 'react-router-dom';

// Import your template components here
import TemplateFullText from '../templates/EditableDiv';
import TemplateImg_txt from '../templates/TemplateImg_txt';
import TemplateTest1  from '../templates/TemplateTest1';
import  {Template2}  from '../templates';
import SSSProduct from '../templates/templates-po/3s-Product';
import TemplatePreviewTopbar from '../components/website/TemplatePreviewTopbar'
// Map template names to components for easy lookup
const templateComponents = {
  TemplateFullText: TemplateFullText,
  TemplateImg_txt: TemplateImg_txt,
  TemplateTest1 : TemplateTest1,
  Template2 : Template2,
  SSSProduct: SSSProduct,
  // Add other templates as needed
};

const TemplatePreview = () => {
  let { templateName } = useParams();

  const TemplateComponent = templateComponents[templateName];

  return (
    <div>
      {/* <h2>Template Preview: {templateName}</h2> */}
      <TemplatePreviewTopbar />
      {TemplateComponent ? <TemplateComponent /> : <p>Template not found.</p>}
    </div>
  );
};

export default TemplatePreview;
