import './Canva.css';
import './Root.css';
import TemplateTestComponents from '../../templates/TemplateTestComponents';

export default function Canva() {
    return (
        <>
             <div className='canva-wrapper'>
                <TemplateTestComponents /> {/* Render the TemplateTest component */}
            </div>
        </>
    )
}