import React from 'react';

const styles = {
    businessSection: {
        backgroundColor: '#f8f8f8',
        padding: '50px 20px',
        textAlign: 'center',
    },
    businessHeading: {
        fontSize: '2.5rem',
        color: '#333',
        marginBottom: '1rem',
    },
    businessSubheading: {
        color: '#606060',
        fontSize: '1rem',

    },
    businessSubtext: {
        fontSize: '1rem',
        color: '#666',
        marginBottom: '2rem',
    },
    statsContainer: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    statBox: {
        margin: '10px',
        padding: '20px',
        textAlign: 'center',
    },
    statHeading: {
        fontSize: '1.5rem',
        color: '#333',
        margin: '5px 0',
    },
    statText: {
        fontSize: '1rem',
        color: '#666',
    }
};

const SectionAboutUs1 = () => {
    return (
        <section style={styles.businessSection}>
            <h2 style={styles.businessHeading}>
                Our business strategy has helped many businesses across the globe
            </h2>
            <p style={styles.businessSubheading}>Lorem ipsum dolor sit amet consectetur. Elementum nisl duis tortor sed. Suspendisse lobortis vitae quis vehicula pellentesque sit id</p>
            <div style={styles.statsContainer}>
                <div style={styles.statBox} >
                    <h3 style={styles.statHeading}>Clients</h3>
                    <p style={styles.statText}>12K</p>
                </div>
                <div style={styles.statBox}>
                    <h3 style={styles.statHeading}>Annual Growth</h3>
                    <p style={styles.statText}>55%</p>
                </div>
                
                <div style={styles.statBox}>
                    <h3 style={styles.statHeading}>No of Projects</h3>
                    <p style={styles.statText}>5K</p>
                </div>
                <div style={styles.statBox} >
                    <h3 style={styles.statHeading}>Positive Ratings</h3>
                    <p style={styles.statText}>80%</p>
                </div>
                <div className='verticalLine'></div>
            </div>
            <img src="https://via.placeholder.com/1160x645" alt="Placeholder" />
        </section>
    );
};

export default SectionAboutUs1;
