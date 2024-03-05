import React, { useState } from 'react';

const TemplateStep4 = ({ updateNextButtonState, setProjectName, currentStep }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    setProjectName(event.target.value); // Use the function passed as prop
    updateNextButtonState(event.target.value.trim() !== '');
  };

  return (
    <div id="etape4">
      <div className="step-box">
        <h2 className="template-title">Choose a name for your project</h2>
        <p className="template-subtitle">You can always change your mind later.</p>
        <div className="template-input-box">
          <input
            type="text"
            placeholder="Choose a name..."
            value={inputValue}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  );
};

export default TemplateStep4;