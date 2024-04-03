import React from "react";
import "./BillingDashboard.css";
import "./DashboardMain.css";
import "../Root.css";



export default function BillingDashboard() {

  const featuresFreemium = [
    { icon: 'bi bi-check', text: 'Feature 1' },
    { icon: 'bi bi-check', text: 'Feature 2' },
    { icon: 'bi bi-x', text: 'Nom de Domaine' },
    { icon: 'bi bi-check', text: 'Feature 3' },
    { icon: 'bi bi-check', text: 'Feature 4' },
    { icon: 'bi bi-check', text: 'Feature 5' },
    { icon: 'bi bi-x', text: 'Feature 7' },
    { icon: 'bi bi-x', text: 'Feature 8' },
    { icon: 'bi bi-x', text: 'Feature 9' },
    { icon: 'bi bi-x', text: 'Feature 10' },
    { icon: 'bi bi-x', text: 'Feature 11' },
  ];
  const featuresBasic = [
    { icon: 'bi bi-check', text: 'Feature 1' },
    { icon: 'bi bi-check', text: 'Feature 2' },
    { icon: 'bi bi-x', text: 'Nom de Domaine' },
    { icon: 'bi bi-check', text: 'Feature 3' },
    { icon: 'bi bi-check', text: 'Feature 4' },
    { icon: 'bi bi-check', text: 'Feature 5' },
    { icon: 'bi bi-x', text: 'Feature 7' },
    { icon: 'bi bi-x', text: 'Feature 8' },
    { icon: 'bi bi-x', text: 'Feature 9' },
    { icon: 'bi bi-x', text: 'Feature 10' },
    { icon: 'bi bi-x', text: 'Feature 11' },
  ];
  const featuresPro = [
    { icon: 'bi bi-check', text: 'Feature 1' },
    { icon: 'bi bi-check', text: 'Feature 2' },
    { icon: 'bi bi-x', text: 'Nom de Domaine' },
    { icon: 'bi bi-check', text: 'Feature 3' },
    { icon: 'bi bi-check', text: 'Feature 4' },
    { icon: 'bi bi-check', text: 'Feature 5' },
    { icon: 'bi bi-x', text: 'Feature 7' },
    { icon: 'bi bi-x', text: 'Feature 8' },
    { icon: 'bi bi-x', text: 'Feature 9' },
    { icon: 'bi bi-x', text: 'Feature 10' },
    { icon: 'bi bi-x', text: 'Feature 11' },
  ];

return (
     <>
     
     <div className="dashboard-page-container">
        <div className="projects-header-sticky">
          <div className="dashboard-header">
            <h1>Billing</h1>
            
            <button className="dashboard-page-content-view-more">
            View Transactions History
            {/* <i className="bi bi-check"></i> */}
            </button>

       
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
            <div className="dashboard-billing-plans-container">

            {/* FREEMIUM */}
              <div className="dashboard-billing-plans-box">
                <div className="dashboard-billing-plans-box-header">
                  <h3>Freemium</h3>
                  <div className="dashboard-billing-plans-price">
                    <img src="./images/icon-usdc.png" />
                    <p className="dashboard-billing-plans-price-tag">0</p>
                    <p className="dashboard-billing-plans-price-label">/ Month (HT)</p>
                  </div>
                  <button className="dashboard-billing-plans-cta">Get Started Now</button>

                </div>
                <div className="dashboard-billing-plans-box-features">
                  {featuresFreemium.map((feature, index) => (
                    <div key={index} className="dashboard-billing-plans-feature">
                      <i className={`${feature.icon} ${feature.icon === 'bi bi-check' ? 'check-icon' : 'cross-icon'}`}></i>
                      <p className={`feature-text ${feature.icon === 'bi bi-check' ? 'check-text' : 'cross-text'}`}>{feature.text}</p>
                    </div>
                  ))}
                </div>

              </div>

              {/* BASIC */}
              <div className="dashboard-billing-plans-box">
                <div className="dashboard-billing-plans-box-header">
                  <h3>Basic</h3>
                  <div className="dashboard-billing-plans-price">
                    <img src="./images/icon-usdc.png" />
                    <p className="dashboard-billing-plans-price-tag">12.49</p>
                    <p className="dashboard-billing-plans-price-label">/ Month (HT)</p>
                  </div>
                  <button className="dashboard-billing-plans-cta">Get Started Now</button>

                </div>
                <div className="dashboard-billing-plans-box-features">
                  {featuresBasic.map((feature, index) => (
                    <div key={index} className="dashboard-billing-plans-feature">
                      <i className={`${feature.icon} ${feature.icon === 'bi bi-check' ? 'check-icon' : 'cross-icon'}`}></i>
                      <p className={`feature-text ${feature.icon === 'bi bi-check' ? 'check-text' : 'cross-text'}`}>{feature.text}</p>
                    </div>
                  ))}
                </div>

              </div>

              {/* PRO */}
              <div className="dashboard-billing-plans-box">
                <div className="dashboard-billing-plans-box-header">
                  <h3>Profesionnal</h3>
                  <div className="dashboard-billing-plans-price">
                    <img src="./images/icon-usdc.png" />
                    <p className="dashboard-billing-plans-price-tag">29.99</p>
                    <p className="dashboard-billing-plans-price-label">/ Month (HT)</p>
                  </div>
                  <button className="dashboard-billing-plans-cta">Get Started Now</button>

                </div>
                <div className="dashboard-billing-plans-box-features">
                  {featuresPro.map((feature, index) => (
                    <div key={index} className="dashboard-billing-plans-feature">
                      <i className={`${feature.icon} ${feature.icon === 'bi bi-check' ? 'check-icon' : 'cross-icon'}`}></i>
                      <p className={`feature-text ${feature.icon === 'bi bi-check' ? 'check-text' : 'cross-text'}`}>{feature.text}</p>
                    </div>
                  ))}
                </div>

              </div>

              {/* ENTERPRISE */}
              <div className="dashboard-billing-plans-box">
                <div className="dashboard-billing-plans-box-header">
                  <h3>Enterprise</h3>
                  <div className="dashboard-billing-plans-price">
                    <p className="dashboard-billing-plans-price-tag">On Request</p>
                  </div>
                  <button className="dashboard-billing-plans-cta">Get Started Now</button>

                </div>
                

              </div>

            </div>

          </div>
                   
        </div>
      </div>

        
    </>
    
);
}
