import React, { useState, useEffect } from 'react';
import '../../templates-po/header.css';
import EditableText from '../../../components/logiciel/TemplateComponent/EditableText';

const HeaderSection = ({ onClick, style, settings }) => {
  const [heroTitleText, setHeroTitleText] = useState('The first user-friendly website builder');
  const [heroDescriptionText, setHeroDescriptionText] = useState('Rorem ipsum dolor sit amet consectetur. Gravida convallis orci ultrices non. Ultricies tempor at ut cursus mi. Aliquam sed amet vitae orci ac penatibus consectetur.');
  const [joinUsText, setJoinUsText] = useState('Join Us');
  const [heroTitleStyle, setHeroTitleStyle] = useState({ fontFamily: 'Outfit', fontSize: '45px', fontWeight: '700', color: '#f6f6f7', textAlign: 'center' });
  const [heroDescriptionStyle, setHeroDescriptionStyle] = useState({ fontFamily: 'Inter', fontSize: '18px', fontWeight: '400', color: 'var(--navbar-link-color)', textAlign: 'center', maxWidth: '800px' });

  const updateCSSVariables = (settings) => {
    const root = document.documentElement;
    root.style.setProperty('--background-color', settings?.backgroundColor || '#200627');
    root.style.setProperty('--hero-title-color', settings?.heroTitleColor || '#ffffff');
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

  const handleStyleChange = (newStyle, textType) => {
    switch (textType) {
      case 'title':
        setHeroTitleStyle(newStyle);
        break;
      case 'description':
        setHeroDescriptionStyle(newStyle);
        break;
      default:
        break;
    }
  };

  return (
    <div className="sss-product-hero" onClick={onClick} style={style}>
      <h1 className="sss-product-hero-title">
        <EditableText
          text={heroTitleText}
          style={heroTitleStyle}
          onChange={(newText) => handleTextChange(newText, 'title')}
          onStyleChange={(newStyle) => handleStyleChange(newStyle, 'title')}
        />
      </h1>
      <p className="sss-product-hero-text">
        <EditableText
          text={heroDescriptionText}
          style={heroDescriptionStyle}
          onChange={(newText) => handleTextChange(newText, 'description')}
          onStyleChange={(newStyle) => handleStyleChange(newStyle, 'description')}
        />
      </p>
      <a href="/join-us" className="sss-product-hero-cta">
        <EditableText
          text={joinUsText}
          onChange={(newText) => handleTextChange(newText, 'joinUs')}
          style={{ fontFamily: 'Outfit', fontSize: '16px', fontWeight: '400', color: '#fff', textAlign: 'center' }}
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
