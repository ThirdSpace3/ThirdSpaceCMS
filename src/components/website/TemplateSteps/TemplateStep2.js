import React, { useState, useEffect } from 'react';
import './TemplateSteps.css';
import '../../Root.css';

const TemplateStep2 = ({ updateNextButtonState }) => {
    const [selectedButtons, setSelectedButtons] = useState([]);
    const [inputValue, setInputValue] = useState('');

    // Toggle selection for a button
    const handleButtonClick = (buttonId) => {
        setSelectedButtons(prevSelections => 
            prevSelections.includes(buttonId) ? prevSelections.filter(id => id !== buttonId) : [...prevSelections, buttonId]
        );
    };

    // Handle input change
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    // Define buttons in pairs for each row
    const buttonPairs = [
        ["Upsells my collections", "Boost my visibility"],
        ["Deploy my market", "Organize my work"],
        ["Share a subject", "Communication"],
        ["Contact form", "Communautary fidelisation"],
        ["Marketplace", "Learning platform"]
    ];

    // Update the Next button enabled state based on selections or input
    useEffect(() => {
        const isNextEnabled = selectedButtons.length > 0 || inputValue.trim() !== '';
        updateNextButtonState(isNextEnabled);
    }, [selectedButtons, inputValue, updateNextButtonState]);

    return (
        <div id="etape2">
            <div className="step-box">
                <h2 className="template-title">What are your main objectives?</h2>
                <p className="template-subtitle">Select all the items that apply...</p>
                <div className="template-label-box-2">
                    {buttonPairs.map((pair, rowIndex) => (
                        <div key={rowIndex} className="template-label-row">
                            {pair.map((buttonLabel, buttonIndex) => {
                                const buttonId = buttonLabel.replace(/\s+/g, '').toLowerCase();
                                return (
                                    <button
                                        key={buttonId}
                                        className={`selectable-button-2 ${selectedButtons.includes(buttonId) ? 'selected' : ''}`}
                                        id={buttonId}
                                        onClick={() => handleButtonClick(buttonId)}
                                    >
                                        {buttonLabel}
                                    </button>
                                );
                            })}
                        </div>
                    ))}
                </div>
                <div className="template-input-box">
                    <p className="template-subtitle">Looking for a feature we don't provide yet?</p>
                    <input
                        type="text"
                        placeholder="Describe your feature..."
                        value={inputValue}
                        onChange={handleInputChange}
                    />
                </div>
            </div>
        </div>
    );
}

export default TemplateStep2;
