import NavBar from "../components/website/NavBar"
import Header from "../components/website/home/Header"
import Solutions from "../components/website/home/Solutions"
import HowItWork from "../components/website/home/HowItWork"
import Roadmap from "../components/website/home/Roadmap"
import GetInTouch from "../components/website/home/GetInTouch"
import Footer from "../components/website/Footer"

export default function Home() {
    return (
        <>
            <NavBar />
            <Header />
            <Solutions />
            <HowItWork />
            <Roadmap />
            <GetInTouch />
            <Footer />
        </>
    )
}