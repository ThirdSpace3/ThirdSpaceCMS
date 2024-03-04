import React, { useState, useEffect  } from 'react';
import TemplateStep1 from "../components/website/TemplateSteps/TemplateStep1";
import TemplateStep2 from "../components/website/TemplateSteps/TemplateStep2";
import TemplateStep3 from "../components/website/TemplateSteps/TemplateStep3";
import TemplateStep4 from "../components/website/TemplateSteps/TemplateStep4";
import TemplateStepsMobile from "../components/website/TemplateSteps/TemplateStepsMobile";
import TemplateStepsBTN from "../components/website/TemplateSteps/TemplateStepsBTN";
import ReportBugBTN from "../components/website/ReportBugBTN";

export default function TemplateStep() {
    const [currentStep, setCurrentStep] = useState(1);
    const [isNextEnabled, setIsNextEnabled] = useState(false);
    const handleNext = () => {
        if (currentStep < 5) { // Ensure we don't go beyond the number of steps
            setCurrentStep(currentStep + 1);
        }
    };

    const handleIgnore = () => {
        if (currentStep < 5) {
            setCurrentStep(currentStep + 1);
        }
    };

    // This function could be passed to steps that need to enable/disable the "Next" button
    const updateNextButtonState = (isEnabled) => {
        setIsNextEnabled(isEnabled);
    };

    return (
        <>
            {currentStep === 1 && <TemplateStep1 updateNextButtonState={updateNextButtonState} />}
            {currentStep === 2 && <TemplateStep2 />}
            {currentStep === 3 && <TemplateStep3 />}
            {currentStep === 4 && <TemplateStep4 />}
            {currentStep === 5 && <TemplateStepsMobile />}
            
            {/* Adjust this to control the "Next" button's state based on the current step */}
            {currentStep < 5 && (
                <TemplateStepsBTN onNext={handleNext} onIgnore={handleIgnore} isNextEnabled={isNextEnabled} />
            )}
            <ReportBugBTN />

            <img src="./images/template-deco-1.png" alt="" className="template-deco-bot"/>
            <img src="./images/template-deco-2.png" alt="" className="template-deco-top"/>
        </>
    );
}