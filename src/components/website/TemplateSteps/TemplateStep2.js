import React, { useState, useEffect } from 'react';
import './TemplateSteps.css';
import '../../Root.css';

const TemplateStep2 = ({ updateNextButtonState, selectedButtons, setSelectedButtons, currentStep }) => {
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        // Load the initial value of the input from sessionStorage
        const savedInput = sessionStorage.getItem(`inputValue-${currentStep}`);
        if (savedInput) setInputValue(savedInput);
    }, [currentStep]);

    useEffect(() => {
        return () => {
            // Save the inputValue to sessionStorage when the component unmounts
            sessionStorage.setItem(`inputValue-${currentStep}`, inputValue);
            console.log('Session Data Updated:', sessionStorage.getItem('stepData'));

        };
    }, [inputValue, currentStep]);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };
    const saveDataToSession = (newData) => {
        const sessionData = sessionStorage.getItem('stepData') ? JSON.parse(sessionStorage.getItem('stepData')) : {};
        sessionData[currentStep] = newData;
        sessionStorage.setItem('stepData', JSON.stringify(sessionData));
    };

    const handleInputBlur = () => {
        if (inputValue.trim()) {
            setSelectedButtons(prev => {
                const updated = {
                    ...prev,
                    [currentStep]: [...(prev[currentStep] || []), inputValue.trim()].filter((value, index, self) => self.indexOf(value) === index) // Ensure uniqueness
                };
                saveDataToSession(updated[currentStep]);
                return updated;
            });
        }
    };

    const handleButtonClick = (buttonId) => {
        setSelectedButtons(prevSelections => ({
            ...prevSelections,
            [currentStep]: (prevSelections[currentStep] || []).includes(buttonId)
                ? prevSelections[currentStep].filter(id => id !== buttonId)
                : [...prevSelections[currentStep] || [], buttonId]
        }));
    };

    useEffect(() => {
        const isNextEnabled = selectedButtons[currentStep]?.length > 0 || inputValue.trim() !== '';
        updateNextButtonState(isNextEnabled);
    }, [selectedButtons, inputValue, updateNextButtonState, currentStep]);

    const buttonPairs = [
        ["Upsells my collections", "Boost my visibility"],
        ["Deploy my market", "Organize my work"],
        ["Share a subject", "Communication"],
        ["Contact form", "Communautary fidelisation"],
        ["Marketplace", "Learning platform"]
    ];

    return (
        <div id="etape2">
            <div className="step-box">
                <h2 className="template-title">What are your main objectives?</h2>
                <p className="template-subtitle">Select all the items that apply...</p>
                <div className="template-label-box-2">
                    {buttonPairs.map((pair, rowIndex) => (
                        <div key={rowIndex} className="template-label-row">
                            {pair.map((buttonLabel) => {
                                const buttonId = buttonLabel.replace(/\s+/g, '').toLowerCase();
                                return (
                                    <button
                                        key={buttonId}
                                        className={`selectable-button-2 ${selectedButtons[currentStep]?.includes(buttonId) ? 'selected' : ''}`}
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
                        onBlur={handleInputBlur} // Save when the input loses focus
                    />
                </div>
            </div>
        </div>
    );
}

export default TemplateStep2;
