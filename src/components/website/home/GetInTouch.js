import './GetInTouch.css'
import '../../Root.css'
import React from 'react';

function GetInTouch() {
    return (
      <section className="getintouch section">
        <div className="getintouch-content">
          <h2>Get in touch...</h2>
          <p>
            Join the 3S Lover Club, and stay updated on all the informations.
            <br />
            Make sure to join our discord if you have any questions about us or our solutions.
          </p>
          <div className="getintouch-socials">
            <a href="https://github.com/ThirdSpace3" target="_blank" rel="noopener noreferrer">
              <img src='./images/logo-github-2.png' alt="Github Logo" />
              Join the community
            </a>
            <a href="https://discord.gg/dked3DEngT" target="_blank" rel="noopener noreferrer">
              <img src='./images/logo-discord-2.png' alt="Discord Logo" />
              Join the community
            </a>
          </div>
        </div>
      </section>
    );
  }
  
  export default GetInTouch;