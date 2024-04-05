import React, { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const TemplateStepsBTN = ({ onNext, onIgnore, isNextEnabled, selectedButtons, walletId, currentStep, inputValue, templateData }) => {
  const [redirectToRoot, setRedirectToRoot] = useState(false);
  const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
console.log("isLoggedIn:", isLoggedIn); // Add this line

  const handleNextClick = async () => {
    if (isNextEnabled) {
      try {
        const sessionData = JSON.parse(sessionStorage.getItem('stepData')) || {};
        // Save both inputValue and selectedButtons for the current step

        sessionData[currentStep] = {
          [currentStep]: selectedButtons[currentStep] // Save the selected buttons for the current step
        };
        sessionStorage.setItem('stepData', JSON.stringify(sessionData));

        if (currentStep === 5) {
          // Now `sessionData` already has all the information aggregated
          console.log(sessionData); // This should reflect the complete data
          sessionStorage.setItem('isTemplateCompleted', 'true');
          setRedirectToRoot(true);
          console.log(walletId);
          // Adjust the payload as per your backend requirements
          await axios.post('/api/final-submission', {
            walletId,
            data: {
              allStepsData: sessionData,
              templateName: sessionData[5]?.inputValue, // Example, adjust according to your structure
              // Include any other relevant data
            },
          });        
        sessionStorage.setItem('isTemplateCompleted','true');
        setRedirectToRoot(true);

        } else {
          onNext(); // Proceed to the next step
        }
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





