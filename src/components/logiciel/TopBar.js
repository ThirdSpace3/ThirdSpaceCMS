import './TopBar.css';
import './Root.css';

export default function TopBar() {
    return (
        <>
            <div className='topbar-wrapper'>
                <div className='topbar-left'>
                    <a href=""><i class="bi bi-arrow-return-left"></i></a>
                    <a href=""><i class="bi bi-arrow-return-right"></i></a>
                    <hr />
                    <a href=""><i class="bi bi-eye"></i></a>
                </div>
                <div className='topbar-mid'>
                    <a href="" className='topbar-device-btn'><i class="bi bi-tv"></i></a>
                    <a href="" className='topbar-device-btn'><i class="bi bi-tablet-landscape"></i></a>
                    <a href="" className='topbar-device-btn'><i class="bi bi-phone"></i></a>
                </div>
                <a href="" className='topbar-propulse-btn'>Propulse <i class="bi bi-rocket-takeoff"></i></a>

            </div>
        </>
    )
}