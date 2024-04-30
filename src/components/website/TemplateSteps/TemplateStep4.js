import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import NavbarSteps from "./TemplateNavbar";
// Import your template components
import TemplateFullText from "../../../templates/EditableDiv";
import TemplateImg_txt from "../../../templates/TemplateImg_txt";
import { TemplateTest1 } from "../../../templates";
import { Template2 } from "../../../templates";
import SSSProduct from "../../../templates/3s-Product";

// Assuming html2canvas is used elsewhere in your component or project

const initialTemplates = [
  {
    id: "SSSProduct",
    name: "SSSProduct",
    component: SSSProduct,
    screenshot: "./images/SSSProductscreenshot.png",
  },
  {
    id: "TemplateFullText",
    name: "Full Text",
    component: TemplateFullText,
    screenshot: "./images/TemplateFullTextscreenshot.png",
  },
  {
    id: "TemplateImg_txt",
    name: "Image and Text",
    component: TemplateImg_txt,
    screenshot: "./images/TemplateImg_txtscreenshot.png",
  },
  {
    id: "TemplateTest1",
    name: "Test Template 1",
    component: TemplateTest1,
    screenshot: "./images/TemplateTest1screenshot.png",
  },
  {
    id: "Template2",
    name: "Template 2",
    component: Template2,
    screenshot: "./images/Template2screenshot.png",
  }
];

const TemplateStep4 = ({
  updateNextButtonState,
  setSelectedButtons,
  selectedButtons,
  currentStep,
  setCurrentStep,
}) => {
  const location = useLocation();
  const [templates, setTemplates] = useState(initialTemplates);
  const [isHovered, setIsHovered] = useState(Array(templates.length).fill(false));
  const [selectedId, setSelectedId] = useState(location.state?.selectedTemplateId || "");



  const handleTemplateSelect = (templateId) => {
    setSelectedButtons(prev => ({
      ...prev,
      templateselected: [templateId] // Ensures only the latest selection is kept
    }));
    updateNextButtonState(true);
    advanceToNextStep(currentStep, setCurrentStep);
  };


  const handleHover = (index, state) => {
    setIsHovered(isHovered.map((hoverState, i) => (i === index ? state : hoverState)));
  };

  // After selecting a template, ensure the data is saved before moving to the next step.
  const advanceToNextStep = (currentStep, setCurrentStep, additionalData = {}) => {
    const sessionData = JSON.parse(sessionStorage.getItem('stepData')) || {};
    sessionData[currentStep] = { ...sessionData[currentStep], ...additionalData };
    sessionStorage.setItem('stepData', JSON.stringify(sessionData));
    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);
  };

  useEffect(() => {
    sessionStorage.setItem('stepData', JSON.stringify(selectedButtons));
  }, [selectedButtons]);
  return (
    <div id="etape4">
      <NavbarSteps />
      <div className="step-box">
        <h2 className="template-title">Choose a template</h2>
        <p className="template-subtitle">
          You can always explore other templates if you change your mind later.
        </p>
        <div className="templates-section">
          <div className="templates-container">
            {templates.map((template, index) => (
              <div
                className={`templates-box ${template.id === selectedId ? 'selected' : ''}`}
                key={template.id}
                onClick={() => handleTemplateSelect(template.id)}
              >
                <div
                  className="templates-img"
                  onMouseEnter={() => handleHover(index, true)}
                  onMouseLeave={() => handleHover(index, false)}
                >
                  <img
                    src={template.screenshot}
                    alt={`${template.name} Preview`}
                    style={{ width: "100%", height: "auto" }}
                  />
                  {isHovered[index] && (
                    <div className="templates-hover">
                      <div className="templates-hover-content">
                        <Link
                          className="start-editing-link"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleTemplateSelect(template.id);
                          }}
                        >
                          Start Editing
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
                <div className="templates-infos">
                  <h3>{template.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateStep4;
