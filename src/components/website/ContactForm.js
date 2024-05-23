import './ContactForm.css';
import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    website: '',
    services: [],
    message: ''
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
    console.log('Form submitted:', formData);
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
            type="url"
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
      </form>
    </div>
  );
};

export default ContactForm;
