import React, { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { db, doc, setDoc, updateDoc } from '../../../firebaseConfig'; // Ensure the path to your Firebase config is correct

const TemplateStepsBTN = ({ onNext, onIgnore, isNextEnabled, selectedButtons, walletId, currentStep, inputValue, templateData }) => {
  const [redirectToRoot, setRedirectToRoot] = useState(false);
  const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';

  const handleNextClick = async () => {
    if (isNextEnabled) {
      try {
        console.log(selectedButtons);
  
        // Current timestamp to be used for createdAt or lastUpdated
        const currentTimestamp = new Date().toISOString();
  
        if (currentStep === 5) {
          const projectName = selectedButtons.name; // Or however you obtain the project name
          const templateName = selectedButtons.templateselected; // Use the selectedButtons prop instead of sessionStorage
  
          // Create a new project object with a lastUpdated timestamp
          const newProject = {
            id: Date.now(), // Simple way to get a unique ID
            name: projectName,
            logiciel: templateName,
            image: `./images/${templateName}screenshot.png`, // Example path, adjust as needed
            createdAt: currentTimestamp, // Use the full timestamp instead of just the date
            lastUpdated: currentTimestamp, // Same as createdAt initially
            description: "",
            favicon: "",
          };
  
          // Retrieve existing projects and add the new one
          const existingProjects = JSON.parse(localStorage.getItem('projects')) || [];
          const updatedProjects = [...existingProjects, newProject];
          localStorage.setItem('projects', JSON.stringify(updatedProjects));
          sessionStorage.setItem("isLoggedIn", true);
          sessionStorage.setItem('isTemplateCompleted', 'true');
          setRedirectToRoot(true);
  
          // Save the new project data to Firestore with lastUpdated
          await setDoc(doc(db, 'wallets', walletId, 'stepData', "data"), {
            ...selectedButtons,
            lastUpdated: currentTimestamp
          });
  
          // Optionally, if you're sending data to a backend, adjust and uncomment:
          await axios.post('/api/final-submission', {
            walletId,
            data: { allStepsData: selectedButtons, templateName, projectName, lastUpdated: currentTimestamp },
          });
  
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
      {currentStep !== 3 && currentStep !== 4 && currentStep !== 5 && (
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
