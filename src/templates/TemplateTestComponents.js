import React from 'react';
import './TemplateTestComponents.css';

export default function TemplateTestComponents({ settings }) {
  const backgroundStyle = settings.background || {};
  const typographyStyle = settings.typography || {};
  const borderStyle = settings.border || {};

  const containerStyle = {
    ...backgroundStyle,
    border: `${borderStyle.borderWidth}px solid ${borderStyle.borderColor}`,
  };

  const textStyle = {
    ...typographyStyle,
    fontFamily: typographyStyle.fontFamily || 'Arial',
    fontSize: typographyStyle.fontSize || '16px',
    color: typographyStyle.color || '#000000',
    textAlign: typographyStyle.textAlign || 'left',
    textDecoration: typographyStyle.textDecoration || 'none',
  };

  return (
    <>
      <div className='template-wrapper' style={containerStyle}>
        <div className='template-wrapper-column' >
          <h1 className='title' style={textStyle}>Template de Test #1</h1>
          <p className='paragraph' style={textStyle}>Si tu barre ce texte j'te paie le café</p>
          <button className='button' style={borderStyle}>Clique</button>
        </div>
        <img src='/images/template-test.png' />
      </div>
    </>
  );
}
