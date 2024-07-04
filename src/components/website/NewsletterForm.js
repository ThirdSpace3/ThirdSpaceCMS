import React, { useState } from 'react';
import { db, addDoc, collection, serverTimestamp } from '../../firebaseConfig'; // Adjust the import path based on your project structure
import './ContactForm.css'; // Import the CSS file

const SubscriptionForm = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email.trim() === '') {
      alert('Please enter your email.');
      return;
    }
    try {
      await addDoc(collection(db, 'UserContactInfos', "Contact", "Newsletter"), {
        email: email,
        timestamp: serverTimestamp()
      });
      alert('Subscription successful.');
      setEmail(''); // Reset the input field
    } catch (error) {
      console.error('Error saving subscription data: ', error);
      alert('Failed to save subscription information.');
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="contact-input"
      />
      <button type="submit" className="contact-button">Subscribe</button>
    </form>
  );
};

export default SubscriptionForm;
