import NavBar from "../components/website/NavBar";
import Header from "../components/website/home/Header";
import Solutions from "../components/website/home/Solutions";
import HowItWork from "../components/website/home/HowItWork";
import Roadmap from "../components/website/home/Roadmap";
import GetInTouch from "../components/website/home/GetInTouch";
import Footer from "../components/website/Footer";
import ReportBugBTN from "../components/website/ReportBugBTN";

export default function Home() {
  const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
  localStorage.clear();
   sessionStorage.clear();
  // Clearing the entire session storage
  return (
    <>
      <NavBar />
      <Header />
      <Solutions />
      <HowItWork />
      <Roadmap />
      <GetInTouch />
      <Footer />
      <ReportBugBTN />
    </>
  );
}
