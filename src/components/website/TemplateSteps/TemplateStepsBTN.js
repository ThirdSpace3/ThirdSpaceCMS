import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { db, doc, setDoc } from '../../../firebaseConfig';

const TemplateStepsBTN = ({ onNext, onIgnore, isNextEnabled, selectedButtons, walletId, currentStep, onBack }) => {
  const [redirectToRoot, setRedirectToRoot] = useState(false);

  const handleNextClick = async () => {
    if (isNextEnabled) {
      try {
        const currentTimestamp = new Date().toISOString();
        if (currentStep === 5) {
          const projectName = selectedButtons.name[0];
          const templateName = selectedButtons.templateselected[0];
          const newProject = {
            id: Date.now(),
            name: projectName,
            templateName: templateName,
            createdAt: currentTimestamp,
            lastUpdated: currentTimestamp,
            description: "",
            favicon: "",
          };
          const collectionPath = 'projects';
          const docPath = `${walletId}/projectData/${newProject.id}`;

          try {
            await setDoc(doc(db, `${collectionPath}/${docPath}`), {
              ...newProject,
              lastUpdated: currentTimestamp
            });
          } catch (error) {
            console.error("Failed to write document:", error);
          }

          await setDoc(doc(db, 'wallets', walletId), { selectedButtons });

          setRedirectToRoot(true);
          sessionStorage.setItem('isLoggedIn', true);
          sessionStorage.setItem('isTemplateCompleted', 'true');
          console.log(selectedButtons);

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
        <button className="grey-btn" onClick={onIgnore}>
          Skip
        </button>
      )}

      <button className={`purple-btn ${!isNextEnabled ? 'disabled' : ''}`} id='next-btn-templatestep' onClick={handleNextClick} disabled={!isNextEnabled}>
        Next
      </button>
      {redirectToRoot && <Navigate to="/dashboard" replace />}
    </div>
  );
};

export default TemplateStepsBTN;
