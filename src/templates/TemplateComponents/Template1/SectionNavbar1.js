import React from 'react';

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: '#333',
    color: '#fff',
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  navLinks: {
    listStyle: 'none',
    display: 'flex',
  },
  navItem: {
    padding: '0 1rem',
  },
  navLink: {
    textDecoration: 'none',
    color: '#fff',
    transition: 'color 0.3s ease-in-out',
  },
  buttonMain: {
    padding: '0.5rem 1rem',
    border: 'none',
    backgroundColor: '#0066ff',
    color: '#fff',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease-in-out',
  },
};

const SectionNavBar1 = () => {
  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>YourLogo</div>
      <ul style={styles.navLinks}>
        <li style={styles.navItem}><a style={styles.navLink} href="#home">Link 1</a></li>
        <li style={styles.navItem}><a style={styles.navLink} href="#about">Link 2</a></li>
        <li style={styles.navItem}><a style={styles.navLink} href="#services">Link 3</a></li>
        <li style={styles.navItem}><a style={styles.navLink} href="#portfolio">Link 4</a></li>
        <li style={styles.navItem}><a style={styles.navLink} href="#contact">Link 5</a></li>
      </ul>
      <button style={styles.buttonMain}>Button</button>
    </nav>
  );
}

export default SectionNavBar1;
