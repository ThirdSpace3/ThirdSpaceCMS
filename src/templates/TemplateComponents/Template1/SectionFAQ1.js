import React, { useState } from 'react';

const styles = {
    faqSection: {
        backgroundColor: '#f0f0f0', // Background color of the FAQ section
        padding: '40px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start', // Align items to the left
    },
    faqTitle: {
        fontSize: '2rem',
        color: '#333',
        marginBottom: '20px',
    },
    faqItem: {
        backgroundColor: '#fff',
        width: '100%',
        padding: '15px 20px',
        marginBottom: '10px',
        borderRadius: '5px',
        boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
        cursor: 'pointer',
    },
    question: {
        fontWeight: 'bold',
        color: '#333',
    },
    answer: {
        marginTop: '5px',
        lineHeight: '1.5',
        color: '#666',
    }
};

const faqs = [
    {
        question: 'Lorem ipsum dolor sit amet consectetur?',
        answer: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur, aspernatur.',
    },
    {
        question: 'Accusantium doloremque laudantium totam rem aperiam?',
        answer: 'Eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
    },
    {
        question: 'Iste natus error sit voluptatem accusantium doloremque?',
        answer: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.',
    },
];

const FAQItem = ({ faq }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div style={styles.faqItem} onClick={() => setIsOpen(!isOpen)}>
            <p style={styles.question}>{faq.question}</p>
            {isOpen && <p style={styles.answer}>{faq.answer}</p>}
        </div>
    );
};

const SectionFAQ1 = () => {
    return (
        <div className='faq-content'>            
        <img style={styles.icon} src="https://via.placeholder.com/466x466" alt="Trust Point 1" />
        <section style={styles.faqSection} className='faq-items'>
            <h2 style={styles.faqTitle}>Frequently asked questions</h2>
            {faqs.map((faq, index) => (
                <FAQItem key={index} faq={faq} />
            ))}
        </section>
        </div>
    );
};

export default SectionFAQ1;
