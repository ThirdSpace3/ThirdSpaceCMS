import React, { useState } from "react";
import "../components/dashboard/DashboardMain.css";
import "../components/Root.css";
import LeftMenuDashboard from "../components/dashboard/LeftMenuDashboard";
import ProjectsDashboard from "../components/dashboard/ProjectsDashboard";
import SiteSettingsDashboard from "../components/dashboard/SiteSettingsDashboard";
import ProfileDashboard from "../components/dashboard/ProfileDashboard";

export default function Dashboard() {
  const [activeMenuItem, setActiveMenuItem] = useState("projects");
  const [projects, setProjects] = useState([
    {
      name: "TemplateFullText",
      image: "./images/project-image-test.png",
      createdAt: "2023-03-20",
      description: "",
      favicon: "",
    },
    {
      name: "TemplateImg_txt",
      image: "./images/project-image-test.png",
      createdAt: "2023-03-19",
      description: "",
      favicon: "",
    },
    {
      name: "TemplateTest1",
      image: "./images/project-image-test.png",
      createdAt: "2023-03-19",
      description: "",
      favicon: "",
    },
    // Add more projects as needed
  ]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [filteredProjects, setFilteredProjects] = useState(projects);

  const handleOpenSettings = (index) => {
    setSelectedProject(projects[index]);
    setActiveMenuItem("settings");
  };

  const updateProject = (updatedProject) => {
    console.log("Update project called with:", updatedProject);
    const updatedProjects = projects.map((project) =>
      project.name === updatedProject.name ? updatedProject : project
    );
    setProjects(updatedProjects);
    setFilteredProjects(updatedProjects);
  };

  return (
    <>
      <div className="dashboard-container">
        <div className="leftMenuDashboard">
          <LeftMenuDashboard setActiveMenuItem={setActiveMenuItem} />
        </div>
        <div className="projectsDashboard">
          {activeMenuItem === "projects" && (
            <ProjectsDashboard
              projects={filteredProjects}
              handleOpenSettings={handleOpenSettings}
            />
          )}
          {activeMenuItem === "settings" && (
            <SiteSettingsDashboard
              project={selectedProject}
              updateProject={updateProject}
            />
          )}
          {activeMenuItem === "profile" && <ProfileDashboard />}
        </div>
      </div>
    </>
  );
}