import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NavbarSteps from "./TemplateNavbar";
import SSSProduct from "../../../templates/3s-Product";
import SSSPortfolio from "../../../templates/3s-Portfolio";

const initialTemplates = [
  {
    id: "SSSProduct",
    name: "SSSProduct",
    component: SSSProduct,
    screenshot: "https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageWebSite%2FTemplateScreenshot%2FSSSProductscreenshot.png?alt=media&token=521c4bc7-28d0-4e2c-aa88-fe3c0b525101",
  },
  // {
  //   id: "SSSPortfolio",
  //   name: "SSSPortfolio",
  //   component: SSSPortfolio,
  //   screenshot: "https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageWebSite%2FTemplateScreenshot%2FSSSPortfolioscreenshot.png?alt=media&token=59869598-73e0-4bd4-958c-f725e6afb1ff",
  // },
];

const TemplateStep4 = ({
  updateNextButtonState,
  setSelectedButtons,
  selectedButtons,
  currentStep,
  setCurrentStep,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [templates, setTemplates] = useState(initialTemplates);
  const [isHovered, setIsHovered] = useState(Array(templates.length).fill(false));
  const [selectedId, setSelectedId] = useState(location.state?.selectedTemplateId || "");

  const handleTemplateSelect = (templateId) => {
    sessionStorage.setItem('selectedTemplateId', templateId);
    setSelectedButtons(prev => ({
      ...prev,
      templateselected: [templateId]
    }));
    updateNextButtonState(true);
    advanceToNextStep(currentStep, setCurrentStep);
  };

  const handleHover = (index, state) => {
    setIsHovered(isHovered.map((hoverState, i) => (i === index ? state : hoverState)));
  };

  const handlePreview = (templateId) => {
    navigate(`/template-preview/${templateId}`, {
      state: { selectedTemplateId: templateId }
    });
  };

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
                          className="purple-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleTemplateSelect(template.id);
                          }}
                        >
                          Start Editing
                        </Link>
                        {/* <a
                          className="grey-btn"

                          onClick={(e) => {
                            e.stopPropagation();
                            handlePreview(template.id);
                          }}
                        >
                          Preview
                        </a> */}
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
