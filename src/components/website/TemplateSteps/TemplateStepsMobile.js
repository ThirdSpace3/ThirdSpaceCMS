import './TemplateSteps.css'
import '../../Root.css'
import React from 'react';

const TemplateStepsMobile= () => {
    return (
        <div class="template-mobile">
            <h2 class="template-title">We're working on the mobile version</h2>
            <p class="template-subtitle">Join our discord to stay up to date,</p>
            <div class="getintouch-socials">
                <a href="https://github.com/ThirdSpace3/ThirdSpaceCMS" target="_blank"><img src="img/logo-github-2.png" alt=""/>Join the community</a>
                <a href="https://discord.gg/dked3DEngT" target="_blank"><img src="img/logo-discord-2.png" alt=""/>Join the community</a>
            </div>
        </div>
        );
}

export default TemplateStepsMobile;