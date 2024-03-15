import React from 'react';

const BackgroundSettings = ({ isOpen, toggleSection, handleBackgroundChange, backgroundStyle }) => {
    return (
        <div className='parameters-wrapper'>
            <div className='parameters-wrapper-title-box' onClick={() => toggleSection('background')}>
                <p className='parameters-wrapper-title'>Background</p>
                <i className={`bi bi-caret-down-fill ${isOpen.background ? 'rotate' : ''}`}></i>
            </div>

            <div className={`parameters-wrapper-content ${isOpen.background ? 'open' : ''}`}>
                <div className='parameters-content-line'>
                    <p className='parameters-content-line-title'>Color</p>
                    <div className='parameters-content-line-container'>
                        <input type="color" onChange={(e) => handleBackgroundChange(e, 'backgroundColor')} value={backgroundStyle.backgroundColor} />
                    </div>
                </div>
                <div className='parameters-content-line'>
                    <p className='parameters-content-line-title'>Image</p>
                    <div className='parameters-content-line-container'>
                        <input type="file" accept="image/*" onChange={(e) => handleBackgroundChange(e, 'backgroundImage')} />
                    </div>
                </div>
                <div className='parameters-content-line'>
                    <p className='parameters-content-line-title'>Background Position</p>
                    <div className='parameters-content-line-container'>
                        <select onChange={(e) => handleBackgroundChange(e, 'backgroundPosition', 'select')}>
                            <option value="center">Center</option>
                            <option value="top">Top</option>
                            <option value="bottom">Bottom</option>
                            <option value="left">Left</option>
                            <option value="right">Right</option>
                        </select>
                    </div>
                </div>

                <div className='parameters-content-line'>
                    <p className='parameters-content-line-title'>Background Size</p>
                    <div className='parameters-content-line-container'>
                        <select onChange={(e) => handleBackgroundChange(e, 'backgroundSize', 'select')}>
                            <option value="auto">Auto</option>
                            <option value="cover">Cover</option>
                            <option value="contain">Contain</option>
                        </select>
                    </div>
                </div>      </div>
            <hr className='parameters-wrapper-separation' />
        </div>
    );
};

export default BackgroundSettings;
