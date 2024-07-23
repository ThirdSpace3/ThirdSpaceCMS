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
    event.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email.");
      return;
    }
  
    try {
      const subscriptionsRef = collection(db, "UserContactInfos", "contact", "Newsletter");
  
      const querySnapshot = await getDocs(query(subscriptionsRef, where("email", "==", email)));
  
      if (!querySnapshot.empty) {
        setError("This email is already subscribed.");
        return;
      }
  
      await addDoc(subscriptionsRef, {
        email: email,
        timestamp: serverTimestamp()
      });
  
      console.log("Subscription added to Firestore");
      setSubscribed(true);
      setEmail("");
    } catch (error) {
      console.error("Error adding subscription to Firestore: ", error);
      setError("An error occurred. Please try again later.");
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
          {error}
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
