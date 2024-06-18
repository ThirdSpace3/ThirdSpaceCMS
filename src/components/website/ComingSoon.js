import "./ComingSoon.css";
import "../Root.css";
import React from "react";

export default function ComingSoon() {
  return (
    <>
      <div className="comingsoon-container">
        <h1>Coming Soon</h1>
        <p>
          We're currently working on creating something fantastic. We'll be here
          soon!
        </p>
        <a href="/home" className="purple-btn">
          Go Back Home
        </a>
        <img src="https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageWebSite%2Fheader-deco.png?alt=media&token=45950dca-a838-4d9f-875e-c3b08d228e44" className="comingsoon-bg" />
      </div>
    </>
  );
}
