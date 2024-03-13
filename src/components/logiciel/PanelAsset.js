import React, { useState } from 'react';
import './LeftBar.css';
import '../Root.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function PanelAsset() {
    // State to store the image URLs
    const [images, setImages] = useState([]);

    // Function to handle file input changes
    const handleFileChange = (event) => {
        const files = Array.from(event.target.files); // Convert FileList to Array

        // Create URLs for the selected files
        const newImageUrls = files.map(file => URL.createObjectURL(file));
        
        // Update the state with the new images, appending them to any existing images
        setImages(prevImages => [...prevImages, ...newImageUrls]);
    };

    return (
        <div className='navbar-panel'>
            {/* File input for selecting images */}
            <input type="file" accept="image/*" multiple onChange={handleFileChange} />
            <div className="ImagePreview">
                {images.map((image, index) => (
                    <div key={index} className="image-preview">
                        <img src={image} alt={`Preview ${index}`} />
                    </div>
                ))}
            </div>
        </div>
    );
}

