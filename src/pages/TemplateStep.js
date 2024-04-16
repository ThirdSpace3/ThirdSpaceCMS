import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

// Import your template steps and other components
import TemplateStep1 from "../components/website/TemplateSteps/TemplateStep1";
import TemplateStep2 from "../components/website/TemplateSteps/TemplateStep2";
import TemplateStep3 from "../components/website/TemplateSteps/TemplateStep3";
import TemplateStep4 from "../components/website/TemplateSteps/TemplateStep4";
import TemplateStep5 from "../components/website/TemplateSteps/TemplateStep5";
import TemplateStepsBTN from "../components/website/TemplateSteps/TemplateStepsBTN";
import ReportBugBTN from '../components/website/ReportBugBTN';
import TemplateProgressBar from '../components/website/TemplateSteps/TemplateProgressBar';
import TemplateStepsMobile from '../components/website/TemplateSteps/TemplateStepsMobile';
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
  console.log(isLoggedIn);
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    // Cleanup listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
    if (currentStep < 5) {
      // Proceed to the next step if it's not the last step

      setCurrentStep(currentStep + 1);
    } 
    if (currentStep === 5) {
      // If it's the last step, set `isTemplateCompleted` to false and redirect
      console.log("Current Step: ", currentStep);

      sessionStorage.setItem('isTemplateCompleted', 'false');
      const selectedTemplateId = sessionStorage.getItem('selectedTemplateId');
      const projectName = sessionStorage.getItem('projectName');
      console.log("Saving template: ", selectedTemplateId);
      console.log("Saving project name: ", projectName);
      
      // Perform any additional operations needed before redirecting to the dashboard
      navigate('/dashboard');
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
      {windowWidth < 768 ? (
        <TemplateStepsMobile />
      ) : (
        // The rest of your component logic remains unchanged, displaying the appropriate step based on 'currentStep'
        <>
          {currentStep === 1 && (
            <TemplateStep1
              updateNextButtonState={updateNextButtonState}
              handleFinalInputSave={handleFinalInputSave}
              selectedButtons={selectedButtons}
              setSelectedButtons={setSelectedButtons}
              currentStep={currentStep}
              inputValue={inputValue}
              setInputValue={setInputValue}
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
              setProjectName={setProjectName}
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
              inputValue={inputValue}
            />
          )}
        </>
      )}

      {/* Components outside the conditional rendering remain unchanged */}
      <ReportBugBTN />
      {currentStep !== 5 && <TemplateProgressBar currentStep={currentStep} />}
      <img src="./images/template-deco-1.png" alt="" className="template-deco-bot" />
      <img src="./images/template-deco-2.png" alt="" className="template-deco-top" />    </>
  );
}  