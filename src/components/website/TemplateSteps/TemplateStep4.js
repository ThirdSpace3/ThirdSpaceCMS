import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import TemplateFullText from '../../../templates/TemplateFullText';
import TemplateImg_txt from '../../../templates/TemplateImg_txt';
import { TemplateTest1 } from '../../../templates';
import NavbarSteps from './TemplateNavbar';
import { template } from 'lodash';

const templates = [
  {
    id: 'TemplateFullText', // Added an ID for each template
    name: 'TemplateFullText',
    component: TemplateFullText,
  },
  {
    id: 'TemplateImg_txt', // Added an ID for each template
    name: 'TemplateImg_txt',
    component: TemplateImg_txt,
  },
  {
    id: 'TemplateTest1', // Added an ID for each template
    name: 'TemplateTest1',
    component: TemplateTest1,
  },
];

const TemplateStep4 = ({ updateNextButtonState, setSelectedButtons, currentStep }) => {
  const location = useLocation();
  const { selectedTemplateId } = location.state || {};

  const [isHovered, setIsHovered] = useState(Array(templates.length).fill(false));
  const [selectedId, setSelectedId] = useState(selectedTemplateId || '');
  const [selectedDots, setSelectedDots] = useState([]); // Add this state for filter selection

  const options = ['Portfolio', 'Online Shop', 'Marketplace', 'Services', 'Courses', 'One Page']; // Filter options

  const handleHover = (index, state) => {
    const updatedHoverStates = [...isHovered];
    updatedHoverStates[index] = state;
    setIsHovered(updatedHoverStates);
  };

  const handleTemplateSelect = (templateId) => {
    // Here, we're directly using setSelectedButtons to update the selected template ID for step 4
    console.log(`Template selected: ${templateId}`); // Verify this line is logged
    setSelectedId(templateId);

    setSelectedButtons(prevSelectedButtons => ({
      ...prevSelectedButtons,
      [currentStep]: [templateId] // Assuming templateId is unique for each template
    }));

    let newSelectedDots = [...selectedDots];
    if (newSelectedDots.includes(templateId)) {
      newSelectedDots = newSelectedDots.filter(id => id !== templateId);
    } else {
      newSelectedDots.push(templateId);
    }
    setSelectedDots(newSelectedDots);

    sessionStorage.setItem('selectedTemplateName', templateId);
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
        
        
        
        </div>
        <div className='templates-section'>
          <div className='listing-container'>
          
          <h3>Type</h3>
          <div className='listing-content'>
            {options.map((option) => (
              <div key={option} className='listing-item' onClick={() => handleTemplateSelect(option)}>
                <div className={`listing-dot ${selectedDots.includes(option) ? 'listing-dot-selected' : ''}`}></div>
                <p className='listing-item-name'>{option}</p>
              </div>
            ))}
          </div>
          </div>
          <div className='templates-container'>
            
            {templates.map((template, index) => (
              <div className='templates-box' key={template.id} onClick={() => handleTemplateSelect(template.id)}>
                <div
                  className='templates-img'
                  onMouseEnter={() => handleHover(index, true)}
                  onMouseLeave={() => handleHover(index, false)}
                >
                  {/* Replace the img tag with an iframe or the template component */}
                  {/* <img src={template.img} alt={`${template.name} Preview`} /> */}
                  {/* Using iframe */}
                  <iframe scrolling="no" src={`/template-preview/${template.name}`} title={`${template.name} Preview`} />

                  {/* Or, using the template component directly */}
                  {/* {template.component && <template.component />} */}

                  {isHovered[index] && (
                    <div className='templates-hover'>
                      <div className='templates-hover-content'>
                        <Link to={`/template-preview/${template.name}`} state={{ selectedTemplateId }}>
                          View Demo
                        </Link>
                        {/* <Link to={`/logiciel/${template.name}`}>Start Editing</Link> */}
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
   
  );
};

export default TemplateStep4;
