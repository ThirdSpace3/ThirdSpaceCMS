import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import NoPage from './pages/NoPage'
import Logiciel from './pages/Logiciel'
import TemplateStep from './pages/TemplateStep'

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home/>}/>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/logiciel" element={<Logiciel />} />
          <Route path="/templates" element={<TemplateStep />} />
          <Route path="/templatestep" element={<TemplateStep />} /> {/* Use the 'element' prop here */}
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
