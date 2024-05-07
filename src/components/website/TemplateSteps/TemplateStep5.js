  import React, { useState, useEffect } from 'react';
import NavbarSteps from './TemplateNavbar';
  const TemplateStep5 = ({ updateNextButtonState, currentStep, setSelectedButtons }) => {
    const [inputValue, setInputValue] = useState('');



    const handleInputChange = (event) => {
      const newValue = event.target.value;
      updateNextButtonState(newValue.trim() !== '');
      setInputValue(newValue); // This triggers the useEffect above to save to sessionStorage
    };

    const handleInputBlur = () => {
      if (inputValue.trim()) {
        sessionStorage.setItem(`inputValue-${currentStep}`, inputValue.trim());
        const projectName = inputValue.trim();
        const selectedTemplateId = sessionStorage.getItem('selectedTemplateId');
        
        // Fetch the selected template's details. This example directly uses the `initialTemplates` array for simplicity.
        // In a real app, this data might come from state, props, context, or an external API.
        const selectedTemplate = sessionStorage.getItem('selectedTemplateId');

        const newProject = {
          id: Date.now(), // Unique ID for the project
          name: projectName,
          logiciel: selectedTemplateId,
          image: `./images/${selectedTemplateId}screenshot.png`,
          createdAt: new Date().toISOString().slice(0, 10),
          description: '',
          favicon: '',
        };
        
        // Retrieve existing projects from sessionStorage, add the new project, and save back to sessionStorage
        const existingProjects = JSON.parse(sessionStorage.getItem('projects')) || [];
        const updatedProjects = [...existingProjects, newProject];
        sessionStorage.setItem('projects', JSON.stringify(updatedProjects));
    
        setInputValue(projectName); // Update input value
        sessionStorage.setItem('projectName', projectName); // Save project name to sessionStorage for potential future use
        
        setSelectedButtons(prev => ({
          ...prev,
          name : [projectName]
        }));
        
        // Optionally, navigate to a new route or update the UI to reflect the newly created project
      }
    };
    
    

    // const saveDataToSession = (newData) => {
    //   try {
    //     const sessionData = sessionStorage.getItem('stepData') ? JSON.parse(sessionStorage.getItem('stepData')) : {};
    //     if (!sessionData[currentStep]) {
    //       sessionData[currentStep] = [];
    //     }
    //     sessionData[currentStep] = [newData]; // Simplify to always keep only the latest entry
    //     sessionStorage.setItem('stepData', JSON.stringify(sessionData));
    //   } catch (error) {
    //     console.error('Error saving data to sessionStorage:', error);
    //   }
    // };
    useEffect(() => {
      sessionStorage.setItem('projectName', inputValue);
    }, [inputValue]);


    useEffect(() => {
      // Load the initial value of the input from sessionStorage
      const savedInput = sessionStorage.getItem(`inputValue-${currentStep}`);
      if (savedInput) {
        updateNextButtonState(savedInput.trim() !== '');
      }
    }, [currentStep, updateNextButtonState]);


    // Ensure useEffect correctly tracks changes
  useEffect(() => {
    sessionStorage.setItem(`inputValue-${currentStep}`, inputValue);
  }, [inputValue, currentStep]);


    return (
      <div id="etape5">
              <NavbarSteps />

        <div className="step-box">
          <h2 className="template-title">Choose a name for your project</h2>
          <p className="template-subtitle">You can always change your mind later.</p>
          <div className="template-input-box">
            <input
              type="text"
              placeholder={"Choose a name..." || {inputValue}}
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
            />
          </div>
        </div>
      </div>
    );
  };

  export default TemplateStep5;
