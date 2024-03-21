import React, { useState, useEffect } from 'react';
import './TemplateSteps.css';
import '../../Root.css';

const TemplateStep3 = ({ updateNextButtonState, currentStep, setSelectedButtons }) => {
    const [selectedItem, setSelectedItem] = useState('');

    // Handle card click
    const handleCardClick = (itemId) => {
        setSelectedItem(itemId);
        setSelectedButtons(prevSelectedButtons => ({
          ...prevSelectedButtons,
          [currentStep]: [itemId]
        }));
      };

    // Communicate selection status to parent component
    useEffect(() => {
        updateNextButtonState(selectedItem !== '');
    }, [selectedItem, updateNextButtonState]);

    return (
        <div id="etape3">
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
                                <img src={`./images/solutions-${index + 1}.png`} alt="" className="solutions-img"/>
                            </div>
                            <h3 className="solutions-card-title">{item === 'Templates' ? 'Intuitive Templates' : item === 'Sections' ? 'Sections and Blocks' : 'Starts from Scratch'}</h3>
                            <p className="solutions-card-text">
                                {item === 'Templates' ? 'Templates made by professionals, use it as you want, All is prepared for you to input your infos.' : 
                                 item === 'Sections' ? 'Use a large amount of sections and blocks, already set up for you to use.' : 
                                 'Create your entire site from nothing and be free from template constraints.'}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default TemplateStep3;
