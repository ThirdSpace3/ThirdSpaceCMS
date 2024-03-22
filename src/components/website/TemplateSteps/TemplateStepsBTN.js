import React from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const TemplateStepsBTN = ({ onNext, onIgnore, isNextEnabled, selectedButtons, walletId, currentStep, inputValue, templateData }) => {



  const handleNextClick = async () => {
    if (isNextEnabled) {
      try {
        // Differentiate the behavior based on the currentStep
        if (currentStep === 5) {
          // Logic to save data in the database
          await axios.post('/api/final-submission', {
            walletId,
            data: {
              selectedButtons: selectedButtons[currentStep],
              inputValue,
              templateData,
              // Include any other relevant data
            },
          });
        } else {
          // Save inputValue to session storage for other steps
          const sessionData = sessionStorage.getItem('stepData') ? JSON.parse(sessionStorage.getItem('stepData')) : {};
          sessionData[currentStep] = { ...sessionData[currentStep], inputValue }; // Modify according to your structure
          sessionStorage.setItem('stepData', JSON.stringify(sessionData));
        }  
        onNext(); // Proceed to the next step
      } catch (error) {
        console.error('Error in operation:', error);
      }
    }
  };
  
  


  return (
    
    <div className="btn-box">
      {currentStep !== 4 && currentStep !== 5 && (
        <button className="ignore-btn" onClick={onIgnore}>
          Skip
        </button>
      )}
      <button
        className={`purple-light-btn ${!isNextEnabled ? 'disabled' : ''}`}
        onClick={handleNextClick}
        disabled={!isNextEnabled}
      >
        Next
      </button>
    </div>
  );
};

export default TemplateStepsBTN;
