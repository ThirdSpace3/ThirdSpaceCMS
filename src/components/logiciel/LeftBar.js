import React, { useState } from 'react';
import './LeftBar.css';
import '../Root.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import PanelAsset from './PanelAsset';
import PanelFile from './PanelFile';
import PanelLayers from './PanelLayers';
import PanelPlus from './PanelPlus';

export default function LeftBar({ handleEditorChange, imageHistory }) {
    const [visiblePanel, setVisiblePanel] = useState(null);

    const togglePanel = (panel) => {
        setVisiblePanel(visiblePanel === panel ? null : panel);
    };

    // Ajout d'une condition pour appliquer une classe différente
    const mainClass = `navbar-wrapper-main ${visiblePanel ? 'no-border-radius' : ''}`;

    // Fonction pour générer la classe du bouton en fonction du panneau visible
    const buttonClass = (panel) => `navbar-icon ${visiblePanel === panel ? 'active' : ''}`;

    // Function to handle switching between TextEditor and TemplateTestComponents
    const handleSwitch = (editor) => {
        handleEditorChange(editor);
    };

    return (
        <>
            <div className='navbar-wrapper'>
                <div className={mainClass}>
                    <div className='navbar-home-btn'>
                        <a href="./"><img src='/images/3s-logo-picto.png' alt="Home"/></a>
                        <hr />
                    </div>
                    <div className='navbar-icon-container'>
                        <a href="#" className={buttonClass('plus')} onClick={() => togglePanel('plus')}><i className="bi bi-plus-lg"></i></a>
                        <a href="#" className={buttonClass('file')} onClick={() => togglePanel('file')}><i className="bi bi-file-earmark"></i></a>
                        <a href="#" className={buttonClass('layers')} onClick={() => togglePanel('layers')}><i className="bi bi-layers"></i></a>
                        <a href="#" className={buttonClass('images')} onClick={() => togglePanel('images')}><i className="bi bi-images"></i></a>
                    </div>
                    <a href="#" className='navbar-bugicon'><i className="bi bi-bug"></i></a>
                </div>

                {visiblePanel === 'plus' && <PanelPlus />}
                {visiblePanel === 'file' && <PanelFile handleSwitch={handleSwitch} />}
                {visiblePanel === 'layers' && <PanelLayers />}
                {visiblePanel === 'images' && <PanelAsset imageHistory={imageHistory} />
}
            </div>
        </>
    );
}
