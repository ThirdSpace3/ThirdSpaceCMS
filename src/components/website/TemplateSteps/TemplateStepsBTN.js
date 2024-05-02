import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { db, doc, setDoc } from '../../../firebaseConfig'; // Ensure the path to your Firebase config is correct

const TemplateStepsBTN = ({ onNext, onIgnore, isNextEnabled, selectedButtons, walletId, currentStep }) => {
  const [redirectToRoot, setRedirectToRoot] = useState(false);

  const handleNextClick = async () => {
    if (isNextEnabled) {
      try {
        const currentTimestamp = new Date().toISOString();
        if (currentStep === 5) {
          // Assuming the first element is the relevant data as per your structure
          const projectName = selectedButtons.name[0]; 
          const templateName = selectedButtons.templateselected[0];
          // Create a new project object
          const newProject = {
            id: Date.now(),
            name: projectName,
            templateName: templateName,
            createdAt: currentTimestamp,
            lastUpdated: currentTimestamp,
            description: "",
            favicon: "",
          };

          const collectionPath = 'projects'; // Adjust based on your actual requirements
          const docPath = `${walletId}/projectData/${newProject.id}`; // Ensure an even number of segments

          // Save to Firestore in the correct collection
          await setDoc(doc(db, collectionPath, docPath), {
            ...newProject,
            lastUpdated: currentTimestamp
          });

          await setDoc(doc(db, 'wallets', walletId),{selectedButtons});

          setRedirectToRoot(true);
          sessionStorage.setItem('isLoggedIn', true);
          sessionStorage.setItem('isTemplateCompleted', 'true');
        } else {
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
      <button className={`purple-light-btn ${!isNextEnabled ? 'disabled' : ''}`} onClick={handleNextClick}>
        Next
      </button>
      {redirectToRoot && <Navigate to="/dashboard" replace />}
    </div>
  );
};

export default TemplateStepsBTN;
