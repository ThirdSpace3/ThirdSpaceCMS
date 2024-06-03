import React, { useState, useEffect } from 'react';
import NavbarSteps from './TemplateNavbar';

const TemplateStep5 = ({ updateNextButtonState, currentStep, setSelectedButtons, showError }) => {
  const [inputValue, setInputValue] = useState('');
  const [inputError, setInputError] = useState(false);
  const [touched, setTouched] = useState(false); // State to track if the input has been touched

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    const isValid = newValue.trim() !== '';
    updateNextButtonState(isValid);
    if (touched) {
      setInputError(!isValid);
    }
    setInputValue(newValue);
  };

  const handleInputBlur = () => {
    setTouched(true); // Mark the input as touched on blur
    const isValid = inputValue.trim() !== '';
    setInputError(!isValid);
    if (isValid) {
      sessionStorage.setItem(`inputValue-${currentStep}`, inputValue.trim());
      const projectName = inputValue.trim();
      const selectedTemplateId = sessionStorage.getItem('selectedTemplateId');

      const newProject = {
        id: Date.now(),
        name: projectName,
        logiciel: selectedTemplateId,
        image: `./images/${selectedTemplateId}screenshot.png`,
        createdAt: new Date().toISOString().slice(0, 10),
        description: '',
        favicon: '',
      };

      const existingProjects = JSON.parse(sessionStorage.getItem('projects')) || [];
      const updatedProjects = [...existingProjects, newProject];
      sessionStorage.setItem('projects', JSON.stringify(updatedProjects));

      setInputValue(projectName);
      sessionStorage.setItem('projectName', projectName);

      setSelectedButtons((prev) => ({
        ...prev,
        name: [projectName],
      }));
    } else {
      updateNextButtonState(false);
    }
  };

  useEffect(() => {
    sessionStorage.setItem(`inputValue-${currentStep}`, inputValue);

    const savedInput = sessionStorage.getItem(`inputValue-${currentStep}`);
    if (savedInput !== null) {
      const isValid = savedInput.trim() !== '';
      updateNextButtonState(isValid);
      setInputValue(savedInput);
      setInputError(!isValid && touched);
    } else {
      updateNextButtonState(false);
    }
  }, [inputValue, currentStep, updateNextButtonState]);


  return (
    <div id="etape5">
      <NavbarSteps />
      <div className="step-box">
        <h2 className="template-title">Choose a name for your project</h2>
        <p className="template-subtitle">You can always change your mind later.</p>
        <div className="template-input-box">
          <input
            type="text"
            placeholder="Choose a name..."
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            style={{ borderColor: inputError && touched ? 'red' : '' }}
          />
          {inputError && touched && <p style={{ color: 'red', textAlign:'center' }}>Before proceding please enter a valid name for your project.</p>}
        </div>
      </div>
    </div>
  );
};

export default TemplateStep5;
