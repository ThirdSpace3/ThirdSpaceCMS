import NavBar from "../components/website/NavBar";
import Footer from "../components/website/Footer";
import React, { useState, useEffect } from "react";
import { db, collection, getDocs } from "../firebaseConfig"; // Assuming Firestore is correctly imported and configured
import { Link } from "react-router-dom";
import '../components/website/product.css';

export default function Products() {
  const [hasStepData, setHasStepData] = useState(false); // State to track if stepData is available
  const [hasWalletData, setHasWalletData] = useState(false);
  const [accounts, setAccounts] = useState([]);
  console.log(accounts);
  // localStorage.clear();
  // sessionStorage.clear();
  // Clearing the entire session storage
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
  return (
    <div className="product-page">
      <NavBar
        checkWalletData={checkWalletData}
        hasWalletData={hasWalletData}
        accounts={accounts}
        setAccounts={setAccounts}
      />
      <div className="product-content">
        <h1 className="product-title">Discover our products</h1>
        <div className="product-row">
          <Link to="/3s-agency">
            <div className="product-card">
            <div className="product-card-title-box">
            <h2 className="product-card-title">3S Agency</h2>
            <hr className="product-card-hr"/>


            </div>
              <p className="product-card-text">Lorem ipsum ispum boebn oejfn iebrfbeo bekfib eifbeon.</p>
            </div>
          </Link>
          <Link to="/3s-builder">
            <div className="product-card">
            <div className="product-card-title-box">
            <h2 className="product-card-title">3S Builder</h2>
            <hr className="product-card-hr"/>


            </div>
              <p className="product-card-text">Lorem ipsum ispum boebn oejfn iebrfbeo bekfib eifbeon.</p>
            </div>
          </Link>
          <Link to="/3s-academy">
            <div className="product-card">
            <div className="product-card-title-box">
            <h2 className="product-card-title">3S Academy</h2>
            <hr className="product-card-hr"/>


            </div>              <p className="product-card-text">Lorem ipsum ispum boebn oejfn iebrfbeo bekfib eifbeon.</p>
            </div>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
