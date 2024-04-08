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
        <img src="./images/header-deco.png" className="comingsoon-bg" />
      </div>
    </>
  );
}
