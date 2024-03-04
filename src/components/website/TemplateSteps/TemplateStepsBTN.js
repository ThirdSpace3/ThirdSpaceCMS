import './TemplateSteps.css';
import '../../Root.css';
import React from 'react';

const TemplateStepsBTN = ({ onNext, onIgnore, isNextEnabled }) => {
    return (
        <div className="btn-box">
            <button className="ignore-btn" onClick={onIgnore}>Skip</button>
            <button className="purple-light-btn" onClick={onNext} disabled={!isNextEnabled}>Next</button>
        </div>
    );
};


export default TemplateStepsBTN;
