import React, { useState, useEffect } from 'react';

const TemplateStep1 = ({ updateNextButtonState, handleFinalInputSave, selectedButtons, setSelectedButtons, currentStep }) => {
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        const hasSelectionOrInput = selectedButtons[currentStep] ? selectedButtons[currentStep].length > 0 || inputValue.trim() !== '' : inputValue.trim() !== '';
        updateNextButtonState(hasSelectionOrInput);
    }, [selectedButtons, inputValue, updateNextButtonState, currentStep]);

    useEffect(() => {
        // Define a function to save data to session storage
        const saveDataToSession = (newData) => {
            const sessionData = sessionStorage.getItem('stepData') ? JSON.parse(sessionStorage.getItem('stepData')) : {};
            sessionData[currentStep] = newData;
            sessionStorage.setItem('stepData', JSON.stringify(sessionData));
        };

        // Update session storage immediately with the latest inputValue
        if (inputValue.trim()) {
            setSelectedButtons(prev => {
                const updated = { 
                    ...prev, 
                    [currentStep]: prev[currentStep] ? prev[currentStep].filter(value => typeof value !== 'string') : [] // Remove any existing string input
                };
                updated[currentStep].push(inputValue.trim()); // Add the latest inputValue

                // Update session storage
                saveDataToSession(updated[currentStep]);

                return updated;
            });
        }
    }, [inputValue, currentStep]); // Only rerun effect if inputValue or currentStep changes

    const handleButtonClick = value => {
        setSelectedButtons(prev => {
            const newValueExists = prev[currentStep] ? prev[currentStep].includes(value) : false;
            const updatedSelections = newValueExists ?
                prev[currentStep].filter(item => item !== value) : 
                [...(prev[currentStep] || []).filter(item => typeof item !== 'string'), value]; // Keep only non-string items and add the new value

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
