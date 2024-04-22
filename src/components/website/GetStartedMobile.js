import "./ComingSoon.css";
import "../Root.css";
import React from "react";
import Navbar from "./NavBar";

export default function GetStartedMobile() {
  return (
    <>
        <Navbar/>

      <div className="comingsoon-container">
        <h1>Coming Soon</h1>
        <p>
        We are not yet available on mobile. We'll be here
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
