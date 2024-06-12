import React, { useState, useEffect } from "react";
import "./ProjectsDashboard.css";
import "./DashboardMain.css";
import { useNavigate } from "react-router-dom";
import _ from 'lodash';

export default function ProjectsDashboard({
  projects,
  setSelectedProject,
  handleOpenSettings,
  setProjects,
  userData,
  setUserData,
  isLoading,
  fetchProjects,
}) {
  const dropdownOptions = [
    { value: "option1", text: "Creation Date", icon: "bi-arrow-down" },
    { value: "option2", text: "Creation Date", icon: "bi-arrow-up" },
    { value: "option3", text: "Alphabetic", icon: "bi-sort-alpha-down" },
    { value: "option4", text: "Alphabetic", icon: "bi-sort-alpha-up-alt" },
  ];

  const navigate = useNavigate();
  const isEmpty = _.isEmpty;

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(dropdownOptions[0]);
  const [displayErrorMessage, setDisplayErrorMessage] = useState(false);
  const [filteredProjects, setFilteredProjects] = useState(userData || []);
  const [searchValue, setSearchValue] = useState("");
  const [recentlyUpdatedProject, setRecentlyUpdatedProject] = useState(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    applyFilters(option, searchValue);
  };

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchValue(value);
    applyFilters(selectedOption, value);
  };

  const applyFilters = (option, searchValue) => {
    let filtered = [...userData];

    // Filter by search value
    if (searchValue) {
      filtered = filtered.filter(project =>
        project.name.toLowerCase().includes(searchValue)
      );
    }

    // Sort by selected option
    if (option.value === "option1") {
      filtered.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    } else if (option.value === "option2") {
      filtered.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
    } else if (option.value === "option3") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (option.value === "option4") {
      filtered.sort((a, b) => b.name.localeCompare(a.name));
    }

    setFilteredProjects(filtered);

    // Update recentlyUpdatedProject based on the most recent project from the filtered list
    if (filtered.length > 0) {
      const mostRecentProject = filtered.reduce((acc, project) => {
        const currentProjectDate = new Date(
          project.lastUpdated || project.createdAt
        );
        const accDate = new Date(acc.lastUpdated || acc.createdAt);
        return currentProjectDate > accDate ? project : acc;
      }, filtered[0]);

      setRecentlyUpdatedProject(mostRecentProject);
    } else {
      setRecentlyUpdatedProject(null);
    }
  };

  const handleProjectClick = (templateSelected) => {
    navigate(`/builder/${templateSelected}`);
  };

  const handleProjectSettings = (project) => {
    handleOpenSettings(project);
    setSelectedProject(project);
    setProjects(project);
    console.log(project);
  };

  const handleNewProjectClick = async () => {
    try {
      if (userData.length >= 3) {
        setDisplayErrorMessage(true);
        return;
      }
      setDisplayErrorMessage(false);
      sessionStorage.removeItem("selectedTemplateId");
      sessionStorage.removeItem("projectName");
      sessionStorage.setItem("currentStep", "4");
      sessionStorage.setItem("isTemplateCompleted", "false");
      navigate("/templatestep");
    } catch (error) {
      console.error("Failed to create new project:", error);
    }
  };

  const resetSearch = () => {
    setSearchValue("");
    setFilteredProjects(userData);
    setRecentlyUpdatedProject(userData.reduce((acc, project) => {
      const currentProjectDate = new Date(
        project.lastUpdated || project.createdAt
      );
      const accDate = new Date(acc.lastUpdated || acc.createdAt);
      return currentProjectDate > accDate ? project : acc;
    }, userData[0]));
  };

  useEffect(() => {
    const walletID = sessionStorage.getItem("userAccount");
    fetchProjects(walletID);
  }, []);

  useEffect(() => {
    setFilteredProjects(userData);
    applyFilters(selectedOption, searchValue);
    if (isEmpty(userData) && !isLoading) {
      // navigate("../templatestep");
      // sessionStorage.setItem("currentStep", "1");
    }
  }, [userData, navigate, isLoading]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const Placeholder = () => (
    <div className="placeholder">
      <div className="placeholder-icon">
        <i className="bi bi-search"></i>
        <p>No projects found</p>  
      </div>
      <button className="placeholder-button" onClick={resetSearch}>See all projects</button>
    </div>
  );

  const NoProjectsPlaceholder = () => (
    <div className="placeholder">
      <div className="placeholder-icon">
        <i className="bi bi-folder"></i>
        <p>New project</p>
      </div>
      <button className="placeholder-button" onClick={handleNewProjectClick}>Create your first project</button>
    </div>
  );

  const isProjectsEmpty = !recentlyUpdatedProject && filteredProjects.length === 0;

  return (
    <div className="projects-container">
      <div className="projects-header-sticky">
        <div className="projects-header">
          <h1>Projects</h1>
          <div className="projects-navbar">
            <div className="projects-navbar-input">
              <i className="bi bi-search"></i>
              <input
                placeholder="Search..."
                value={searchValue}
                onChange={handleSearch}
              ></input>
            </div>
            <div className="project-navbar-dropdown">
              <div className="project-navbar-dropdown-header" onClick={toggleDropdown}>
                <i className={`bi ${selectedOption.icon} project-navbar-dropdown-icon`}></i>
                <p className="project-navbar-dropdown-option">{selectedOption.text}</p>
                <i className={`bi bi-caret-down-fill ${isOpen ? "open" : ""} project-navbar-dropdown-icon`}></i>
              </div>
              {isOpen && (
                <div className="project-navbar-dropdown-list">
                  {dropdownOptions.map((option) => (
                    <div
                      key={option.value}
                      className={`project-navbar-dropdown-item ${selectedOption.value === option.value ? 'selected-filter' : ''}`}
                      onClick={() => handleSelect(option)}
                    >
                      <i className={`bi ${option.icon} project-navbar-dropdown-icon`}></i>
                      <p className="project-navbar-dropdown-option">{option.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <button
              className="projects-navbar-btn"
              onClick={handleNewProjectClick}
              disabled={projects.length === 3}
            >
              <i className="bi bi-plus-circle"></i> New Project
            </button>
          </div>
          
        </div>
        {displayErrorMessage && (
          <p className="dashboard-billing-header-warning">
            <i className="bi bi-exclamation-triangle"></i>
            You can't create more than 3 projects.
          </p>
        )}
      </div>

      {isProjectsEmpty ? (
        isEmpty(userData) ? (
          <NoProjectsPlaceholder />
        ) : (
         <Placeholder/>
        )
      ) : (
        <div className="projects-content">
          <div className="projects-content-box">
            <div className="projects-content-title">
              <i className="bi bi-clock-history"></i>
              <h2>Recently viewed</h2>
            </div>
            {recentlyUpdatedProject && (
              <div className="projects-content-item">
                <img
                  src={recentlyUpdatedProject.favicon || recentlyUpdatedProject.image || `./images/${recentlyUpdatedProject.templateName}screenshot.png`}
                  alt={recentlyUpdatedProject.name}
                  onClick={() => handleProjectClick(recentlyUpdatedProject.templateName)}
                />
                <div className="projects-content-item-info">
                  <p>{recentlyUpdatedProject.name}</p>
                  <p>Last updated: {new Date(recentlyUpdatedProject.lastUpdated).toLocaleString()}</p>
                  <div onClick={() => handleProjectSettings(recentlyUpdatedProject)}>
                    <i className="bi bi-three-dots"></i>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="projects-content-box">
            <div className="projects-content-title">
              <i className="bi bi-folder2"></i>
              <h2>All Projects</h2>
            </div>
            <div className="projects-content-listing">
              {filteredProjects.map((project, index) => (
                <div key={index} className="projects-content-item">
                  <img
                    src={project.favicon || `./images/${project.templateName}screenshot.png`}
                    alt={project.name}
                    onClick={() => handleProjectClick(project.templateName)}
                  />
                  <div className="projects-content-item-info">
                    <p>{project.name}</p>
                    <div onClick={() => handleProjectSettings(project)}>
                      <i className="bi bi-three-dots"></i>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
