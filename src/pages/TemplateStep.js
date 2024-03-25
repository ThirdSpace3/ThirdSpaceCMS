import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Import your template steps and other components
import TemplateStep1 from "../components/website/TemplateSteps/TemplateStep1";
import TemplateStep2 from "../components/website/TemplateSteps/TemplateStep2";
import TemplateStep3 from "../components/website/TemplateSteps/TemplateStep3";
import TemplateStep4 from "../components/website/TemplateSteps/TemplateStep4";
import TemplateStep5 from "../components/website/TemplateSteps/TemplateStep5";
import TemplateStepsBTN from "../components/website/TemplateSteps/TemplateStepsBTN";
import ReportBugBTN from '../components/website/ReportBugBTN';

export default function TemplateStep() {
  const initialStep = Number(sessionStorage.getItem('currentStep')) || 1;
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [isNextEnabled, setIsNextEnabled] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [selectedButtons, setSelectedButtons] = useState({
    1: [],
    2: [],
    3: [],
    templateselected: [],
    name: [],
  });
  const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
  const navigate = useNavigate();

  // Retrieve or initialize the walletId
  let walletId = sessionStorage.getItem('userAccount');
 console.log(walletId)
  useEffect(() => {
    // Redirect if template process is completed
    const isTemplateCompleted = sessionStorage.getItem('isTemplateCompleted') === 'true';
    if (isTemplateCompleted) {
      navigate('/dashboard');
    }
  }, [navigate]);

  useEffect(() => {
    // Load stored data on component mount
    const storedButtons = sessionStorage.getItem('selectedButtons');
    if (storedButtons) {
      setSelectedButtons(JSON.parse(storedButtons));
    }
    sessionStorage.setItem('currentStep', currentStep.toString());
    // Ensure walletId is not lost upon updating currentStep
    if (walletId) {
      sessionStorage.setItem('userAccount', walletId);
    }
  }, [currentStep, walletId]);

  const [projectName, setProjectName] = useState('');

  const handleNext = () => {
    const sessionData = sessionStorage.getItem('stepData') ? JSON.parse(sessionStorage.getItem('stepData')) : {};
    if (inputValue.trim()) {
      if (!sessionData[currentStep]) sessionData[currentStep] = {};
      sessionData[currentStep].inputValue = inputValue.trim();
      sessionStorage.setItem('stepData', JSON.stringify(sessionData));
    }
    if (currentStep === 5) {
      setSelectedButtons(prevSelectedButtons => ({
        ...prevSelectedButtons,
        5: [projectName],
      }));
    }
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
    // Re-set the walletId to ensure it's not lost during navigation
    if (walletId) {
      sessionStorage.setItem('userAccount', walletId);
    }
  };

  const handleIgnore = () => {
    if (currentStep <= 6) {
      setCurrentStep(currentStep + 1);
    }
    // Optionally ensure walletId is preserved here too, depending on your application's flow
  };

  const updateNextButtonState = (isEnabled) => {
    setIsNextEnabled(isEnabled);
  };

  const handleFinalInputSave = (inputValue) => {
    if (inputValue.trim()) {
      setSelectedButtons(prev => ({
        ...prev,
        1: [...(prev[1] || []), inputValue.trim()]
      }));
    }
  };


  return (
    <>
       {currentStep === 1 && (
      <TemplateStep1
        updateNextButtonState={updateNextButtonState}
        handleFinalInputSave={handleFinalInputSave} // You may want to adjust or remove this if it's not used elsewhere
        selectedButtons={selectedButtons}
        setSelectedButtons={setSelectedButtons}
        currentStep={currentStep}
        inputValue={inputValue} // Pass inputValue to TemplateStep1
        setInputValue={setInputValue} // Pass setInputValue to TemplateStep1 for updating the inputValue
      />
    )}


      {currentStep === 2 && (
        <TemplateStep2
          updateNextButtonState={updateNextButtonState}
          selectedButtons={selectedButtons}
          setSelectedButtons={setSelectedButtons}
          currentStep={currentStep}
        />
      )}

      {currentStep === 3 && (
        <TemplateStep3
          updateNextButtonState={updateNextButtonState}
          selectedButtons={selectedButtons}
          setSelectedButtons={setSelectedButtons}
          currentStep={currentStep}
        />
      )}
      {currentStep === 4 && (
        <TemplateStep4
          updateNextButtonState={updateNextButtonState}
          setSelectedButtons={setSelectedButtons}
          currentStep={currentStep}
          setProjectName={setProjectName} // Make sure this is correctly passed
        />
      )}
      {currentStep === 5 && (
        <TemplateStep5
          updateNextButtonState={updateNextButtonState}
          selectedButtons={selectedButtons}
          setSelectedButtons={setSelectedButtons}
          currentStep={currentStep}
        />
      )}
      {currentStep <= 5 && (
      <TemplateStepsBTN
        onNext={handleNext}
        onIgnore={handleIgnore}
        isNextEnabled={isNextEnabled}
        selectedButtons={selectedButtons}
        walletId={walletId}
        currentStep={currentStep}
        inputValue={inputValue} // Pass inputValue to TemplateStepsBTN
      />
    )}
      <ReportBugBTN />
      <img src="./images/template-deco-1.png" alt="" className="template-deco-bot" />
      <img src="./images/template-deco-2.png" alt="" className="template-deco-top" />
    </>
  );
}
