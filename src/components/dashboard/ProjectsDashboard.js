import React, { useState } from "react";
import "./ProjectsDashboard.css"; // Assurez-vous que le chemin est correct pour vos styles

export default function ProjectsDashboard() {
    // Options pour le Dropdown
    const dropdownOptions = [
        { value: 'option1', text: 'Creation Date', icon: 'bi-arrow-down' },
        { value: 'option2', text: 'Creation Date', icon: 'bi-arrow-up' },
        { value: 'option3', text: 'Alphabetic', icon: 'bi-sort-alpha-down' },
        { value: 'option4', text: 'Alphabetic', icon: 'bi-sort-alpha-up-alt' }
    ];

    const [isOpen, setIsOpen] = useState(false);
    // Initialise selectedOption avec la première option
    const [selectedOption, setSelectedOption] = useState(dropdownOptions[0]);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleSelect = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
    };

    return (
        <>
            <div className="projects-container">
                <div className="projects-header">
                    <h1>Projects</h1>
                    <div className="projects-navbar">
                        <div className="projects-navbar-input">
                            <i className="bi bi-search"></i>
                            <input placeholder="Search..."></input>
                        </div>
                        <div className="project-navbar-dropdown">
                            <div className="project-navbar-dropdown-header" onClick={toggleDropdown}>
                                <i className={`bi ${selectedOption.icon} project-navbar-dropdown-icon`}></i>
                                <p className="project-navbar-dropdown-option">{selectedOption.text}</p> 
                                <i className={`bi bi-caret-down-fill ${isOpen ? 'open' : ''} project-navbar-dropdown-icon`}></i>
                            </div>
                            {isOpen && (
                                <div className="project-navbar-dropdown-list">
                                    {dropdownOptions.filter(o => o.value !== selectedOption.value).map((option) => (
                                        <div key={option.value} className="project-navbar-dropdown-item" onClick={() => handleSelect(option)}>
                                            <i className={`bi ${option.icon} project-navbar-dropdown-icon`}></i>
                                            <p className="project-navbar-dropdown-option">{option.text}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <a href="/new-project" className="projects-navbar-btn"><i className="bi bi-plus-circle"></i> New Project</a>
                    </div>
                </div>

                <div className="projects-content">
                    {/* Contenu du projet ici */}
                </div>
            </div>
        </>
    );
}
