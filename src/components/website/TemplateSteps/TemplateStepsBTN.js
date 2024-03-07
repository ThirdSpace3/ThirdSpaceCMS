import React from 'react';
import axios from 'axios';

const TemplateStepsBTN = ({ onNext, onIgnore, isNextEnabled, selectedButtons, walletId, currentStep, handleSaveName, templateData }) => {



const handleNextClick = async () => {
  if (isNextEnabled) {
    try {
      // Send selected buttons and template data (including project name) to the backend API
      await axios.post('/api/user-actions', {
        walletId,
        step: currentStep,
        selectedButtons: selectedButtons[currentStep],
        templateData, // Ensure this includes the project name under `name` key
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