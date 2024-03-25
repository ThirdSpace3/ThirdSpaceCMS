import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

export default function Projectlists() {

  //#region 
  const [templates, setTemplates] = useState(null); // Initialized to null to differentiate loading state
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/api/templates') // Adjust the URL based on your server setup
      .then(response => response.json())
      .then(data => setTemplates(data))
      .catch(error => {
        console.error("Failed to load templates:", error);
        setTemplates([]); // In case of error, set templates to an empty array
      });
  }, []);

  const handleProjectClick = (templateName) => {
    navigate(`/logiciel/${templateName}`);
  };

  // Check if templates are null (loading state)
  if (templates === null) {
    return <div>Loading templates...</div>;
  }
//#endregion
  // Check if templates are an empty array (no templates found)
  if (templates.length === 0) {
    return (
      <div className="Projectlists">

        
        <div className="NewProjects">
          <img alt="Create New Project" /> {/* Add a meaningful src attribute or alternative content */}
          <h2>New Project</h2>
        </div>


        <div className="Projectlists_element placeholder">
          <div className="Projectlists_element_top">
            <i>Placeholder Icon</i>
            <p>No Templates Available</p>
          </div>
          <img></img>
          <div className="Projectlists_element_bt">
            <p>Template Name</p>
            <i>Placeholder Icon</i>
          </div>
        </div>






        {/* Duplique cette partie si tu as besion de plus de composant  */}
        <div className="Projectlists_element placeholder">
          <div className="Projectlists_element_top">
            <i>Placeholder Icon</i>
            <p>No Templates Available</p>
          </div>
          <img></img>
          <div className="Projectlists_element_bt">
            <p>Template Name</p>
            <i>Placeholder Icon</i>
          </div>
        </div>






      </div>
    );
  }

  //#region Dymique
      // Render the list of templates
      return (
        <>
          <div className="Projectlists">
            <div className="NewProjects">
              <img alt="Create New Project" /> {/* Add a meaningful src attribute or alternative content */}
              <h2>New Project</h2>
            </div>

            {templates.map((template, index) => (
              <div
                className="Projectlists_element"
                key={index}
                onClick={() => handleProjectClick(template.name)}
              >
                <div className="Projectlists_element_top">
                  <i>Time</i> {/* Consider replacing with actual content or icons */}
                  <p>Recently Viewed</p>
                </div>
                <iframe scrolling="no" src={`/template-preview/${template.name}`} title={`${template.name} Preview`} />
                <div className="Projectlists_element_bt">
                  <p>{template.name}</p>
                  <i>Dots</i> {/* Consider replacing with actual content or icons */}
                </div>
              </div>
            ))}
          </div>
        </>
      );
    }
//#endregion