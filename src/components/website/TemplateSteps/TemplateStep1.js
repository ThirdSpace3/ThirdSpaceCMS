import React, { useState, useEffect } from 'react';

const TemplateStep1 = ({ updateNextButtonState, handleFinalInputSave, selectedButtons, setSelectedButtons, currentStep }) => {
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        // This effect ensures the "Next" button is correctly enabled based on the input or selections.
        const hasSelectionOrInput = selectedButtons[currentStep] ? selectedButtons[currentStep].length > 0 || inputValue.trim() !== '' : inputValue.trim() !== '';
        updateNextButtonState(hasSelectionOrInput);
    }, [selectedButtons, inputValue, updateNextButtonState, currentStep]);

    useEffect(() => {
        // Assuming you have a way to detect step transition (e.g., via props or context)
        // Save the input value when transitioning away from the current step
        return () => {
            if (inputValue.trim() && currentStep === 1) {
                // This checks if we're still on step 1 and there's an inputValue when unmounting or changing steps
                setSelectedButtons(prev => ({
                    ...prev,
                    1: [...(prev[1] || []), inputValue.trim()].filter((value, index, self) => self.indexOf(value) === index) // Ensure uniqueness
                }));
            }
        };
    }, [currentStep, inputValue]); // Depend on currentStep and inputValue to trigger on changes

    const handleButtonClick = (value) => {
        handleFinalInputSave(inputValue);
        setSelectedButtons(prev => ({
            ...prev,
            [currentStep]: prev[currentStep] ? 
                prev[currentStep].includes(value) 
                    ? prev[currentStep].filter(item => item !== value)
                    : [...prev[currentStep], value]
                : [value]
        }));
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
