import React from 'react';
import './TemplateTest1.css'

// Inline styles for the hero section
const styles = {
  hero: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '90vh', // Adjust the height as needed
    backgroundColor: '#f0f0f0', // Placeholder background color
    padding: '20px',
    textAlign: 'center',
  },
  heading: {
    fontSize: '4rem',
    color: '#333',
    marginBottom: '1rem',
  },
  subtext: {
    fontSize: '1.5rem',
    color: '#666',
    marginBottom: '2rem',
  },
  button: {
    fontSize: '1rem',
    padding: '10px 20px',
    backgroundColor: '#0066ff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  }
};

const SectionHero1 = () => {
  return (    
<div className='hero-section-1'>
<img style={styles.icon} src="https://via.placeholder.com/720x628" alt="Trust Point 1" />
    <section style={styles.hero} >
      <h1 style={styles.heading}>Great Design is Invisible</h1>
      <p style={styles.subtext}>
        Lorem ipsum dolor sit amet consectetur
      </p>
      <button style={styles.button}>
        Button
      </button>
    </section>
</div>
  );
}

export default SectionHero1;
