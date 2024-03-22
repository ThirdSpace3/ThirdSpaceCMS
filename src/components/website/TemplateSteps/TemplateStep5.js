import React, { useState, useEffect } from 'react';
import { debounce } from 'lodash'; // Assuming lodash is installed

const TemplateStep5 = ({ updateNextButtonState, currentStep, setSelectedButtons }) => {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    // Load the initial value of the input from sessionStorage
    const savedInput = sessionStorage.getItem(`inputValue-${currentStep}`);
    if (savedInput) {
      setInputValue(savedInput);
      updateNextButtonState(savedInput.trim() !== '');
    }
  }, [currentStep, updateNextButtonState]);


  // Debounced function to save input value to sessionStorage
  const debouncedSaveInput = debounce((value) => {
    sessionStorage.setItem(`inputValue-${currentStep}`, value);
  }, 300); // Adjust debounce timing as needed




  const saveDataToSession = (newData) => {
    try {
      // Retrieve the existing session data or initialize an empty object if not present
      const sessionData = sessionStorage.getItem('stepData') ? JSON.parse(sessionStorage.getItem('stepData')) : {};
      
      // Ensure the current step has an array initialized, even if it's empty
      if (!sessionData[currentStep]) {
        sessionData[currentStep] = [];
      }
      
      // Check if there's any data for the current step, and if so, replace the last value
      if (sessionData[currentStep].length > 0) {
        sessionData[currentStep][sessionData[currentStep].length - 1] = newData;
      } else {
        // If there's no data for the current step, simply add the new data
        sessionData[currentStep].push(newData);
      }
      
      // Save the updated data back to sessionStorage
      sessionStorage.setItem('stepData', JSON.stringify(sessionData));
    } catch (error) {
      console.error('Error saving data to sessionStorage:', error);
    }
  };
  
  const handleInputChange = (event) => {
    const newValue = event.target.value;
    updateNextButtonState(newValue.trim() !== '');
    setInputValue(newValue);
    debouncedSaveInput(newValue); // Save the latest value to sessionStorage
  };
  
  const handleInputBlur = () => {
    if (inputValue.trim()) {
      // Directly use the new input value for the current step
      const newData = inputValue.trim();
      // Update the selected buttons state accordingly
      setSelectedButtons(prev => {
        const updated = {
          ...prev,
          [currentStep]: [newData] // Set the current step's value to only the latest input value
        };
        return updated;
      });
      // Use the saveDataToSession function to save this as the only (or last) entry for the current step
      saveDataToSession(newData);
    }
  };

  return (
    <div id="etape5">
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
          />
        </div>
      </div>
    </div>
  );
};

export default TemplateStep5;
