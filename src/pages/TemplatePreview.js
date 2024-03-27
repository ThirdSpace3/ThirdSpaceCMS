import React from 'react';
import { useParams } from 'react-router-dom';

// Import your template components here
import TemplateFullText from '../templates/TemplateFullText';
import TemplateImg_txt from '../templates/TemplateImg_txt';
import TemplateTest1  from '../templates/TemplateTest1';

// Map template names to components for easy lookup
const templateComponents = {
  TemplateFullText: TemplateFullText,
  TemplateImg_txt: TemplateImg_txt,
  TemplateTest1 : TemplateTest1,

  // Add other templates as needed
};

const TemplatePreview = () => {
  let { templateName } = useParams();

  const TemplateComponent = templateComponents[templateName];

  return (
    <div>
      {/* <h2>Template Preview: {templateName}</h2> */}
      {TemplateComponent ? <TemplateComponent /> : <p>Template not found.</p>}
    </div>
  );
};

export default TemplatePreview;
