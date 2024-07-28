import React from "react";
import { useNavigate } from "react-router-dom";
import { db, doc, getDoc } from "../../../firebaseConfig";
import './ConnectAdmin.css'
const ConnectAdmin = () => {
  const navigate = useNavigate();
  const walletId = localStorage.getItem("userAccount");
  
  const checkAdminRole = async () => {
    if (!walletId) {
      console.log("No wallet ID found.");
      return;
    }

    try {
      const userDocRef = doc(db, "users", walletId);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists() && userDoc.data().role === "admin") {
        console.log("Admin role verified.");
        navigate("/dashboard-admin"); // Redirect to admin dashboard if user is admin
      } else {
        console.log("User is not an admin.");
        // Optionally handle non-admin case here
      }
    } catch (error) {
      console.error("Error checking user role:", error);
    }
  };

  return (
    <div className="admin-connect">
          <img className="admin-connect-image" src="https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageWebSite%2F3s-logo.png?alt=media&token=8a69bcce-2e9f-463e-8cba-f4c2fec1a904" alt="thirdspace logo" />
          <button className="admin-connect-button" onClick={checkAdminRole}>Connect</button>
    </div>
  );
};

export default ConnectAdmin;
