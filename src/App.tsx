import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import NoticeBanner from './components/NoticeBanner';
import AboutSection from './components/AboutSection';
import Features from './components/Features';
import Statistics from './components/Statistics';
import TrackingSystem from './components/TrackingSystem';
import PricingCalculator from './components/PricingCalculator';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import Logistics from './pages/Logistics';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import Track from './pages/Track';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';
import { AuthProvider } from './contexts/AuthContext';

function HomePage() {
  return (
    <>
      <Hero />
      <NoticeBanner />
      <AboutSection />
      <Features />
      <Statistics />

      <section id="pricing" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-orange-600 font-semibold text-sm uppercase tracking-wide mb-4">Pricing</p>
            <h2 className="text-4xl md:text-5xl font-bold text-teal-800 mb-6">
              Calculate Your Shipping Cost
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get an instant estimate for your shipment
            </p>
          </div>
          <PricingCalculator />
        </div>
      </section>

      <section id="track" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <TrackingSystem />
        </div>
      </section>

      <Testimonials />
    </>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AuthProvider>
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute requireAdmin>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/*"
            element={
              <div className="min-h-screen bg-white">
                <Header />
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/logistics" element={<Logistics />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/track" element={<Track />} />
                </Routes>
                <Footer />
              </div>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
