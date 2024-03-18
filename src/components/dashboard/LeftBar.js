import React from "react"
import './LeftBar.css'
 function leftbardashboard() {
    return (
        <>
        <div className="leftbar_wrapper">
            <div className="topPartLeftBar">
            <div className="Profil_Display">
                <img src=""></img>
                <h2>Andrew Smith</h2>
                <i>Notifications</i>
            </div>
            <div className="Dashboard_Menu">
                <div className="Dashboard_Menu_element">
                    <i>folder</i>
                    <p>Projects</p>
                </div>
                <div className="Dashboard_Menu_element">
                    <i>wallet</i>
                    <p>Billing</p>
                </div>
                <div className="Dashboard_Menu_element">
                    <i>Marketplace</i>
                    <p>Shop</p>
                </div>
                <div className="Dashboard_Menu_element">
                    <i>Forum Q/A</i>
                    <p>World</p>
                </div>
                <div className="Dashboard_Menu_element">
                    <i>User Guide</i>
                    <p>Guide</p>
                </div>
                <div className="Dashboard_Menu_element">
                    <i>API Documentation</i>
                    <p>Link</p>
                </div>
                <div className="Dashboard_Menu_element">
                    <i>About Us</i>
                    <p>+</p>
                </div>
            </div>
            </div>
            <div className="footer_leftbar">
                <div className="footer_content">
                <div className="footer_element">
                    <i>Profile</i>
                    <p>Profile</p>
                </div>
                <div className="footer_element">
                    <i>Mail</i>
                    <p>Contact Us</p>
                </div>
                <div className="footer_element">
                    <i>Settings</i>
                    <p>Settings</p>
                </div>
                </div>
                <i>Bug</i>
                <p>Report Bug</p>
            </div>
        </div>
        </>
    )
}

export default leftbardashboard;