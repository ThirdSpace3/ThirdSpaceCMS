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
    id: "TemplateTest1",
    name: "TemplateTest1",
    component: TemplateTest1,
    screenshot: "./images/TemplateTest1screenshot.png",
  },
  {
    id: "SSSProduct",
    name: "SSSProduct",
    component: SSSProduct,
    screenshot: "./images/SSSProductscreenshot.png",
  },
  {
    id: "TemplateImg_txt",
    name: "TemplateImg_txt",
    component: TemplateImg_txt,
    screenshot: "./images/TemplateImg_txtscreenshot.png",
  },
  {
    id: "TemplateFullText",
    name: "TemplateFullText",
    component: TemplateFullText,
    screenshot: "./images/TemplateFullTextscreenshot.png",
  },
  {
    id: "Template2",
    name: "Template2",
    component: Template2,
    screenshot: "./images/TemplateTest1screenshot.png",
  },
];

const TemplateStep4 = ({
  updateNextButtonState,
  setSelectedButtons,
  currentStep,
  setCurrentStep, // Make sure to pass setCurrentStep from the parent component
}) => {
  const location = useLocation();
  const [templates, setTemplates] = useState(initialTemplates);
  const [isHovered, setIsHovered] = useState(Array(templates.length).fill(false));
  const [selectedId, setSelectedId] = useState(location.state?.selectedTemplateId || "");

  const handleTemplateSelect = (templateId) => {
    console.log(`Template selected: ${templateId}`);
    setSelectedId(templateId);
    sessionStorage.setItem("selectedTemplateId", templateId);
    updateNextButtonState(true);

    const additionalData = { selectedTemplateId: templateId };
    advanceToNextStep(currentStep, setCurrentStep, additionalData);
  };

  const handleHover = (index, state) => {
    setIsHovered(isHovered.map((hoverState, i) => (i === index ? state : hoverState)));
  };

  const advanceToNextStep = (currentStep, setCurrentStep, additionalData = {}) => {
    const sessionData = JSON.parse(sessionStorage.getItem('stepData')) || {};
    Object.assign(sessionData, { [currentStep]: additionalData });
    sessionStorage.setItem('stepData', JSON.stringify(sessionData));
  
    const nextStep = currentStep + 1;
    if (nextStep <= 5) {
      setCurrentStep(nextStep);
    } else {
      // Handle final step logic here, if any
      console.log("Final step reached or logic for handling steps beyond 5.");
    }
  };

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
                          to={`/template-preview/${template.id}`}
                          state={{ selectedTemplateId: template.id }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          View Demo
                        </Link>
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
