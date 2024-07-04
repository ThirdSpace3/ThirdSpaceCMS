import React, { useState } from 'react';
import { db, addDoc, collection, serverTimestamp } from '../../firebaseConfig'; // Adjust the import path based on your project structure
import './ContactForm.css'; // Import the CSS file

const ContactForm = () => {
  const [contactMethod, setContactMethod] = useState('email');
  const [contactValue, setContactValue] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (contactValue.trim() === '') {
      alert('Please enter your contact information.');
      return;
    }
    try {
      await addDoc(collection(db, 'UserContactInfos', "Contact", "Agency"), {
        method: contactMethod,
        value: contactValue,
        timestamp: serverTimestamp()
      });
      alert('Contact information saved successfully.');
      setContactValue(''); // Reset the input field
    } catch (error) {
      console.error('Error saving contact data: ', error);
      alert('Failed to save contact information.');
    }
  };

  return (
    <div className='contact-form-wrapper'>
    <form className="contact-form" onSubmit={handleSubmit}>
      {contactMethod === 'email' ? (
        <input
          type="email"
          placeholder="Enter your email"
          value={contactValue}
          onChange={(e) => setContactValue(e.target.value)}
          className="contact-input"
        />
      ) : (
        <input
          type="tel"
          placeholder="Enter your phone number"
          value={contactValue}
          onChange={(e) => setContactValue(e.target.value)}
          className="contact-input"
        />
      )}
      <button type="submit" className="contact-button">Be Contacted</button>
      
    </form>
    <div className="contact-toggle" onClick={() => setContactMethod(contactMethod === 'email' ? 'phone' : 'email')}>
        {contactMethod === 'email' ? 'I prefer to be contacted by phone' : 'I prefer to be contacted by email'}
      </div>
    </div>
  );
};

export default ContactForm;
