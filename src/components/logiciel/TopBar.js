import './TopBar.css';
import '../Root.css';
// Remove the direct import of Template1OnDo since you're not using it in TopBar
// import Template1OnDo from '../../templates/Template1OnDo'; // This line is no longer needed

const deviceSizes = {
    tv: "100%", // Example, adjust based on your design
    tablet: "768px", // Common tablet width
    smartphone: "375px", // Common smartphone width
};

// Add a new prop onToggleTemplate1OnDo for toggling the visibility of Template1OnDo
export default function TopBar({ onSaveClick, onUndoClick, onRedoClick, onDeviceChange, onPreview }) {
    return (
        <>
            <div className='topbar-wrapper'>
                <div className='topbar-left'>
                    <a className='topbar-undo-btn' onClick={onUndoClick}><i className="bi bi-arrow-return-left"></i></a>
                    <a className='topbar-redo-btn' onClick={onRedoClick}><i className="bi bi-arrow-return-right"></i></a>

                    <hr />
                    {/* Update this line to call onPreview when the eye icon is clicked */}
                    <a onClick={onPreview}><i className="bi bi-eye"></i></a>
                </div>
                <div className='topbar-mid'>
                    <a onClick={() => onDeviceChange(deviceSizes.tv)} className='topbar-device-btn'><i className="bi bi-tv"></i></a>
                    <a onClick={() => onDeviceChange(deviceSizes.tablet)} className='topbar-device-btn'><i className="bi bi-tablet-landscape"></i></a>
                    <a onClick={() => onDeviceChange(deviceSizes.smartphone)} className='topbar-device-btn'><i className="bi bi-phone"></i></a>
                </div>
                <button className='topbar-propulse-btn' onClick={onSaveClick}>
                    Propulse
                    <i class="bi bi-rocket-takeoff"></i>
                </button>
            </div>
        </>
    );
}
