import React, { useState, useEffect } from 'react';

const TemplateStep1 = ({ updateNextButtonState, handleFinalInputSave, selectedButtons, setSelectedButtons, currentStep }) => {
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        const hasSelectionOrInput = selectedButtons[currentStep] ? selectedButtons[currentStep].length > 0 || inputValue.trim() !== '' : inputValue.trim() !== '';
        updateNextButtonState(hasSelectionOrInput);
    }, [selectedButtons, inputValue, updateNextButtonState, currentStep]);

    // Load data for the current step from session storage on component mount
    useEffect(() => {
        const sessionData = sessionStorage.getItem('stepData');
        if (sessionData) {
            const parsedData = JSON.parse(sessionData);
            if (parsedData[currentStep]) {
                setSelectedButtons(prev => ({
                    ...prev,
                    [currentStep]: parsedData[currentStep]
                }));
            }
        }
    }, [currentStep, setSelectedButtons]);

    useEffect(() => {
        // Define a function to save data to session storage
        const saveDataToSession = (newData) => {
            const sessionData = sessionStorage.getItem('stepData') ? JSON.parse(sessionStorage.getItem('stepData')) : {};
            sessionData[currentStep] = newData;
            sessionStorage.setItem('stepData', JSON.stringify(sessionData));
        };

        return () => {
            // Only save when there is a non-empty inputValue
            if (inputValue.trim()) {
                setSelectedButtons(prev => {
                    const updated = { 
                        ...prev, 
                        [currentStep]: [...(prev[currentStep] || []), inputValue.trim()].filter((value, index, self) => self.indexOf(value) === index) // Ensure uniqueness
                    };

                    // Update session storage
                    saveDataToSession(updated[currentStep]);

                    return updated;
                });
            }
        };
    }, [currentStep, inputValue, setSelectedButtons]);

    const handleButtonClick = (value) => {
        setSelectedButtons(prev => {
            const updatedSelections = prev[currentStep] ?
                prev[currentStep].includes(value) ?
                    prev[currentStep].filter(item => item !== value) :
                    [...prev[currentStep], value] :
                [value];

            // Update session storage
            const sessionData = sessionStorage.getItem('stepData') ? JSON.parse(sessionStorage.getItem('stepData')) : {};
            sessionData[currentStep] = updatedSelections;
            sessionStorage.setItem('stepData', JSON.stringify(sessionData));

            return {
                ...prev,
                [currentStep]: updatedSelections
            };
        });
    };

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };
    
    
    return (
        <div id="etape1">
            <div className="step-box">
                <h2 className="template-title">What is your site about?</h2>
                <p className="template-subtitle">This will enable us to give you some initial ideas and examples.</p>
                <div className="template-label-box">
                    {['Design', 'Crypto', 'NFT', 'Portfolio', 'Collections', '3D Models', 'Games', 'Blogs', 'Marketing', 'Mode', 'Marketplace', 'DApps', 'DeFi', 'DEX', 'DAO', 'Education', 'Security', 'Storage', 'Library', 'Social Medias', 'Crowd Raising'].map((button) => (
                        <button
                            key={button}
                            className={`selectable-button ${selectedButtons.includes(button) ? 'selected' : ''}`}
                            onClick={() => handleButtonClick(button)}
                        >
                            {button}
                        </button>
                    ))}
                </div>
                <div className="template-input-box">
                    <p className="template-subtitle">Can't find what you're looking for?</p>
                    <input
                        type="text"
                        placeholder="Describe your website..."
                        value={inputValue}
                        onChange={handleInputChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default TemplateStep1;
