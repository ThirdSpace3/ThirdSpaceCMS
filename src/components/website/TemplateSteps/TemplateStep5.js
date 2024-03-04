import './TemplateSteps.css'
import '../../Root.css'
import React from 'react';

const TemplateStep5= () => {
    return (
        <div id="etape5" class="template-confirmation">
        <h2 class="template-title">Thanks for your time!</h2>
        <p class="template-subtitle">Let's co-build Third Space! If you want to let a feedback feel free to do it , you can also report bugs by joining our Discord!</p>
        <div class="getintouch-socials">
            <a href="https://github.com/ThirdSpace3/ThirdSpaceCMS" target="_blank"><img src="img/logo-github-2.png" alt=""/>Join the community</a>
            <a href="https://discord.gg/q7X9Hb6rGz" target="_blank"><img src="img/logo-discord-2.png" alt=""/>Join the community</a>
        </div>
        <div class="template-input-box feedback-input-box">
            <p class="template-subtitle">Feel free to share your experience with ThirdSpace!</p>
            <input type="text" placeholder="Describe your exeprience..."/>
            <a href="#" id="feedback-button" class="purple-btn feedback-submit">Submit</a>
        </div>

    <div class="final-btn-box">
        <button id="submit-button" class="purple-light-btn disabled">Done</button>
    </div>
</div>
        );
}

export default TemplateStep5;