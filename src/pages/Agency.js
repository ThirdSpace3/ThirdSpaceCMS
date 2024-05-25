import NavBar from "../components/website/NavBar";
import Footer from "../components/website/Footer";
import "../components/website/agency.css";
import React, { useState, useRef } from "react";
import { db, collection, getDocs } from "../firebaseConfig"; // Assuming Firestore is correctly imported and configured
import { Link } from "react-router-dom";
import ContactForm from "../components/website/ContactForm";

export default function Agency() {
  const [hasWalletData, setHasWalletData] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [hasStepData, setHasStepData] = useState(false); // State to track if stepData is available
  const ctaRef = useRef(null); // Create a ref for the CTA div

  const checkWalletData = async () => {
    const userAccount = sessionStorage.getItem("userAccount");
    if (userAccount) {
      const docRef = collection(db, "projects", userAccount, "projectData");
      const docSnap = await getDocs(docRef);
      if (!docSnap.empty) {
        // Check if the snapshot is not empty
        setHasWalletData(true);
        let userData = [];
        docSnap.forEach((doc) => {
          userData.push(doc.data());
        });
        console.log(userData);
        if (userData.length > 0) {
          // Check if userData is present
          setHasStepData(true);
        }
        // navigate("/dashboard"); // Redirect to dashboard if wallet data exists
      } else {
        setHasWalletData(false);
      }
      setAccounts([userAccount]);
    }
  };

  const scrollToCTA = () => {
    ctaRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <NavBar
        checkWalletData={checkWalletData}
        hasWalletData={hasWalletData}
        accounts={accounts}
        setAccounts={setAccounts}
      />
      <div className="agency-content">
        <div className="agency-header">
          <h1 className="agency-header-title">3S Agency</h1>
          <p className="agency-header-text">
            We, at Third Space, will co-construct the project with you! We want
            to give everyone the opportunity to boost their business on Web 3.
          </p>
          <Link to="#" onClick={scrollToCTA} className="agency-header-cta">Contact Us</Link>
        </div>
        <div className="agency-services">
        <h2 className="agency-services-title">Discover our services</h2>
          <p className="agency-services-text">
            We, at Third Space, will co-construct the project with you! We want
            to give everyone the opportunity to boost their business on Web 3.
          </p>
          <div className="agency-services-box">
          <div className="agency-services-item">
          <i class="bi bi-2-square-fill"></i>
          <h3 className="agency-services-item-title">Branding</h3>
          <p className="agency-services-item-text">
          We build strong, memorable brands that resonate with your target market and differentiate you from the competition.
          </p>

          </div>
          <div className="agency-services-item">
          <i class="bi bi-2-square-fill"></i>
          <h3 className="agency-services-item-title">Design</h3>
          <p className="agency-services-item-text">
          Our creative team crafts visually stunning and user-friendly designs that captivate your audience and enhance user experience.
          </p>

          </div>
          <div className="agency-services-item">
          <i class="bi bi-2-square-fill"></i>
          <h3 className="agency-services-item-title">Development</h3>
          <p className="agency-services-item-text">
          Whether you need custom-coded solutions or prefer the agility of no-code platforms, our experts deliver robust, scalable, and efficient development services tailored to your needs.
          </p>

          </div>
          <div className="agency-services-item">
          <i class="bi bi-2-square-fill"></i>
          <h3 className="agency-services-item-title">Update</h3>
          <p className="agency-services-item-text">
          Stay current with our comprehensive updating services, ensuring your digital assets are always fresh, secure, and performing at their best.
          </p>

          </div>
          <div className="agency-services-item">
          <i class="bi bi-2-square-fill"></i>
          <h3 className="agency-services-item-title">Redesign</h3>
          <p className="agency-services-item-text">
          Give your existing digital presence a new lease of life with our redesign services, focused on modern aesthetics and improved functionality.
          </p>

          </div>
          <div className="agency-services-item">
          <i class="bi bi-2-square-fill"></i>
          <h3 className="agency-services-item-title">Transitsion</h3>
          <p className="agency-services-item-text">
          Seamlessly migrate from your old systems to new, more efficient platforms with our expert transition services, minimizing downtime and disruption.
          </p>

          </div>

          </div>

        </div>
        <div className="agency-portfolio">
        <h2 className="agency-portfolio-title">Explore our projects</h2>
          <p className="agency-portfolio-text">
            We, at Third Space, will co-construct the project with you! We want
            to give everyone the opportunity to boost their business on Web 3.
          </p>
          <div className="agency-portfolio-box">
          <div className="agency-portfolio-card">
            <h3 className="agency-portfolio-card-title">Project Title</h3>
            <a className="agency-portfolio-card-link">View more <i class="bi bi-arrow-right"></i></a>
            <p className="agency-portfolio-card-label">Website</p>

          </div>

          </div>

        </div>
        <div className="agency-cta" ref={ctaRef}>
        <h2 className="agency-contact-title">Contact Us</h2>
          <p className="agency-contact-text">
            We, at Third Space, will co-construct the project with you! We want
            to give everyone the opportunity to boost their business on Web 3.
          </p>

<ContactForm />
        </div>
      </div>

      <Footer />
    </>
  );
}
