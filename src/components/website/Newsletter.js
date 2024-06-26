import "../Root.css";
import "./Newsletter.css";
import React, { useState } from "react";

function Newsletter() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleInputChange = (event) => {
    setEmail(event.target.value);
    setError(false);
    setSubscribed(false); // Hide message when input changes
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError(true);
    } else {
      setError(false);
      setSubscribed(true); // Show subscription message
      setEmail(""); // Clear the input field
      // Submit email logic here
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
