import './FaqHP.css';
import '../../Root.css';
import React, { useState } from 'react';

function FaqHP() {
    const [openQuestion, setOpenQuestion] = useState(1);

    const toggleQuestion = (questionNumber) => {
        setOpenQuestion(openQuestion === questionNumber ? null : questionNumber);
    };

    return (
        <section className="faq-section section">
            <div className="faq-header">
                <p className="section-label">FAQs</p>
                <h2 className="section-title">Frequently Asked Questions</h2>
            </div>
            <div className="faq-cards">
                <div className={`faq-card ${openQuestion === 1 ? 'open' : ''}`} onClick={() => toggleQuestion(1)}>
                    <div className="faq-question-container">
                        <h3 className="faq-question">How do I get started with Third Space?</h3>
                        <span className="faq-icon">{openQuestion === 1 ? '-' : '+'}</span>
                    </div>
                </div>
                {openQuestion === 1 && <p className="faq-answer">Third Space is the first website creation and education platform dedicated to Web3. We help you make the transition from web2 to web3 with a user-friendly platform. </p>}

                <div className={`faq-card ${openQuestion === 2 ? 'open' : ''}`} onClick={() => toggleQuestion(2)}>
                    <div className="faq-question-container">
                        <h3 className="faq-question">What can I build using Third Space?</h3>
                        <p className="faq-icon">{openQuestion === 2 ? '-' : '+'}</p>
                    </div>
                </div>
                {openQuestion === 2 && <p className="faq-answer">With Third Space you can create any dApps or sites for Web 2.
                  Don't hesitate to follow our networks to see all our news and the new features we're implementing.</p>}

                <div className={`faq-card ${openQuestion === 3 ? 'open' : ''}`} onClick={() => toggleQuestion(3)}>
                    <div className="faq-question-container">
                        <h3 className="faq-question">Do I need to know how to code to use your Web3 Builder?</h3>
                        <span className="faq-icon">{openQuestion === 3 ? '-' : '+'}</span>
                    </div>
                </div>
                {openQuestion === 3 && <p className="faq-answer">No! Absolutely not. We're accessible to everyone, from beginners discovering builders to experienced developers. Our goal is to provide you with a complete experience and give you the opportunity to create sophisticated interfaces, whatever your level. </p>}

                <div className={`faq-card ${openQuestion === 4 ? 'open' : ''}`} onClick={() => toggleQuestion(4)}>
                    <div className="faq-question-container">
                        <h3 className="faq-question">Do you offer any templates or pre-built solutions?</h3>
                        <span className="faq-icon">{openQuestion === 4 ? '-' : '+'}</span>
                    </div>
                </div>
                {openQuestion === 4 && <p className="faq-answer">We offer various templates to suit your needs and make it easier for you to get started with our software. We'll be adding more templates in the near future, as our development continues. We're committed to providing you with a wide range of choices. </p>}

            </div>
        </section>
    );
}

export default FaqHP;
