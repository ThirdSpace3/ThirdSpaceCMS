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
              <img src='https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageWebSite%2Flogo-github-2.png?alt=media&token=7cf9730d-b62c-4d70-8594-c1d624f60d0b' alt="Github Logo" />
              Join the community
            </a>
            <a href="https://discord.gg/dked3DEngT" target="_blank" rel="noopener noreferrer">
              <img src='https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageWebSite%2Flogo-discord-2.png?alt=media&token=8892d7d3-f0cc-42e1-9b32-56ee65af366c' alt="Discord Logo" />
              Join the community
            </a>
          </div>
        </div>
      </section>
    );
  }
  
  export default GetInTouch;