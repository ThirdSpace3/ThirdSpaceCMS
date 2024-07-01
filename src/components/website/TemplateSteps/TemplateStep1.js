import React, { useState, useEffect } from 'react';
import '../../Root.css';
import NavbarSteps from './TemplateNavbar';

const TemplateStep1 = ({ updateNextButtonState, handleFinalInputSave, selectedButtons, setSelectedButtons, currentStep,  isLoggedIn }) => {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    console.log(isLoggedIn);

    const criticalData = sessionStorage.getItem('stepData');
    sessionStorage.clear();
    if (criticalData) {
      sessionStorage.setItem('stepData', criticalData);
    }
  }, []);

  useEffect(() => {
    const savedInput = sessionStorage.getItem(`inputValue-${currentStep}`);
    if (savedInput) setInputValue(savedInput);
  }, [currentStep]);

  useEffect(() => {
    return () => {
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
    console.log('Session Data Updated:', sessionStorage.getItem('stepData'));
  };

  const handleInputBlur = () => {
    if (inputValue.trim()) {
      setSelectedButtons(prev => {
        const updated = {
          ...prev,
          [currentStep]: [...(prev[currentStep] || []), inputValue.trim()].filter((value, index, self) => self.indexOf(value) === index) // Ensure uniqueness
        };
        saveDataToSession(updated[currentStep]);
        console.log('Selected Buttons Updated:', updated); // Log selected buttons
        return updated;
      });
    }
  };

  const handleButtonClick = (button) => {
    setSelectedButtons(prevSelections => {
      const updatedSelections = {
        ...prevSelections,
        [currentStep]: prevSelections[currentStep]?.includes(button)
          ? prevSelections[currentStep].filter(id => id !== button)
          : [...(prevSelections[currentStep] || []), button]
      };
      sessionStorage.setItem('selectedButtons', JSON.stringify(updatedSelections));
      console.log('Selected Buttons Updated:', updatedSelections); // Log selected buttons
      return updatedSelections;
    });
  };

  useEffect(() => {
    const isNextEnabled = selectedButtons[currentStep]?.length > 0 || inputValue.trim() !== '';
    updateNextButtonState(isNextEnabled);
  }, [selectedButtons, inputValue, updateNextButtonState, currentStep]);

  useEffect(() => {
    const storedButtons = JSON.parse(sessionStorage.getItem('selectedButtons'));
    if (storedButtons) {
      setSelectedButtons(storedButtons);
    }
  }, [setSelectedButtons]);

  useEffect(() => {
    sessionStorage.setItem('selectedButtons', JSON.stringify(selectedButtons));
  }, [selectedButtons]);

  return (
    <div id="etape1">
      <NavbarSteps />
      <div className="step-box">
        <h2 className="template-title">What is your site about?</h2>
        <p className="template-subtitle">This will enable us to give you some initial ideas and examples.</p>
        <div className="template-label-box">
          {['Design', 'Crypto', 'NFT', 'Portfolio', 'Collections', '3D Models', 'Games', 'Blogs', 'Marketing', 'Mode', 'Marketplace', 'DApps', 'DeFi', 'DEX', 'DAO', 'Education', 'Security', 'Storage', 'Library', 'Social Medias', 'Crowd Raising'].map((button) => (
            <button
              key={button}
              className={`selectable-button ${selectedButtons[currentStep]?.includes(button) ? 'template-selected' : ''}`}
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
            onBlur={handleInputBlur}
          />
        </div>
      </div>
    </div>
  );
};

export default TemplateStep1;
