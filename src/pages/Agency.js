import React, { useState, useRef } from 'react';
import { db, collection, getDocs } from '../firebaseConfig'; // Assuming Firestore is correctly imported and configured
import { Link } from 'react-router-dom';
import NavBar from '../components/website/NavBar';
import Footer from '../components/website/Footer';
import ContactForm from '../components/website/ContactForm';
import '../components/website/agency.css';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles

export default function Agency() {
  const [hasWalletData, setHasWalletData] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [hasStepData, setHasStepData] = useState(false); // State to track if stepData is available
  const ctaRef = useRef(null); // Create a ref for the CTA div
  const carouselRef = useRef(null);

  const projects = [
    {
      title: "Project One",
      description: "Description for project one.",
      imageUrl: "../../images/Group220.png",
      link: "#"
    },
    {
      title: "Project Two",
      description: "Description for project two.",
      imageUrl: "../../images/Group220.png",
      link: "#"
    },
    {
      title: "Project Three",
      description: "Description for project three.",
      imageUrl: "../../images/Group220.png",
      link: "#"
    },
    {
      title: "Project Four",
      description: "Description for project four.",
      imageUrl: "../../images/Group220.png",
      link: "#"
    },
    {
      title: "Project Five",
      description: "Description for project five.",
      imageUrl: "../../images/Group220.png",
      link: "#"
    }
  ];
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

  const handlePrev = () => {
    if (carouselRef.current) {
      carouselRef.current.decrement();
    }
  };

  const handleNext = () => {
    if (carouselRef.current) {
      carouselRef.current.increment();
    }
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
              <ContactForm />            
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
          <div className='agency-portfolio-carrousel-title'>
            <h2 className="agency-portfolio-title">Explore our latest projects</h2>
            <div className='carrousel-handlers'>
              <i className='bi bi-arrow-left' onClick={handlePrev}></i>
              <i className='bi bi-arrow-right' onClick={handleNext}></i>
            </div>
          </div>
          <Carousel
            ref={carouselRef}
            showArrows={false}
            infiniteLoop={true}
            showThumbs={false}
            showStatus={false}
            centerMode={true}
            centerSlidePercentage={25} // Adjust to show parts of the side slides
          >
            {projects.map((project, index) => (
              <div key={index} className="agency-portfolio-card">
                <img src={project.imageUrl} alt={project.title} />
                <h3 className="agency-portfolio-card-title">{project.title}</h3>
                <p className="agency-portfolio-card-text">{project.description}</p>
                <a className="agency-portfolio-card-link" href={project.link}>Go to website <i className="bi bi-arrow-right"></i></a>
              </div>
            ))}
          </Carousel>

        </div>

        <div className="agency-quality">
          <img src='../../images/groupequality.png'></img>
          <div className='agency-quality-content'>
            <p>Quality</p>
            <h2 className="agency-quality-title">Why Choose Us?</h2>
            <div className="agency-quality-box">
              <div className="agency-quality-item">
                <h3 className="agency-quality-item-title">                <i className='bi bi-check-circle'></i>
                  We design stunning, functional websites tailored to your brand.</h3>
              </div>
              <div className="agency-quality-item">
                <h3 className="agency-quality-item-title">
                  <i className='bi bi-check-circle'></i>
                  Our responsive development ensures perfect performance on all devices.
                </h3>
              </div>
              <div className="agency-quality-item">
                <h3 className="agency-quality-item-title">                <i className='bi bi-check-circle'></i>
                  We deliver fast, reliable hosting solutions for optimal site performance.</h3>
              </div>
              <div className="agency-quality-item">
                <h3 className="agency-quality-item-title">                <i className='bi bi-check-circle'></i>
                  We ensure your website has a user-friendly interface for easy navigation.</h3>
              </div>
              <div className="agency-quality-item">
                <h3 className="agency-quality-item-title">                <i className='bi bi-check-circle'></i>
                  We provide ongoing support to keep your website updated and secure.</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="agency-expert">
          <p className="agency-expert-item-text">Who are we?</p>
          <h2 className="agency-expert-title">Meet Your Digital Solutions Expert</h2>

          <div className="agency-expert-content">
            <div className="agency-expert-item">
              <h3 className="agency-expert-item-title">Empowering Businesses with Tailored Solutions</h3>
              <p className="agency-expert-item-text">
                Our youthful spirit drives us to empower businesses of all sizes, recognizing that a website is essential, especially for small companies. With our commitment to reasonable pricing and collaborative creation process, we work hand in hand with you to bring your vision to life, ensuring that your digital presence stands out in today's competitive market.
              </p>
              <ContactForm />            

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
            <img src='./images/Group330.png'></img>
          </div>
        </div>
        <div className="agency-contact" ref={ctaRef}>
          <div className='agency-contact-content'>
            <h2 className="agency-contact-title">Join Our Newsletter</h2>

            <p className="agency-contact-text">
              Join our newsletter for exclusive updates and insights! Rest assured, you can unsubscribe at any time, and we will never sell or share your email with third parties. Read our Privacy Policy for more information.
            </p>
            <ContactForm />            

          </div>
          <img src='./images/Groupe44.png'></img>

        </div>
      </div>
      <Footer />
    </>
  );
}
