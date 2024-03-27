import React from 'react';

const styles = {
    trustSection: {
        backgroundColor: '#fff',
        padding: '50px 20px',
        textAlign: 'center',
    },
    trustHeading: {
        fontSize: '2rem',
        color: '#333',
        marginBottom: '1rem',
    },
    trustText: {
        fontSize: '1rem',
        color: '#666',
        marginBottom: '2rem',
    },
    trustPoints: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '20px', // This creates equal spacing around each item.
    },
    trustPoint: {
        width: '200px', // or flexBasis if you prefer the item to grow/shrink
        textAlign: 'left',
    },
    icon: {
        height: '50px',
        marginBottom: '10px',
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

const SectionTrustUs1 = () => {
    return (
        <div className='trust-section-1'>
            <section style={styles.trustSection} className='trust-content'>
                <h2 style={styles.trustHeading}>Why our clients trust us</h2>
                <p style={styles.trustText}>
                    Lorem ipsum dolor sit amet consectetur, Ducimus, aliquet vel, sequi odit commodi qui non sed.
                </p>
                <div className='trust-body'>
                    <div className='images-trust'>
                        <div className='image-de-merde'>
                            <img src="https://via.placeholder.com/288x245" alt="Placeholder" />
                            <img src="https://via.placeholder.com/154x205" alt="Placeholder" />
                        </div>
                        <img src="https://via.placeholder.com/244x186" alt="Placeholder" />
                    </div>

                    <div style={styles.trustPoints} className='trust-points'>
                        <div style={styles.trustPoint} className='trust-point'>
                            <img style={styles.icon} src="https://via.placeholder.com/50" alt="Trust Point 1" />
                            <p>Lorem ipsum dolor sit amet consectetur. Elementum nisi quis eleifend quam.</p>
                        </div>
                        <div style={styles.trustPoint} className='trust-point'>
                            <img style={styles.icon} src="https://via.placeholder.com/50" alt="Trust Point 2" />
                            <p>Lorem ipsum dolor sit amet consectetur. Elementum nisi quis eleifend quam.</p>
                        </div>
                        <div style={styles.trustPoint} className='trust-point'>
                            <img style={styles.icon} src="https://via.placeholder.com/50" alt="Trust Point 3" />
                            <p>Lorem ipsum dolor sit amet consectetur. Elementum nisi quis eleifend quam.</p>
                        </div>
                        <div style={styles.trustPoint} className='trust-point'>
                            <img style={styles.icon} src="https://via.placeholder.com/50" alt="Trust Point 4" />
                            <p>Lorem ipsum dolor sit amet consectetur. Elementum nisi quis eleifend quam.</p>
                        </div>                    
                        <button style={styles.button}>Button</button>

                    </div>
                </div>
            </section>
        </div>
    );
};

export default SectionTrustUs1;
