import React, { useState, useEffect } from 'react';

const TemplateStep1 = ({ updateNextButtonState }) => {
    const [selectedButtons, setSelectedButtons] = useState([]);
    const [inputValue, setInputValue] = useState('');

    // Event handler for button selection
    const handleButtonClick = (value) => {
        setSelectedButtons(prev => 
            prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
        );
    };

    // Event handler for input change
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    // Effect to update the enabled state of the "Next" button
    useEffect(() => {
        const isNextEnabled = selectedButtons.length > 0 || inputValue.trim() !== '';
        updateNextButtonState(isNextEnabled);
    }, [selectedButtons, inputValue, updateNextButtonState]);

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
