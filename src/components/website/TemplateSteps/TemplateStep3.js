import React, { useState, useEffect } from 'react';
import './TemplateSteps.css';
import '../../Root.css';
import NavbarSteps from './TemplateNavbar';

const TemplateStep3 = ({ updateNextButtonState, currentStep, setSelectedButtons }) => {
    const [selectedItem, setSelectedItem] = useState('');

    const handleCardClick = (itemId) => {
        if (itemId !== 'Templates') {
            // Prevent selection and click actions on "Coming Soon" items
            return;
        }
        setSelectedItem(itemId);
        setSelectedButtons(prevSelectedButtons => ({
            ...prevSelectedButtons,
            [currentStep]: [itemId]
        }));
    };

    const handleGetStartedClick = () => {
        if (selectedItem === 'Templates') {
            // Perform actions equivalent to clicking the "Next" button
            const currentStepData = JSON.parse(sessionStorage.getItem('stepData')) || {};
            currentStepData[currentStep] = [selectedItem];
            sessionStorage.setItem('stepData', JSON.stringify(currentStepData));
            updateNextButtonState(true); // Assuming this triggers the next step in your flow
        }
    };

    useEffect(() => {
        updateNextButtonState(selectedItem !== '');
    }, [selectedItem, updateNextButtonState]);

    useEffect(() => {
        if (selectedItem) {
            const currentStepData = JSON.parse(sessionStorage.getItem('stepData')) || {};
            currentStepData[currentStep] = [selectedItem];
            sessionStorage.setItem('stepData', JSON.stringify(currentStepData));
        }
    }, [selectedItem, currentStep]);

    return (
        <div id="etape3">
            <NavbarSteps />
            <div className="step-box">
                <h2 className="template-title">How would you like to start?</h2>
                <p className="template-subtitle">You can always explore other products if you change your mind later.</p>
                <div className="template-solutions-row">
                    {['Templates', 'Sections', 'Scratch'].map((item, index) => (
                        <div 
                            key={index} 
                            className={`template-solutions-card ${selectedItem === item ? 'selected' : ''}`} 
                            id={item}
                            onClick={() => handleCardClick(item)}
                        >
                            <h3 className="template-solutions-card-title">
                                {item === 'Templates' ? 'Intuitive Templates' : item === 'Sections' ? 'Sections & Blocks' : 'Starts from Scratch'}
                            </h3>
                            {item === 'Templates' ? (
                                <button className="template-purple-btn" onClick={handleGetStartedClick}>Get Started</button>
                            ) : (
                                <button className="template-grey-btn">
                                    <i className="bi bi-lock-fill"></i> Coming Soon
                                </button>
                            )}
                            <div className="template-solutions-img-box">
                                <img 
                                    src={
                                        item === 'Templates' ? 
                                        "./images/template-solution-card-img.png" : 
                                        item === 'Sections' ? 
                                      "./images/template-solution-card-img.png" : 
                                       "./images/template-solution-card-img.png"
                                    } 
                                    alt="" 
                                    className="template-solutions-img"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default TemplateStep3;
