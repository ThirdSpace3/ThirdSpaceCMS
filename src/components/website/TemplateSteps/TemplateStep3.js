import React, { useState, useEffect } from 'react';
import './TemplateSteps.css';
import '../../Root.css';
import NavbarSteps from './TemplateNavbar';

const TemplateStep3 = ({ updateNextButtonState, currentStep, setSelectedButtons, onNext }) => {
    const [selectedItem, setSelectedItem] = useState('');

    const handleGetStartedClick = () => {
        const itemId = 'Templates';
        setSelectedItem(itemId);
        setSelectedButtons(prevSelectedButtons => ({
            ...prevSelectedButtons,
            [currentStep]: [itemId]
        }));

        // Perform actions equivalent to clicking the "Next" button
        const currentStepData = JSON.parse(sessionStorage.getItem('stepData')) || {};
        currentStepData[currentStep] = [itemId];
        sessionStorage.setItem('stepData', JSON.stringify(currentStepData));
        updateNextButtonState(true); // Assuming this triggers the next step in your flow

        onNext(); // Move to the next step directly
    };

    useEffect(() => {
        if (selectedItem === 'Templates') {
            onNext();
        }
    }, [selectedItem, onNext]);

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
                            onClick={item === 'Templates' ? handleGetStartedClick : null}
                        >
                            <h3 className="template-solutions-card-title">
                                {item === 'Templates' ? 'Intuitive Templates' : item === 'Sections' ? 'Sections & Blocks' : 'Starts from Scratch'}
                            </h3>
                            {item === 'Templates' ? (
                                <button className="template-purple-btn">Get Started</button>
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
