import './TemplateSteps.css';
import '../../Root.css';
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const TemplateStep5 = () => {

    const navigate = useNavigate(); // Initialize useNavigate
    const handleDoneClick = () => {
        navigate('/'); // Navigate to the homepage
    };


    return (
        <div id="etape5" className="template-confirmation">
            <h2 className="template-title">Thanks for your time!</h2>
            <p className="template-subtitle">Let's co-build Third Space! If you want to let a feedback feel free to do it, you can also report bugs by joining our Discord!</p>
            <div className="getintouch-socials">
                <a href="https://github.com/ThirdSpace3/ThirdSpaceCMS" target="_blank" rel="noopener noreferrer"><img src="img/logo-github-2.png" alt=""/>Join the community</a>
                <a href="https://discord.gg/q7X9Hb6rGz" target="_blank" rel="noopener noreferrer"><img src="img/logo-discord-2.png" alt=""/>Join the community</a>
            </div>
            <div className="template-input-box feedback-input-box">
                <p className="template-subtitle">Feel free to share your experience with ThirdSpace!</p>
                <input type="text" placeholder="Describe your experience..."/>
                <a href="#" id="feedback-button" className="purple-btn feedback-submit">Submit</a> 
                {/* Vraiment besoin des deux buttons ? 
                je peut faire une fonction qui SI il y a un input je recupere SINON non.
                je redirect au meme endroit de toute facon */}
            </div>

            <div className="final-btn-box">
                <button id="submit-button" className="purple-light-btn" onClick={handleDoneClick}>Done</button>
            </div>
        </div>
    );
};

export default TemplateStep5;
