import React from "react";
import './LeftBar.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function LeftBarDashboard() {
  // Retrieve the user's wallet address from sessionStorage
  const userAccount = sessionStorage.getItem('userAccount');

  // Extract only the first three characters of the wallet address
  const displayAccount = userAccount ? `${userAccount.substring(0, 3)}...` : 'Not Connected';

  return (
    <>
      <div className="leftbar_wrapper">
        <div className="topPartLeftBar">
          <div className="Profil_Display">
            <img src="" alt="Profile Avatar" /> {/* Consider adding a default or conditional image source */}
            <h2>User : {displayAccount}</h2> {/* Updated to display shortened wallet address */}
            <i className="bi bi-bell"></i> {/* Added Bootstrap Icon for Notifications */}
          </div>
          <div className="Dashboard_Menu">
            {/* Menu items with Bootstrap Icons */}
            <a href="../logiciel" className="Dashboard_Menu_element"><i className="bi bi-folder"></i><p>Projects</p></a>
            <div className="Dashboard_Menu_element"><i className="bi bi-wallet"></i><p>Billing</p></div>
            <div className="Dashboard_Menu_element"><i className="bi bi-shop"></i><p>Marketplace</p></div>
            <div className="Dashboard_Menu_element"><i className="bi bi-question-circle"></i><p>Forum Q/A</p></div>
            <div className="Dashboard_Menu_element"><i className="bi bi-book"></i><p>user Guide</p></div>
            <div className="Dashboard_Menu_element"><i className="bi bi-link-45deg"></i><p>API Documentation</p></div>
            <div className="Dashboard_Menu_element"><i className="bi bi-plus"></i><p>About Us</p></div>
          </div>
        </div>
        <div className="footer_leftbar">
        <div className="footer_content">
              {/* Footer items with Bootstrap Icons */}
              <div className="footer_element"><i className="bi bi-person"></i><p>Profile</p></div>
              <div className="footer_element"><i className="bi bi-envelope"></i><p>Contact Us</p></div>
              <div className="footer_element"><i className="bi bi-gear"></i><p>Settings</p></div>
            </div>
            <i className="bi bi-bug"></i> {/* Added Bootstrap Icon for Report Bug */}
            <p>Report Bug</p>
        </div>
      </div>
    </>
  );
}

export default LeftBarDashboard;
