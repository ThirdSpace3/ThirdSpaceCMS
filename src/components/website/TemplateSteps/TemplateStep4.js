import './TemplateSteps.css';
import '../../Root.css';
import { Link } from 'react-router-dom';
import TemplateFullText from '../../../templates/TemplateFullText';
import { useNavigate } from 'react-router-dom';
import  { useState } from 'react';
    const TemplateStep5 = () => {
        const [isHovered, setIsHovered] = useState(false);

  // const navigate = useNavigate('');

  // navigate('./dashboard');

    return (
        <div id="etape4">
                <div className="step-box">
                    <h2 className="template-title">Choose a template</h2>
                    <p className="template-subtitle">You can always explore other templates if you change your mind later.</p>

                    <div className='listing-container'>
                        <div className='filters-container'>

                        </div>
                        <div className='templates-container'>
                        <div className='templates-box'>
            <div className='templates-img' onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                <img src='./images/template-test.png' alt='Template Preview' />
                {isHovered && (
                    <div className='templates-hover'>
                        <div className='templates-hover-content'>
                        <a href=""><Link to="/templates/TemplateFullText">View Demo</Link></a>
                        <a href=""><Link to="/logiciel/:templateName">Start Editing</Link></a>
                        </div>
                    </div>
                )}
            </div>
            <div className='templates-infos'>
                <h3>Template Name</h3>
                {/* <i className="bi bi-star"></i> */}
            </div>
                         </div>
                         <div className='templates-box'>
            <div className='templates-img' onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                <img src='./images/template-test.png' alt='Template Preview' />
                {isHovered && (
                    <div className='templates-hover'>
                        <div className='templates-hover-content'>
                        <a href=""><Link to="/templates/TemplateFullText">View Demo</Link></a>
                        <a href=""><Link to="/logiciel/:templateName">Start Editing</Link></a>
                        </div>
                    </div>
                )}
            </div>
            <div className='templates-infos'>
                <h3>Template Name</h3>
                <i className="bi bi-star"></i>
            </div>
                         </div>
                         <div className='templates-box'>
            <div className='templates-img' onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                <img src='./images/template-test.png' alt='Template Preview' />
                {isHovered && (
                    <div className='templates-hover'>
                        <div className='templates-hover-content'>
                        <a href=""><Link to="/templates/TemplateFullText">View Demo</Link></a>
                        <a href=""><Link to="/logiciel/:templateName">Start Editing</Link></a>
                        </div>
                    </div>
                )}
            </div>
            <div className='templates-infos'>
                <h3>Template Name</h3>
                <i className="bi bi-star"></i>
            </div>
                         </div>
                        </div>
                    </div>
                   
                </div>
            </div>
        
    );
};

export default TemplateStep5;
