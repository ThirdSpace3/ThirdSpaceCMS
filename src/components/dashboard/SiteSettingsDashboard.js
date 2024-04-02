import React, { useState, useEffect } from "react";
import "./SiteSettingsDashboard.css";
import "./DashboardMain.css";
import "../Root.css";

export default function SiteSettingsDashboard({ project, updateProject, onReturnToProjects }) {
    const [templateName, setTemplateName] = useState(project ? project.name : "");
    const [templateDescription, setTemplateDescription] = useState(project ? project.description : "");
    const [favicon, setFavicon] = useState(project ? project.favicon : "");
    const [isEdited, setIsEdited] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    // New state to track image size error
    const [isImageError, setIsImageError] = useState(false);

    useEffect(() => {
        setIsEdited(false);
        setIsSaved(false);
        setIsImageError(false); // Reset the image error state as well
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
                    // If the image is larger than 300x300px, display an error and do not update the faviconv

                    setIsImageError(true);
                    setIsEdited(false); // Since no valid change is made, revert isEdited to false
                } else {
                    setIsImageError(false);
                    img.src = URL.createObjectURL(file);

                    const reader = new FileReader();
                    reader.onloadend = () => {
                        setFavicon(reader.result);
                        setIsEdited(true);
                        setIsSaved(false); // Ensure user knows changes need saving
                    };
                    reader.readAsDataURL(file);
                }
            };
        }
    };

    const handleSave = () => {
        updateProject({
            ...project,
            name: templateName,
            description: templateDescription,
            favicon: favicon
        });
        setIsEdited(false);
        setIsSaved(true);
        setIsImageError(false); // Assuming saving resolves any previous error states
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
                                <img src={favicon} alt="Favicon" />
                            </div>
                            <div className="dashboard-settings-upload-box">
                                <a href="#" className="dashboard-settings-upload-btn">
                                <i className="bi bi-cloud-upload"></i>Upload</a>
                            
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
                            />
                            {isImageError && (
                        <div className="dashboard-error">
                            <div className="dashboard-icon-error">
                                <p>!</p>
                            </div>
                            <p className="dashboard-msg-error">
                                The image must be 300x300 px or smaller
                            </p>
                        </div>
                    )}
                           
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    );
}
