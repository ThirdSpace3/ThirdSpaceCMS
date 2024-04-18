import "../Root.css";
import "./PropulsePopup.css";

export default function PropulsePopup() {
  return (
    <>
      <div className="propulse-popup-container">
        <h2 className="propulse-popup-title">
          Where will you propulse your project ?
        </h2>
        <hr className="propulse-popup-hr" />
        {/*===Test deploy===*/}
        <div className="propulse-popup-container-box">
          <div className="propulse-popup-container-box-top">
            <p className="propulse-popup-main-txt">Test</p>
            <a href="">
              <i class="bi bi-box-arrow-up-right"></i>
            </a>
          </div>
          <div className="propulse-popup-container-box-bottom">
            <p className="propulse-popup-txt">netbook.thirdspace.x</p>
            <label class="switch">
              <input type="checkbox" />
              <span class="slider"></span>
            </label>
          </div>
        </div>
        <hr className="propulse-popup-hr" />
        {/*===Live deploy===*/}
        <div className="propulse-popup-container-box">
          <div className="propulse-popup-container-box-top">
            <p className="propulse-popup-main-txt">Live</p>
            <a href="">
              <i class="bi bi-box-arrow-up-right"></i>
            </a>
          </div>
          <div className="propulse-popup-container-box-bottom">
            <a className="propulse-popup-txt" href="">
              Add Custom Domain
            </a>
            <label class="switch">
              <input type="checkbox" />
              <span class="slider"></span>
            </label>
          </div>
        </div>
        <hr className="propulse-popup-hr" />
        <a href="" className="propule-popup-btn">
          Propulse to selected domains
        </a>
        <div className="propulse-popup-ongoing">
          <i class="bi bi-rocket-takeoff"></i>
          <p>Propulsing in progress...</p>
        </div>
        <div className="propulse-popup-success">
          <i class="bi bi-check2-circle"></i>
          <p>Propulsing Successful!</p>
        </div>
      </div>
    </>
  );
}
