import './Canva.css';
import '../Root.css';
import TemplateTestComponents from '../../templates/Template2ImageOnDo';

export default function Canva({ settings }) {
  return (
    <>
      <div className='canva-wrapper'>
        <TemplateTestComponents
          settings={{
            background: settings.background,
            typography: settings.typography,
            border: settings.border,
          }}
        />
      </div>
    </>
  );
}
