import './TemplateSteps.css'
import '../../Root.css'
import React from 'react';

const TemplateStep2= () => {
    return (
        <div  id="etape2"  >
        <div class="step-box">
            <h2 class="template-title">What are your main objectives?</h2>
            <p class="template-subtitle">Select all the items that apply. If something interests you but isn't a top priority, don't worry. You can add all our features to the template of your choice.</p>
            <div class="template-label-box-2">
                <div class="template-label-row">
                    <button class="selectable-button-2" id="design">Upsells my collections </button>
                    <button class="selectable-button-2" id="crypto">Boost my visibility </button>    
                </div>
                <div class="template-label-row">
                    <button class="selectable-button-2" id="market">Deploy my market</button>
                    <button class="selectable-button-2" id="work">Organize my work</button>    
                </div>
                <div class="template-label-row">
                    <button class="selectable-button-2" id="Share">Share a subject </button>
                    <button class="selectable-button-2" id="Communication">Communication</button>    
                </div>
                <div class="template-label-row">
                    <button class="selectable-button-2" id="form">Contact form</button>
                    <button class="selectable-button-2" id="Communautary">Communautary fidelisation</button>    
                </div>
                <div class="template-label-row">
                    <button class="selectable-button-2" id="Marketplace">Marketplace </button>
                    <button class="selectable-button-2" id="Learning">Learning plateform</button>    
                </div>
            </div>
            <div class="template-input-box">
                <p class="template-subtitle">Looking for a feature we don't provide yet ? Ask it and we will make it happen</p>
                <input type="text" placeholder="Describe your feature..."/>
            </div>
        </div>
    </div>
        );
}

export default TemplateStep2;