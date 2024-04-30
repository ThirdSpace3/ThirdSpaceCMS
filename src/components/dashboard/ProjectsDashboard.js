import React, { useState, useEffect } from "react";
import "./ProjectsDashboard.css";
import "./DashboardMain.css";
import { useNavigate } from "react-router-dom";
import { db,doc,getDoc } from "../../firebaseConfig";
export default function ProjectsDashboard({
  projects,
  handleOpenSettings,
  setProjects,
}) {
  // Options pour le Dropdown
  const dropdownOptions = [
    { value: "option1", text: "Creation Date", icon: "bi-arrow-down" },
    { value: "option2", text: "Creation Date", icon: "bi-arrow-up" },
    { value: "option3", text: "Alphabetic", icon: "bi-sort-alpha-down" },
    { value: "option4", text: "Alphabetic", icon: "bi-sort-alpha-up-alt" },
  ];

  const [isOpen, setIsOpen] = useState(false);
  // Initialise selectedOption avec la première option
  const [selectedOption, setSelectedOption] = useState(dropdownOptions[0]);
  const walletID = sessionStorage.getItem('userAccount');

  // Add a new state for the filtered projects
  const [filteredProjects, setFilteredProjects] = useState(projects);
  useEffect(() => {
    setFilteredProjects(projects);
  }, [projects]);

  // Add a new state for the search input value
  const [searchValue, setSearchValue] = useState("");

  const toggleDropdown = () => setIsOpen(!isOpen);

  // Modify the handleSelect function to filter the projects
  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);

    // Filter the projects based on the selected option
    if (option.value === "option1") {
      setFilteredProjects(
        [...projects].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )
      );
    } else if (option.value === "option2") {
      setFilteredProjects(
        [...projects].sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        )
      );
    } else if (option.value === "option3") {
      setFilteredProjects(
        [...projects].sort((a, b) => a.name.localeCompare(b.name))
      );
    } else if (option.value === "option4") {
      setFilteredProjects(
        [...projects].sort((a, b) => b.name.localeCompare(a.name))
      );
    }
  };

  // Add an event handler for the search input field
  const handleSearch = (event) => {
    setSearchValue(event.target.value);

    // Filter the projects based on the search input value
    if (event.target.value === "") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter((project) =>
          project.name.toLowerCase().includes(event.target.value.toLowerCase())
        )
      );
    }
  };

  const navigate = useNavigate();

  const handleProjectClick = (projectName) => {
    navigate(`/logiciel/${projectName}`);
  };

  const handleProjectSettings = (index) => {
    handleOpenSettings(index);
    console.log(index);
  };
  const handleNewProjectClick = () => {
    // Clear the selected template and project name from the session storage
    sessionStorage.removeItem("selectedTemplateId");
    sessionStorage.removeItem("projectName");

    // Set the current step and isTemplateCompleted flag in the session storage
    sessionStorage.setItem("currentStep", "4");
    sessionStorage.setItem("isTemplateCompleted", "false");

    // Create a new project object with a unique ID, name, and the default values
    const newProject = {
      id: projects.length + 1,
      name: "",
      logiciel: "",
      image: "",
      createdAt: new Date().toISOString().slice(0, 10),
      description: "",
      favicon: "",
    };

    // Add the new project to the projects state
    setProjects([...projects, newProject]);

    // Navigate to the TemplateStep component
    navigate("/templatestep");
  };
  useEffect(() => {
    // Check if there's any project with a name of null or undefined
    const hasInvalidProjectName = projects.some(project => project.name === null || project.name === undefined);

    // If found, navigate to the templatestep page
    if (hasInvalidProjectName) {
      navigate('/templatestep');
    }
  }, [projects, navigate]); // 
  const [selectedTemplate, setSelectedTemplate] = useState(null);

