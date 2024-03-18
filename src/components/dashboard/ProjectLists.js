import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

export default function Projectlists() {
  const [templates, setTemplates] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/templates")
      .then((response) => response.json())
      .then((data) => setTemplates(data))
      .catch((error) => console.error("Error fetching templates:", error));
  }, []);

  const handleProjectClick = (templateName) => {
    navigate(`/logiciel/${templateName}`);
  };
  
  return (
    <>
      <div className="Projectlists">
        <div className="NewProjects">
          <img></img>
          <h2>New Project</h2>
        </div>

        {templates.map((template, index) => (
          <div
            className="Projectlists_element"
            key={index}
            onClick={() => handleProjectClick(template.name)}
          >
            <div className="Projectlists_element_top">
              <i>Time</i>
              <p>Recently Viewed</p>
            </div>
            <img src={template.previewImage} alt={template.name} />
            <div className="Projectlists_element_bt">
              <p>{template.name}</p>
              <i>Dots</i>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
