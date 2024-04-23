import React, { useState, useEffect, useRef } from 'react';
import '../../templates-po/header.css';
import EditableText from '../../../components/logiciel/TemplateComponent/EditableText';
import { useStyle } from '../../../hooks/StyleContext';
const HeaderSection = ({ onClick, style, settings, handleSettingsChange, selectedElement, setSelectedElement, selectElement }) => {
  const headerRef = useRef("header");
  const { getComponentStyle } = useStyle();

  const [heroTitleText, setHeroTitleText] = useState('The first user-friendly website builder');
  const [heroDescriptionText, setHeroDescriptionText] = useState('Rorem ipsum dolor sit amet consectetur. Gravida convallis orci ultrices non. Ultricies tempor at ut cursus mi. Aliquam sed amet vitae orci ac penatibus consectetur.');
  const [joinUsText, setJoinUsText] = useState('Join Us');
  const [heroTitleStyle, setHeroTitleStyle] = useState({ fontFamily: 'Outfit', fontSize: '45px', fontWeight: '700', color: '#f6f6f7', textAlign: 'center' });
  const [heroDescriptionStyle, setHeroDescriptionStyle] = useState({ fontFamily: 'Inter', fontSize: '18px', fontWeight: '400', color: 'var(--navbar-link-color)', textAlign: 'center', maxWidth: '800px' });
  const navbarStyle = getComponentStyle('header');

  const updateCSSVariables = (settings) => {
    const root = document.documentElement;
    root.style.setProperty('--background-color', settings.backgroundColor || '#200627');
    root.style.setProperty('--background-image', `url(${settings.backgroundImage})` || 'none');
  };

  useEffect(() => {
    updateCSSVariables(settings);
  }, [settings]);

  const handleTextChange = (newText, textType) => {
    switch (textType) {
      case 'title':
        setHeroTitleText(newText);
        break;
      case 'description':
        setHeroDescriptionText(newText);
        break;
      case 'joinUs':
        setJoinUsText(newText);
        break;
      default:
        break;
    }
  };

  const handleTextStyleChange = (textType, newStyle) => {
    const updatedSettings = {
      ...settings,
      textStyles: {
        ...settings.textStyles,
        [textType]: newStyle,
      },
    };
    handleSettingsChange('header', updatedSettings);
  };
  

  const handleBackgroundColorChange = (color) => {
    handleSettingsChange({ backgroundColor: color });
  };

  return (
    <div className="sss-product-hero" ref={headerRef} onClick={onClick} style={{ ...style, backgroundColor: settings.backgroundColor }}>
      <h1 className="sss-product-hero-title">
        <EditableText
          text={heroTitleText}
          style={heroTitleStyle}
          onChange={(newText) => handleTextChange(newText, 'title')}
          onStyleChange={(newStyle) => handleTextStyleChange('title', newStyle)}
          selectElement={selectElement} // Ensuring prop is passed

        />
      </h1>
      <p className="sss-product-hero-text">
        <EditableText
          text={heroDescriptionText}
          style={heroDescriptionStyle}
          onChange={(newText) => handleTextChange(newText, 'description')}
          onStyleChange={(newStyle) => handleTextStyleChange( 'description',newStyle)}
          selectElement={selectElement} // Ensuring prop is passed

        />
      </p>
      <a href="/join-us" className="sss-product-hero-cta">
        <EditableText
          text={joinUsText}
          onChange={(newText) => handleTextChange(newText, 'joinUs')}
          style={{ fontFamily: 'Outfit', fontSize: '16px', fontWeight: '400', color: '#fff', textAlign: 'center' }}
          selectElement={selectElement} // Ensuring prop is passed
          onStyleChange={(newStyle) => handleTextStyleChange( 'joinUs',newStyle)}

        />
      </a>
      <img
        src="./images/templates-img/3sproduct/3sproduct-hero.png"
        className="sss-product-hero-img"
        alt="Hero"
      />
    </div>
  );
};

export default HeaderSection;
