import React from 'react';

const styles = {
    ctaContent: {
        backgroundColor: '#F8F8F8',
        display: 'flex',
        justifyContent: 'center',
        padding:'20px 20px'
        
    },
    ctaBanner: {
        backgroundColor: '#000', // Black background for the CTA banner
        color: '#fff',
        padding: '20px',
        textAlign: 'center',
        display: 'flex',
        borderRadius:'10px',
        alignitems: 'center',

    },
    ctaText: {
        fontSize: '1.5rem',
        marginBottom: '1rem',
    },
    button: {
        backgroundColor: '#555', // A darker shade for the button
        color: '#fff',
        padding: '14px 30px',
        border: 'none',
        cursor: 'pointer',
        borderRadius:'5px'
    },
    ctaInfos: {
        marginRight:'20vw',
        display:'flex',
        flexDirection:'column',
        alignItems:'flex-start',
    }
};

const SectionBanner1 = () => {
    return (
        <>
        <div style={styles.ctaContent}>
            <div style={styles.ctaBanner}>
                <div style={styles.ctaInfos}>
                    <p style={styles.ctaText}>Need more information?</p>
                    <p>Write your concern to us and our specialist will get back to you.</p>
                </div>
                <button style={styles.button}>Button</button>
            </div>
        </div>
        </>
    );
};

export default SectionBanner1;
