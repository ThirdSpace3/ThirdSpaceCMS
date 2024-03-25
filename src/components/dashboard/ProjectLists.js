import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

export default function Projectlists() {
  const [templates, setTemplates] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/api/templates') // Adjust the URL based on your server setup
      .then(response => response.json())
      .then(data => setTemplates(data))
      .catch(error => console.error("Failed to load templates:", error));
  }, []);

  const handleProjectClick = (templateName) => {
    navigate(`/logiciel/${templateName}`);
  };

  return (
    <>
      <div className="Projectlists">
        <div className="NewProjects">
          <img></img> {/* Consider adding a src attribute or removing the tag if not used */}
          <h2>New Project</h2>
        </div>

        {templates.map((template, index) => (
          <div
            className="Projectlists_element"
            key={index}
            onClick={() => handleProjectClick(template.name)}
          >
            <div className="Projectlists_element_top">
              <i>Time</i> {/* This seems to be placeholder content */}
              <p>Recently Viewed</p>
            </div>
            <iframe scrolling="no" src={`/template-preview/${template.name}`} title={`${template.name} Preview`} />
            <div className="Projectlists_element_bt">
              <p>{template.name}</p>
              <i>Dots</i> {/* This seems to be placeholder content */}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
