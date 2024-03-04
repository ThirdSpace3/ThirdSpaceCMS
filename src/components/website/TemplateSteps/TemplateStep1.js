import './TemplateSteps.css'
import '../../Root.css'
import React from 'react';

const TemplateStep1= () => {
    return (
        <div  id="etape1"  >
        <div class="step-box">
            <h2 class="template-title">What is your site about?</h2>
            <p class="template-subtitle">This will enable us to give you some initial ideas and examples.</p>
            <div class="template-label-box">
                <button class="selectable-button" id="design">Design</button>
                <button class="selectable-button" id="crypto">Crypto</button>
                <button class="selectable-button" id="nft">NFT</button>
                <button class="selectable-button" id="portfolio">Portfolio</button>
                <button class="selectable-button" id="collections">Collections</button>
                <button class="selectable-button" id="3dmodels">3D Models</button>
                <button class="selectable-button" id="games">Games</button>
                <button class="selectable-button" id="blogs">Blogs</button>
                <button class="selectable-button" id="marketing">Marketing</button>
                <button class="selectable-button" id="mode">Mode</button>
                <button class="selectable-button" id="marketplace">Marketplace</button>
                <button class="selectable-button" id="dapps">DApps</button>
                <button class="selectable-button" id="defi">DeFi</button>
                <button class="selectable-button" id="dex">DEX</button>
                <button class="selectable-button" id="dao">DAO</button>
                <button class="selectable-button" id="education">Education</button>
                <button class="selectable-button" id="security">Security</button>
                <button class="selectable-button" id="storage">Storage</button>
                <button class="selectable-button" id="library">Library</button>
                <button class="selectable-button" id="socialmedias">Social Medias</button>
                <button class="selectable-button" id="crowdraising">Crowd Raising</button>
            </div>
            <div class="template-input-box">
                <p class="template-subtitle">Can't find what you're looking for?</p>
                <input type="text" placeholder="Describe your website..."/>
            </div>
        </div>
    </div>
        );
}

export default TemplateStep1;