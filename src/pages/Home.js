import NavBar from "../components/website/NavBar";
import Header from "../components/website/home/Header";
import Solutions from "../components/website/home/Solutions";
import Pricing from "../components/website/home/Pricing";
import About from "../components/website/home/About";
import FaqHP from "../components/website/home/FaqHP";
import Footer from "../components/website/Footer";
import ReportBugBTN from "../components/website/ReportBugBTN";
import React, { useState, useEffect } from "react";
import { db, doc, getDoc } from '../firebaseConfig'; // Assuming Firestore is correctly imported and configured
import PartnersHP from "../components/website/home/Partners";

export default function Home() {


  return (
    <>
      <NavBar
      />
      <Header
      />
      <PartnersHP />
      <Solutions />
      <Pricing
      />
      <About />
      <FaqHP />
      <Footer />
      <ReportBugBTN />
    </>
  );
}
