import React, { useState, useEffect, useRef } from "react";
import "./SiteSettingsDashboard.css";
import "./DashboardMain.css";
import "../Root.css";
import { updateDoc, db, doc, getDoc } from "../../firebaseConfig";
export default function SiteSettingsDashboard({
  projects,
  updateProject,
  onReturnToProjects,
  setCurrentProject,
  selectedProject,
}) {
  const [newTemplateName, setNewTemplateName] = useState("");
  const [templateName, setTemplateName] = useState(selectedProject ? selectedProject.name : "");
  const [templateDescription, setTemplateDescription] = useState(selectedProject ? selectedProject.description : "");
  const [favicon, setFavicon] = useState(selectedProject ? selectedProject.favicon : "");
  const [faviconPreview, setFaviconPreview] = useState(selectedProject ? selectedProject.favicon : "");
  const [isEdited, setIsEdited] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isImageError, setIsImageError] = useState(false);
  const fileInputRef = useRef(null);
  
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
          // setIsEdited(false);
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
    e.preventDefault(); // This line prevents the default anchor action

    fileInputRef.current.click();
  };
  const walletID = sessionStorage.getItem("userAccount");



  const handleSave = async () => {
    console.log(projects);

    const projectRef = doc(db, "projects", walletID, "projectData", projects.id.toString());
    try {
      await updateDoc(projectRef, {
        name: templateName,
        description: templateDescription,
        favicon: favicon,
      });
      setIsEdited(false);
      setIsSaved(true);
      setTimeout(() => {
        setIsSaved(false);
      }, 3000);
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };
  

  
  // useEffect(() => {
  //   const fetchSelectedProject = async () => {
  //     const projectRef = doc(db, "projects", walletID, 'projectData', selectedProject.id);
  //     const projectSnap = await getDoc(projectRef);
  //     if (projectSnap.exists()) {
  //       setTemplateName(projectSnap.data().name);
  //       setTemplateDescription(projectSnap.data().description);
  //       setFavicon(projectSnap.data().favicon);
  //     }
  //   };
  //   if (selectedProject) {
  //     fetchSelectedProject();
  //   }
  // }, [selectedProject]);
  
  return (
    <div className="dashboard-page-container">
      <div className="projects-header-sticky">
        <div className="dashboard-header">
          <div className="dashboard-title-box">
            <div onClick={onReturnToProjects}>
              <i className="bi bi-arrow-left-short dashboard-return-icon"></i>
            </div>
            <h1>
              <span>{projects.name}</span> Settings
            </h1>
          </div>
          <button
            className={`dashboard-page-content-save-btn${isEdited ? "-activated" : ""
              }`}
            type="button"
            onClick={handleSave}
          >
            {isSaved ? <i className="bi bi-check"></i> : "Save"}
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
              placeholder={projects.name}
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
              placeholder={projects.description}
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
                <a
                  href="#"
                  className="dashboard-settings-upload-btn"
                  onClick={handleUploadButtonClick}
                >
                  <i className="bi bi-cloud-upload"></i>Upload
                </a>

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
              <input
                type="file"
                accept="image/*"
                onChange={handleFaviconUpload}
                ref={fileInputRef}
                style={{ display: "none" }}
              />

            </div>
          </div>
          <div className="dashboard-settings-item">
            <div className="dashboard-settings-title">
              {/* <h2>Delete website</h2>
              */}

            </div>
            <a href="" className="dashboard-settings-delete"><i class="bi bi-trash3"></i>
              <p>Delete my website</p></a>
          </div>
        </div>
      </div>
    </div>
  );
}
