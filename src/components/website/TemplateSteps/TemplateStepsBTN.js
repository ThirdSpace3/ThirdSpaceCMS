import './TemplateSteps.css'
import '../../Root.css'
import React from 'react';

const TemplateStepsBTN= () => {
    return (
        <div class="btn-box">
            <button id="ignore-button" class="ignore-btn">Skip</button>
            <button id="submit-button" class="purple-light-btn">Next</button>
        </div>

        );
}

export default TemplateStepsBTN;