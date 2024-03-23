import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TemplateFullText from '../../../templates/TemplateFullText';
import TemplateImg_txt from '../../../templates/TemplateImg_txt';
import NavbarSteps from './TemplateNavbar';
import TemplateFooter from './TemplateFooter';

const templates = [
  {
    id: 'templateFullText', // Added an ID for each template
    name: 'TemplateFullText',
    component: TemplateFullText,
    img: './images/template-test.png',
  },
  {
    id: 'templateImgTxt', // Added an ID for each template
    name: 'TemplateImg_txt',
    component: TemplateImg_txt,
    img: './images/howitworkd-1.png',
  },
];

const TemplateStep4 = ({ updateNextButtonState, setSelectedButtons, currentStep }) => {
    const [isHovered, setIsHovered] = useState(Array(templates.length).fill(false));
  const [selectedTemplateId, setSelectedTemplateId] = useState('');

  const handleHover = (index, state) => {
    const updatedHoverStates = [...isHovered];
    updatedHoverStates[index] = state;
    setIsHovered(updatedHoverStates);
  };

  const handleTemplateSelect = (templateId) => {
    // Here, we're directly using setSelectedButtons to update the selected template ID for step 4
    console.log(`Template selected: ${templateId}`); // Verify this line is logged
    setSelectedTemplateId(templateId);

    setSelectedButtons(prevSelectedButtons => ({
      ...prevSelectedButtons,
      [currentStep]: [templateId] // Assuming templateId is unique for each template
    }));
    
    updateNextButtonState(true); // This could be conditional based on additional logic
    console.log('Session Data Updated:', sessionStorage.getItem('stepData'));

};
// Example adjustment for Step 3 (similar logic can be applied to Step 4)
useEffect(() => {
    console.log('Current Step:', currentStep, 'Selected Template ID:', selectedTemplateId);
    if (selectedTemplateId) {
        const currentStepData = JSON.parse(sessionStorage.getItem('stepData')) || {};
        currentStepData[currentStep] = [selectedTemplateId]; // Use selectedTemplateId
        sessionStorage.setItem('stepData', JSON.stringify(currentStepData));
        console.log('Updated session storage:', currentStepData);
    }
}, [selectedTemplateId, currentStep]); // Depend on selectedTemplateId



  return (
    <div id="etape4">
    <NavbarSteps />
      <div className="step-box">
        <h2 className="template-title">Choose a template</h2>
        <p className="template-subtitle">You can always explore other templates if you change your mind later.</p>
        <div className='listing-container'>
          <div className='templates-container'>
            {templates.map((template, index) => (
              <div className='templates-box' key={template.id} onClick={() => handleTemplateSelect(template.id)}>
                <div
                  className='templates-img'
                  onMouseEnter={() => handleHover(index, true)}
                  onMouseLeave={() => handleHover(index, false)}
                >
                  <img src={template.img} alt={`${template.name} Preview`} />
                  {isHovered[index] && (
                    <div className='templates-hover'>
                      <div className='templates-hover-content'>
                        <Link to={`/template-preview/${template.name}`}>View Demo</Link>
                        <Link to={`/logiciel/${template.name}`}>Start Editing</Link>
                      </div>
                    </div>
                  )}
                </div>
                <div className='templates-infos'>
                  <h3>{template.name}</h3>
                </div>
              </div>
              
            ))}
          </div>
        </div>
      </div>
      <TemplateFooter />
    </div>
  );
};

export default TemplateStep4;
