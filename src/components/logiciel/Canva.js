import './Canva.css';
import './Root.css';
import TemplateTestComponents from '../../templates/TemplateTestComponents';

export default function Canva({ settings }) {
  return (
    <>
      <div className='canva-wrapper'>
        <TemplateTestComponents settings={settings} /> {/* Pass the settings prop to the TemplateTestComponents */}
      </div>
    </>
  );
}
