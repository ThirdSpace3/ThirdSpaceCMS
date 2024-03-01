import NavBar from "./NavBar"
import TopBar from "./TopBar"
import RightBar from "./RightBar"
import Canva from "./Canva"
import ActualPageParametersBTN from "./ActualPageParametersBTN"
import './Display.css'; 

export default function Display() {
    return (
        <>
        <TopBar />
        <div className="displayWrapper">
            <NavBar />
            <div className="displayColumnWrapper">
                <ActualPageParametersBTN />
                <Canva />
            </div>
            <RightBar />
        </div>          
        </>
    )
}