import React from "react";
import "./BillingDashboard.css";
import "./DashboardMain.css";
import "../Root.css";

export default function BillingDashboard() {
  const featuresFreemium = [
    {
      icon: "bi bi-check",
      text: "15 additional Smart Contract interactions 1",
    },
    { icon: "bi bi-check", text: "Feature 2" },
    { icon: "bi bi-x", text: "Nom de Domaine" },
    { icon: "bi bi-check", text: "Feature 3" },
    { icon: "bi bi-check", text: "Feature 4" },
    { icon: "bi bi-check", text: "Feature 5" },
    { icon: "bi bi-x", text: "Feature 7" },
    { icon: "bi bi-x", text: "Feature 8" },
    { icon: "bi bi-x", text: "Feature 9" },
    { icon: "bi bi-x", text: "Feature 10" },
    { icon: "bi bi-x", text: "Feature 11" },
  ];
  const featuresBasic = [
    {
      icon: "bi bi-check",
      text: "15 additional Smart Contract interactions 1",
    },
    { icon: "bi bi-check", text: "Feature 2" },
    { icon: "bi bi-x", text: "Nom de Domaine" },
    { icon: "bi bi-check", text: "Feature 3" },
    { icon: "bi bi-check", text: "Feature 4" },
    { icon: "bi bi-check", text: "Feature 5" },
    { icon: "bi bi-x", text: "Feature 7" },
    { icon: "bi bi-x", text: "Feature 8" },
    { icon: "bi bi-x", text: "Feature 9" },
    { icon: "bi bi-x", text: "Feature 10" },
    { icon: "bi bi-x", text: "Feature 11" },
  ];
  const featuresPro = [
    {
      icon: "bi bi-check",
      text: "15 additional Smart Contract interactions 1",
    },
    { icon: "bi bi-check", text: "Feature 2" },
    { icon: "bi bi-x", text: "Nom de Domaine" },
    { icon: "bi bi-check", text: "Feature 3" },
    { icon: "bi bi-check", text: "Feature 4" },
    { icon: "bi bi-check", text: "Feature 5" },
    { icon: "bi bi-x", text: "Feature 7" },
    { icon: "bi bi-x", text: "Feature 8" },
    { icon: "bi bi-x", text: "Feature 9" },
    { icon: "bi bi-x", text: "Feature 10" },
    { icon: "bi bi-x", text: "Feature 11" },
  ];

  return (
    <>
      <div className="dashboard-page-container">
        <div className="projects-header-sticky">
          <div className="dashboard-header">
            <h1>Billing</h1>

            {/* <button className="dashboard-page-content-view-more">
              View Transactions History
              <i className="bi bi-check"></i>
            </button> */}
          </div>
        </div>

        <div className="dashboard-page-content">
          <div className="dashboard-billing-plans">
            <div className="dashboard-billing-header">
              <div className="dashboard-billing-left">
                <h2>Discover our plans</h2>
                <p>You can change your package at any time.</p>
              </div>

              {/* <div className="dashboard-billing-right">
                <div class="switch">
                  <input type="checkbox" id="switch" />
                  <label for="switch"></label>
                </div>
              </div> */}
            </div>
            <p className="dashboard-billing-header-warning">
              <i class="bi bi-exclamation-triangle"></i>
              We're still in the testing phase. Quotas are not yet applied.
            </p>

            <div className="dashboard-billing-plans-container">
              {/* FREEMIUM */}
              <div className="dashboard-billing-plans-box">
                <div className="dashboard-billing-plans-box-header">
                  <h3 className="dashboard-billing-plans-box-header-title">
                    Freemium
                  </h3>
                  <div className="dashboard-billing-plans-price">
                    <img src="./images/icon-usdc.png" />
                    <p className="dashboard-billing-plans-price-tag">0</p>
                    <p className="dashboard-billing-plans-price-label">
                      / Month (HT)
                    </p>
                  </div>
                  <button className="dashboard-billing-plans-cta dashboard-billing-plans-cta-diasbled">
                    <i class="bi bi-lock-fill"></i> Coming Soon
                  </button>
                </div>
                <div className="dashboard-billing-plans-box-features">
                  {featuresFreemium.map((feature, index) => (
                    <div
                      key={index}
                      className="dashboard-billing-plans-feature"
                    >
                      <i
                        className={`${feature.icon} ${
                          feature.icon === "bi bi-check"
                            ? "check-icon"
                            : "cross-icon"
                        }`}
                      ></i>
                      <p
                        className={`feature-text ${
                          feature.icon === "bi bi-check"
                            ? "check-text"
                            : "cross-text"
                        }`}
                      >
                        {feature.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* BASIC */}
              <div className="dashboard-billing-plans-box dashboard-billing-plans-box-purple">
                <div className="dashboard-billing-plans-box-header">
                  <h3 className="dashboard-billing-plans-box-header-title-white">
                    Basic
                  </h3>
                  <div className="dashboard-billing-plans-price">
                    <img src="./images/icon-usdc.png" />
                    <p className="dashboard-billing-plans-price-tag-white">
                      12.49
                    </p>
                    <p className="dashboard-billing-plans-price-label-white">
                      / Month (HT)
                    </p>
                  </div>
                  <button className="dashboard-billing-plans-cta dashboard-billing-plans-cta-diasbled">
                    <i class="bi bi-lock-fill"></i>Coming Soon
                  </button>
                </div>
                <div className="dashboard-billing-plans-box-features">
                  {featuresBasic.map((feature, index) => (
                    <div
                      key={index}
                      className="dashboard-billing-plans-feature"
                    >
                      <i
                        className={`${feature.icon} ${
                          feature.icon === "bi bi-check"
                            ? "check-icon-purplecard"
                            : "cross-icon-purplecard"
                        }`}
                      ></i>
                      <p
                        className={`feature-text ${
                          feature.icon === "bi bi-check"
                            ? "check-text-purplecard"
                            : "cross-text-purplecard"
                        }`}
                      >
                        {feature.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* PRO */}
              <div className="dashboard-billing-plans-box">
                <div className="dashboard-billing-plans-box-header">
                  <h3 className="dashboard-billing-plans-box-header-title">
                    Profesionnal
                  </h3>
                  <div className="dashboard-billing-plans-price">
                    <img src="./images/icon-usdc.png" />
                    <p className="dashboard-billing-plans-price-tag">29.99</p>
                    <p className="dashboard-billing-plans-price-label">
                      / Month (HT)
                    </p>
                  </div>
                  <button className="dashboard-billing-plans-cta dashboard-billing-plans-cta-diasbled">
                    <i class="bi bi-lock-fill"></i> Coming Soon
                  </button>
                </div>
                <div className="dashboard-billing-plans-box-features">
                  {featuresPro.map((feature, index) => (
                    <div
                      key={index}
                      className="dashboard-billing-plans-feature"
                    >
                      <i
                        className={`${feature.icon} ${
                          feature.icon === "bi bi-check"
                            ? "check-icon"
                            : "cross-icon"
                        }`}
                      ></i>
                      <p
                        className={`feature-text ${
                          feature.icon === "bi bi-check"
                            ? "check-text"
                            : "cross-text"
                        }`}
                      >
                        {feature.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              {/* EXTENSION */}
              <div className="dashboard-billing-plans-box">
                <div className="dashboard-billing-plans-box-left">
                  <div className="dashboard-billing-plans-box-header">
                    <h3 className="dashboard-billing-plans-box-header-title">
                      Extension Pack
                    </h3>
                    <div className="dashboard-billing-plans-price">
                      <img src="./images/icon-usdc.png" />
                      <p className="dashboard-billing-plans-price-tag">9.99</p>
                      <p className="dashboard-billing-plans-price-label">
                        / Month (HT)
                      </p>
                    </div>
                    <button className="dashboard-billing-plans-cta dashboard-billing-plans-cta-diasbled">
                      <i class="bi bi-lock-fill"></i> Coming Soon
                    </button>
                  </div>
                  <div className="dashboard-billing-plans-box-features dashboard-billing-plans-box-features-column">
                    <div className="dashboard-billing-plans-feature">
                      <i className="bi bi-check check-icon"></i>
                      <p className="check-text">
                        Additional 10 GB Cloud storage
                      </p>
                    </div>
                    <p className="dashboard-billing-plans-feature-or">OU</p>
                    <div className="dashboard-billing-plans-feature">
                      <i className="bi bi-check check-icon"></i>
                      <p className="check-text">1 customized domain name</p>
                    </div>
                    <p className="dashboard-billing-plans-feature-or">OU</p>
                    <div className="dashboard-billing-plans-feature">
                      <i className="bi bi-check check-icon"></i>
                      <p className="check-text">
                        15 additional Smart Contract interactions
                      </p>
                    </div>
                    <p className="dashboard-billing-plans-feature-or">OU</p>
                    <div className="dashboard-billing-plans-feature">
                      <i className="bi bi-check check-icon"></i>
                      <p className="check-text">1 additional employee</p>
                    </div>
                  </div>
                </div>

                {/* ENTERPRISE */}
                <div className="dashboard-billing-plans-box-more">
                  <div className="dashboard-billing-plans-box-header">
                    <h3 className="dashboard-billing-plans-box-header-title dashboard-billing-plans-box-more-title">
                      Looking for more ?
                    </h3>
                  </div>
                  <a
                    href=""
                    className="dashboard-billing-plans-cta-more dashboard-billing-plans-cta-more-soon"
                  >
                    <i class="bi bi-lock-fill"></i> Get an Estimate Soon{" "}
                    <i class="bi bi-arrow-right"></i>
                  </a>
                </div>
              </div>

              {/* <div className="dashboard-billing-plans-box-column">

                

              </div> */}
            </div>

            <div className="dashboard-billing-plans-student">
              <div className="dashboard-billing-plans-box-header">
                <h3 className="dashboard-billing-plans-box-header-title">
                  For Students
                </h3>
                <p className="dashboard-billing-plans-student-text">
                  Get all the features include in the “Profesional” solution.
                </p>
                <a
                  href=""
                  className="dashboard-billing-plans-cta-more dashboard-billing-plans-cta-more-soon"
                >
                  <i class="bi bi-lock-fill"></i> Verify Eligibility Soon{" "}
                  <i class="bi bi-arrow-right"></i>
                </a>
              </div>
              <div className="dashboard-billing-plans-price">
                <img src="./images/icon-usdc.png" />
                <p className="dashboard-billing-plans-price-tag">5.99</p>
                <p className="dashboard-billing-plans-price-label">
                  / Month (HT)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
