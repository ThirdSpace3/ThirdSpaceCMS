import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from 'react';

import ReactGA from 'react-ga';
import Home from "./pages/Home";
import Pricing from "./pages/Pricing";
import Products from "./pages/Products";
import Resources from "./pages/Ressources"; // Changed Ressources to Resources
import Contact from "./pages/Contact";
import NoPage from "./pages/NoPage";
import Logiciel from "./pages/Logiciel";
import TemplateStep from "./pages/TemplateStep";
import Dashboard from "./pages/Dashboard";
import Display from "./components/logiciel/Display";
import TemplatePreview from "./pages/TemplatePreview";
import IntegrationTODO from "./components/logiciel/IntegrationTODO/IntegrationTODO";
import Terms from "./pages/legal/Terms";
import { StyleProvider } from "./hooks/StyleContext";
import { ImageHistoryProvider } from "./hooks/ImageHistoryContext";
import PrivacyPolicy from "./pages/legal/PrivacyPolicy";
import GetStartedMobile from "./components/website/GetStartedMobile";
import Agency from "./pages/Agency";
import Builder from "./pages/Builder";
import Academy from "./pages/Academy";
import ShareProject from './components/logiciel/ShareProject'
import About from "./pages/About";
import PopupWallet from "./components/website/login/PopupWallet";
import ConnectAdmin from "./components/dashboard/Admin/ConnectAdmin";
import DashboardAdmin from "./components/dashboard/Admin/DashboardAdmin";

export default function App() {
  const [isAdminSubdomain, setIsAdminSubdomain] = useState(false);
  const [walletId, setWalletId] = useState(localStorage.getItem("userAccount"));

  useEffect(() => {
    const subdomain = window.location.hostname.split('.')[0];
    if (subdomain === 'admin') {
      setIsAdminSubdomain(true);
    }
  }, []);

  return (
    <div>
      <Router>
        <ImageHistoryProvider>
          <StyleProvider>
          {isAdminSubdomain ? (
              <Routes>
                <Route path="/" element={<ConnectAdmin walletId={walletId} />} />
                <Route path="/dashboard-admin" element={<DashboardAdmin />} />
                <Route path="*" element={<NoPage />} />
              </Routes>
            ) : (
              <Routes>
                <Route index element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<PopupWallet />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/products" element={<Products />} />
                <Route path="/resources" element={<Resources />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/builder" element={<Logiciel />} />
                <Route path="/templates" element={<TemplateStep />} />
                <Route path="/templatestep" element={<TemplateStep />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/dashboard-admin" element={<DashboardAdmin />} />
                <Route path="/connect-admin" element={<ConnectAdmin walletId={walletId} />} />
                <Route path="/IntegrationTODO" element={<IntegrationTODO />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/get-started-mobile" element={<GetStartedMobile />} />
                <Route path="/3s-agency" element={<Agency />} />
                <Route path="/3s-builder" element={<Builder />} />
                <Route path="/3s-academy" element={<Academy />} />
                <Route path="/about" element={<About />} />
                <Route
                  path="/builder/:templateName"
                  element={<Display />}
                />
                <Route
                  path="/template-preview/:templateName"
                  element={<TemplatePreview />}
                />
                <Route
                  path="/share/:projectName"
                  element={<ShareProject />}
                />
                <Route path="*" element={<NoPage />} />
              </Routes>
            )}
          </StyleProvider>
        </ImageHistoryProvider>
      </Router>
    </div>
  );
}
