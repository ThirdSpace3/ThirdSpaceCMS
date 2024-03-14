import React, { useState, useRef, useEffect } from 'react';
import './LeftBar.css';
import '../Root.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useImageHistory } from '../../hooks/ImageHistoryContext'; // Adjust as necessary

export default function PanelAsset() {
    const { addImageToHistory, imageHistory, selectImage, selectedImage } = useImageHistory();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState("All Assets");
    const [filteredHistory, setFilteredHistory] = useState(imageHistory); // Store the filtered list based on selection
    const dropdownRef = useRef(null);
    const fileInputRef = useRef(null);

    const options = ["All Assets", "Photo", "Document", "Video"]; // Ensure options match category names

    useEffect(() => {
        // Filter imageHistory whenever imageHistory or selectedOption changes
        if (selectedOption === "All Assets") {
            setFilteredHistory(imageHistory);
        } else {
            setFilteredHistory(imageHistory.filter(item => item.category === selectedOption));
        }
    }, [selectedOption, imageHistory]);

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        files.forEach(file => {
            const mimeType = file.type;
            let category = "Unknown";
    
            if (mimeType.startsWith("image/")) {
                category = "Photo";
            } else if (mimeType.startsWith("video/")) {
                category = "Video";
            } else if (mimeType === "application/pdf" || mimeType.startsWith("application/vnd.ms") || mimeType.startsWith("application/msword")) {
                category = "Document";
            }
    
            const newImageUrl = URL.createObjectURL(file);
            addImageToHistory({ url: newImageUrl, category });
        });
    };

    const handleUploadClick = () => {
        fileInputRef.current.click();
    };

    const handleImageSelect = (image) => {
        selectImage(image.url); // Ensure this is compatible with your context's selectImage function
    };

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

    return (
        <div className='navbar-panel'>
            <input type="file" ref={fileInputRef} accept="image/*,video/*,application/pdf,application/msword,application/vnd.ms-excel,application/vnd.ms-powerpoint" multiple onChange={handleFileChange} style={{ display: 'none' }} />
            <div className='btn-box'>
                <button className='upload-btn' onClick={handleUploadClick}>Upload</button>
                <div className="dropdown" ref={dropdownRef}>
                    <button className={`dropdown-button ${isOpen ? 'open' : ''}`} onClick={toggleDropdown}>
                        {selectedOption} <i className={`bi bi-caret-down-fill ${isOpen ? 'rotate' : ''}`}></i>
                    </button>
                    {isOpen && (
                        <ul className="dropdown-options open">
                            {options.map(option => (
                                <li key={option} className="dropdown-option" onClick={() => handleOptionClick(option)}>
                                    {option}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            <div className="ImagePreview">
                {filteredHistory.map((image, index) => (
                    <div key={index} className={`image-preview ${image.url === selectedImage ? 'selected' : ''}`} onClick={() => handleImageSelect(image)}>
                        <img src={image.url} alt={`Preview ${index}`} />
                    </div>
                ))}
            </div>
        </div>
    );
}
