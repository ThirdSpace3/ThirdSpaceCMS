import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Pricing from "./pages/Pricing";
import Products from "./pages/Products";
import Ressources from "./pages/Ressources";
import Contact from "./pages/Contact";
import NoPage from "./pages/NoPage";
import Logiciel from "./pages/Logiciel";
import TemplateStep from "./pages/TemplateStep";
import Dashboard from "./pages/Dashboard";
import Display from "./components/logiciel/Display";
import TemplatePreview from "./pages/TemplatePreview";
import IntegrationTODO from "./components/logiciel/IntegrationTODO/IntegrationTODO"
import { StyleProvider } from "./hooks/StyleContext";
import { ImageHistoryProvider } from "./hooks/ImageHistoryContext";
export default function App() {
  return (
    <div>
      <HashRouter>
        <ImageHistoryProvider>
          <StyleProvider>
            <Routes>
              <Route index element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/products" element={<Products />} />
              <Route path="/ressources" element={<Ressources />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/logiciel" element={<Logiciel />} />
              <Route path="/templates" element={<TemplateStep />} />
              <Route path="/templatestep" element={<TemplateStep />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/IntegrationTODO" element={<IntegrationTODO />} />

              <Route
                path="/logiciel/:templateName"
                element={<Display />}
              />{" "}
              {/* Add this line for the dynamic route */}
              <Route
                path="/template-preview/:templateName"
                element={<TemplatePreview />}
              />{" "}
              {/* Add this route for template preview */}
              <Route path="/templates/:step" element={<TemplateStep />} />
              <Route path="*" element={<NoPage />} />
            </Routes>
          </StyleProvider>
        </ImageHistoryProvider>
      </HashRouter>
    </div>
  );
}
