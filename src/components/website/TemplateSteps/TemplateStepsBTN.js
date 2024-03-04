import './TemplateSteps.css';
import '../../Root.css';
import React from 'react';

const TemplateStepsBTN = ({ onNext, isNextEnabled, currentStep }) => {
    return (
        <div className="btn-box">
            {currentStep !== 3 && currentStep !== 4 && (
                <button className="ignore-btn" onClick={() => onNext(true)}>Skip</button>
            )}
            {/* Use 'purple-light-btn' class and apply 'disabled' class conditionally based on 'isNextEnabled' */}
            <button
                className={`purple-light-btn ${!isNextEnabled ? 'disabled' : ''}`}
                onClick={() => onNext(false)}
                disabled={!isNextEnabled}
            >
                Next
            </button>
        </div>
    );
};


export default TemplateStepsBTN;