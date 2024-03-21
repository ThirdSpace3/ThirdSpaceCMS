import React from 'react';
import axios from 'axios';

const TemplateStepsBTN = ({ onNext, onIgnore, isNextEnabled, selectedButtons, walletId, currentStep, inputValue, templateData }) => {



  const handleNextClick = async () => {
    if (isNextEnabled) {
      try {
        // Save inputValue to session storage here
        const sessionData = sessionStorage.getItem('stepData') ? JSON.parse(sessionStorage.getItem('stepData')) : {};
        sessionData[currentStep] = { ...sessionData[currentStep], inputValue }; // Modify according to your structure
        sessionStorage.setItem('stepData', JSON.stringify(sessionData));
  
        // Proceed with existing logic...
        await axios.post('/api/user-actions', {
          walletId,
          step: currentStep,
          selectedButtons: selectedButtons[currentStep],
          templateData,
        });
  
        onNext(); // Proceed to the next step
      } catch (error) {
        console.error('Error saving user actions:', error);
      }
    }
  };
  


  return (
    <div className="btn-box">
      {currentStep !== 3 && currentStep !== 4 && (
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
