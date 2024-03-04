import React, { useState, useEffect } from 'react';

const TemplateStep1 = ({ onNext, onIgnore }) => {
    const [selectedButton, setSelectedButton] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [isNextEnabled, setIsNextEnabled] = useState(false);

    // Event handler for button selection
    const handleButtonClick = (value) => {
        setSelectedButton(value);
    };

    // Event handler for input change
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    // Effect to update the enabled state of the "Next" button
    useEffect(() => {
        setIsNextEnabled(selectedButton !== '' || inputValue.trim() !== '');
    }, [selectedButton, inputValue]);

    return (
        <div id="etape1">
            <div className="step-box">
                <h2 className="template-title">What is your site about?</h2>
                <p className="template-subtitle">This will enable us to give you some initial ideas and examples.</p>
                <div className="template-label-box">
                    {['Design', 'Crypto', 'NFT', 'Portfolio', 'Collections', '3D Models', 'Games', 'Blogs', 'Marketing', 'Mode', 'Marketplace', 'DApps', 'DeFi', 'DEX', 'DAO', 'Education', 'Security', 'Storage', 'Library', 'Social Medias', 'Crowd Raising'].map((button) => (
                        <button
                            key={button}
                            className={`selectable-button ${selectedButton === button ? 'selected' : ''}`}
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
