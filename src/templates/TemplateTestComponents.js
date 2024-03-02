import React from 'react';
import './TemplateTestComponents.css';

export default function TemplateTestComponents({ settings }) {
  const backgroundStyle = settings.background || {};
  const typographyStyle = settings.typography || {};
  const borderStyle = settings.border || {};

  return (
    <>
      <div className='template-wrapper' style={backgroundStyle}>
        <div className='template-wrapper-column' >
          <h1 className='title' style={typographyStyle}>Template de Test #1</h1>
          <p className='paragraph' style={typographyStyle}>Si tu barre ce texte j'te paie le café</p>
          <button className='button' style={borderStyle}>Clique</button>
        </div>
        <img src='/images/template-test.png' />
      </div>
    </>
  );
}
