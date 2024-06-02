import React, { useState, useRef } from 'react';
import { db, collection, getDocs } from '../firebaseConfig'; // Assuming Firestore is correctly imported and configured
import { Link } from 'react-router-dom';
import NavBar from '../components/website/NavBar';
import Footer from '../components/website/Footer';
import ContactForm from '../components/website/ContactForm';
import '../components/website/agency.css';

export default function Agency() {
  const [hasWalletData, setHasWalletData] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [hasStepData, setHasStepData] = useState(false); // State to track if stepData is available
  const ctaRef = useRef(null); // Create a ref for the CTA div

  const checkWalletData = async () => {
    const userAccount = sessionStorage.getItem('userAccount');
    if (userAccount) {
      const docRef = collection(db, 'projects', userAccount, 'projectData');
      const docSnap = await getDocs(docRef);
      if (!docSnap.empty) {
        // Check if the snapshot is not empty
        setHasWalletData(true);
        let userData = [];
        docSnap.forEach((doc) => {
          userData.push(doc.data());
        });
        console.log(userData);
        if (userData.length > 0) {
          // Check if userData is present
          setHasStepData(true);
        }
        // navigate("/dashboard"); // Redirect to dashboard if wallet data exists
      } else {
        setHasWalletData(false);
      }
      setAccounts([userAccount]);
    }
  };

  const scrollToCTA = () => {
    ctaRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <div className="agency-content">
        <div className="agency-header">
          <NavBar
            checkWalletData={checkWalletData}
            hasWalletData={hasWalletData}
            accounts={accounts}
            setAccounts={setAccounts}
          />
          <div className="wrapper">
            <div className="agency-header-content">
              <p className="agency-header-text">Welcome to 3S Agency</p>
              <h1 className="agency-header-title">We Create Unique <br />Websites</h1>
              <p className="agency-header-text">
                Looking to upscale your digital presence? Look no further. At 3S Agency, we specialize <br /> in crafting unique websites tailored to your vision.
              </p>
              <Link to="#" onClick={scrollToCTA} className="agency-header-cta">Be Contacted</Link>
            </div>
            <div className="agency-header-images">
              <img src="../../images/group220.png" alt="header" />
            </div>
          </div>
        </div>
        <div className="agency-services">
          <h2 className="agency-services-title">Comprehensive Digital Services for Your Business</h2>
          <div className="agency-services-box">
            <div className="agency-services-item">
              <i className="bi bi-palette-fill"></i>
              <h3 className="agency-services-item-title">Creative Design Solutions</h3>
              <p className="agency-services-item-text">
                Delivering innovative and visually compelling designs that capture your brand's essence and captivate your audience.
              </p>
            </div>
            <div className="agency-services-item">
              <i className="bi bi-pencil"></i>
              <h3 className="agency-services-item-title">Unique Branding</h3>
              <p className="agency-services-item-text">
                Building a strong and recognizable brand identity that resonates with your target market and drives loyalty.
              </p>
            </div>
            <div className="agency-services-item">
              <i className="bi bi-code-slash"></i>
              <h3 className="agency-services-item-title">Robust Development</h3>
              <p className="agency-services-item-text">
                Crafting high-quality and scalable websites and applications tailored to your business needs and user expectations.
              </p>
            </div>
            <div className="agency-services-item">
              <i className="bi bi-arrow-repeat"></i>
              <h3 className="agency-services-item-title">Continuous Updates</h3>
              <p className="agency-services-item-text">
                Keeping your digital presence current and secure with regular updates, ensuring optimal performance and relevance.
              </p>
            </div>
            <div className="agency-services-item">
              <i className="bi bi-aspect-ratio"></i>
              <h3 className="agency-services-item-title">Modern Redesign</h3>
              <p className="agency-services-item-text">
                Transforming existing websites with a fresh, contemporary look and improved functionality to enhance user experience.
              </p>
            </div>
            <div className="agency-services-item">
              <i className="bi bi-arrows-move"></i>
              <h3 className="agency-services-item-title">Seamless Transition</h3>
              <p className="agency-services-item-text">
                Ensuring a smooth migration and integration process when moving to new platforms or updating technologies, minimizing downtime and disruption.
              </p>
            </div>
          </div>
        </div>
        <div className="agency-portfolio">
          <h2 className="agency-portfolio-title">Explore our latest projects</h2>
          <div className="agency-portfolio-box">
            <div className="agency-portfolio-card">
              <h3 className="agency-portfolio-card-title">Nom du projet</h3>
              <p className="agency-portfolio-card-text">Lorem ipsum dolor sit amet, Ut opertamise sit rartione offici sit aliquam omnis aut optio datore sit ratione quis</p>
              <a className="agency-portfolio-card-link" href="#">Go to website <i className="bi bi-arrow-right"></i></a>
            </div>
            <div className="agency-portfolio-card">
             
            <img src="../../images/group220.png" alt="" />
              <h3 className="agency-portfolio-card-title">Portfolio Victor Bisch</h3>
              <p className="agency-portfolio-card-text">Lorem ipsum dolor sit amet, Ut opertamise sit rartione offici sit aliquam omnis aut optio datore sit ratione quis</p>
              <a className="agency-portfolio-card-link" href="#">Go to website <i className="bi bi-arrow-right"></i></a>
            </div>
            <div className="agency-portfolio-card">
              <h3 className="agency-portfolio-card-title">Nom du projet</h3>
              <p className="agency-portfolio-card-text">Lorem ipsum dolor sit amet, Ut opertamise sit rartione offici sit aliquam omnis aut optio datore sit ratione quis</p>
              <a className="agency-portfolio-card-link" href="#">Go to website <i className="bi bi-arrow-right"></i></a>
            </div>
          </div>
        </div>
        <div className="agency-quality">
          <h2 className="agency-quality-title">Why Choose Us?</h2>
          <div className="agency-quality-box">
            <div className="agency-quality-item">
              <h3 className="agency-quality-item-title">We design stunning, functional websites tailored to your brand.</h3>
            </div>
            <div className="agency-quality-item">
              <h3 className="agency-quality-item-title">Our responsive development ensures perfect performance on all devices.</h3>
            </div>
            <div className="agency-quality-item">
              <h3 className="agency-quality-item-title">We deliver fast, reliable hosting solutions for optimal site performance.</h3>
            </div>
            <div className="agency-quality-item">
              <h3 className="agency-quality-item-title">We ensure your website has a user-friendly interface for easy navigation.</h3>
            </div>
            <div className="agency-quality-item">
              <h3 className="agency-quality-item-title">We provide ongoing support to keep your website updated and secure.</h3>
            </div>
          </div>
        </div>
        <div className="agency-expert">
          <h2 className="agency-expert-title">Meet Your Digital Solutions Expert</h2>
          <div className="agency-expert-content">
            <div className="agency-expert-item">
              <h3 className="agency-expert-item-title">Empowering Businesses with Tailored Solutions</h3>
              <p className="agency-expert-item-text">
                Our youthful spirit drives us to empower businesses of all sizes, recognizing that a website is essential, especially for small companies. With our commitment to reasonable pricing and collaborative creation process, we work hand in hand with you to bring your vision to life, ensuring that your digital presence stands out in today's competitive market.
              </p>
            </div>
            <div className="agency-expert-stats">
              <div className="agency-expert-stat">
                <h4>15+</h4>
                <p>Projects</p>
              </div>
              <div className="agency-expert-stat">
                <h4>100%</h4>
                <p>Satisfaction</p>
              </div>
              <div className="agency-expert-stat">
                <h4>3 Years</h4>
                <p>Experience</p>
              </div>
            </div>
          </div>
        </div>
        <div className="agency-contact" ref={ctaRef}>
          <h2 className="agency-contact-title">Join Our Newsletter</h2>
          <p className="agency-contact-text">
            Join our newsletter for exclusive updates and insights! Rest assured, you can unsubscribe at any time, and we will never sell or share your email with third parties. Read our Privacy Policy for more information.
          </p>
          <ContactForm />
        </div>
      </div>
      <Footer />
    </>
  );
}
