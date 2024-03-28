import React from "react";
import "./SiteSettingsDashboard.css";
import "./DashboardMain.css";
import "../Root.css";



export default function SiteSettingsDashboard() {
return (
     <>
     <div className="dashboard-page-container">
        <div className="projects-header-sticky">
            <div className="dashboard-header">
                <div className="dashboard-title-box">
                    <a href=""><i class="bi bi-arrow-left-short"></i></a>
                    <h1><span>[Website Name]</span> Settings</h1>
                </div>
            </div>
        </div>
        <div className="dashboard-page-content">
            <div className="dashboard-page-content-left">
                <div className="dashboard-settings-item">
                    <div className="dashboard-settings-title">
                        <h2>Website title</h2>
                        <div className="dashboard-settings-title-icon">
                            <p>i</p>
                        </div>
                    </div>
                    <input placeholder="Enter a title"/>
                </div>
                <div className="dashboard-settings-item">
                    <div className="dashboard-settings-title">
                        <h2>Description</h2>
                        <div className="dashboard-settings-title-icon">
                            <p>i</p>
                        </div>
                    </div>
                    <textarea placeholder="Enter a desciption"/>
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
                            <img src="./images/favicon-placeholder.png"/>
                        </div>
                        <a href="" className="dashboard-settings-upload-btn"><i class="bi bi-cloud-upload"></i>Upload</a>
                        <div className="dashboard-error">
                            <div className="dashboard-icon-error">
                                <p>!</p>
                            </div>
                            <p className="dashboard-msg-error">The image must be 64x64 px</p>
                        </div>
                    </div>

                </div>
            </div>

            <a href="" className="dashboard-page-content-save-btn">Save</a>
            
            
        </div>
     </div>
        
        
    </>
    
);
}
