import React, { useState } from "react";
import "./SiteSettingsDashboard.css";
import "./DashboardMain.css";
import "../Root.css";

export default function SiteSettingsDashboard({ project, updateProject }) {
  const [templateName, setTemplateName] = useState(project ? project.name : "");
  const [templateDescription, setTemplateDescription] = useState(
    project ? project.description : ""
  );
  const [favicon, setFavicon] = useState(project ? project.favicon : "");

  const handleTemplateNameChange = (e) => {
    setTemplateName(e.target.value);
    updateProject({ ...project, name: e.target.value });
  };

  const handleTemplateDescriptionChange = (e) => {
    setTemplateDescription(e.target.value);
    updateProject({ ...project, description: e.target.value });
  };

  const handleFaviconUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setFavicon(reader.result);
      updateProject({ ...project, favicon: reader.result });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="dashboard-page-container">
      <div className="projects-header-sticky">
        <div className="dashboard-header">
          <div className="dashboard-title-box">
            <a href=""><i class="bi bi-arrow-left-short"></i></a>
            <h1><span>{templateName}</span> Settings</h1>
          </div>
        </div>
      </div>
      <div className="dashboard-page-content">
        <div className="dashboard-page-content-left">
          <div className="dashboard-settings-item">
            <div className="dashboard-settings-title">
              <h2>Project Name</h2>
              <div className="dashboard-settings-title-icon">
                <p>i</p>
              </div>
            </div>
            <input
              type="text"
              value={templateName}
              onChange={handleTemplateNameChange}
            />
          </div>
          <div className="dashboard-settings-item">
            <div className="dashboard-settings-title">
              <h2>Description</h2>
              <div className="dashboard-settings-title-icon">
                <p>i</p>
              </div>
            </div>
            <textarea
              value={templateDescription}
              onChange={handleTemplateDescriptionChange}
              placeholder="Enter a description"
            />
          </div>
          <div className="dashboard-settings-item">
            <div className="dashboard-settings-title">
              <h2>Favicon</h2>
              <div className="dashboard-settings-title-icon">
                <p>i</p>
              </div>
            </div>
            <div className="dashboard-settings-item-box">
              <div className="dashboard-settings-favicon">
                <img src={favicon} alt="Favicon" />
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleFaviconUpload}
              />
              <div className="dashboard-error">
                <div className="dashboard-icon-error">
                  <p>!</p>
                </div>
                <p className="dashboard-msg-error">
                  The image must be 64x64 px
                </p>
              </div>
            </div>
          </div>
        </div>
        <a href="" className="dashboard-page-content-save-btn">
          Save
        </a>
      </div>
    </div>
  );
}
