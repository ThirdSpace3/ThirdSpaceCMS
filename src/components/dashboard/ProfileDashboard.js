import React from "react";
import "./ProfileDashboard.css";
import "./DashboardMain.css";
import "../Root.css";



export default function ProfileDashboard() {
return (
     <>
             <div className="dashboard-page-container">
        <div className="projects-header-sticky">
            <div className="dashboard-header">
                <h1>Profile</h1>
            </div>
        </div>
        <div className="dashboard-page-content">
            <div className="dashboard-page-content-left">
                <div className="dashboard-settings-item">
                    <div className="dashboard-settings-title">
                        <h2>Username</h2>
                        <div className="dashboard-settings-title-icon">
                            <p>i</p>
                        </div>
                    </div>
                    <input placeholder="Enter a username"/>
                    <div className="dashboard-error">
                            <div className="dashboard-icon-error">
                                <p>!</p>
                            </div>
                            <p  className="dashboard-msg-error">Invalid username. Already taken.</p>
                        </div>
                </div>
                <div className="dashboard-settings-item">
                    <div className="dashboard-settings-title">
                        <h2>Adresse de portefeuille</h2>
                    </div>
                    <div className="dashboard-settings-wallet-box">
                        <a href="" className="dashboard-settings-wallet"><p>0xd472...ed51</p><i class="bi bi-copy"></i></a>
                        <div className="dashboard-settings-wallet-copied">
                            <p>Copié</p>
                        </div>
                    </div>
                </div>
                <div className="dashboard-settings-item">
                    <div className="dashboard-settings-title">
                        <h2>Bio</h2>
                        <div className="dashboard-settings-title-icon">
                            <p>i</p>
                        </div>
                    </div>
                    <textarea placeholder="Enter a desciption"/>
                </div>
                
                <div className="dashboard-settings-item">
                    <div className="dashboard-settings-title">
                        <h2>Profile picture</h2>
                        <div className="dashboard-settings-title-icon">
                            <p>i</p>
                        </div>
                    </div>
                    <div className="dashboard-settings-item-box-profile">
                        <div className="dashboard-settings-pp">
                            <img src="./images/favicon-placeholder.png"/>
                        </div>
                        <a href="" className="dashboard-settings-upload-btn"><i class="bi bi-cloud-upload"></i>Upload</a>
                        <div className="dashboard-error">
                            <div className="dashboard-icon-error">
                                <p>!</p>
                            </div>
                            <p  className="dashboard-msg-error">The image must be at least 300x300 px</p>
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
