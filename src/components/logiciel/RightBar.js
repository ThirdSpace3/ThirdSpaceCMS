import './RightBar.css';
import './Root.css';



export default function RightBar() {
    return (
        <>
            <div className='rightbar-wrapper'>
                
                <div className='style-wrapper'>
                    <div className='parameters-wrapper'>
                        <p className='parameters-wrapper-title'>Background</p>
                        <div className='parameters-wrapper-content'>
                            
                        </div>
                    </div>

                    <div className='parameters-wrapper'>
                        <p className='parameters-wrapper-title'>Style</p>
                        <div className='parameters-wrapper-content'>
                            <div className='parameters-content-line'>
                                <p className='parameters-content-line-title'>Text Decoration</p>
                                <div className='parameters-content-line-container'>
                                    <a href='' className='parameters-content-line-item'><i class="bi bi-type-italic"></i></a>
                                    <hr className='parameters-content-line-separation' />
                                    <a href='' className='parameters-content-line-item'><i class="bi bi-type-underline"></i></a>
                                    <hr className='parameters-content-line-separation' />
                                    <a href='' className='parameters-content-line-item'><i class="bi bi-type-strikethrough"></i></a>
                                </div>
                            </div>
                            <div className='parameters-content-line'>
                                <p className='parameters-content-line-title'>Text Align</p>
                                <div className='parameters-content-line-container'>
                                    <a href='' className='parameters-content-line-item'><i class="bi bi-text-left"></i></a>
                                    <hr className='parameters-content-line-separation' />
                                    <a href='' className='parameters-content-line-item'><i class="bi bi-text-center"></i></a>
                                    <hr className='parameters-content-line-separation' />
                                    <a href='' className='parameters-content-line-item'><i class="bi bi-text-right"></i></a>
                                    <hr className='parameters-content-line-separation' />
                                    <a href='' className='parameters-content-line-item'><i class="bi bi-justify"></i></a>

                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
                
            </div>
        </>
    )
}