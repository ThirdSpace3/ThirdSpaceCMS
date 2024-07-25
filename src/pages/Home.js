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
import { Helmet } from "react-helmet";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Third Space | Build Web 3 Projects Effortlessly with No-Code Tools</title>
        <meta name="description" content="Build Web 3 projects effortlessly with Third Space's no-code tools. Create landing pages, marketplaces, and dApps with drag-and-drop customization, professional templates, and secure wallet integrations." />
      </Helmet>
      <NavBar />
      <Header />
      <PartnersHP />
      <Solutions />
      <Pricing />
      <About />
      <FaqHP />
      <Footer />
      <ReportBugBTN />
    </>
  );
}
