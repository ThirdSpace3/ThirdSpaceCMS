import './TemplateSteps.css';
import '../../Root.css';
import React from 'react';

const TemplateStep5 = () => {



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
                                    <img src='template-test.png' />
                                </div>
                                <div className='templates-infos'>
                                    <h3>Template Name</h3>
                                    <i class="bi bi-star"></i>
                                </div>
                                <div className='templates-hover'>
                                    <a href="">View Demo</a>
                                    <a href="">Start Editing</a>

                                </div>

                            </div>

                        </div>
                    </div>
                   
                </div>
            </div>
        
    );
};

export default TemplateStep5;
