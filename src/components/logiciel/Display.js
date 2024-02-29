import NavBar from "./NavBar"
import TopBar from "./TopBar"
import RightBar from "./RightBar"
import Canva from "./Canva"
import './Display.css'; 

export default function Display() {
    return (
        <>
        <div className="displayWrapper">
            <NavBar />
            <div className="displayColumnWrapper">
                <TopBar />
                <Canva />
            </div>
            <RightBar />
        </div>          
        </>
    )
}