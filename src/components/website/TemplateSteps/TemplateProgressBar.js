import './TemplateSteps.css';
import '../../Root.css';

export default function TemplateProgressBar() {
    return (
        <>
            <div className='progressbar-section'>
            <div className="progressbar-container">
                <div className='progressbar'>
                    <div className='progressbar-number'>
                        <p className='actual-step'>1</p>
                    </div>
                    <p className='progressbar-text actual-step'>Topic</p>
                    <div className='progressbar-dot-box'>
                        <div className='progressbar-dot actual-step'></div>
                        <div className='progressbar-dot actual-step'></div>
                        <div className='progressbar-dot actual-step'></div>
                    </div>
                </div>
                <div className='progressbar'>
                    <div className='progressbar-dot-box'>
                        <div className='progressbar-dot'></div>
                        <div className='progressbar-dot'></div>
                        <div className='progressbar-dot'></div>
                    </div>
                    <div className='progressbar-number'>
                        <p>2</p>
                    </div>
                    <p className='progressbar-text'>Features</p>
                    <div className='progressbar-dot-box'>
                        <div className='progressbar-dot'></div>
                        <div className='progressbar-dot'></div>
                        <div className='progressbar-dot'></div>
                    </div>
                </div>
                <div className='progressbar'>
                    <div className='progressbar-dot-box'>
                        <div className='progressbar-dot'></div>
                        <div className='progressbar-dot'></div>
                        <div className='progressbar-dot'></div>
                    </div>
                    <div className='progressbar-number'>
                        <p>3</p>
                    </div>
                    <p className='progressbar-text'>Product</p>
                    <div className='progressbar-dot-box'>
                        <div className='progressbar-dot'></div>
                        <div className='progressbar-dot'></div>
                        <div className='progressbar-dot'></div>
                    </div>
                </div>
                <div className='progressbar'>
                <div className='progressbar-dot-box'>
                        <div className='progressbar-dot'></div>
                        <div className='progressbar-dot'></div>
                        <div className='progressbar-dot'></div>
                    </div>
                    <div className='progressbar-number'>
                        <p>4</p>
                    </div>
                    <p className='progressbar-text'>Name</p>
                    
                </div>
            </div>
            </div>
        </>
    )
}