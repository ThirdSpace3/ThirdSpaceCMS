import React from 'react';
import './TemplateTestComponents.css'

export default function TemplateTestComponents() {
    return (
        <>
            <div className='template-wrapper'>
                <img src='/images/template-test.png' />
                <div className='template-wrapper-column'>
                    <h1 className='title'>Template de Test #1</h1>
                    <p className='paragraph'>Si tu barre ce texte j'te paie le café</p>
                    <button className='button'>Clique</button>
                </div>
            </div>
        </>
    )
}