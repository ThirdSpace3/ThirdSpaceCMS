import React, { useState, useEffect } from "react";
import "./ProjectsDashboard.css";
import "./DashboardMain.css";
import { useNavigate } from "react-router-dom";
import { db, doc, getDoc, collection, query, where, getDocs } from "../../firebaseConfig";
import _ from 'lodash';
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
  const navigate = useNavigate();
  const isEmpty = _.isEmpty;

  const [isOpen, setIsOpen] = useState(false);
  // Initialise selectedOption avec la première option
  const [selectedOption, setSelectedOption] = useState(dropdownOptions[0]);
  const [userData, setUserData] = useState([]);

  // Add a new state for the filtered projects
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [recentlyUpdatedProject, setRecentlyUpdatedProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Add a new state for the search input value
  const [searchValue, setSearchValue] = useState("");

  const toggleDropdown = () => setIsOpen(!isOpen);

  
  const fetchProjects = async (walletId) => {
    try {
      const collectionRef = collection(db, 'projects', walletId, 'projectData');
      const querySnapshot = await getDocs(collectionRef);

      const projects = [];
      querySnapshot.forEach((doc) => {
        projects.push({ id: doc.id, ...doc.data() });
      });

      setUserData(projects);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching documents:", error);
      setIsLoading(false);
    }
  };
  
  // Modify the handleSelect function to filter the projects
  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  
    // Filter the projects based on the selected option
    let filteredProjects = [...userData];
    if (option.value === "option1") {
      filteredProjects.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    } else if (option.value === "option2") {
      filteredProjects.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
    } else if (option.value === "option3") {
      filteredProjects.sort((a, b) => a.name.localeCompare(b.name));
    } else if (option.value === "option4") {
      filteredProjects.sort((a, b) => b.name.localeCompare(a.name));
    }
  
    setFilteredProjects(filteredProjects);
  };
  

  // Add an event handler for the search input field
  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchValue(value);
    if (value === "") {
      fetchProjects(sessionStorage.getItem("userAccount"));
    } else {
      const filteredData = userData.filter(project =>
        project.name.toLowerCase().includes(value)
      );
      setUserData(filteredData);
    }
  };


  const handleProjectClick = (templateSelected) => {
    navigate(`/logiciel/${templateSelected}`);
  };

  const handleProjectSettings = (project) => {
    handleOpenSettings(project);
    setProjects(project);
    console.log(project);
  };
  
  const handleNewProjectClick = async () => {
    try {
      sessionStorage.removeItem("selectedTemplateId");
      sessionStorage.removeItem("projectName");

      sessionStorage.setItem("currentStep", "4");
      sessionStorage.setItem("isTemplateCompleted", "false");

      const newProject = {
        id: projects.length + 1,
        name: "",
        logiciel: "",
        image: "",
        createdAt: new Date().toISOString().slice(0, 10),
        description: "",
        favicon: "",
      };

      setProjects(prevProjects => [...prevProjects, newProject]);
      navigate("/templatestep");
    } catch (error) {
      console.error("Failed to create new project:", error);
      // Display an error message to the user
    }
  };



  // useEffect(() => {
  //   // Check if there's any project with a name of null or undefined
  //   const hasInvalidProjectName = projects.some(project => project.name === null || project.name === undefined);

  //   // If found, navigate to the templatestep page
  //   if (hasInvalidProjectName) {
  //     navigate('/templatestep');
  //   }
  // }, [projects, navigate]); // 



  // New state for the most recently updated project


  // useEffect(() => {
  //   const storedProjects = JSON.parse(localStorage.getItem("projects"));
  //   if (storedProjects) {
  //     setProjects(storedProjects);
  //   }
  // }, []);

  // // Update the state of the projects in localStorage whenever it changes
  // useEffect(() => {
  //   localStorage.setItem("projects", JSON.stringify(projects));
  // }, [projects]);


  useEffect(() => {
    const walletID = sessionStorage.getItem("userAccount");
    fetchProjects(walletID);
  }, []);


  // useEffect(() => {
  //   const selectedTemplateId = sessionStorage.getItem("selectedTemplateId");
  //   if (selectedTemplateId) {
  //     const foundTemplate = projects.find(project => project.id === selectedTemplateId);
  //     setSelectedTemplate(foundTemplate);
  //   }
  // }, [projects]);
  console.log(userData);

  useEffect(() => {
    setFilteredProjects(userData);

    // Determine the most recently updated project
    const mostRecentProject = userData.reduce((acc, project) => {
      const currentProjectDate = new Date(
        project.lastUpdated || project.createdAt
      );
      const accDate = new Date(acc.lastUpdated || acc.createdAt);
      return currentProjectDate > accDate ? project : acc;
    }, userData[0]);

    setRecentlyUpdatedProject(mostRecentProject);
    if (isEmpty(userData) && !isLoading) {
      navigate("../templatestep");
      sessionStorage.setItem("currentStep", "1");
    }
  }, [userData, navigate, isLoading]);

  if (isLoading) {
    return <p>Loading...</p>;
  }
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
                    className={`bi bi-caret-down-fill ${isOpen ? "open" : ""
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
              <div className="projects-content-item">
                <img
                  src={recentlyUpdatedProject.image || `./images/${recentlyUpdatedProject.templateName}screenshot.png`}
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
                    src={`./images/${project.templateName}screenshot.png` || "default-image.png"}
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
