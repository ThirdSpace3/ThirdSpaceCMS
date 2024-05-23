import NavBar from "../components/website/NavBar";
import Footer from "../components/website/Footer";
import "../components/website/agency.css";
import React, { useState, useRef } from "react";
import { db, collection, getDocs } from "../firebaseConfig"; // Assuming Firestore is correctly imported and configured
import { Link } from "react-router-dom";

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
        <h2 className="agency-services-title">3S Agency</h2>
          <p className="agency-services-text">
            We, at Third Space, will co-construct the project with you! We want
            to give everyone the opportunity to boost their business on Web 3.
          </p>
          <div className="agency-services-box">
          <div className="agency-services-item">
          <i class="bi bi-2-square-fill"></i>
          <h3 className="agency-services-item-title">Item Title</h3>
          <p className="agency-services-item-text">
            We, at Third Space, will co-construct the project with you! We want
            to give everyone the opportunity to boost their business on Web 3.
          </p>

          </div>
          <div className="agency-services-item">
          <i class="bi bi-2-square-fill"></i>
          <h3 className="agency-services-item-title">Item Title</h3>
          <p className="agency-services-item-text">
            We, at Third Space, will co-construct the project with you! We want
            to give everyone the opportunity to boost their business on Web 3.
          </p>

          </div>
          <div className="agency-services-item">
          <i class="bi bi-2-square-fill"></i>
          <h3 className="agency-services-item-title">Item Title</h3>
          <p className="agency-services-item-text">
            We, at Third Space, will co-construct the project with you! We want
            to give everyone the opportunity to boost their business on Web 3.
          </p>

          </div>
          <div className="agency-services-item">
          <i class="bi bi-2-square-fill"></i>
          <h3 className="agency-services-item-title">Item Title</h3>
          <p className="agency-services-item-text">
            We, at Third Space, will co-construct the project with you! We want
            to give everyone the opportunity to boost their business on Web 3.
          </p>

          </div>
          <div className="agency-services-item">
          <i class="bi bi-2-square-fill"></i>
          <h3 className="agency-services-item-title">Item Title</h3>
          <p className="agency-services-item-text">
            We, at Third Space, will co-construct the project with you! We want
            to give everyone the opportunity to boost their business on Web 3.
          </p>

          </div>
          <div className="agency-services-item">
          <i class="bi bi-2-square-fill"></i>
          <h3 className="agency-services-item-title">Item Title</h3>
          <p className="agency-services-item-text">
            We, at Third Space, will co-construct the project with you! We want
            to give everyone the opportunity to boost their business on Web 3.
          </p>

          </div>

          </div>

        </div>
        <div className="agency-portfolio">
        <h2 className="agency-portfolio-title">3S Agency</h2>
          <p className="agency-portfolio-text">
            We, at Third Space, will co-construct the project with you! We want
            to give everyone the opportunity to boost their business on Web 3.
          </p>
          <div className="agency-portfolio-box">
          <div  className="agency-portfolio-card">
            <h3></h3>

          </div>

          </div>

        </div>
        <div className="agency-cta" ref={ctaRef}>

        </div>
      </div>

      <Footer />
    </>
  );
}
