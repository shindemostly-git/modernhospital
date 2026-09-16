import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Aboutus from './pages/Aboutus.jsx'
import Bookconsultation from './pages/Bookconsultation.jsx'
import SpecialtyDetail from './pages/SpecialtyDetail.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="flex min-h-screen flex-col">
        {/* Navbar now lives here, ABOVE and OUTSIDE every page's own
            overflow-x-hidden wrapper. Sticky positioning breaks the moment
            any ancestor has overflow set (even just overflow-x), so the
            navbar previously stopped sticking whenever a page (About Us,
            Home, etc.) rendered it inside its own clipped container. */}
        <Navbar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/aboutus" element={<Aboutus />} />
            <Route path="/bookconsultation" element={<Bookconsultation />} />
            <Route path="/specialties/:slug" element={<SpecialtyDetail />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  )
}