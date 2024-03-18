import React from 'react';
import './LeftBar.css';
import '../Root.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function PanelFile({ handleSwitch }) {
    return (
        <>
            <div className='navbar-panel'>
                <p>File</p>
                <div className='navbar-panel-buttons'>
                    <button onClick={() => handleSwitch('TemplateFullText')}>TemplateFullText</button>
                    <button onClick={() => handleSwitch('TemplateImg_txt')}>TemplateImg_txt</button>
                </div>
            </div>
        </>
    );
}
