import React, { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const TemplateStepsBTN = ({ onNext, onIgnore, isNextEnabled, selectedButtons, walletId, currentStep, inputValue, templateData }) => {
  const [redirectToRoot, setRedirectToRoot] = useState(false);



  const handleNextClick = async () => {
    if (isNextEnabled) {
      try {
        if (currentStep === 5) {
          // Directly use the corrected aggregation logic here
          // Assuming session storage data is structured as shown and stored under a single key 'stepData'
          const allStepsData = JSON.parse(sessionStorage.getItem('stepData')) || {};
          console.log(allStepsData); // This should now correctly reflect the aggregated data
          // Now, include `allStepsData` in the payload for the final submission          

          await axios.post('/api/final-submission', {
            walletId,
            data: {
              selectedButtons: selectedButtons[currentStep],
              inputValue,
              allStepsData,
              // Include any other relevant data
            },
          });
          setRedirectToRoot(true);

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
      {redirectToRoot && <Navigate to="/dashboard" replace />}
    </div>
  );
};

export default TemplateStepsBTN;
