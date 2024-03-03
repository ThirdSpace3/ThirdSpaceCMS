import './Canva.css';
import './Root.css';
import TemplateTestComponents from '../../templates/TemplateTestComponents';

export default function Canva({ settings, settingsFetched }) {
  return (
    <>
      <div className='canva-wrapper'>
        <TemplateTestComponents
          settings={{
            background: settings.background,
            typography: settings.typography,
            border: settings.border,
          }}
          settingsFetched={settingsFetched}
        />
      </div>
    </>
  );
}
