import React from 'react';

const styles = {
  partnersSection: {
    backgroundColor: '#fff',
    padding: '50px 20px',
    textAlign: 'center',
  },
  partnersHeading: {
    fontSize: '2rem',
    color: '#333',
    marginBottom: '1rem',
  },
  partnersLogos: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '20px', // Creates space between logo items
  },
  logoItem: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '150px', // Set width or use flex-basis if you want them to be flexible
    height: '100px', // Set height to maintain aspect ratio for logos
    backgroundColor: '#f0f0f0', // Placeholder background to distinguish logo area
    borderRadius: '10px', // Optional style for logo items
  },
  // Assuming logos are available as images, if not you can use placeholders
  logoImage: {
    maxWidth: '100%',
    maxHeight: '100%',
  }
};

const PartnerLogos = ['logo1.png', 'logo2.png', 'logo3.png', 'logo4.png']; // Replace with actual logo paths

const SectionPartners1 = () => {
  return (
    <section style={styles.partnersSection}>
      <h2 style={styles.partnersHeading}>Our Partners</h2>
      <div style={styles.partnersLogos}>
        {PartnerLogos.map((logo, index) => (
          <div key={index} style={styles.logoItem}>
            <img
              style={styles.logoImage}
              src={logo} // Assuming the logo is hosted and has a path
              alt={`Partner ${index + 1}`}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default SectionPartners1;
