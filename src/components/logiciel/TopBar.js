import './TopBar.css';
import '../Root.css';
// You can place this in a constants file or directly in your components
const deviceSizes = {
    tv: "100%", // Example, adjust based on your design
    tablet: "768px", // Common tablet width
    smartphone: "375px", // Common smartphone width
  };
  
export default function TopBar({ onSaveClick, onUndoClick, onRedoClick, onDeviceChange }) {
    return (
        <>
            <div className='topbar-wrapper'>
                <div className='topbar-left'>
                    <a className='topbar-undo-btn' onClick={onUndoClick}><i class="bi bi-arrow-return-left"></i></a>
                    <a className='topbar-redo-btn' onClick={onRedoClick}><i class="bi bi-arrow-return-right"></i></a>

                    <hr />
                    <a href=""><i class="bi bi-eye"></i></a>
                </div>
                <div className='topbar-mid'>
                    <a onClick={() => onDeviceChange(deviceSizes.tv)} className='topbar-device-btn'><i className="bi bi-tv"></i></a>
                    <a onClick={() => onDeviceChange(deviceSizes.tablet)} className='topbar-device-btn'><i className="bi bi-tablet-landscape"></i></a>
                    <a onClick={() => onDeviceChange(deviceSizes.smartphone)} className='topbar-device-btn'><i className="bi bi-phone"></i></a>
                </div>
                <button className='topbar-propulse-btn' onClick={() => { console.log('Button clicked'); onSaveClick(); }}>
  Propulse
</button>
            </div>
        </>
    )
}