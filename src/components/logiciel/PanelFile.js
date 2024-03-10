import React from 'react';
import './NavBar.css';
import '../Root.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function PanelFile({ handleSwitch }) {
    return (
        <>
            <div className='navbar-panel'>
                <p>File</p>
                <div className='navbar-panel-buttons'>
                    <button onClick={() => handleSwitch('TextEditor')}>Text Editor</button>
                    <button onClick={() => handleSwitch('TemplateTestComponents')}>Template Test Components</button>
                </div>
            </div>
        </>
    );
}
