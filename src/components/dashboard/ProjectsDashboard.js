import React, { useState, useEffect } from "react";
import "./ProjectsDashboard.css";
import "./DashboardMain.css";
import { useNavigate } from 'react-router-dom';

export default function ProjectsDashboard({ projects, handleOpenSettings }) {
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

    // Add a new state for the filtered projects
    const [filteredProjects, setFilteredProjects] = useState(projects);
    useEffect(() => {
        setFilteredProjects(projects);
    }, [projects]);


    // Add a new state for the search input value
    const [searchValue, setSearchValue] = useState('');

    const toggleDropdown = () => setIsOpen(!isOpen);

    // Modify the handleSelect function to filter the projects
    const handleSelect = (option) => {
        setSelectedOption(option);
        setIsOpen(false);

        // Filter the projects based on the selected option
        if (option.value === 'option1') {
            setFilteredProjects([...projects].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
        } else if (option.value === 'option2') {
            setFilteredProjects([...projects].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)));
        } else if (option.value === 'option3') {
            setFilteredProjects([...projects].sort((a, b) => a.name.localeCompare(b.name)));
        } else if (option.value === 'option4') {
            setFilteredProjects([...projects].sort((a, b) => b.name.localeCompare(a.name)));
        }
    };

    // Add an event handler for the search input field
    const handleSearch = (event) => {
        setSearchValue(event.target.value);

        // Filter the projects based on the search input value
        if (event.target.value === '') {
            setFilteredProjects(projects);
        } else {
            setFilteredProjects(projects.filter(project => project.name.toLowerCase().includes(event.target.value.toLowerCase())));
        }
    };

    const navigate = useNavigate();

    const handleProjectClick = (projectName) => {
         navigate(`/logiciel/${projectName}`);
    };

    const handleProjectSettings = (index) => {
        handleOpenSettings(index);
    };
    const handleNewProjectClick = () => {
        sessionStorage.setItem('currentStep', '3'); // Directly setting step 3
        sessionStorage.setItem('isTemplateCompleted', 'false');

        navigate('/templatestep'); // Navigate to the TemplateStep component
    };
    const [selectedTemplate, setSelectedTemplate] = useState(null);

    useEffect(() => {
      const selectedTemplateId = sessionStorage.getItem("selectedTemplateId");
      if (selectedTemplateId) {
        const selectedTemplate = projects.find(
          (project) => project.id === selectedTemplateId
        );
        setSelectedTemplate(selectedTemplate);
      }
    }, []);

    return (
        <>
            <div className="projects-container">
                <div className="projects-header-sticky">
                    <div className="projects-header">
                        <h1>Projects</h1>
                        <div className="projects-navbar">
                            <div className="projects-navbar-input">
                                <i className="bi bi-search"></i>
                                <input placeholder="Search..." value={searchValue} onChange={handleSearch}></input>
                            </div>
                            <div className="project-navbar-dropdown">
                                <div className="project-navbar-dropdown-header" onClick={toggleDropdown}>
                                    <i className={`bi ${selectedOption.icon} project-navbar-dropdown-icon`}></i>
                                    <p className="project-navbar-dropdown-option">{selectedOption.text}</p>
                                    <i className={`bi bi-caret-down-fill ${isOpen ? 'open' : ''} project-navbar-dropdown-icon`}></i>
                                </div>
                                {isOpen && (
                                    <div className="project-navbar-dropdown-list">
                                        {dropdownOptions.filter(option => option.value !== selectedOption.value).map((option) => (
                                            <div key={option.value} className="project-navbar-dropdown-item" onClick={() => handleSelect(option)}>
                                                <i className={`bi ${option.icon} project-navbar-dropdown-icon`}></i>
                                                <p className="project-navbar-dropdown-option">{option.text}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}

                            </div>
                            <button className="projects-navbar-btn" onClick={() => handleNewProjectClick()}>
                                <i className="bi bi-plus-circle"></i> New Project
                            </button>

                        </div>
                    </div>
                </div>

                <div className="projects-content">
                    <div className="projects-content-box">
                        <div className="projects-content-title">
                            <i class="bi bi-clock-history"></i>
                            <h2>Recently viewed</h2>
                        </div>
                        <div className="projects-content-listing">
                            <div className="projects-content-item">
                                <img src="./images/project-image-test.png" />
                                <div className="projects-content-item-info">
                                    <p>ClosedEarth</p>
                                    <a href=""><i class="bi bi-three-dots"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="projects-content-box">
                        <div className="projects-content-title">
                            <i class="bi bi-folder2"></i>
                            <h2>All Projects</h2>
                        </div>

                        {/* Display the filtered projects */}
                        {/* Display the filtered projects */}
                        <div className="projects-content-listing">
              {selectedTemplate && (
                <div className="projects-content-item">
                  {/* Conditionally render the favicon if available, otherwise render the default image */}
                  <img
                    src={selectedTemplate.favicon ? selectedTemplate.favicon : selectedTemplate.image}
                    alt={selectedTemplate.name}
                    onClick={() => handleProjectClick(selectedTemplate.logiciel)}
                  />
                  <div className="projects-content-item-info">
                    <p onClick={() => handleProjectClick(selectedTemplate.logiciel)}>
                      {selectedTemplate.name}
                    </p>
                    <div onClick={() => handleProjectSettings(selectedTemplate.index)}>
                      <i className="bi bi-three-dots"></i>
                    </div>
                  </div>
                </div>
              )}
              {filteredProjects.slice(0, 5).map((project, index) => (
                <div key={index} className="projects-content-item">
                  {/* Conditionally render the favicon if available, otherwise render the default image */}
                  <img
                    src={project.favicon ? project.favicon : project.image}
                    alt={project.name}
                    onClick={() => handleProjectClick(project.logiciel)}
                  />
                  <div className="projects-content-item-info">
                    <p onClick={() => handleProjectClick(project.logiciel)}>
                      {project.name}
                    </p>
                    <div onClick={() => handleProjectSettings(index)}>
                      <i className="bi bi-three-dots"></i>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}