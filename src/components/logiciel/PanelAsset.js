import React from 'react';
import React, { useState, useRef, useEffect } from 'react';
import './LeftBar.css';
import '../Root.css';
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
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState("All Assets");
    const dropdownRef = useRef(null);

    const options = ["All Assets", "Images", "Documents", "Videos"];
  
    const toggleDropdown = () => setIsOpen(!isOpen);
  
    const handleOptionClick = (option) => {
      setSelectedOption(option);
      setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Exemple avec 3 lignes de 2 divs
    const numberOfRows = 3; // Nombre de lignes souhaité

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

            <div className='btn-box'>
                <button className='upload-btn'>Upload</button>
                <div className="dropdown" ref={dropdownRef}>
                    <button className={`dropdown-button ${isOpen ? 'open' : ''}`} onClick={toggleDropdown}>
                    {selectedOption} <i className={`bi bi-caret-down ${isOpen ? 'rotate' : ''}`}></i>
                    </button>
                {isOpen && (
                    <ul className="dropdown-options open">
                    {options.filter(option => option !== selectedOption).map(option => (
                        <li key={option} className="dropdown-option" onClick={() => handleOptionClick(option)}>
                        {option}
                        </li>
                    ))}
                    </ul>
                )}
                </div>
            </div>

            <div className='listing-photo'>
                {[...Array(numberOfRows)].map((_, rowIndex) => (
                    <div key={rowIndex} className="photo-row">
                        <div className="photo-square"></div>
                        <div className="photo-square"></div>
                    </div>
                ))}
            </div>
        </div>
    );
}

