import React from 'react';

const styles = {
    footer: {
        backgroundColor: '#333', // Dark background for the footer
        color: '#fff',
        padding: '40px 0',
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        alignitems: 'center',


    },
    description: {
        maxWidth: '267px',
    },
    linkColumn: {
        minWidth: '150px',
        padding: '0 15px',
        boxSizing: 'border-box',
        marginBottom: '20px',
    },
    columnHeading: {
        fontSize: '1.2rem',
        marginBottom: '15px',
    },
    link: {
        color: '#fff',
        textDecoration: 'none',
        display: 'block',
        marginBottom: '10px',
    },
    socialSection: {
        display: 'flex',
        alignItems: 'flex-start',
        flexDirection:'column',

    },
    socialLink: {
        display: 'inline-block',
        width: '20px',
        height: '20px',
        backgroundColor: '#888', // Placeholder color
        borderRadius: '50%',
        margin: '0 5px',
        cursor: 'pointer',
    }
};

const SectionFooter1 = () => {
    return (
        <footer style={styles.footer}>
            {/* Repeat this block for each column of links you have */}
            <div style={styles.description}>
                <img src='https://via.placeholder.com/70'></img>
                <p style={styles.infos}>Amet minim mollit non deserunt
                    ullamco est sit aliqua dolor do amet
                    sintelit officia consequat</p>
            </div>
            <div style={styles.linkColumn}>
                <h4 style={styles.columnHeading}>Heading</h4>
                <a href="#" style={styles.link}>Link here</a>
                <a href="#" style={styles.link}>Link here</a>
                <a href="#" style={styles.link}>Link here</a>
                <a href="#" style={styles.link}>Link here</a>
            </div>
            <div style={styles.linkColumn}>
                <h4 style={styles.columnHeading}>Heading</h4>
                <a href="#" style={styles.link}>Link here</a>
                <a href="#" style={styles.link}>Link here</a>
                <a href="#" style={styles.link}>Link here</a>
                <a href="#" style={styles.link}>Link here</a>
            </div>
            <div style={styles.linkColumn}>
                <h4 style={styles.columnHeading}>Heading</h4>
                <a href="#" style={styles.link}>Link here</a>
                <a href="#" style={styles.link}>Link here</a>
                <a href="#" style={styles.link}>Link here</a>
                <a href="#" style={styles.link}>Link here</a>
            </div>
            <div style={styles.socialSection}>
                {/* You might want to replace these spans with icons or images */}
                <p style={styles.socialconnect}>Connect with us</p>
                <div style={styles.socialsbubbles}>
                    <span style={styles.socialLink}></span>
                    <span style={styles.socialLink}></span>
                    <span style={styles.socialLink}></span>
                    <span style={styles.socialLink}></span>
                </div>
            </div>
        </footer>
    );
};

export default SectionFooter1;
