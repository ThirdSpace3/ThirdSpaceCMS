import './TemplateSteps.css';
import '../../Root.css';
import React from 'react';
import { Link } from 'react-router-dom';
import TemplateFullText from '../../../templates/TemplateFullText';
import { useNavigate } from 'react-router-dom';
const TemplateStep5 = () => {

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
                                <div className='templates-img'>
                                    <img src='./images/howitworkd-1.png'/> {/**Preview of the template  */}
                                </div>
                                <div className='templates-infos'>
                                    <h3>Template Name</h3> {/**Template Infos  */}
                                    <i class="bi bi-star"></i> {/**Rating of the template for later */}
                                </div>
                                <div className='templates-hover'>
                                    <a href="" ><Link to="/templates/TemplateFullText">View Demo</Link></a> {/**Redirect to preview display of the template in a preview public url */}
                                    <a href=""><Link to="/logiciel/:templateName">Start Editing</Link></a>{/**Redirect to editor */}

                                </div>

                            </div>
                        </div>
                    </div>
                   
                </div>
            </div>
        
    );
};

export default TemplateStep5;
