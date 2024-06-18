import React, { useState, useEffect } from 'react';
import './TemplateSteps.css';
import '../../Root.css';
import NavbarSteps from './TemplateNavbar';

const TemplateStep3 = ({ updateNextButtonState, currentStep, setSelectedButtons }) => {
    const [selectedItem, setSelectedItem] = useState('');

    const handleCardClick = (itemId) => {
        if (showComingSoon(itemId)) {
            // Prevent selection and click actions on "Coming Soon" items
            return;
        }
        setSelectedItem(itemId);
        setSelectedButtons(prevSelectedButtons => ({
            ...prevSelectedButtons,
            [currentStep]: [itemId]
        }));
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

    // Determine whether to show "Coming Soon" based on the item
    const showComingSoon = (item) => {
        // Assuming you want "Sections" and "Scratch" to have the "Coming Soon" overlay
        return ['Sections', 'Scratch'].includes(item);
    };

    return (
        <div id="etape3">
            <NavbarSteps />
            <div className="step-box">
                <h2 className="template-title">How would you like to start?</h2>
                <p className="template-subtitle">You can always explore other products if you change your mind later.</p>
                <div className="solutions-row">
                    {['Templates', 'Sections', 'Scratch'].map((item, index) => (
                        <div 
                            key={index} 
                            className={`solutions-card ${selectedItem === item ? 'selected' : ''}`} 
                            id={item}
                            onClick={() => handleCardClick(item)}
                        >
                            <div className="solutions-img-box">
                                <img 
                                    src={
                                        item === 'Templates' ? 
                                        "https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageWebSite%2Fsolutions-1.png?alt=media&token=f6c5d4f0-90b5-4aa6-9cc0-83d295c11e8e" : 
                                        item === 'Sections' ? 
                                        "https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageWebSite%2Fsolutions-2.png?alt=media&token=bdd13b7f-2e6c-4e01-ada7-fc363c708a32" : 
                                        "https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageWebSite%2Fsolutions-3.png?alt=media&token=7960f71c-cd9b-4e60-b0c6-e16da75dd773"
                                    } 
                                    alt="" 
                                    className="solutions-img"
                                />
                            </div>
                            <h3 className="solutions-card-title">
                                {item === 'Templates' ? 'Intuitive Templates' : item === 'Sections' ? 'Sections and Blocks' : 'Starts from Scratch'}
                            </h3>
                            <p className="solutions-card-text">
                                {item === 'Templates' ? 'Templates made by professionals, use it as you want, All is prepared for you to input your infos.' : 
                                 item === 'Sections' ? 'Use a large amount of sections and blocks, already set up for you to use.' : 
                                 'Create your entire site from nothing and be free from template constraints.'}
                            </p>
                            {showComingSoon(item) && (
                                <div className='solution-comingsoon'>
                                    <p>Coming Soon</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default TemplateStep3;
