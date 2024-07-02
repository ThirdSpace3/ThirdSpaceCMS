import "../Root.css";
import "./Newsletter.css";
import React, { useState } from "react";
import { getDocs, query, where, db, serverTimestamp, addDoc, collection } from "../../firebaseConfig"; // Adjust the import path based on your project structure

function Newsletter() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  
  const handleInputChange = (event) => {
    setEmail(event.target.value);
    setError(false);
    setSubscribed(false); // Hide message when input changes
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError(true);
      return;
    }
  
    setError(false); // Clear any previous errors
  
    try {
      const subscriptionsRef = collection(db, "UserContactInfos", "contact", "Newsletter");
  
      // Check if the email already exists
      const querySnapshot = await getDocs(query(subscriptionsRef, where("email", "==", email)));
  
      if (!querySnapshot.empty) {
        // Email already exists in database
        setSubscribed(false); // Ensure subscribed state is false
        setError(true); // Set error to show user is already subscribed
        return;
      }
  
      // Add subscription to Firestore
      await addDoc(subscriptionsRef, {
        email: email,
        timestamp: serverTimestamp()
      });
      
      console.log("Subscription added to Firestore");
      setSubscribed(true); // Show subscription success message
      setEmail(""); // Clear the input field
    } catch (error) {
      console.error("Error adding subscription to Firestore: ", error);
      // Handle error as needed
    }
  };
  
  return (
    <div className="newsletter-component">
      <form className="newsletter-input" onSubmit={handleSubmit}>
        <input
          className="newsletter-input-field"
          placeholder="Enter your email"
          value={email}
          onChange={handleInputChange}
          type="email"
        ></input>
        <button
          className={email ? "newsletter-input-btn" : "newsletter-input-btn-disabled"}
          id="subscribe-btn-newsletter"
          type="submit"
          disabled={!email}
        >
          Subscribe
        </button>
      </form>
      {error && (
        <p className="newsletter-component-error-msg">
          Please enter a valid email.
        </p>
      )}
      {subscribed && (
        <p className="newsletter-component-send-msg">
          Thanks for your subscription.
        </p>
      )}
    </div>
  );
}

export default Newsletter;
