import React from 'react';

const styles = {
  testimonialsSection: {
    backgroundColor: '#eeeeee', // Assuming a light grey background
    padding: '40px 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  testimonialsHeader: {
    fontSize: '2rem',
    color: '#333',
    marginBottom: '1rem',
  },
  testimonialsContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    gap: '20px',
  },
  testimonialCard: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '500px',
    textAlign: 'center',
    margin: '0 10px',
  },
  testimonialText: {
    fontStyle: 'italic',
    color: '#666',
  },
  clientName: {
    marginTop: '15px',
    fontWeight: 'bold',
    color: '#333',
  },
  clientImage: {
    width: '50px',
    height: '50px',
    borderRadius: '50%', // Circular images
    objectFit: 'cover',
    margin: '10px 0',
  }
};

// Dummy data for testimonials
const testimonials = [
  {
    text: "I am ipsum dolor sit amet consectetur, adipisicing elit. Veritatis, quis nostrum. Molestias nulla reiciendis vel. Amet quod consequatur officia.",
    name: "Jonathan Wright",
    imageUrl: "path-to-jonathan-image.jpg" // Replace with actual path to image
  },
  {
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis, quis nostrum. Molestias nulla reiciendis vel. Amet quod consequatur officia.",
    name: "Jacqueline Wright",
    imageUrl: "path-to-jacqueline-image.jpg" // Replace with actual path to image
  },
];

const TestimonialsSection = () => {
  return (
    <section style={styles.testimonialsSection}>
      <h2 style={styles.testimonialsHeader}>Our happy clients</h2>
      <div style={styles.testimonialsContainer}>
        {testimonials.map((testimonial, index) => (
          <div key={index} style={styles.testimonialCard}>
            <p style={styles.testimonialText}>"{testimonial.text}"</p>
            <img
              src={testimonial.imageUrl} 
              alt={testimonial.name}
              style={styles.clientImage}
            />
            <p style={styles.clientName}>{testimonial.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
