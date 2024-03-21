import React, { useState, useEffect } from 'react';
import TemplateStep1 from "../components/website/TemplateSteps/TemplateStep1";
import TemplateStep2 from "../components/website/TemplateSteps/TemplateStep2";
import TemplateStep3 from "../components/website/TemplateSteps/TemplateStep3";
import TemplateStep4 from "../components/website/TemplateSteps/TemplateStep4";
import TemplateStep5 from "../components/website/TemplateSteps/TemplateStep5";

// import TemplateStepsMobile from "../components/website/TemplateSteps/TemplateStepsMobile";
import TemplateStepsBTN from "../components/website/TemplateSteps/TemplateStepsBTN";
import ReportBugBTN from "../components/website/ReportBugBTN";

export default function TemplateStep() {
  const [currentStep, setCurrentStep] = useState(4);
  const [isNextEnabled, setIsNextEnabled] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [selectedButtons, setSelectedButtons] = useState({
    1: [''],
    2: [],
    3: [],
    4: [],
    5: [],
  });
  
  const walletId = sessionStorage.getItem('userAccount'); // Ensure this is your actual key

  useEffect(() => {
    console.log(selectedButtons); // Check if selectedButtons updates correctly
  }, [selectedButtons]);

  const templateData = {
    name: selectedButtons[4] || '', // Directly use the value, with a fallback to an empty string
  };

  const [projectName, setProjectName] = useState('');
  useEffect(() => {
    // Load stored data on component mount
    const storedButtons = sessionStorage.getItem('selectedButtons');
    if (storedButtons) {
      console.log(storedButtons);

      setSelectedButtons(JSON.parse(storedButtons));
    }
  }, []);
  
  // Modify handleNext to use projectName when moving from step 4
  const handleNext = () => {
    // Logic to save inputValue to session storage or pass it to the next step
    const sessionData = sessionStorage.getItem('stepData') ? JSON.parse(sessionStorage.getItem('stepData')) : {};
    if (inputValue.trim()) {
      if (!sessionData[currentStep]) sessionData[currentStep] = {};
      sessionData[currentStep].inputValue = inputValue.trim();
      sessionStorage.setItem('stepData', JSON.stringify(sessionData));
    }
        if (currentStep === 4) {
      setSelectedButtons(prevSelectedButtons => ({
        ...prevSelectedButtons,
        4: [projectName], // Store as an array
      }));
    }
    

    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };
  const handleIgnore = () => {
    if (currentStep <= 6) {
      setCurrentStep(currentStep + 1);
    }
  };

  // This function could be passed to steps that need to enable/disable the "Next" button
  const updateNextButtonState = (isEnabled) => {
    console.log(`updateNextButtonState called with: ${isEnabled}`);

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
        selectedButtons={selectedButtons[1]}
        setSelectedButtons={setSelectedButtons}
        currentStep={currentStep}
        inputValue={inputValue} // Pass inputValue to TemplateStep1
        setInputValue={setInputValue} // Pass setInputValue to TemplateStep1 for updating the inputValue
      />
    )}


      {currentStep === 2 && (
        <TemplateStep2
          updateNextButtonState={updateNextButtonState}
          selectedButtons={selectedButtons[2]}
          setSelectedButtons={setSelectedButtons}
          currentStep={currentStep}
        />
      )}

      {currentStep === 3 && (
        <TemplateStep3
          updateNextButtonState={updateNextButtonState}
          selectedButtons={selectedButtons[3]}
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
          selectedButtons={selectedButtons[5]}
          setSelectedButtons={setSelectedButtons}
          currentStep={currentStep}
        />
      )}
      {currentStep < 5 && (
      <TemplateStepsBTN
        onNext={handleNext}
        onIgnore={handleIgnore}
        isNextEnabled={isNextEnabled}
        selectedButtons={selectedButtons}
        walletId={walletId}
        currentStep={currentStep}
        templateData={templateData}
        inputValue={inputValue} // Pass inputValue to TemplateStepsBTN
      />
    )}
      <ReportBugBTN />
      <img src="./images/template-deco-1.png" alt="" className="template-deco-bot" />
      <img src="./images/template-deco-2.png" alt="" className="template-deco-top" />
    </>
  );
}
