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

      // Handle the case for the last step
      if (currentStep === 5) {
        // Assuming `inputValue` holds the project name and `selectedButtons` holds template data
        const projectName = inputValue; // Or however you obtain the project name
        const templateName = selectedButtons[5]; // Adjust according to your data structure

        // Create a new project object
        const newProject = {
          id: Date.now(), // Simple way to get a unique ID
          name: projectName,
          logiciel: templateName, // Assuming this is how you determine the template
          image: `./images/${templateName}screenshot.png`, // Example path, adjust as needed
          createdAt: new Date().toISOString().slice(0, 10),
          description: "",
          favicon: "",
        };

        // Retrieve existing projects and add the new one
        const existingProjects = JSON.parse(localStorage.getItem('projects')) || [];
        const updatedProjects = [...existingProjects, newProject];
        localStorage.setItem('projects', JSON.stringify(updatedProjects));

        // Set session storage flags and redirect
        sessionStorage.setItem('isTemplateCompleted', 'true');
        setRedirectToRoot(true);

        // Optionally, if you're sending data to a backend, adjust and uncomment:
        // await axios.post('/api/final-submission', {
        //   walletId,
        //   data: { allStepsData: sessionData, templateName, projectName },
        // });

      } else {
        // Handle the next step for steps other than the last
        onNext();
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
      >
        Next
      </button>
      {redirectToRoot && <Navigate to="/dashboard" replace />}
    </div>
  );
};

export default TemplateStepsBTN;





