import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import TemplateFullText from "../../../templates/TemplateFullText";
import TemplateImg_txt from "../../../templates/TemplateImg_txt";
import { TemplateTest1 } from "../../../templates";
import { Template2 } from "../../../templates";
import SSSProduct from "../../../templates/templates-po/3s-Product";
import NavbarSteps from "./TemplateNavbar";
import html2canvas from "html2canvas";

const initialTemplates = [
  {
    id: "TemplateTest1",
    name: "TemplateTest1",
    component: TemplateTest1,
    screenshot: "./images/TemplateTest1screenshot.png", // Add this line
  },
  {
    id: "SSSProduct",
    name: "SSSProduct",
    component: SSSProduct,
    screenshot: `./images/TemplatePo1screenshot.png`, // Add this line
  },
  {
    id: "TemplateImg_txt",
    name: "TemplateImg_txt",
    component: TemplateImg_txt,
    screenshot: "./images/TemplateImg_txtscreenshot.png", // Add this line
  },
 {
    id: "TemplateFullText",
    name: "TemplateFullText",
    component: TemplateFullText,
    screenshot: "./images/TemplateFullTextscreenshot.png", // Add this line
  },
  {
    id: "Template2",
    name: "Template2",
    component: Template2,
    screenshot: "./images/TemplateTest1screenshot.png", // Add this line
  },
 
];

const TemplateStep4 = ({
  updateNextButtonState,
  setSelectedButtons,
  currentStep,
}) => {
  const location = useLocation();
  const [templates, setTemplates] = useState(initialTemplates);
  const { selectedTemplateId } = location.state || {};

  const [isHovered, setIsHovered] = useState(
    Array(templates.length).fill(false)
  );
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const [selectedId, setSelectedId] = useState(selectedTemplateId || "");
  const [selectedDots, setSelectedDots] = useState([]);
  const [projects, setProjects] = useState(() => {
    const storedProjects = JSON.parse(sessionStorage.getItem("projects"));
    return storedProjects || [];
  });
  const options = [
    "Portfolio",
    "Online Shop",
    "Marketplace",
    "Services",
    "Courses",
    "One Page",
  ];

  const handleTemplateSelect = (initialTemplatesId) => {
    console.log(`Template selected: ${initialTemplatesId}`);
    sessionStorage.setItem("selectedTemplateId", initialTemplatesId);

    setSelectedId(initialTemplatesId);
    setSelectedButtons((prevSelectedButtons) => ({
      ...prevSelectedButtons,
      [currentStep]: [initialTemplatesId],
    }));

    setSelectedTemplate(initialTemplatesId); // Add this line

    let newSelectedDots = selectedDots.includes(initialTemplatesId)
      ? selectedDots.filter((id) => id !== initialTemplatesId)
      : [...selectedDots, initialTemplatesId];
    setSelectedDots(newSelectedDots);

    updateNextButtonState(true);
  };


  const handleHover = (index, state) => {
    const updatedHoverStates = [...isHovered];
    updatedHoverStates[index] = state;
    setIsHovered(updatedHoverStates);
  };

  useEffect(() => {
    if (selectedTemplateId) {
      const currentStepData =
        JSON.parse(sessionStorage.getItem("stepData")) || {};
      currentStepData[currentStep] = [selectedTemplateId];
      sessionStorage.setItem("stepData", JSON.stringify(currentStepData));
      console.log("Updated session storage:", currentStepData);
    }
  }, [selectedTemplateId, currentStep]);

  return (
    <div id="etape4">
      <NavbarSteps />
      <div className="step-box">
        <h2 className="template-title">Choose a template</h2>
        <p className="template-subtitle">
          You can always explore other templates if you change your mind later.
        </p>
        <div className="templates-section">
          {/* <div className='listing-container'>
            <h3>Type</h3>
            <div className='listing-content'>
              {options.map((option) => (
                <div key={option} className='listing-item' onClick={() => handleTemplateSelect(option)}>
                  <div className={`listing-dot ${selectedDots.includes(option) ? 'listing-dot-selected' : ''}`}></div>
                  <p className='listing-item-name'>{option}</p>
                </div>
              ))}
            </div>
          </div> */}
          <div className="templates-container">
            {templates.map((template, index) => (
              <div
                className={`templates-box`}
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
                        {/* Prevent event propagation */}
                        <Link
                          to={`/template-preview/${template.id}`}
                          state={{ selectedTemplateId: template.id }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          View Demo
                        </Link>
                        <Link>Start Editing</Link>
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
