import React from "react";
import "./DashboardMain.css";
import "../Root.css";


export default function LeftMenuDashboard() {
return (
     <>
     <div className="left-menu-container">
        

     <div className="left-menu-top">
        <div className="profile-container">
            <img src="./images/avatar-placeholder.png"/>
            <p className="profile-name">Andrew Smith</p>
        </div>
        <div className="left-menu-links">
            <a href=""  className="left-menu-item">
                <i class="bi bi-folder"></i>
                <p>Projects</p>
            </a>
            <a href=""  className="left-menu-item">
                <i class="bi bi-wallet2"></i>
                <p>Billing</p>
            </a>

        </div>
     </div>

     <div className="left-menu-bottom">
        <div className="left-menu-links">
            <a href=""  className="left-menu-item">
                <i class="bi bi-person"></i>
                <p>Profile</p>
            </a>
            <a href="" className="left-menu-item">
                <i class="bi bi-gear"></i>
                <p>Settings</p>
            </a>

        </div>
        <a href=""  className="left-menu-bug">
            <i class="bi bi-bug"></i>
            <p>Report Bug</p>
        </a>
        
     </div>

        


        

     </div>
        
    </>
    
);
}
