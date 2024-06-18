import './TemplateSteps.css';
import '../../Root.css';

export default function TemplateProgressBar({ currentStep, setCurrentStep }) {
    // Function to check if the step should be marked as active
    const isActiveStep = (stepNumber) => {
        return currentStep === stepNumber;
    };

    const handleStepClick = (stepNumber) => {
        setCurrentStep(stepNumber);
    };

    return (
        <>
            <div className='progressbar-section'>
                <div className="progressbar-container">
                    {/* Repeat this structure for each step, adjust the `isActiveStep` check as needed */}
                    <div className={`progressbar ${isActiveStep(1) ? 'actual-step' : ''}`} onClick={() => handleStepClick(1)}>
                        <div className='progressbar-number' >
                        <p className={`progressbar-text ${isActiveStep(1) ? 'actual-step' : ''}`}>1</p>
                        </div>
                        <p className={`progressbar-text ${isActiveStep(1) ? 'actual-step' : ''}`}>Topic</p>
                        <div className='progressbar-dot-box'>
                            {/* Adjust the isActiveStep check for each dot if needed */}
                            <div className={`progressbar-dot ${isActiveStep(1) ? 'actual-step' : ''}`}></div>
                            <div className={`progressbar-dot ${isActiveStep(1) ? 'actual-step' : ''}`}></div>
                            <div className={`progressbar-dot ${isActiveStep(1) ? 'actual-step' : ''}`}></div>
                        </div>
                    </div>
                    <div className={`progressbar ${isActiveStep(2) ? 'actual-step' : ''}`} onClick={() => handleStepClick(2)}>
                        <div className='progressbar-dot-box'>
                            <div className={`progressbar-dot ${isActiveStep(2) ? 'actual-step' : ''}`}></div>
                            <div className={`progressbar-dot ${isActiveStep(2) ? 'actual-step' : ''}`}></div>
                            <div className={`progressbar-dot ${isActiveStep(2) ? 'actual-step' : ''}`}></div>
                        </div>
                        <div className='progressbar-number'>
                        <p className={`progressbar-text ${isActiveStep(2) ? 'actual-step' : ''}`}>2</p>
                        </div>
                        <p className={`progressbar-text ${isActiveStep(2) ? 'actual-step' : ''}`}>Features</p>
                        <div className='progressbar-dot-box'>
                            <div className={`progressbar-dot ${isActiveStep(2) ? 'actual-step' : ''}`}></div>
                            <div className={`progressbar-dot ${isActiveStep(2) ? 'actual-step' : ''}`}></div>
                            <div className={`progressbar-dot ${isActiveStep(2) ? 'actual-step' : ''}`}></div>
                        </div>
                    </div>
                    <div className={`progressbar ${isActiveStep(3) ? 'actual-step' : ''}`} onClick={() => handleStepClick(3)}>
                        <div className='progressbar-dot-box'>
                            <div className={`progressbar-dot ${isActiveStep(3) ? 'actual-step' : ''}`}></div>
                            <div className={`progressbar-dot ${isActiveStep(3) ? 'actual-step' : ''}`}></div>
                            <div className={`progressbar-dot ${isActiveStep(3) ? 'actual-step' : ''}`}></div>
                        </div>
                        <div className='progressbar-number' >
                            <p className={`progressbar-text ${isActiveStep(3) ? 'actual-step' : ''}`}>3</p>
                        </div>
                        <p className={`progressbar-text ${isActiveStep(3) ? 'actual-step' : ''}`}>Product</p>
                        <div className='progressbar-dot-box'>
                            <div className={`progressbar-dot ${isActiveStep(3) ? 'actual-step' : ''}`}></div>
                            <div className={`progressbar-dot ${isActiveStep(3) ? 'actual-step' : ''}`}></div>
                            <div className={`progressbar-dot ${isActiveStep(3) ? 'actual-step' : ''}`}></div>
                        </div>
                    </div>
                    <div className='progressbar' onClick={() => handleStepClick(4)}>
                        <div className='progressbar-dot-box'>
                        <div className={`progressbar-dot ${isActiveStep(5) ? 'actual-step' : ''}`}></div>
                            <div className={`progressbar-dot ${isActiveStep(5) ? 'actual-step' : ''}`}></div>
                            <div className={`progressbar-dot ${isActiveStep(5) ? 'actual-step' : ''}`}></div>
                        </div>
                        <div className='progressbar-number' onClick={() => handleStepClick(4)}>
                            <p className={`progressbar-text ${isActiveStep(5) ? 'actual-step' : ''}`}>4</p>
                        </div>
                        <p className={`progressbar-text ${isActiveStep(5) ? 'actual-step' : ''}`} >Name</p>

                    </div>
                </div>
            </div>
        </>
    )
}
