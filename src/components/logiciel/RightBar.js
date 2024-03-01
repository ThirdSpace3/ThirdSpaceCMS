import React, { useState } from 'react';
import './RightBar.css';
import './Root.css';

export default function RightBar() {
    // Ajout d'une clé pour 'border' dans l'objet d'état
    const [isOpen, setIsOpen] = useState({ background: false, typographie: false, border: false });

    const toggleSection = (section) => {
        setIsOpen(prevState => ({ ...prevState, [section]: !prevState[section] }));
    };

    return (
        <>
            <div className='rightbar-wrapper'>
                <div className='style-wrapper'>
                    {/* Section Background */}
                    <div className='parameters-wrapper'>
                        <div className='parameters-wrapper-title-box' onClick={() => toggleSection('background')}>
                            <p className='parameters-wrapper-title'>Background</p>
                            <i className={`bi bi-caret-down-fill ${isOpen.background ? 'rotate' : ''}`}></i>
                        </div>
                        
                        <div className={`parameters-wrapper-content ${isOpen.background ? 'open' : ''}`}>
                        <div className='parameters-content-line'>
                                <p className='parameters-content-line-title'>Color</p>
                                <div className='parameters-content-line-container'>
                                <input type="color" />                             
                                </div>
                            </div>
                            <div className='parameters-content-line'>
                                <p className='parameters-content-line-title'>Image</p>
                                <div className='parameters-content-line-container'>
                                <input type="file" accept="image/*" />                            
                                </div>
                            </div>

                            
                        </div>
                        <hr className='parameters-wrapper-separation' />
                    </div>

                    {/* Section Typographie */}
                    <div className='parameters-wrapper'>
                        <div className='parameters-wrapper-title-box' onClick={() => toggleSection('typographie')}>
                            <p className='parameters-wrapper-title'>Typographie</p>
                            <i className={`bi bi-caret-down-fill ${isOpen.typographie ? 'rotate' : ''}`}></i>
                        </div>
                        <div className={`parameters-wrapper-content ${isOpen.typographie ? 'open' : ''}`}>
                            
                            <div className='parameters-content-line'>
                                <p className='parameters-content-line-title'>Font Family</p>
                                <div className='parameters-content-line-container'>
                                    <select>
                                        <option>Arial</option>
                                        <option>Verdana</option>
                                        <option>Helvetica</option>
                                    </select>                                
                                </div>
                            </div>
                            <div className='parameters-content-line'>
                                <p className='parameters-content-line-title'>Font Family</p>
                                <div className='parameters-content-line-container'>
                                    <input type="number" min="8" max="72" step="1" defaultValue="14" /> px
                                </div>
                            </div>
                            <div className='parameters-content-line'>
                                <p className='parameters-content-line-title'>Color</p>
                                <div className='parameters-content-line-container'>
                                <input type="color" />                             
                                </div>
                            </div>
                            <div className='parameters-content-line'>
                                <p className='parameters-content-line-title'>Text Decoration</p>
                                <div className='parameters-content-line-container'>
                                    <a href='#' className='parameters-content-line-item'><i className="bi bi-type-italic"></i></a>
                                    <hr className='parameters-content-line-separation' />
                                    <a href='#' className='parameters-content-line-item'><i className="bi bi-type-underline"></i></a>
                                    <hr className='parameters-content-line-separation' />
                                    <a href='#' className='parameters-content-line-item'><i className="bi bi-type-strikethrough"></i></a>
                                </div>
                            </div>
                            <div className='parameters-content-line'>
                                <p className='parameters-content-line-title'>Text Align</p>
                                <div className='parameters-content-line-container'>
                                    <a href='#' className='parameters-content-line-item'><i className="bi bi-text-left"></i></a>
                                    <hr className='parameters-content-line-separation' />
                                    <a href='#' className='parameters-content-line-item'><i className="bi bi-text-center"></i></a>
                                    <hr className='parameters-content-line-separation' />
                                    <a href='#' className='parameters-content-line-item'><i className="bi bi-text-right"></i></a>
                                    <hr className='parameters-content-line-separation' />
                                    <a href='#' className='parameters-content-line-item'><i className="bi bi-justify"></i></a>
                                </div>
                            </div>
                        </div>
                        <hr className='parameters-wrapper-separation' />
                    </div>

                    {/* Section Borer */}
                    <div className='parameters-wrapper'>
                        <div className='parameters-wrapper-title-box' onClick={() => toggleSection('border')}>
                            <p className='parameters-wrapper-title'>Border</p>
                            <i className={`bi bi-caret-down-fill ${isOpen.border ? 'rotate' : ''}`}></i>
                        </div>
                        <div className={`parameters-wrapper-content ${isOpen.border ? 'open' : ''}`}>
                            {/* Contenu de la section Border */}
                            <div className='parameters-content-line'>
                                <p className='parameters-content-line-title'>Border Color</p>
                                <div className='parameters-content-line-container'>
                                    <input type="color" />
                                </div>
                            </div>
                            <div className='parameters-content-line'>
                                <p className='parameters-content-line-title'>Border Width</p>
                                <div className='parameters-content-line-container'>
                                    <input type="number" min="0" max="20" step="1" defaultValue="1" /> px
                                </div>
                            </div>
                            {/* Ajoutez plus de paramètres de bordure ici si nécessaire */}
                        </div>
                        <hr className='parameters-wrapper-separation' />
                    </div>


                </div>
            </div>
        </>
    );
}
