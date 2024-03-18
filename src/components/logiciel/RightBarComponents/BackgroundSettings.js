import React ,{ useRef } from 'react';
import { useImageHistory } from '../../../hooks/ImageHistoryContext';

const BackgroundSettings = ({ isOpen, toggleSection, handleBackgroundChange, backgroundStyle }) => {
    const fileInputRef = useRef(null);
    const { addImageToHistory, imageHistory, selectImage, selectedImage } = useImageHistory();

    const handleUploadClick = () => {
        fileInputRef.current.click();
    };

    // Modified handleBackgroundChange to use addImageToHistory
    const modifiedHandleBackgroundChange = (e, property, type = 'input') => {
        if (property === 'backgroundImage' && e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const newImageUrl = URL.createObjectURL(file);
            addImageToHistory({ url: newImageUrl, category: 'Photo' }); // Assuming all uploads are photos
        }
        handleBackgroundChange(e, property, type);
    };
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
                        <input type="file" accept="image/*"  onChange={(e) => modifiedHandleBackgroundChange(e, 'backgroundImage')} />
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