import React, { useState } from "react";
import "./LeftBar.css";
import "../Root.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import PanelAsset from "./PanelAsset";
import PanelFile from "./PanelFile";
import PanelLayers from "./PanelLayers";
import PanelPlus from "./PanelPlus";
import { useImageHistory } from "../../hooks/ImageHistoryContext";

export default function LeftBar({setTemplateContent, selectedElement, selectedProjectId,walletId, handleEditorChange, visiblePanel, setVisiblePanel, setSelectedImage }) {
  const { imageHistory} = useImageHistory();
  const { addImageToHistory } = useImageHistory();

  const togglePanel = (e, panel) => {
    e.preventDefault(); // Prevent the default anchor action
    setVisiblePanel(visiblePanel === panel ? null : panel);
  };

  // Ajout d'une condition pour appliquer une classe différente
  const mainClass = `navbar-wrapper-main ${
    visiblePanel ? "no-border-radius" : ""
  }`;

  // Fonction pour générer la classe du bouton en fonction du panneau visible
  const buttonClass = (panel) =>
    `navbar-icon ${visiblePanel === panel ? "active" : ""}`;

  // Function to handle switching between TextEditor and TemplateTestComponents
  const handleSwitch = (editor) => {
    handleEditorChange(editor);
  };

  return (
    <>
      <div className="navbar-wrapper">
        <div className={mainClass}>
          <div className="navbar-home-btn">
            <a href="./#/dashboard">
              <img src="https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageWebSite%2FPopup%2F3s-logo-picto.png?alt=media&token=eccaecaa-e624-4bb4-a1ad-54f181d09510" alt="Home" />
            </a>
            <hr />
          </div>
          <div className="navbar-icon-container">
            {/* <a href="#" className={buttonClass('plus')} onClick={(e) => togglePanel(e,'plus')}><i className="bi bi-plus-lg"></i></a>
                        <a href="#" className={buttonClass('file')} onClick={(e) => togglePanel(e,'file')}><i className="bi bi-file-earmark"></i></a>
                        <a href="#" className={buttonClass('layers')} onClick={(e) => togglePanel(e,'layers')}><i className="bi bi-layers"></i></a> */}
            <a
              href="#"
              className={buttonClass("images")}
              onClick={(e) => togglePanel(e, "images")}
            >
              <i className="bi bi-images"></i>
            </a>
          </div>
          {/* <a
            href="https://discord.gg/kehHCkUGRU"
            className="navbar-bugicon"
            target="_blank"
          >
            <i className="bi bi-bug"></i>
          </a> */}
        </div>

        {visiblePanel === "plus" && <PanelPlus />}
        {visiblePanel === "file" && <PanelFile handleSwitch={handleSwitch} />}
        {visiblePanel === "layers" && <PanelLayers />}
        {visiblePanel === "images" && (
          <PanelAsset setTemplateContent={setTemplateContent} selectedElement={selectedElement} selectedProjectId={selectedProjectId} walletId={walletId} imageHistory={imageHistory} setSelectedImage={setSelectedImage} setVisiblePanel={setVisiblePanel} visiblePanel={visiblePanel} />
        )}
      </div>
    </>
  );
}
