import React, { useState, useEffect, useRef } from "react";
import "./SiteSettingsDashboard.css";
import "./DashboardMain.css";
import "../Root.css";

export default function SiteSettingsDashboard({ project, updateProject, onReturnToProjects }) {
  const [templateName, setTemplateName] = useState(() => {
    const storedName = localStorage.getItem('templateName');
    return storedName || project?.name || "";
  });

  const [templateDescription, setTemplateDescription] = useState(() => {
    const storedDescription = localStorage.getItem('templateDescription');
    return storedDescription || project?.description || "";
  });

  const [favicon, setFavicon] = useState(() => {
    const storedFavicon = localStorage.getItem('favicon');
    return storedFavicon || project?.favicon || "";
  });
    const [faviconPreview, setFaviconPreview] = useState(() => favicon || project?.favicon);
    const [isEdited, setIsEdited] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [isImageError, setIsImageError] = useState(false);
    const fileInputRef = useRef(null);

    useEffect(() => {
        // Reset flags when project changes
        setIsEdited(false);
        setIsSaved(false);
        setIsImageError(false);
    }, [project]);

    const handleTemplateNameChange = (e) => {
        setTemplateName(e.target.value);
        setIsEdited(true);
        setIsSaved(false);
    };

    const handleTemplateDescriptionChange = (e) => {
        setTemplateDescription(e.target.value);
        setIsEdited(true);
        setIsSaved(false);
    };

    const handleFaviconUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const img = new Image();
            img.onload = () => {
                if (img.width > 300 || img.height > 300) {
                    setIsImageError(true);
                    setIsEdited(false);
                } else {
                    setIsImageError(false);
                    setFaviconPreview(URL.createObjectURL(file));

                    const reader = new FileReader();
                    reader.onloadend = () => {
                        setFavicon(reader.result);
                        setIsEdited(true);
                        setIsSaved(false);
                    };
                    reader.readAsDataURL(file);
                }
            };
            img.src = URL.createObjectURL(file);
        }
    };

    const handleUploadButtonClick = (e) => {
        e.preventDefault();
        fileInputRef.current.click();
    };

    const handleSave = () => {
      const updatedProject = {
        ...project,
        name: templateName,
        description: templateDescription,
        favicon: favicon,
      };
    
      // Call the updateProject function passed as a prop
      updateProject(updatedProject);
    
      // Optionally, directly update localStorage here or ensure it's updated in updateProject
      localStorage.setItem(`project-${project.id}`, JSON.stringify(updatedProject));
    
      setIsEdited(false);
      setIsSaved(true);
    };
    
    
    
  

    return (
        <div className="dashboard-page-container">
          <div className="projects-header-sticky">
            <div className="dashboard-header">
              <div className="dashboard-title-box">
                <div onClick={onReturnToProjects}><i className="bi bi-arrow-left-short"></i></div>
                <h1><span>{templateName}</span> Settings</h1>
              </div>
              <button
                className={`dashboard-page-content-save-btn${isEdited ? "-activated" : ""}`}
                type="button"
                onClick={handleSave}
              >
                {isSaved ? <i className="bi bi-check"></i> : 'Save'}
              </button>
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
                    <img src={faviconPreview} alt="Favicon" />
                  </div>
                  <div className="dashboard-settings-upload-box">
                    <a href="#" className="dashboard-settings-upload-btn" onClick={handleUploadButtonClick}>
                      <i className="bi bi-cloud-upload"></i>Upload
                    </a>
      
                    <div className="dashboard-error">
                      <div className="dashboard-icon-error">
                        <p>!</p>
                      </div>
                      <p className="dashboard-msg-error">The image must be 300x300 px or smaller</p>
                    </div>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFaviconUpload}
                    ref={fileInputRef}
                    style={{ display: "none" }}
                  />
                  {isImageError && (
                    <div className="dashboard-error">
                      <div className="dashboard-icon-error">
                        <p>!</p>
                      </div>
                      <p className="dashboard-msg-error">The image must be 300x300 px or smaller</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
                  }      