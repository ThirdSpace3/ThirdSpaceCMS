import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactGA from 'react-ga';
import { db, doc, setDoc } from '../firebaseConfig';

import TemplateStep1 from "../components/website/TemplateSteps/TemplateStep1";
import TemplateStep2 from "../components/website/TemplateSteps/TemplateStep2";
import TemplateStep3 from "../components/website/TemplateSteps/TemplateStep3";
import TemplateStep4 from "../components/website/TemplateSteps/TemplateStep4";
import TemplateStep5 from "../components/website/TemplateSteps/TemplateStep5";
import TemplateStepsBTN from "../components/website/TemplateSteps/TemplateStepsBTN";
import ReportBugBTN from "../components/website/ReportBugBTN";
import TemplateProgressBar from "../components/website/TemplateSteps/TemplateProgressBar";
import TemplateStepsMobile from "../components/website/TemplateSteps/TemplateStepsMobile";

export default function TemplateStep() {
  const initialStep = Number(sessionStorage.getItem("currentStep")) || 1;
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [isNextEnabled, setIsNextEnabled] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [showError, setShowError] = useState(false);
  const walletId = sessionStorage.getItem("userAccount");
  const isLoggedIn = sessionStorage.getItem("isLoggedIn");
  const [selectedButtons, setSelectedButtons] = useState({
    1: [],
    2: [],
    3: [],
    name: [],
    templateselected: [],
  });
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [projectName, setProjectName] = useState("");

  const logEvent = async (eventType, additionalData = {}) => {
    const eventData = {
      walletId,
      eventType,
      timestamp: new Date().toISOString(),
      step: currentStep,
      ...additionalData,
    };

    ReactGA.event({
      category: 'Template Steps',
      action: eventType,
      label: `Step ${currentStep}`,
      ...additionalData,
    });

    if (walletId) {
      const eventRef = doc(db, 'events', `${walletId}-${eventType}-${Date.now()}`);
      await setDoc(eventRef, eventData);
    }
  };

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    logEvent('Enter Template Steps');

    return () => {
      window.removeEventListener("resize", handleResize);
      logEvent('Quit Template Steps');
    };
  }, []);

  useEffect(() => {
    const userData = sessionStorage.getItem("userData");
    sessionStorage.setItem("currentStep", currentStep.toString());

    if (walletId) {
      sessionStorage.setItem("userAccount", walletId);
    }
    if (userData === "true") {
      navigate('../dashboard');
    }
  }, [currentStep, walletId, navigate]);

  const createProjectAndRedirect = () => {
    const selectedTemplateId = sessionStorage.getItem("selectedTemplateId");
    const selectedTemplateName = sessionStorage.getItem("selectedTemplateName");
    const projectName = sessionStorage.getItem("projectName");

    const newProject = {
      id: projects.length + 1,
      name: projectName,
      logiciel: selectedTemplateId,
      image: `./images/${selectedTemplateId}screenshot.png`,
      createdAt: new Date().toISOString().slice(0, 10),
      description: "",
      favicon: "",
    };

    setProjects([...projects, newProject]);
    sessionStorage.setItem(
      "projects",
      JSON.stringify([...projects, newProject])
    );

    logEvent('Complete Template Steps');
    navigate("/dashboard");
  };

  const handleNext = () => {
    if (!isNextEnabled) {
      return; // Prevent navigation if the next button is not enabled
    }
    const sessionData = sessionStorage.getItem("stepData")
      ? JSON.parse(sessionStorage.getItem("stepData"))
      : {};
    if (inputValue.trim()) {
      if (!sessionData[currentStep]) sessionData[currentStep] = {};
      sessionData[currentStep].inputValue = inputValue.trim();
      sessionStorage.setItem("stepData", JSON.stringify(sessionData));
    }
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
      createProjectAndRedirect();
    }

    if (walletId) {
      sessionStorage.setItem("userAccount", walletId);
    }
  };

  const handleIgnore = () => {
    if (currentStep <= 6) {
      setCurrentStep(currentStep + 1);
    }
  };

  const updateNextButtonState = (isEnabled) => {
    setIsNextEnabled(isEnabled);
  };

  const handleFinalInputSave = (inputValue) => {
    if (inputValue.trim()) {
      setSelectedButtons((prev) => ({
        ...prev,
        1: [...(prev[1] || []), inputValue.trim()],
      }));
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  useEffect(() => {
    sessionStorage.setItem("selectedButtons", JSON.stringify(selectedButtons));
  }, [selectedButtons]);

  return (
    <>
      {windowWidth < 768 ? (
        <TemplateStepsMobile />
      ) : (
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
              isLoggedIn={isLoggedIn}
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
              selectedButtons={selectedButtons}
              currentStep={currentStep}
              setProjectName={setProjectName}
              projectName={projectName}
              setCurrentStep={setCurrentStep}
            />
          )}

          {currentStep === 5 && (
            <TemplateStep5
              updateNextButtonState={updateNextButtonState}
              selectedButtons={selectedButtons}
              setSelectedButtons={setSelectedButtons}
              currentStep={currentStep}
              projects={projects}
              setProjects={setProjects}
              showError={showError}
            />
          )}

          {currentStep <= 5 && currentStep !== 4 && (
            <TemplateStepsBTN
              onNext={handleNext}
              onIgnore={handleIgnore}
              onBack={handleBack}
              isNextEnabled={isNextEnabled}
              selectedButtons={selectedButtons}
              walletId={walletId}
              currentStep={currentStep}
              inputValue={inputValue}
              projects={projects}
              setProjects={setProjects}
              setProjectName={setProjectName}
              setShowError={setShowError}
            />
          )}
        </>
      )}
      <ReportBugBTN />
      {currentStep !== 4 && <TemplateProgressBar currentStep={currentStep} setCurrentStep={setCurrentStep} />}
    </>
  );
}
