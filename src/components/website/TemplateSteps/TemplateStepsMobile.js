import './TemplateSteps.css'
import '../../Root.css'
import React from 'react';

const TemplateStepsMobile= () => {
    return (
        <div class="template-mobile">
            <h2 class="template-title">We're working on the mobile version</h2>
            <p class="template-subtitle">Join our discord to stay up to date,</p>
            <div class="getintouch-socials">
                <a href="https://github.com/ThirdSpace3/ThirdSpaceCMS" target="_blank"><img src="https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageWebSite%2Flogo-github-2.png?alt=media&token=7cf9730d-b62c-4d70-8594-c1d624f60d0b" alt=""/>Join the community</a>
                <a href="https://discord.gg/dked3DEngT" target="_blank"><img src="https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageWebSite%2Flogo-discord-2.png?alt=media&token=8892d7d3-f0cc-42e1-9b32-56ee65af366c" alt=""/>Join the community</a>
            </div>
        </div>
        );
}

export default TemplateStepsMobile;