// For example, setSelectedTemplate useEffect should depend on 'projects'
useEffect(() => {
  const selectedTemplateId = sessionStorage.getItem("selectedTemplateId");
  if (selectedTemplateId) {
    const foundTemplate = projects.find(project => project.id === selectedTemplateId);
    setSelectedTemplate(foundTemplate);
  }
}, [projects]);

  // New state for the most recently updated project
  const [recentlyUpdatedProject, setRecentlyUpdatedProject] = useState(null);

  useEffect(() => {
    setFilteredProjects(projects);

    // Determine the most recently updated project
    const mostRecentProject = projects.reduce((acc, project) => {
      const currentProjectDate = new Date(
        project.lastUpdated || project.createdAt
      );
      const accDate = new Date(acc.lastUpdated || acc.createdAt);
      return currentProjectDate > accDate ? project : acc;
    }, projects[0]);

    setRecentlyUpdatedProject(mostRecentProject);
  }, [projects]);

  useEffect(() => {
    const storedProjects = JSON.parse(localStorage.getItem("projects"));
    if (storedProjects) {
      setProjects(storedProjects);
    }
  }, []);

  // Update the state of the projects in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);
  
  useEffect(() => {
    async function fetchProjects() {
      if (walletID) {
        const docRef = doc(db, 'wallets', walletID);
        const docSnap = await getDoc(docRef);
  
        if (docSnap.exists()) {
          const data = docSnap.data();
          // Check if stepsData exists and has a property '5'
          if (data.stepsData && data.stepsData['5']) {
            const stepData = data.stepsData['5'];
            // Now you can safely use stepData as it is confirmed to exist
            setProjects([{ name: stepData.name, template: stepData.templateSelected }]);
          } else {
            console.log("Step data 5 does not exist!");
          }
        } else {
          console.log("No such document!");
        }
      }
    }
  
    fetchProjects();
  }, [walletID]);
  
  return (
    <>
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
                <div
                  className="project-navbar-dropdown-header"
                  onClick={toggleDropdown}
                >
                  <i
                    className={`bi ${selectedOption.icon} project-navbar-dropdown-icon`}
                  ></i>
                  <p className="project-navbar-dropdown-option">
                    {selectedOption.text}
                  </p>
                  <i
                    className={`bi bi-caret-down-fill ${
                      isOpen ? "open" : ""
                    } project-navbar-dropdown-icon`}
                  ></i>
                </div>
                {isOpen && (
                  <div className="project-navbar-dropdown-list">
                    {dropdownOptions
                      .filter((option) => option.value !== selectedOption.value)
                      .map((option) => (
                        <div
                          key={option.value}
                          className="project-navbar-dropdown-item"
                          onClick={() => handleSelect(option)}
                        >
                          <i
                            className={`bi ${option.icon} project-navbar-dropdown-icon`}
                          ></i>
                          <p className="project-navbar-dropdown-option">
                            {option.text}
                          </p>
                        </div>
                      ))}
                  </div>
                )}
              </div>
              <button
                className="projects-navbar-btn"
                onClick={handleNewProjectClick}
                disabled={projects.length >= 3}
              >
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
            {recentlyUpdatedProject && (
              <div
                className="projects-content-item"
                
              >
                <img
                  src={
                    recentlyUpdatedProject.image
                  }
                  alt={recentlyUpdatedProject.name}
                  onClick={() =>
                    handleProjectClick(recentlyUpdatedProject.logiciel)
                  }
                />
                <div className="projects-content-item-info">
                  <p>{recentlyUpdatedProject.name}</p>
                  {/* Other project details */}
                  <div onClick={() => handleProjectSettings(0)}>
                      <i className="bi bi-three-dots"></i>
                    </div>
                </div>
               
              </div>
            )}
          </div>

          <div className="projects-content-box">
            <div className="projects-content-title">
              <i class="bi bi-folder2"></i>
              <h2>All Projects</h2>
            </div>

            {/* Display the filtered projects */}
            <div className="projects-content-listing">
              {filteredProjects.slice(0, 5).map((project, index) => (
                <div key={index} className="projects-content-item">
                  {/* Conditionally render the favicon if available, otherwise render the default image */}
                  <img
                    src={project.image}
                    alt={project.name}
                    onClick={() => handleProjectClick(project.logiciel)}
                  />
                  <div className="projects-content-item-info">
                    <p>
                      {project.name}
                    </p>

                    <div onClick={() => handleProjectSettings(index)}>
                      <i className="bi bi-three-dots"></i>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {projects.length >= 3 && (
              <p className="dashboard-billing-header-warning">
                <i class="bi bi-exclamation-triangle"></i>
                You can't create more than 3 projects.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
