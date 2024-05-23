import './ContactForm.css';
import React, { useState } from 'react';
import { db, collection, addDoc, serverTimestamp } from '../../firebaseConfig'; // Make sure to replace with your Firebase configuration file

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    website: '',
    services: [],
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false); // State variable for submission status

  const walletId = sessionStorage.getItem("userAccount");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prevState) => {
        if (checked) {
          return { ...prevState, services: [...prevState.services, value] };
        } else {
          return { ...prevState, services: prevState.services.filter(service => service !== value) };
        }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure the website field has a proper URL format
    let formattedWebsite = formData.website.trim();
    if (formattedWebsite && !formattedWebsite.match(/^https?:\/\//)) {
      formattedWebsite = `https://${formattedWebsite}`;
    }

    const dataToSave = {
      ...formData,
      website: formattedWebsite,
      walletId: walletId || null,
      timestamp: serverTimestamp() // Add timestamp here
    };

    try {
      const docRef = await addDoc(collection(db, "contacts"), dataToSave);
      console.log("Document written with ID: ", docRef.id);
      setIsSubmitted(true); // Set the submission status to true on success
      setFormData({
        name: '',
        email: '',
        website: '',
        services: [],
        message: ''
      }); // Reset the form fields

    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div className="contactform-container">
      <form onSubmit={handleSubmit}>
        <div className="contactform-row">
          <label htmlFor="name">Name (required)</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="contactform-row">
          <label htmlFor="email">Email (required)</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="contactform-row">
          <label htmlFor="website">Existing Website</label>
          <input
            type="text"
            id="website"
            name="website"
            value={formData.website}
            onChange={handleChange}
          />
        </div>
        <div className="contactform-row">
          <label>Services Envisaged</label>
          <div>
            <label>
              <input
                type="checkbox"
                name="services"
                value="design"
                checked={formData.services.includes('design')}
                onChange={handleChange}
              />
              Design
            </label>
            <label>
              <input
                type="checkbox"
                name="services"
                value="branding"
                checked={formData.services.includes('branding')}
                onChange={handleChange}
              />
              Branding
            </label>
            <label>
              <input
                type="checkbox"
                name="services"
                value="development"
                checked={formData.services.includes('development')}
                onChange={handleChange}
              />
              Development
            </label>
            <label>
              <input
                type="checkbox"
                name="services"
                value="update"
                checked={formData.services.includes('update')}
                onChange={handleChange}
              />
              Update
            </label>
            <label>
              <input
                type="checkbox"
                name="services"
                value="overhaul"
                checked={formData.services.includes('overhaul')}
                onChange={handleChange}
              />
              Overhaul
            </label>
            <label>
              <input
                type="checkbox"
                name="services"
                value="transition"
                checked={formData.services.includes('transition')}
                onChange={handleChange}
              />
              Transition
            </label>
          </div>
        </div>
        <div className="contactform-row">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="contactform-row">
          <button type="submit">Submit</button>
        </div>
        {isSubmitted && (
        <div className="success-message">
          Your form has been successfully submitted!
        </div>
      )}
      </form>
    </div>
  );
};

export default ContactForm;
