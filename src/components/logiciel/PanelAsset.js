import React from 'react';
import './LeftBar.css'; // Ensure the path is correct
import '../Root.css'; // Ensure the path is correct
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useImageHistory } from '../../hooks/ImageHistoryContext'; // Adjust the import path as necessary

export default function PanelAsset() {
    const { addImageToHistory, imageHistory, selectImage, selectedImage } = useImageHistory();

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        files.forEach(file => {
            const newImageUrl = URL.createObjectURL(file);
            addImageToHistory(newImageUrl);
        });
    };
    const handleImageSelect = (image) => {
        selectImage(image); // Update the selected image in the context
    };
    return (
        <div className='navbar-panel'>
            <input type="file" accept="image/*" multiple onChange={handleFileChange} />
            <div className="ImagePreview">
            {imageHistory.map((image, index) => (
                <div key={index} className={`image-preview ${image === selectedImage ? 'selected' : ''}`} onClick={() => handleImageSelect(image)}>
                    <img src={image} alt={`Preview ${index}`} />
                </div>
            ))}
        </div>
        </div>
    );
}

