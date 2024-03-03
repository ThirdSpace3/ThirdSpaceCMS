import './TopBar.css';
import './Root.css';

export default function TopBar({ onSaveClick, onUndoClick, onRedoClick, hasUnsavedChanges }) {
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
                    <a href="" className='topbar-device-btn'><i class="bi bi-tv"></i></a>
                    <a href="" className='topbar-device-btn'><i class="bi bi-tablet-landscape"></i></a>
                    <a href="" className='topbar-device-btn'><i class="bi bi-phone"></i></a>
                </div>
                <button className='topbar-propulse-btn' onClick={onSaveClick} disabled={!hasUnsavedChanges}> Propulse <i class="bi bi-rocket-takeoff"></i>
             </button>
            </div>
        </>
    )
}