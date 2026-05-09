import { Plane, Menu, X, Mail } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <div className="bg-teal-800 text-white py-2 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              <a href="mailto:fidexcourier.support@gmail.com" className="flex items-center hover:text-orange-400 transition-colors duration-200">
                <Mail className="w-4 h-4 mr-2" />
                fidexcourier.support@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-50 transition-all duration-300 bg-teal-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center space-x-3">
                <Plane className="w-14 h-14 text-orange-400" style={{ transform: 'rotate(45deg)' }} />
                <span className="text-3xl font-bold bg-gradient-to-r from-white via-orange-200 to-orange-400 bg-clip-text text-transparent">Fidex</span>
              </Link>
            </div>

            <nav className="hidden md:flex items-center space-x-2">
              <a href="/" onClick={handleHomeClick} className="text-white border-2 border-orange-400 rounded-lg px-2.5 py-1 hover:bg-orange-400 hover:text-teal-700 text-sm font-medium transition-all duration-200">
                Home
              </a>
              <Link to="/logistics" className="text-white border-2 border-orange-400 rounded-lg px-2.5 py-1 hover:bg-orange-400 hover:text-teal-700 text-sm font-medium transition-all duration-200">
                Logistics
              </Link>
              <Link to="/services" className="text-white border-2 border-orange-400 rounded-lg px-2.5 py-1 hover:bg-orange-400 hover:text-teal-700 text-sm font-medium transition-all duration-200">
                Services
              </Link>
              <Link to="/about" className="text-white border-2 border-orange-400 rounded-lg px-2.5 py-1 hover:bg-orange-400 hover:text-teal-700 text-sm font-medium transition-all duration-200">
                About
              </Link>
              <Link to="/contact" className="text-white border-2 border-orange-400 rounded-lg px-2.5 py-1 hover:bg-orange-400 hover:text-teal-700 text-sm font-medium transition-all duration-200">
                Contact Us
              </Link>
            </nav>

            <div className="hidden md:block">
              <Link to="/track" className="inline-flex items-center px-6 py-2 border border-transparent text-base font-medium rounded-full text-teal-700 bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors duration-200">
                TRACK
              </Link>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-white hover:text-orange-400 focus:outline-none"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-teal-700 shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1.5">
              <a href="/" onClick={handleHomeClick} className="block px-3 py-1.5 rounded-lg text-sm font-medium text-white border-2 border-orange-400 hover:bg-orange-400 hover:text-teal-700 transition-all duration-200">
                Home
              </a>
              <Link to="/logistics" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-1.5 rounded-lg text-sm font-medium text-white border-2 border-orange-400 hover:bg-orange-400 hover:text-teal-700 transition-all duration-200">
                Logistics
              </Link>
              <Link to="/services" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-1.5 rounded-lg text-sm font-medium text-white border-2 border-orange-400 hover:bg-orange-400 hover:text-teal-700 transition-all duration-200">
                Services
              </Link>
              <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-1.5 rounded-lg text-sm font-medium text-white border-2 border-orange-400 hover:bg-orange-400 hover:text-teal-700 transition-all duration-200">
                About
              </Link>
              <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-1.5 rounded-lg text-sm font-medium text-white border-2 border-orange-400 hover:bg-orange-400 hover:text-teal-700 transition-all duration-200">
                Contact Us
              </Link>
              <div className="pt-4">
                <Link to="/track" className="block w-full text-center px-3 py-2 rounded-full text-base font-medium text-teal-700 bg-orange-500 hover:bg-orange-600 transition-colors duration-200" onClick={() => setMobileMenuOpen(false)}>
                  TRACK
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
